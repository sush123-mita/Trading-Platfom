import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// ---------------------
// Signup Controller
// ---------------------
export const Signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Normalize inputs
        email = email.trim().toLowerCase();
        password = password.trim();
        name = name.trim();

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists!" });

        // Create new user — password is hashed automatically by pre-save hook
        user = new User({ name, email, password });
        await user.save();

        // Create JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });

        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).send("Server error");
    }
}

// ---------------------
// Login Controller
// ---------------------
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Normalize inputs
        email = email.trim().toLowerCase();
        password = password.trim();

        console.log("Login request:", { email, password });

        // Find user
        const user = await User.findOne({ email });
        console.log("User fetched from DB:", user);

        if (!user) {
            console.log("No user found with this email.");
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            console.log("Password does not match the stored hash.");
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Create JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" });
        console.log("JWT token created:", token);

        // Respond
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                balance: user.balance || 10000
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send("Server error");
    }
};


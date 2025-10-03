import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Trade from "../models/Trade.js";
import axios from "axios";

const router = express.Router();

// Place a simple market order
router.post("/place", auth, async (req, res) => {
  try {
    const { symbol, side, quantity ,asset,assetType} = req.body;
    console.log("Place order body:", req.body);
    console.log("User from token:", req.user);

    const user = await User.findById(req.user.id);
    console.log("User fetched from DB:", user);
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Fetch live price from Binance
    const response = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
    );

    console.log("Binance response:", response.data);

    const price = parseFloat(response.data.price);
    const qty = parseFloat(quantity);
    const totalCost = price * qty;

    // Check balance
    if (side === "BUY" && user.balance < totalCost) {
      return res.status(400).json({ msg: "Insufficient balance" });
    }

    // Update balance
    user.balance = side === "BUY" ? user.balance - totalCost : user.balance + totalCost;
    await user.save();

    // Save trade
    const trade = new Trade({
      user: user._id,
      asset,
      assetType,
      symbol,
      type: side,
      amount: qty,
      price,
      totalCost,
      status:"EXECUTED",
      executedAt:new Date(),
    });
    await trade.save();

    res.json({ trade, balance: user.balance });
  } catch (err) {
    console.error("Trade error: ", err.message);
    res.status(500).send("Server error");
  }
});

// Trade history
router.get("/history", auth, async (req, res) => {
  try {
    console.log("Fetching trade history for user:", req.user);

    const trades = await Trade.find({ user: req.user.id }).sort({ createdAt: -1 });

    console.log("Trades found:", trades.length);
    res.json(trades);
  } catch (err) {
    console.error("Trade history error:", err);
    res.status(500).send("Server error");
  }
});
export default router;

import express from 'express';
import axios from 'axios';

const router=express.Router();


router.get("/price/:symbol",async(req,res)=>{
    try{
        const symbol=req.params.symbol.toUpperCase();
        const response=await axios.get(
            `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        res.json(response.data);
    }catch(error){
        console.error("Error fetching data: ",error.message);
        res.status(500).json({error: "Failed to fetch market data"})
    }
})

export default router;
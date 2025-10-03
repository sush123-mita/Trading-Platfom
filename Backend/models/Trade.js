import mongoose from 'mongoose';

const TradeSchema= new mongoose.Schema(
  {
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:'User', required :true
    },
    asset: {
        type: String,
        required: true
      },

      assetType: {
        type: String,
        enum: ['forex', 'stock', 'crypto', 'commodity'],
        required: true
      },
    symbol:String,
    type:{
        type:String, 
        enum:['BUY','SELL'],
        required:true
    },
    orderType: {
        type: String,
        enum: ['MARKET', 'LIMIT', 'STOP'],
        default: 'MARKET'
      },
      amount: {
        type: Number,
        required: true,
        min: 0
      },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    totalCost: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        enum: ['PENDING', 'EXECUTED', 'CANCELLED', 'FAILED'],
        default: 'PENDING'
      },
      stopLoss: {
        type: Number,
        default: null
      },
      takeProfit: {
        type: Number,
        default: null
      },
      executedAt: {
        type: Date
      },
      profit: {
        type: Number,
        default: 0
      },
      commission: {
        type: Number,
        default: 0
      }
    
},{timestamps:true});
// Calculate profit when closing position
TradeSchema.methods.calculateProfit= function(closingPrice){
    const multiplier =this.type==='BUY' ?1 : -1;
    return (closingPrice - this.price)* this.amount*multiplier;
}

const Trade= mongoose.model("Trade",TradeSchema)

export default Trade;
import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    imageUrl: string;
    purchasedItems: string[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string;
    status: string;
}

const TransactionSchema: Schema = new Schema({
    imageUrl: {type: String, require: true},
    purchasedItems: {type: [mongoose.Types.ObjectId], require: true, ref: "Product"},
    totalPayment: {type: Number, require: true},
    customerName: {type: String, require: true},
    customerContact: {type: String, require: true},
    customerAddress: {type: String, require: true},
    status: {type: String, require: true},
}, { timestamps: true })

export default mongoose.model<ITransaction>("Transaction", TransactionSchema)
import mongoose, { Schema, Document } from "mongoose";

export interface IPurchasedItem {
    productId: mongoose.Types.ObjectId,
    qty: number
}

export interface ITransaction extends Document {
    imageUrl: string;
    purchasedItems: IPurchasedItem[];
    totalPayment: number;
    customerName: string;
    customerContact: string;
    customerAddress: string;
    status: "pending" | "paid" | "rejected";
}

const PurchasedItemSchema: Schema = new Schema({
    purchasedItems: { type: [mongoose.Types.ObjectId], require: true, ref: "Product" },
    qty: { type: Number, min: 1, required: true }
}, { _id: false })

const TransactionSchema: Schema = new Schema({
    imageUrl: { type: String, require: true },
    purchasedItems: { type: PurchasedItemSchema, require: true, ref: "Product" },
    totalPayment: { type: Number, require: true },
    customerName: { type: String, require: true },
    customerContact: { type: String, require: true },
    customerAddress: { type: String, require: true },
    status: { type: String, enum: ["pending", "rejected", "paid"], require: true }
}, { timestamps: true })

export default mongoose.model<ITransaction>("Transaction", TransactionSchema)
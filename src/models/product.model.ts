import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface IProduct extends Document {
    name: string;
    stock: number;
    price: number;
    imageUrl: string;
    category: mongoose.Types.ObjectId;
    description: string;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, require: true },
    stock: { type: Number, require: true },
    price: { type: Number, require: true },
    imageUrl: { type: String, require: true },
    category:
    {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "Category"
    },
    description: { type: String, require: true }
}, { timestamps: true })

export default mongoose.model<IProduct>("Product", ProductSchema)
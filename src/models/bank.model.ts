import mongoose, { Schema, Document } from "mongoose";

export interface IBank extends Document {
    accountName: string;
    bankName: string;
    accountNumber: string;
}

const BankSchema: Schema = new Schema({
    accountName: {type: String, require: true},
    accountNumber: {type: String, require: true},
    bankName: {type: String, require: true},
}, {timestamps: true})

export default mongoose.model<IBank>("Bank", BankSchema)
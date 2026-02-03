import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    imageUrl: string;
    description: string;
}

const CategorySchema: Schema = new Schema({
    name: {type: String, require: true},
    imageUrl: {type: String, require: true},
    description: {type: String, require: true}
}, {timestamps: true})

export default mongoose.model<ICategory>("Category", CategorySchema)
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export interface ICategory extends Document {
    name: string;
}

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true },
);

CategorySchema.plugin(mongoosePaginate);

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

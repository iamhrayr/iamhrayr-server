import mongoose, { Document } from 'mongoose';
import { ICategory } from './Category';

export interface IWork extends Document {
    title: string;
    description: string;
    thumbnail: string;
    tags: string[];
    category: ICategory;
    images: string[];
}

const WorkSchema = new mongoose.Schema({
    title: String,
    description: String,
    thumbnail: String,
    tags: [String],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    images: [String],
});

const Work = mongoose.model<IWork>('Work', WorkSchema);

export default Work;

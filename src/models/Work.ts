import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import { ICategory } from './Category';

interface IImage {
    url: string;
    key: string;
}

export interface IWork extends Document {
    title: string;
    description: string;
    thumbnail: IImage;
    tags: string[];
    published: boolean;
    category: ICategory;
    images: IImage[];
}

const WorkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
        description: String,
        thumbnail: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        published: {
            type: Boolean,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        images: {
            type: [mongoose.Schema.Types.Mixed],
            required: true,
        },
    },
    { timestamps: true },
);

WorkSchema.plugin(mongoosePaginate);

const Work = mongoose.model<IWork>('Work', WorkSchema);

export default Work;

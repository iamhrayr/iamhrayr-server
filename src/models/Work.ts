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
        title: String,
        description: String,
        thumbnail: mongoose.Schema.Types.Mixed,
        tags: [String],
        published: Boolean,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        images: [mongoose.Schema.Types.Mixed],
    },
    { timestamps: true },
);

WorkSchema.plugin(mongoosePaginate);

const Work = mongoose.model<IWork>('Work', WorkSchema);

export default Work;

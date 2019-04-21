import mongoose, { Document } from 'mongoose';

export interface ISkill extends Document {
    id: string;
    name: string;
    color: string;
    percent: number;
}

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    percent: { type: Number, required: true },
});

const Skill = mongoose.model<ISkill>('Skill', SkillSchema);

export default Skill;

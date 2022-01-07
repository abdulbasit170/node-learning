import mongoose from 'mongoose';

export interface UserPayload {
    username: string,
    name: string
};

const schema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: { type: String }
});

export default mongoose.model('User', schema);

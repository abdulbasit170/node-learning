import mongoose from 'mongoose';

export interface TodoPayload {
  value: string
};

const schema = new mongoose.Schema({ value: 'string' });

export default mongoose.model('Todo', schema);

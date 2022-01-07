import mongoose from 'mongoose';

// create interface for schema - the type of the scehma
export interface TodoPayload {
  value: string
};

// create schema model using mongoose 
const schema = new mongoose.Schema({ value: 'string' });

// export schema with the key 'todo' 
export default mongoose.model('Todo', schema);

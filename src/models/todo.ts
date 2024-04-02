import mongoose, { Schema, Model, Document } from 'mongoose';

// Define Todo Interface and Model
interface ITodo extends Document {
    title: string;
    completed: boolean;
}

const TodoSchema = new Schema({
    title: String,
    completed: { type: Boolean, default: false }
});

const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', TodoSchema);
export {ITodo, Todo};
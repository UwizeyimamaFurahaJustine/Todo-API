import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: string; // 'admin' or 'user'
}

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

export default model<IUser>('User', UserSchema);

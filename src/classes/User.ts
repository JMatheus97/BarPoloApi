import { Schema, model } from 'mongoose';
import { UserI } from '../interfaces/UserI';

const userSchema = new Schema<UserI>({
  nome: { type: String, required: true, allowNull: false},
  userName: { type: String, required: true, allowNull: false},
  password: { type: String, required: true, allowNull: false},
  perfil: { type: String, required: true, allowNull: false}
}, { timestamps: true})

const UserModal = model<UserI>('User', userSchema);

export default UserModal;

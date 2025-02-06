import mongoose, { Schema } from 'mongoose';
import { User, UserRole } from '../../../../shared/src/lib/models/user.model';
import bcrypt from 'bcrypt';

const UserSchema: Schema<User> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true }
});

UserSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<User>("User", UserSchema);

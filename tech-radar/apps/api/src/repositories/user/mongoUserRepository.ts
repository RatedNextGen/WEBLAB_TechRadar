import { UserRepository } from './user.repository.interface';
import { UserModel } from '../../config/user.schema';
import { User } from '../../../../../shared/src/lib/models/user.model';

export class MongoUserRepository implements UserRepository {

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email });
  }
}

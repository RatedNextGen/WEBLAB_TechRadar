import { User } from '../../../../../shared/src/lib/models/user.model';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}

import { generateToken } from '../utils/jwt';
import { UserRepository } from '../repositories/user/user.repository.interface';

export class UserService {
  private userRepository: UserRepository;

  constructor(userReposistory: UserRepository) {
    this.userRepository = userReposistory;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid email or password.");
    }

    const token = generateToken({ email: user.email, role: user.role });
    return { token };
  }
}

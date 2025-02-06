import { generateToken } from '../../utils/jwt';
import { UserRepository } from '../../repositories/user/user.repository.interface';
import { LoginLogService } from '../loginLog/loginLog.service';

export class UserService {
  private userRepository: UserRepository;
  private loginLogService: LoginLogService;

  constructor(userReposistory: UserRepository, loginLogService: LoginLogService) {
    this.userRepository = userReposistory;
    this.loginLogService = loginLogService;

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
    await this.loginLogService.logLogin(user.email, user.role);

    const token = generateToken({ email: user.email, role: user.role });
    return { token };
  }
}

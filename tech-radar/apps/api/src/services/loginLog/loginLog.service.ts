import { LoginLogRepository } from '../../repositories/loginLog/loginLog.repository.interface';
import { UserRole } from '../../../../../shared/src/lib/models/user.model';

export class LoginLogService {
  private loginLogRepository: LoginLogRepository;

  constructor(loginLogService: LoginLogRepository) {
    this.loginLogRepository = loginLogService
  }

  async logLogin(userEmail: string, role: UserRole) {
    if ([UserRole.CTO, UserRole.TECH_LEAD].includes(role)) {
      await this.loginLogRepository.createLog(userEmail, role);
    }
  }
}

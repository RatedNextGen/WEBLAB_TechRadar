import { LoginLogModel } from '../../config/loginLog.schema';

export class MongoLoginLogRepository {
  async createLog(userEmail: string, role: string): Promise<void> {
    await LoginLogModel.create({
      userEmail,
      role,
      timestamp: new Date()
    });
  }
}

export interface LoginLogRepository {
  createLog(userEmail: string, role: string): Promise<void>;
}

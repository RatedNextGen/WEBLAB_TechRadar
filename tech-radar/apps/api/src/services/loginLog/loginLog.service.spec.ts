import { UserRole } from "../../../../../shared/src/lib/models/user.model";
import { LoginLogRepository } from "../../repositories/loginLog/loginLog.repository.interface";
import { LoginLogService } from './loginLog.service';

describe("LoginLogService", () => {
  let loginLogService: LoginLogService;
  let mockLoginLogRepository: jest.Mocked<LoginLogRepository>;

  beforeEach(() => {
    mockLoginLogRepository = {
      createLog: jest.fn()
    } as unknown as jest.Mocked<LoginLogRepository>;

    loginLogService = new LoginLogService(mockLoginLogRepository);
  });

  it("should log login for CTO", async () => {
    await loginLogService.logLogin("cto@example.com", UserRole.CTO);

    expect(mockLoginLogRepository.createLog).toHaveBeenCalledWith("cto@example.com", UserRole.CTO);
    expect(mockLoginLogRepository.createLog).toHaveBeenCalledTimes(1);
  });

  it("should log login for Tech-Lead", async () => {
    await loginLogService.logLogin("techlead@example.com", UserRole.TECH_LEAD);

    expect(mockLoginLogRepository.createLog).toHaveBeenCalledWith("techlead@example.com", UserRole.TECH_LEAD);
    expect(mockLoginLogRepository.createLog).toHaveBeenCalledTimes(1);
  });

  it("should NOT log login for Employee", async () => {
    await loginLogService.logLogin("employee@example.com", UserRole.EMPLOYEE);

    expect(mockLoginLogRepository.createLog).not.toHaveBeenCalled();
  });
});

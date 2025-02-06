import { UserService } from './user.service';
import { UserRepository } from '../../repositories/user/user.repository.interface';
import { generateToken } from '../../utils/jwt';

jest.mock("../../utils/jwt", () => ({
  generateToken: jest.fn(() => "mocked-token")
}));

describe("UserService - Login", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn()
    } as unknown as jest.Mocked<UserRepository>;

    userService = new UserService(mockUserRepository);
  });

  it("should return a token for valid credentials", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "hashedPassword",
      role: "CTO",
      comparePassword: jest.fn().mockResolvedValue(true)
    } as any;

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    const result = await userService.login("test@example.com", "password123");

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
    expect(mockUser.comparePassword).toHaveBeenCalledWith("password123");
    expect(generateToken).toHaveBeenCalledWith({ email: "test@example.com", role: "CTO" });
    expect(result).toEqual({ token: "mocked-token" });
  });

  it("should throw an error if the email does not exist", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    await expect(userService.login("unknown@example.com", "password123"))
      .rejects
      .toThrow("Invalid email or password.");

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith("unknown@example.com");
  });

  it("should throw an error if the password is incorrect", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "hashedPassword",
      role: "CTO",
      comparePassword: jest.fn().mockResolvedValue(false)
    } as any;

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);

    await expect(userService.login("test@example.com", "wrongpassword"))
      .rejects
      .toThrow("Invalid email or password.");

    expect(mockUser.comparePassword).toHaveBeenCalledWith("wrongpassword");
  });
});

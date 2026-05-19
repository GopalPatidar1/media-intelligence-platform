import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginService } from '@@/server/services/auth/login';

// 🔥 mock dependencies
vi.mock('@@/server/repositories/user', () => ({
  fetchUserByEmail: vi.fn(),
}));

vi.mock('bcryptjs', () => ({
  default: {
    compareSync: vi.fn(),
  },
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}));

vi.mock('@@/server/config', () => ({
  default: {
    jwtSecret: 'test-secret',
  },
}));

// import after mocks
import { fetchUserByEmail } from '@@/server/repositories/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

describe('loginService', () => {
  let event: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // fake h3 event
    event = {
      context: {},
    };

    // mock h3 utils
    (global as any).setResponseStatus = vi.fn();
    (global as any).setCookie = vi.fn();
  });

  it('should login successfully and set cookies', async () => {
    // Arrange
    const mockUser = {
      email: 'test@test.com',
      password: 'hashed-password',
      uid: '123',
    };

    (fetchUserByEmail as any).mockResolvedValue(mockUser);
    (bcrypt.compareSync as any).mockReturnValue(true);
    (jwt.sign as any).mockReturnValue('fake-token');

    // Act
    const result = await loginService(event, {
      email: 'test@test.com',
      password: 'plain-password',
    });

    // Assert
    expect(result).toEqual({ success: true });

    expect(fetchUserByEmail).toHaveBeenCalledWith('test@test.com');
    expect(bcrypt.compareSync).toHaveBeenCalled();

    expect(jwt.sign).toHaveBeenCalledWith(
      { email: mockUser.email, uid: mockUser.uid },
      'test-secret',
      { algorithm: 'HS256', expiresIn: '1h' }
    );

    expect(setCookie).toHaveBeenCalledTimes(2);
  });

  it('should return 404 if user not found', async () => {
    (fetchUserByEmail as any).mockResolvedValue(null);

    const result = await loginService(event, {
      email: 'notfound@test.com',
      password: '123',
    });

    expect(result).toEqual({ message: 'User Not Found' });
    expect(setResponseStatus).toHaveBeenCalledWith(event, 404);
  });

  it('should return 401 if password is wrong', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'hashed-password',
      uid: '123',
    };

    (fetchUserByEmail as any).mockResolvedValue(mockUser);
    (bcrypt.compareSync as any).mockReturnValue(false);

    const result = await loginService(event, {
      email: 'test@test.com',
      password: 'wrong-password',
    });

    expect(result).toEqual({ message: 'wrong password' });
    expect(setResponseStatus).toHaveBeenCalledWith(event, 401);
  });
});

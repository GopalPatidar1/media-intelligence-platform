import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerService } from '@@/server/services/auth/register';

vi.mock('@@/server/repositories/user', () => ({
  createUser: vi.fn(),
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

import { createUser } from '@@/server/repositories/user';
import jwt from 'jsonwebtoken';

describe('registerService', () => {
  let event: any;

  beforeEach(() => {
    vi.clearAllMocks();

    event = {
      context: {},
    };

    // mock h3 utils
    (global as any).setCookie = vi.fn();
  });

  it('should register user and set cookies successfully', async () => {
    const mockUser = {
      uid: '123',
    };

    (createUser as any).mockResolvedValue(mockUser);
    (jwt.sign as any).mockReturnValue('fake-token');

    // Act
    const result = await registerService(event, {
      email: 'test@test.com',
      password: '123456',
      name: 'Test User',
    });

    // Assert
    expect(result).toEqual({ success: true });

    expect(createUser).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
      name: 'Test User',
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      { email: 'test@test.com', uid: '123' },
      'test-secret',
      { algorithm: 'HS256', expiresIn: '1h' }
    );

    expect(setCookie).toHaveBeenCalledTimes(2);
  });

  // it('should throw error if JWT secret is missing', async () => {
  //   // Override config mock
  //   vi.doMock('@@/server/config', () => ({
  //     default: {
  //       jwtSecret: '',
  //     },
  //   }));

  //   const { registerService: newRegisterService } =
  //     await import('@@/server/services/auth/register');

  //   (createUser as any).mockResolvedValue({ uid: '123' });

  //   await expect(
  //     newRegisterService(event, {
  //       email: 'test@test.com',
  //       password: '123456',
  //       name: 'Test User',
  //     })
  //   ).rejects.toThrow('JWT secret is not configured');
  // });

  it('should propagate error if createUser fails', async () => {
    (createUser as any).mockRejectedValue(new Error('DB error'));

    await expect(
      registerService(event, {
        email: 'test@test.com',
        password: '123456',
        name: 'Test User',
      })
    ).rejects.toThrow('DB error');
  });
});

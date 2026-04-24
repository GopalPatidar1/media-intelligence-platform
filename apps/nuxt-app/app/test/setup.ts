import { vi } from 'vitest';

export const mockRequest = vi.fn();

vi.mock('~/composables/useApi', () => ({
  useApi: () => ({
    request: mockRequest,
    loading: false,
    error: null,
  }),
}));

import { vi } from 'vitest';

export const mockRequest = vi.fn();

vi.mock('~/composables/useApi', () => ({
  useApi: () => ({
    request: mockRequest,
    loading: false,
    error: null,
  }),
}));

vi.mock('#app', () => ({
  navigateTo: vi.fn(),
  useState: (key: string, init: any) => ({
    value: typeof init === 'function' ? init() : init,
  }),
}));

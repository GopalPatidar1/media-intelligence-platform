import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '~/pages/dashboard.vue';

const mockNavigate = vi.fn();
vi.mock('#app', () => ({
  navigateTo: mockNavigate,
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('h3').text()).toBe('Asset Overview Dashboard');
  });
});

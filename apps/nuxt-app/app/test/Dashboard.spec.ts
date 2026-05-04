import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import Login from '~/pages/dashboard.vue';

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('renders login form', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('h3').text()).toBe('Asset Overview Dashboard');
  });
});

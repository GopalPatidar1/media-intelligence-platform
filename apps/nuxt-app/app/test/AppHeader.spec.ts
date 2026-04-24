import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppHeader from '~/components/AppHeader.vue';

const mockNavigate = vi.fn();
vi.mock('#app', () => ({
  navigateTo: mockNavigate,
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders AppHeader form', () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.find('h2').text()).toBe('Welcome to App 👋');
  });

  it('Upload File Button', () => {
    const wrapper = mount(AppHeader);

    const buttons = wrapper.findAll('button');

    if (buttons[0]) expect(buttons[0].text()).toBe('Upload File');
  });

  it('Logout Button', () => {
    const wrapper = mount(AppHeader);

    const buttons = wrapper.findAll('button');

    if (buttons[1]) expect(buttons[1].text()).toBe('Logout');
  });
});

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import AppHeader from '~/components/AppHeader.vue';

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
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

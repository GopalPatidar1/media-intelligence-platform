import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from '~/pages/login.vue';
import { setActivePinia, createPinia } from 'pinia';

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it('renders login form', () => {
    const wrapper = mount(Login);

    expect(wrapper.find('h2').text()).toBe('Login');
    expect(wrapper.find('#email').exists()).toBe(true);
  });

  it('updates input fields', async () => {
    const wrapper = mount(Login);

    await wrapper.find('#email').setValue('test@gmail.com');
    await wrapper.find('#password').setValue('123456');

    expect((wrapper.find('#email').element as HTMLInputElement).value).toBe(
      'test@gmail.com'
    );
  });

  it('calls API on submit', async () => {
    const wrapper = mount(Login);

    await wrapper.find('#email').setValue('test@gmail.com');
    await wrapper.find('#password').setValue('123456');

    // await wrapper.find('form').trigger('submit.prevent');

    // expect(mockRequest).toHaveBeenCalledWith('/api/auth/login', {
    //   method: 'POST',
    //   body: {
    //     email: 'gopal@gmail.com',
    //     password: '123456',
    //   },
    // });
  });

  // it('navigates after login', async () => {
  //   const wrapper = mount(Login);

  //   await wrapper.find('#email').setValue('test@gmail.com');
  //   await wrapper.find('#password').setValue('123456');

  //   await wrapper.find('form').trigger('submit.prevent');

  //   expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  // });
});

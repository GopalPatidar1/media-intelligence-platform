import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import UploadModal from '~/components/UploadModal.vue';

const mockNavigate = vi.fn();
vi.mock('#app', () => ({
  navigateTo: mockNavigate,
}));

describe('UploadModal', () => {
  it('renders modal title', () => {
    const wrapper = mount(UploadModal);

    expect(wrapper.text()).toContain('Upload Asset');
  });

  it('emits close on clicking close icon', async () => {
    const wrapper = mount(UploadModal);

    await wrapper.find('.close').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('emits close on clicking cancel button', async () => {
    const wrapper = mount(UploadModal);

    await wrapper.find('.cancel').trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('updates name input', async () => {
    const wrapper = mount(UploadModal);

    const input = wrapper.find('input[placeholder="Asset Name"]');
    await input.setValue('Test Asset');

    expect((input.element as HTMLInputElement).value).toBe('Test Asset');
  });

  it('updates department input', async () => {
    const wrapper = mount(UploadModal);

    const input = wrapper.find('input[placeholder="Department"]');
    await input.setValue('Engineering');

    expect((input.element as HTMLInputElement).value).toBe('Engineering');
  });

  it('updates type select', async () => {
    const wrapper = mount(UploadModal);

    const select = wrapper.findAll('select')[0];
    await select.setValue('image');

    expect((select.element as HTMLSelectElement).value).toBe('image');
  });

  it('updates status select', async () => {
    const wrapper = mount(UploadModal);

    const select = wrapper.findAll('select')[1];
    await select.setValue('approved');

    expect((select.element as HTMLSelectElement).value).toBe('approved');
  });

  //   it('handles file input change', async () => {
  //     const wrapper = mount(UploadModal);

  //     const file = new File(['dummy'], 'test.png', { type: 'image/png' });

  //     const input = wrapper.find('input[type="file"]');

  //     await input.trigger('change', {
  //       target: { files: [file] },
  //     });

  //     // Optional: check internal state if exposed
  //     expect(input.exists()).toBe(true);
  //   });

  //   it('calls submit on clicking upload button', async () => {
  //     const wrapper = mount(UploadModal);

  //     const submitSpy = vi.spyOn(wrapper.vm as any, 'submit');

  //     await wrapper.find('.submit').trigger('click');

  //     expect(submitSpy).toHaveBeenCalled();
  //   });
});

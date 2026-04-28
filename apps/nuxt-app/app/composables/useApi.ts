export const useApi = () => {
  const loading = ref(false);
  const error = ref(null);
  const { showMessage } = useMessage();

  const request = async (url: string, options: any = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const data: any = await $fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
        },
      });

      if (data.statusMessage) showMessage(data.statusMessage, 'success');

      return { success: true, data };
    } catch (err: any) {
      const status = err?.response?.status;
      error.value = err?.data?.message || 'API Error';
      if (status === 401) {
        await navigateTo('/login'); // redirect
      }

      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  return { request, loading, error };
};

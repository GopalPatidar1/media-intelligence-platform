import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useApi } from '~/composables/useApi';

interface File {
  id: string;
  name: string;
  // adjust based on your API
}

export const useFileStore = defineStore('fileStore', () => {
  const files = ref<File[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const fetched = ref(false);

  const { request } = useApi();

  const fetchFiles = async () => {
    if (fetched.value) return;

    loading.value = true;
    error.value = null;

    try {
      const res = await request('/api/file/get');
      files.value = res.data;
      fetched.value = true;
    } catch (err) {
      error.value = 'Failed to fetch files';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    files.value = [];
    fetched.value = false;
    error.value = null;
  };

  return {
    files,
    loading,
    error,
    fetched,
    fetchFiles,
    reset,
  };
});

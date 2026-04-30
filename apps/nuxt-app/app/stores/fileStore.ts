import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';

interface FileState {
  files: any[];
  loading: boolean;
  error: string | null;
  fetched: boolean;
}

export const useFileStore = defineStore('fileStore', {
  state: (): FileState => ({
    files: [],
    loading: false,
    error: null,
    fetched: false,
  }),

  actions: {
    async fetchFiles() {
      if (this.fetched) return;

      const { request } = useApi();

      this.loading = true;
      this.error = null;

      try {
        const res = await request('/api/file/get');
        this.files = res.data;
        this.fetched = true;
      } catch (err) {
        this.error = 'Failed to fetch files';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    reset() {
      this.files = [];
      this.fetched = false;
      this.error = null;
    },
  },
});

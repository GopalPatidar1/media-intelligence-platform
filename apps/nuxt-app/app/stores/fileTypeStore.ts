import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';

export type FileType = 'image' | 'video' | 'document' | 'audio';

export interface FileItem {
  uid: string;
  fileName: string;
  size: number;
  createdAt: string;
  status: string;
  fileType: FileType;
  fileUrl?: string;
}

export const useFileTypeStore = defineStore('fileTypeStore', {
  state: () => ({
    filesMap: {} as Record<FileType, FileItem[]>,
    fetchedTypes: {} as Record<FileType, boolean>,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getFilesByType: (state) => {
      return (type: FileType) => state.filesMap[type] || [];
    },
  },

  actions: {
    async fetchFiles(
      type: FileType,
      searchText: string = '',
      force: boolean = false
    ) {
      if (this.fetchedTypes[type] && !force) return;

      const { request } = useApi();

      this.loading = true;
      this.error = null;

      try {
        const query = searchText ? { where: { fileName: searchText } } : {};

        const res = await request('/api/file/get', {
          params: {
            type,
            ...query,
          },
        });

        this.filesMap[type] = res.data;
        this.fetchedTypes[type] = true;
      } catch (err) {
        this.error = 'Failed to load files';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async deleteFile(type: FileType, uid: string) {
      const { request } = useApi();

      try {
        await request(`/api/file/${uid}`, { method: 'DELETE' });

        if (this.filesMap[type]) {
          this.filesMap[type] = this.filesMap[type].filter(
            (item) => item.uid !== uid
          );
        }
      } catch (err) {
        this.error = 'Failed to delete file';
        console.error(err);
      }
    },

    resetType(type: FileType) {
      this.filesMap[type] = [];
      this.fetchedTypes[type] = false;
    },

    resetAll() {
      this.$reset();
    },
  },
});

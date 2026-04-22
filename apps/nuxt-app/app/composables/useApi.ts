export const useApi = () => {
  const token = "my-temp-token";

  const request = async (url: string, options: any = {}) => {
    return await $fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  };

  return { request };
};

export default useApi;

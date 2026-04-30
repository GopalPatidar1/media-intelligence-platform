// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: true,
  alias: {
    config: '/app/server/config/index',
  },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'login-card': '#1E293B',
            'button-custom': '#164E63',
            'button-hover': '#133e4e'
          }
        }
      }
    }
  }
})
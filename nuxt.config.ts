// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //ssr: false,
  //target: "static",

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],  
  //css: [ "bootstrap/dist/css/bootstrap.min.css"],
  css: ["~/assets/css.css",],
  vite: {
    define: {
      "process.env.DEBUG": false,
    }
  }
})
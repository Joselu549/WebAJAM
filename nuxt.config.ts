// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "tailwind.config.js", // Asegúrate de que este archivo exista.
  },
};

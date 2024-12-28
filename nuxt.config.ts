// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: false },
    modules: ["shadcn-nuxt", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
    colorMode: {
        preference: "system",
        fallback: "dark",
        classSuffix: "",
    },
});

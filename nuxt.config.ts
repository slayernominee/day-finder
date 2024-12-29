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
    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            title: "Day Finder",
            meta: [
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "description", content: "Find a day where everyone has time from your friend group" },
            ],
        },
    },
});

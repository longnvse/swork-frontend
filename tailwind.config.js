/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        screens: {
            xs: "640px",
            sm: "768px",
            md: "900px",
            lg: "1200px",
            xl: "1368px",
            main: "1440px",
        },
        colors: {
            ...colors,
            primary: "#57AAE5FF",
        },
        fontSize: {
            "12/20": ["12px", { lineHeight: "20px" }],
            "14/22": ["14px", { lineHeight: "22px" }],
            "16/26": ["16px", { lineHeight: "26px" }],
            "20/30": ["20px", { lineHeight: "30px" }],
            "24/36": ["24px", { lineHeight: "36px" }],
            "32/48": ["32px", { lineHeight: "48px" }],
            "48/68": ["48px", { lineHeight: "68px" }],
        },
        fontFamily: {
            primary: ["Roboto"],
            secondary: ["Source Sans Pro"],
        },

        extend: {},
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};

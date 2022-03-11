module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,css,ts}"],
  theme: {
    extend: {
      fontSize: {
        "responsive-xl": "10vw",
        "responsive-lg": "2.5vw",
        "responsive-md": "1.25vw",
        "responsive-sm": "1vw",
      },
      fontFamily: {
        digital: ["digital"],
      },
      height: {
        fit: "fit-content",
      },
      backgroundImage: {
        "main-light": "url('assets/bg-main.svg')",
        "main-dark": "url('assets/subtle-prism-dark.svg')",
      },
      backgroundRepeat: {
        "no-repeat": "no-repeat",
      },
      backgroundSize: {
        cover: "100%",
      },
      colors: {
        primary: "#CB887E",
        secondary: "#ddbea9",
        dark_primary: "#000022",
        dark_secondary: "#002163",
        dark_third: "rgba(0, 33, 100 ,0.5)",
      },
      backgroundColor: {
        primary: "#CB887E",
        secondary: "#ddbea9",
        dark_primary: "#000022",
        dark_secondary: "#002163",
        dark_third: "rgba(0, 33, 100 ,0.5)",
      },
      borderColor: {
        primary: "#CB887E",
        secondary: "#ddbea9",
        dark_primary: "#000022",
        dark_secondary: "#002163",
        dark_third: "rgba(0, 33, 100 ,0.5)",
      },
    },
  },
  plugins: [],
  purge: {
    content: ["./src/**/*.{html,ts}"],
  },
};
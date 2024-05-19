/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
         colors: {
        err: "#F56767",
        green: "#56CC5B",
        blue_light: "#2684FFCC",
        icon: "rgba(227, 239, 255, 0.7)",
        text_FF:"#EEEE",  
        blurBg: "rgba(0, 0, 0, 0.08)",
        gray:"red",
        mainColor: "#023E8ACC",
        secondMainColor: "#025E8AB1",
        bg_mainLayout: "#E9EDF7",
        borderMainColor: "#F4F7FE",
        whiteColor_FFF: "#FFFFFF",
        textGray: "#9CA3AFB2",
        textColor__2: "rgba(78, 85, 86, 1)",
      },
        fontSize: {
        size__14: "14px",
        size__20: "20px",
        size_24: "24px",
        size_22: "22px",
        size_30: "30px",
        size_34: "34px",
        size_32: "32px",
        size_26: "26px",
        size_28: "28px",
        size_36: "36px",
        "3xs": "8px",
        "2xs": "10px",
        size_16: "16px",
        size_10: "10px",
        size_18: "18px",
        size_8: "8px",
        size_12: "12px",
      },
          fontFamily: {
        cairo: ['"Cairo"', "sans-serif"],
      },
      backgroundImage: {
        HomePageBgImage: "url('../src/assets/Pattern.png')",
      }
    },
  },
    plugins: [
     require("tailwindcss"),
    require("autoprefixer"),
    require("tailwind-scrollbar"),
  ]
}
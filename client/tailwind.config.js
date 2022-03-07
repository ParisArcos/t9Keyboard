module.exports = {
  content: ["./public/index.html", "./src/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        scale: {
          "0%, 100%": { transform: "scale(.90)" },
          "50%": { transform: "scale(1.10)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        scale: "scale 200ms ease-in-out",
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelPink: "#FFDDCC",
        pastelMint: "#CCFFDD",
        pastelBlue: "#CCE7FF",
        pastelYellow: "#FFEBCC",
        pastelPurple: "#E6CCFF",
      },
      fontFamily: {
        sans: ['"Nanum Gothic"', 'sans-serif'],
        jua: ['"Jua"', 'sans-serif'],
        sixtyfour: ['"Sixtyfour Convergence"', 'sans-serif'],
        
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

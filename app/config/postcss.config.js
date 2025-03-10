module.exports = {
  plugins: {
    "postcss-import": {
      skipDuplicates: true,
    },
    cssnano: {
      autoprefixer: {
        grid: "autoplace",
        browsers: ["Safari >= 7", "ie >= 11", "iOS >= 9"],
        add: true,
      },
      discardComments: { removeAll: true },
      zindex: false,
    },
    autoprefixer: require("autoprefixer"),
  },
};

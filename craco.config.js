module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: false,
        },
      },
    },
  },
};

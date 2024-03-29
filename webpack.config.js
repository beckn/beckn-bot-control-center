module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve("buffer/"),
      os: require.resolve("os-browserify/browser"),
      stream: false,
      crypto: false,
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
      assert: require.resolve("assert/"),
      https: require.resolve("https-browserify")
    }
  }
};

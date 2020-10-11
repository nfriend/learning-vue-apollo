module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/learning-vue-apollo/' : '/',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          use: 'graphql-tag/loader',
        },
      ],
    },
  },
};

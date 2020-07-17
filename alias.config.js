const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@': resolve('src'),
      // 'assets': resolve('src/assets'),
      // 'common': resolve('src/common'),
      // 'network': resolve('src/network'),
      // 'components': resolve('src/components'),
      // 'views': resolve('src/views')
    }
  }
}
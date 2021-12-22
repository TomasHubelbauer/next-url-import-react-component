module.exports = {
  reactStrictMode: true,
  experimental: {
    urlImports: ['http://localhost:3001'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.jsx/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    })

    return config
  },
}

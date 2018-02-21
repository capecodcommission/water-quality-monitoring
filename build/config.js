'use strict'
const pkg = require('../package')

module.exports = {
  title: 'Water Quality Monitoring',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 4000
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  
  publicPath: '/' // DO NOT SET TO /wq UNTIL JUST BEFORE BUILDING. RESET TO '/' WHILE DEVELOPING 
  
}

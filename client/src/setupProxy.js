const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

  app.use(
    createProxyMiddleware("/service/price", {
      target: "http://www.kamis.or.kr:80",
      changeOrigin: true,
    })
  );
  
};
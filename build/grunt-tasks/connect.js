module.exports = function(grunt, data){

  return {
    server:
    {
      options:
      {
        port: 9000,
        hostname: 'localhost',

        middleware: function(connect, options, middlewares)
        {
          // allow cross origin access
          middlewares.unshift(function(req, res, next)
          {
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            next();
          });

          return middlewares;
        }
      }
    }
  };
}

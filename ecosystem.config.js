module.exports = {
    apps: [
      {
        name: "Studio Server API",
        script: "server.js",
        watch: false,
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  }
  

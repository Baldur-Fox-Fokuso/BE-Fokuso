module.exports = {
  apps : [{
    name   : "BE-Fokuso",
    script : "/home/ubuntu/BE-Fokuso/app.js",
    env: {
      NODE_ENV: "production",
      PORT: 80,
      MONGO_URI: "mongodb+srv://coba:CRtyxRgeDXD7zeYS@coba-mongodb.zlsxjiu.mongodb.net/?retryWrites=true&w=majority",
      JWT_SECRET: "rahasia"
    }
  }]
}

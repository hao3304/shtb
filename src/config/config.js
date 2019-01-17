// default config
module.exports = {
  workers: 1,
  errnoField: "code", // errno field
  errmsgField: "message", // errmsg field
  jwt: {
    secret: "jack-password",
    cookie: "X-AUTH-TOKEN",
    expire: 3600 // 秒
  }
};

const jsonwebtoken = require("jsonwebtoken");
module.exports = {
  authFail() {
    return this.fail("JWT 验证失败");
  },

  checkAuth(target, name, descriptor) {
    const action = descriptor.value;
    descriptor.value = function() {
      console.log(this.ctx.state.user);
      const userName = this.ctx.state.user && this.ctx.state.user.name;
      if (!userName) {
        return this.authFail();
      }
      this.updateAuth(userName);
      return action.apply(this, arguments);
    };
    return descriptor;
  },

  updateAuth(userName) {
    const userInfo = {
      name: userName
    };
    const { secret, cookie, expire } = this.config("jwt");
    const token = jsonwebtoken.sign(userInfo, secret, { expiresIn: expire });
    this.cookie(cookie, token);
    return token;
  }
};

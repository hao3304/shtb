const BaseRest = require("../rest.js");
const { checkAuth } = think.Controller.prototype;
module.exports = class extends BaseRest {
  @checkAuth
  async getAction() {
    const list = await this.modelInstance.countSelect();
    return this.success(list);
  }
};

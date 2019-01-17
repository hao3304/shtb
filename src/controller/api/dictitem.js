const BaseRest = require("../rest.js");

module.exports = class extends BaseRest {
  async getAction() {
    const code = this.get("code");
    const list = await this.model("dictitem")
      .where({ code: code })
      .countSelect();
    this.success(list);
  }
};

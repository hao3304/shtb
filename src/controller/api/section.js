const BaseRest = require("../rest.js");

module.exports = class extends BaseRest {
  async getAction() {
    const project = this.get("project");
    const list = await this.model("section")
      .where({ project: project })
      .countSelect();
    this.success(list);
  }
};

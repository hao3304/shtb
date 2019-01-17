const Base = require("../base.js");

module.exports = class extends Base {
  async indexAction() {
    const stages = await this.model("stage")
      .field("id,name,code,value")
      .select();

    const users = await this.model("user")
      .where({ admin: 0 })
      .field("id,name")
      .select();

    const dicts = await this.model("dict").select();

    for (let i in dicts) {
      const dict = dicts[i];
      const items = await this.model("dictitem")
        .where({ code: dict.code })
        .select();
      dict.values = items;
    }

    this.success({
      me: this.ctx.state.user,
      stages: stages,
      users: users,
      dicts: dicts
    });
  }
};

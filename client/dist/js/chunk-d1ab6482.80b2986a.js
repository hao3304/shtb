(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-d1ab6482"],
  {
    "38f4": function(e, t, a) {
      "use strict";
      a.r(t);
      var n = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t;
          return a(
            "div",
            { staticClass: "page-role" },
            [
              a("x-wrapper", {
                ref: "wrapper",
                attrs: {
                  title: "阶段",
                  service: "stage",
                  columns: e.columns,
                  model: e.model,
                  rules: e.rules,
                  filter: e.filter,
                  loads: !0
                },
                scopedSlots: e._u([
                  {
                    key: "dialog",
                    fn: function(t) {
                      var n = t.model;
                      return a(
                        "div",
                        {},
                        [
                          a(
                            "FormItem",
                            {
                              attrs: { label: e.stageModel.code, prop: "code" }
                            },
                            [
                              a("Input", {
                                attrs: {
                                  placeholder: "请输入" + e.stageModel.code
                                },
                                model: {
                                  value: n.code,
                                  callback: function(t) {
                                    e.$set(n, "code", t);
                                  },
                                  expression: "model.code"
                                }
                              })
                            ],
                            1
                          ),
                          a(
                            "FormItem",
                            {
                              attrs: { label: e.stageModel.name, prop: "name" }
                            },
                            [
                              a("Input", {
                                attrs: {
                                  placeholder: "请输入" + e.stageModel.name
                                },
                                model: {
                                  value: n.name,
                                  callback: function(t) {
                                    e.$set(n, "name", t);
                                  },
                                  expression: "model.name"
                                }
                              })
                            ],
                            1
                          ),
                          a(
                            "FormItem",
                            {
                              attrs: {
                                label: e.stageModel.value,
                                prop: "value"
                              }
                            },
                            [
                              a("InputNumber", {
                                staticStyle: { width: "100%" },
                                attrs: {
                                  placeholder: "请输入" + e.stageModel.value
                                },
                                model: {
                                  value: n.value,
                                  callback: function(t) {
                                    e.$set(n, "value", t);
                                  },
                                  expression: "model.value"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      );
                    }
                  }
                ])
              })
            ],
            1
          );
        },
        r = [],
        l = a("be94"),
        o = (a("7f7f"), a("797d")),
        i = (a("a026"), a("2f62")),
        c = o["a"].stageModel,
        d = o["a"].newStage,
        s = {
          data: function() {
            var e = this;
            return {
              stageModel: c,
              columns: [
                { width: 40, align: "center", type: "selection" },
                { title: c.code, width: 100, key: "code" },
                { title: c.name, width: 250, key: "name" },
                { title: c.value, minWidth: 150, key: "value" },
                {
                  title: "创建时间",
                  width: 150,
                  key: "created",
                  render: function(e, t) {
                    var a = t.row;
                    return e(
                      "div",
                      a.created ? new Date(a.created).Format("yyyy-MM-dd") : "-"
                    );
                  }
                },
                {
                  title: "操作",
                  width: 120,
                  fixed: "right",
                  align: "center",
                  render: function(t, a) {
                    var n = a.row;
                    return t("div", [
                      t(
                        "iconButton",
                        {
                          props: {
                            icon: "iconfont icon-bianji",
                            type: "primary",
                            tooltip: null,
                            placement: "left"
                          },
                          style: { marginRight: "8px" },
                          on: {
                            click: function() {
                              return e.$refs.wrapper.onEdit(n);
                            }
                          }
                        },
                        "编辑"
                      ),
                      t(
                        "iconButton",
                        {
                          props: {
                            type: "error",
                            icon: "iconfont icon-shanchu",
                            tooltip: null,
                            placement: "right"
                          },
                          on: {
                            click: function() {
                              return e.$refs.wrapper.onDelete(
                                n.id,
                                "确定要删除角色【".concat(n.name, "】吗？")
                              );
                            }
                          }
                        },
                        "删除"
                      )
                    ]);
                  }
                }
              ],
              rules: {
                name: [{ required: !0, message: "必填", trigger: "blur" }],
                code: [{ required: !0, message: "必填", trigger: "blur" }],
                value: [
                  {
                    required: !0,
                    type: "number",
                    message: "必填",
                    trigger: "blur"
                  }
                ]
              },
              filter: [
                {
                  type: "input",
                  name: c.name,
                  field: "name",
                  placeholder: "请输入名称模糊查询"
                }
              ],
              total: 0,
              model: d
            };
          },
          computed: Object(l["a"])({}, Object(i["d"])(["windowHeight"])),
          methods: {}
        },
        u = s,
        p = (a("86f2"), a("2877")),
        m = Object(p["a"])(u, n, r, !1, null, null, null);
      m.options.__file = "stage.vue";
      t["default"] = m.exports;
    },
    "838d": function(e, t, a) {},
    "86f2": function(e, t, a) {
      "use strict";
      var n = a("838d"),
        r = a.n(n);
      r.a;
    }
  }
]);
//# sourceMappingURL=chunk-d1ab6482.80b2986a.js.map

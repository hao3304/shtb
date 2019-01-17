(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-2ee0dfd2"],
  {
    "3b38": function(t, e, i) {},
    "51c5": function(t, e, i) {
      "use strict";
      i.r(e);
      var n = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            { staticClass: "my-project" },
            [
              i("Spin", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.loading,
                    expression: "loading"
                  }
                ],
                attrs: { fix: "" }
              }),
              i(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !t.selectId,
                      expression: "!selectId"
                    }
                  ],
                  staticClass: "my-project__header"
                },
                [
                  t._v("\n    共有 "),
                  i("span", [t._v(t._s(t.list.length))]),
                  t._v(" 个负责项目\n  ")
                ]
              ),
              i(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !t.selectId,
                      expression: "!selectId"
                    }
                  ],
                  staticClass: "my-project__content"
                },
                t._l(t.list, function(e) {
                  return i(
                    "div",
                    {
                      key: e.id,
                      staticClass: "my-project-list",
                      on: {
                        click: function(i) {
                          t.onSelect(e);
                        }
                      }
                    },
                    [
                      i("div", { staticClass: "my-project-list__item" }, [
                        i("div", { staticClass: "item__content" }, [
                          i("h5", [t._v(t._s(e.name))])
                        ]),
                        i("div", { staticClass: "item__shadow" })
                      ])
                    ]
                  );
                })
              ),
              t.selectId
                ? i("project-detail", {
                    attrs: { id: t.selectId },
                    on: { back: t.onBack }
                  })
                : t._e()
            ],
            1
          );
        },
        s = [],
        c = i("780a"),
        o = {
          project: function(t) {
            return c["c"].get("/user/project", { params: t });
          },
          score: function(t) {
            return c["c"].post("/user/project/score", t);
          }
        },
        a = function() {
          var t = this,
            e = t.$createElement,
            i = t._self._c || e;
          return i(
            "div",
            { staticClass: "project-detail" },
            [
              i("Spin", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.loading,
                    expression: "loading"
                  }
                ],
                attrs: { fix: "" }
              }),
              i(
                "div",
                { staticClass: "project-detail__header" },
                [
                  t._v("\n    " + t._s(t.project.name) + "\n    "),
                  i(
                    "Button",
                    {
                      staticStyle: { float: "right" },
                      attrs: { icon: "ios-arrow-back", type: "primary" },
                      on: { click: t.onBack }
                    },
                    [t._v("返回")]
                  )
                ],
                1
              ),
              i("Divider"),
              t.project.id
                ? i(
                    "div",
                    { staticClass: "project-detail__content" },
                    [
                      i("table", { staticClass: "detail-table" }, [
                        i("tr", [
                          i("td", { staticClass: "name" }, [
                            t._v("项目编号：")
                          ]),
                          i("td", [t._v(t._s(t.project.no))]),
                          i("td", { staticClass: "name" }, [
                            t._v("设计阶段：")
                          ]),
                          i("td", [t._v(t._s(t.project.stage))]),
                          i("td", { staticClass: "name" }, [t._v("负责人：")]),
                          i("td", [t._v(t._s(t.project.user))]),
                          i("td", { staticClass: "name" }, [t._v("时间段：")]),
                          i("td", [t._v(t._s(t.project.time))])
                        ]),
                        i("tr", [
                          i("td", { staticClass: "name" }, [t._v("深度：")]),
                          i("td", [t._v(t._s(t.project.deep))]),
                          i("td", { staticClass: "name" }, [
                            t._v("设计量系数：")
                          ]),
                          i("td", [t._v(t._s(t.project.design_num))]),
                          i("td", { staticClass: "name" }, [
                            t._v("工作量系数")
                          ]),
                          i("td"),
                          i("td", { attrs: { colspan: "2" } })
                        ])
                      ]),
                      i(
                        "Alert",
                        {
                          staticStyle: { "margin-top": "15px" },
                          attrs: { "show-icon": "" }
                        },
                        [t._v("请认真填写项目报表。")]
                      ),
                      i(
                        "table",
                        { staticClass: "project-table" },
                        [
                          i(
                            "tr",
                            [
                              i("th", { staticStyle: { width: "100px" } }),
                              t._l(t.project.sections, function(e) {
                                return i("th", { key: e.id }, [
                                  t._v(
                                    "\n          " + t._s(e.name) + "\n        "
                                  )
                                ]);
                              }),
                              i("th", [t._v("合计")]),
                              i("th", { staticStyle: { width: "80px" } }, [
                                t._v("负责人系数")
                              ]),
                              i("th", { staticStyle: { width: "100px" } }, [
                                t._v("最终")
                              ])
                            ],
                            2
                          ),
                          i(
                            "tr",
                            [
                              i("td", { staticClass: "name" }, [
                                t._v("评价百分比")
                              ]),
                              t._l(t.project.sections, function(e) {
                                return i(
                                  "td",
                                  { key: e.id, staticClass: "name" },
                                  [
                                    t._v(
                                      "\n          " +
                                        t._s(e.value) +
                                        "%\n        "
                                    )
                                  ]
                                );
                              }),
                              i("td"),
                              i("td"),
                              i("td")
                            ],
                            2
                          ),
                          t._l(t.users, function(e) {
                            return i(
                              "tr",
                              { key: e.id },
                              [
                                i("td", [t._v("【" + t._s(e.name) + "】")]),
                                t._l(t.project.sections, function(n) {
                                  return i(
                                    "td",
                                    {
                                      key: n.id,
                                      staticStyle: { "text-align": "center" }
                                    },
                                    [
                                      i("InputNumber", {
                                        staticStyle: { width: "100px" },
                                        attrs: {
                                          size: "small",
                                          min: 0,
                                          max: 100,
                                          placeholder: "请输入"
                                        },
                                        model: {
                                          value: t.model[e.id][n.id],
                                          callback: function(i) {
                                            t.$set(t.model[e.id], n.id, i);
                                          },
                                          expression:
                                            "model[user.id][section.id]"
                                        }
                                      }),
                                      t._v("\n          %\n        ")
                                    ],
                                    1
                                  );
                                }),
                                i("td", [
                                  t._v(t._s(t.getUserCount(e.id)) + " %")
                                ]),
                                i("td", [t._v(t._s(t.getNumber(e.id)))]),
                                i(
                                  "td",
                                  {
                                    staticStyle: {
                                      "font-weight": "bold",
                                      color: "#4d8dee"
                                    }
                                  },
                                  [
                                    t._v(
                                      "\n          " +
                                        t._s(t.getTotal(e.id)) +
                                        " %\n        "
                                    )
                                  ]
                                )
                              ],
                              2
                            );
                          }),
                          i(
                            "tr",
                            [
                              i("td", { staticClass: "name" }, [t._v("合计")]),
                              t._l(t.project.sections, function(e) {
                                return i(
                                  "td",
                                  {
                                    key: e.id,
                                    staticStyle: { "text-align": "center" }
                                  },
                                  [
                                    t._v(
                                      "\n          " +
                                        t._s(t.getSectionCount(e.id)) +
                                        " %\n        "
                                    )
                                  ]
                                );
                              }),
                              i("td"),
                              i("td"),
                              i("td")
                            ],
                            2
                          )
                        ],
                        2
                      ),
                      i(
                        "div",
                        { staticStyle: { "text-align": "right" } },
                        [
                          i(
                            "Button",
                            {
                              staticStyle: {
                                "margin-top": "20px",
                                width: "200px"
                              },
                              attrs: { size: "large", type: "success" },
                              on: { click: t.onSubmit }
                            },
                            [t._v("提交")]
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                : t._e()
            ],
            1
          );
        },
        r = [],
        d = (i("ac6a"), i("be94")),
        l = i("2f62"),
        u = {
          props: ["id"],
          name: "ProjectDetail",
          data: function() {
            return { project: { sections: [] }, loading: !0, model: {} };
          },
          computed: Object(d["a"])({}, Object(l["d"])("common", ["users"])),
          methods: {
            render: function() {
              var t = this;
              (this.loading = !0),
                o.project({ id: this.id }).then(function(e) {
                  t.initModel(e),
                    t.$nextTick(function() {
                      (t.project = e), (t.loading = !1);
                    });
                });
            },
            initModel: function(t) {
              var e = this;
              this.users.forEach(function(i) {
                e.$set(e.model, i.id, {}),
                  t.sections.forEach(function(t) {
                    e.$set(e.model[i.id], t.id, 0);
                  });
              });
            },
            getSectionCount: function(t) {
              var e = this;
              if (this.project.id) {
                var i = 0;
                return (
                  this.users.forEach(function(n) {
                    i += e.model[n.id][t];
                  }),
                  i.toFixed(1)
                );
              }
              return "-";
            },
            getUserCount: function(t) {
              var e = this,
                i = 0;
              return (
                this.project.sections.forEach(function(n) {
                  i += e.model[t][n.id];
                }),
                i.toFixed(1)
              );
            },
            getNumber: function(t) {
              return this.project.user == t ? 1.2 : 1;
            },
            getTotal: function(t) {
              var e = this.getUserCount(t) * this.getNumber(t);
              return e.toFixed(1);
            },
            onBack: function() {
              this.$emit("back");
            },
            onSubmit: function() {
              var t = this;
              this.$Modal.confirm({
                title: "提示",
                content: "确定提交当前填报内容吗？",
                onOk: function() {
                  var e = { project: t.id, data: [] };
                  t.users.forEach(function(i) {
                    t.project.sections.forEach(function(n) {
                      e.data.push({
                        user: i.id,
                        section: n.id,
                        value: t.model[i.id][n.id]
                      });
                    });
                  }),
                    (t.loading = !0),
                    o.score(e).then(function(e) {
                      (t.loading = !1), t.$Message.success("操作成功！");
                    });
                }
              });
            }
          },
          mounted: function() {
            this.render();
          }
        },
        _ = u,
        v = (i("9e69"), i("2877")),
        p = Object(v["a"])(_, a, r, !1, null, null, null);
      p.options.__file = "ProjectDetail.vue";
      var m = p.exports,
        h = {
          name: "MyProject",
          components: { ProjectDetail: m },
          data: function() {
            return { list: [], selectId: null, loading: !0 };
          },
          methods: {
            render: function() {
              var t = this;
              (this.loading = !0),
                o.project().then(function(e) {
                  (t.list = e), (t.loading = !1);
                });
            },
            onSelect: function(t) {
              this.selectId = t.id;
            },
            onBack: function() {
              this.selectId = null;
            }
          },
          mounted: function() {
            this.render();
          }
        },
        f = h,
        j = (i("c82e"), Object(v["a"])(f, n, s, !1, null, null, null));
      j.options.__file = "MyProject.vue";
      e["default"] = j.exports;
    },
    "9bcb": function(t, e, i) {},
    "9e69": function(t, e, i) {
      "use strict";
      var n = i("3b38"),
        s = i.n(n);
      s.a;
    },
    c82e: function(t, e, i) {
      "use strict";
      var n = i("9bcb"),
        s = i.n(n);
      s.a;
    }
  }
]);
//# sourceMappingURL=chunk-2ee0dfd2.d39f63bd.js.map

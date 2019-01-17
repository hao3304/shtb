import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["windowHeight", "windowWidth"])
  },
  methods: {
  },
  mounted() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.busRun) {
        this.busRun.call(this);
      }
    }, 30000);
  }
};

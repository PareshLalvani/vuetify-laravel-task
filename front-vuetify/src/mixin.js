import Vue from "vue";
export const EventBus = new Vue();

Vue.mixin({
  data() {
    return {
      button_loading: false,
    };
  },

  created() {
    if (this.$store) {
      this.axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.authToken;
    }
  },
  methods: {},

  filters: {}
});

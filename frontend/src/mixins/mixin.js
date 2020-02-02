import Vue from "vue";
import { Validator } from "vee-validate";
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
  methods: {
    setValidationMessage() {
      let dict = {
        custom: {
          email: {
            required: this.$t("validations.enter_email"),
            email: this.$t("validations.enter_valid_email")
          },
          password: {
            required: this.$t("validations.enter_password"),
            min: this.$t("validations.password_validation")
          },
        }
      };
      Validator.localize("en", dict);
    },
    button_loader(val, container) {
      this.button_loading = val;
      if (val) {
        this.$vs.loading({
          background: "primary",
          color: "#fff",
          container: container,
          scale: 0.45
        });
      } else {
        this.$vs.loading.close(container + " > .con-vs-loading");
      }
    },
    async logout() {
      let response = await this.getHTTPPostResponse("/logout");
      if (response) {
        this.clearUserInfo();
      }
    },
    clearUserInfo() {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      location.href = process.env.BASE_URL;
    },
    showError(e, button_loader = null) {
      button_loader
        ? this.button_loader(false, button_loader)
        : this.$vs.loading.close();
      if (!e.response || !e.response.data || !e.response.data.message) {
        return;
      }
      let error = e.response.data.message;
      this.$vs.notify({
        text: error,
        color: "danger",
        position: "top-right"
      });

      if (e.response.status === 401) {
        setTimeout(() => {
          this.clearUserInfo();
        }, 500);
      }
    },
    async getHTTPPostResponse(
      url,
      input = {},
      button_loader = null,
      success_message = false
    ) {
      if (button_loader) this.button_loader(true, button_loader);
      const data = await this.axios
        .post(url, input)
        .then(response => {
          let data = response.data;
          if (button_loader) this.button_loader(false, button_loader);

          if (success_message) {
            this.$vs.notify({
              text: data.message,
              color: "success",
              position: "top-right"
            });
          }
          return data;
        })
        .catch(e => {
          this.showError(e, button_loader);
          return null;
        });
      return data;
    },
    async getHTTPGetResponse(
      url,
      button_loader = null,
      success_message = false
    ) {
      if (button_loader) this.button_loader(true, button_loader);
      const data = await this.axios
        .get(url)
        .then(response => {
          let data = response.data;
          if (button_loader) this.button_loader(false, button_loader);

          if (success_message) {
            this.$vs.notify({
              text: data.message,
              color: "success",
              position: "top-right"
            });
          }
          return data;
        })
        .catch(e => {
          this.showError(e, button_loader);
          return null;
        });
      return data;
    }
  },

  filters: {}
});

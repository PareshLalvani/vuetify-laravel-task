
<template>
  <div class="h-screen flex w-full bg-img" id="page-login">
    <div class="vx-col sm:w-1/3 m-auto self-center login-page">
      <div class="vx-row m-auto">
      <div class="vx-col w-full">
        <!-- <h1 align="center" class="my-4">Heading</h1> -->
        <div class="vx-row justify-center flex">
          <div class="vx-col w-full">
            <vx-card class="login-card">
              <div class="vx-card__title mb-5">
                <h2 align="center">{{ $t('labels.login') }}</h2>
                <p class="pt-4" align="center">{{ $t('strings.login_account') }}</p>
              </div>
              <form @submit.prevent="checkValidation()" autocomplete="off">
              <div>
                <vs-input
                  name="email"
                  :label="$t('labels.email')"
                  icon-no-border
                  icon="icon icon-user"
                  icon-pack="feather"
                  v-model="email"
                  class="w-full"
                  v-validate="'required|email'"
                />
                <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                <vs-input
                  type="password"
                  name="password"
                  :label="$t('labels.password')"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  v-model="password"
                  class="w-full mt-6"
                  v-validate="'required'"
                 
                />
                <span class="text-danger text-sm">{{ errors.first('password') }}</span>

                <div class="my-5 login-btn" align="center">
                  <vs-button
                    :disabled="button_loading"
                    id="user-login"
                    button="submit"
                    class="vs-component vs-button text-center px-8 md:w-auto md:mt-0 md:mb-0 vs-button-primary vs-button-filled"
                  >{{$t('labels.login_button')}}</vs-button>
                </div>
               <!--  <div class="mb-3 mt-5 forgot-pass" align="center">
                  <router-link :to="{name:'ForgotPassword'}">{{$t('labels.forget_password')}}</router-link>
                </div> -->
              </div>
              </form>
            </vx-card>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      email : '',
      password : ''
    }
  },
  mounted() {
    this.setValidationMessage();
  },
  methods: {
     checkValidation() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login()
        }
      });
    },
    async login() {
      let input = {
        email : this.email,
        password: this.password
      }
      let response = await(this.getHTTPPostResponse('/login',input,"#user-login"));
      if(response) {
        let data = response.data;
        let token = data.token;
        localStorage.setItem("authToken", token);
        this.$store.dispatch("updateAuthToken", token);
        let user = data.user
        let userInfo = {
          name: user.name,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        this.$store.dispatch("updateUser", userInfo);
        this.$router.push({ name: "Dashboard" });
      }
    }
  },
};
</script>
<style scoped>
.vx-card__title h4 {
  font-weight: 600;
}
h2 ~ p {
  color: #000000;
  font-size: 14px;
}
.login-btn button {
  background: rgba(var(--vs-primary), 1) !important;
}
.vs-button-primary.vs-button-filled:hover {
  box-shadow: 0 8px 25px -8px rgba(var(--vs-primary), 1);
}
</style>

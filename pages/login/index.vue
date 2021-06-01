<template>
  <div>
    <div class="auth-page">
      <div class="container page">
        <div class="row">
          <div class="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </h1>
            <p class="text-xs-center">
              <nuxt-link v-if="!isLogin" to="/login"
                >Have an account?</nuxt-link
              >
              <nuxt-link v-else to="/register">Need an account?</nuxt-link>
            </p>

            <ul class="error-messages">
              <template v-for="(item, key) in errors">
                <li v-for="i in item">{{ key }} {{ i }}</li>
              </template>
            </ul>

            <form @submit.prevent="onSubmit">
              <fieldset class="form-group" v-if="!isLogin">
                <input
                  v-model="username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  required
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required
                  minlength="8"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                {{ isLogin ? "Sign in" : "Sign up" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "../../api/users";
const Cookie = process.client ? require('js-cookie') :undefined
export default {
  middleware:'noauth',
  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      //注册用的username
      username: "",
      errors: "",
    };
  },
  methods: {
    onSubmit() {
      let action = null;
      if (this.isLogin) {
        action = login({ user: this.user });
      } else {
        action = register({ user: { ...this.user, username: this.username } });
      }
      action
        .then((res) => {
          this.$store.commit('setUser',res.user)
          Cookie.set('user',res.user)
          this.$router.push('/')
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
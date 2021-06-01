<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="updateSetting">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="formData.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="formData.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="formData.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="formData.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="formData.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button v-if="user" class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser } from "../../api/users";
const Cookie = process.client ? require('js-cookie') :undefined
export default {
  middleware: "auth",
  computed: {
    ...mapState(["user"]),
    formData(){
      return {...this.user,...this.userData}
    }
  },
  data() {
    return {
      userData:{}
    }
  },
  methods: {
    updateSetting() {
      let  {bio,email,image,password,username} = this.formData
      // console.log({bio,email,image,password,username});
      updateUser({bio,email,image,password,username}).then((res)=>{
        this.$store.commit('setUser',res.user)
          Cookie.set('user',res.user)
          this.$router.push('/')
      })
    },

    logout(){
      this.$store.commit('setUser',null)
      Cookie.set('user',null)
      this.$router.push('/')
    }

  },
};
</script>

<style lang="scss" scoped>
</style>
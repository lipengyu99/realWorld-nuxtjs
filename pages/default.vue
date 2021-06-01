<template>
  <div>
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/profile/lpy999">
                <img :src="user.image" class="headimg" />
                {{ user.username }}
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Sign in</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register">Sign up</NuxtLink>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <nuxt-child />
    <footer>
      <div class="container">
        <nuxt-link class="logo-font" to="/">conduit</nuxt-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.headimg {
  width: 26px;
  height: 26px;
  border-radius: 100%;
}
</style>
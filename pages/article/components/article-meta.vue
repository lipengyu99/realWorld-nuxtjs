<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | dateFormat }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following,
      }"
      @click="onclickfollowing(article)"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ followText }}
      <!-- <span class="counter">(10)</span> -->
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited,
      }"
      @click="onclickfavorited(article)"
    >
      <!-- <i class="ion-heart"></i> -->
      &nbsp;
      {{ favoritedText }}
      <!-- <span v-if="user" class="counter">({{ article.favoritesCount }})</span> -->
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticle } from "../../../api/articles";
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(["user"]),
    followText() {
      return this.user ? "Edit Article" : `Follow ${article.author.username}`;
    },
    //  Delete Article
    favoritedText() {
      return this.user ? "Delete Article" : "Favorite Post";
    },
  },
  methods: {
    onclickfollowing(article) {
      if (!this.user) {
        this.$router.push("/register");
      }else{
        this.$router.push(`/editor/${article.slug}`)
      }
    },
    onclickfavorited(article){
      if (!this.user) {
        this.$router.push('register')
      }else{
        //删除文章跳转首页
        deleteArticle(article.slug).then((res)=>{
          this.$router.push('/')
        })
      }
    }
  },
};
</script>

<style>
</style>

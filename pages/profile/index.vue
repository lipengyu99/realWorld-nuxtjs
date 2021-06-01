<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{ user.username }}</h4>
            <p>
              {{ user.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="onClickSetting">
              <i class="ion-plus-round"></i>
              &nbsp;  Edit Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <!-- <a class="nav-link active" href="">My Articles</a> -->
                <nuxt-link
                  class="nav-link"
                  :to="{
                    path: `/profile/${user.username}`,
                    query: { tab: 'my_article' },
                  }"
                  exact
                  :class="{ active: tab === 'my_article' }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <!-- <a class="nav-link" href="">Favorited Articles</a> -->
                <nuxt-link
                  class="nav-link"
                  :to="{
                    path: `/profile/${user.username}`,
                    query: { tab: 'favorited_article' },
                  }"
                  exact
                  :class="{ active: tab === 'favorited_article' }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <template v-if="articleData && articleData.articles.length > 0">
            <div
              class="article-preview"
              v-for="article in articleData.articles"
              :key="article.slug"
            >
              <div class="article-meta">
                <nuxt-link :to="`/profile/${article.author.username}`">
                  <img :src="article.author.image" alt="" />
                </nuxt-link>
                <div class="info">
                  <nuxt-link :to="`/profile/${article.author.username}`">
                    {{ article.author.username }}
                  </nuxt-link>
                  <span class="date">{{ article.createdAt | dateFormat }}</span>
                </div>
                <button
                  class="btn btn-outline-primary btn-sm pull-xs-right"
                  :class="{ active: article.favorited }"
                  @click="onFavorite(article)"
                >
                  <i class="ion-heart"></i> {{ article.favoritesCount }}
                </button>
              </div>
              <nuxt-link class="preview-link" :to="`/article/${article.slug}`">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getAllArticles,
  getYourArticles,
  addFavorite,
  deleteFavorite,
} from "../../api/articles";
export default {
  middleware: "auth",
  computed: {
    ...mapState(["user"]),
  },
  watchQuery: ["tab"],
  async asyncData({ store, query }) {
    let page = +query.page;
    let limit = 10;
    let author = store.state.user.username;
    let favorited = store.state.user.username;
    let tab = query.tab || "my_article";
    let myArticlesParams = {
      limit,
      offset: (page - 1) * limit || 0,
      author,
    };
    let favoriteArticleParams = {
      limit,
      offset: (page - 1) * limit || 0,
      favorited,
    };
    let articleData = await getAllArticles(
      tab === "my_article" ? myArticlesParams : favoriteArticleParams
    );
    articleData.articles.forEach((e) => (e.favoriteDisabled = false));
    return {
      page,
      articleData,
      limit,
      tab,
    };
  },
  methods:{
    onClickSetting(){
      this.$router.push('/settings')
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_feed' }"
                  :to="{ path: '/', query: { tab: 'your__feed' } }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tag === undefined && tab === undefined }"
                  to="/"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tag }"
                  :to="{ path: '/', query: { tag: tag, tab: 'tab' } }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>
          <template v-if="articleData&&articleData.articles.length>0">
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
          <template v-else>
            <p>您暂时还没有文章</p>
          </template>
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                v-for="item in totalPage"
                :class="{ active: page === item }"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    path: '/',
                    query: { page: item, tag: $route.query.tag },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list" v-for="item in tagData.tags" :key="item">
              <nuxt-link
                class="tag-pill tag-default"
                :to="{ path: '/', query: { tag: item, page: 1 } }"
                >{{ item }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticles, getYourArticles,addFavorite,deleteFavorite } from "../api/articles";
import { getAlltags } from "../api/tags";
import { mapState } from "vuex";
export default {
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    let page = +query.page;
    let limit = 10;
    let tag = query.tag;
    let tab = query.tab || undefined;
    let action = tab === "your__feed" ? getYourArticles : getAllArticles;
    let [articleData, tagData] = await Promise.all([
      action({
        limit,
        offset: (page - 1) * limit || 0,
        // tag: tag === "your__feed" ? undefined : tag,
        tag
      }),
      getAlltags(),
    ]);
    articleData.articles.forEach((e)=>e.favoriteDisabled=false)
    return {
      page,
      articleData,
      limit,
      tagData,
      tag,
      tab,
    };
  },

  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articleData.articlesCount / this.limit);
    },
  },
  methods:{
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
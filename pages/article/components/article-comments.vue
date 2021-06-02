<template>
  <div>
    <form class="card comment-form" @submit.prevent="onPostComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | dateFormat }}</span>
        <span class="mod-options" v-if="user">
          <i class="ion-trash-a" @click="deleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments,deleteComments } from "../../../api/articles";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      comments: [], // 文章列表，
      comment: { body: "" },
    };
  },
  async mounted() {
    await this.getCommentsContext();
  },
  methods: {
    onPostComment() {
      // console.log("1",this.comment);
      addComments(this.article.slug, this.comment).then((res) => {
        this.getCommentsContext();
        this.comment.body = "";
      });
    },
    async getCommentsContext() {
      const data = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    deleteComment(comment){
      // console.log(comment.id);
      deleteComments(this.article.slug,comment.id).then((res)=>{
        this.getCommentsContext()
      })

    }
  },
};
</script>

<style>
</style>

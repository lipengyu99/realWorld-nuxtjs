<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onClicksub">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onClicksub"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle,getArticle,updateArticle } from "../../api/articles";
export default {
  middleware: "auth",
  data() {
    return {
      tag: "",
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  created(){
    getArticle(this.$route.params.slug).then((res)=>{
      this.article = {...this.article,...res.article}
    })
  },
  methods: {
    onClicksub() {
      this.article.tagList = this.tag.split(",");
      if (this.$route.params.slug) {
        //gengxin
        // TODO:
        // updateArticle(this.article)
      }else{
          addArticle(this.article).then((res) => {
        this.$router.push(`/article/${res.article.slug}`);
      });
      }
    
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
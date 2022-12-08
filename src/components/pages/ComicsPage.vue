<template>
  <SearchPanel
    :searchPlaceholder="placeholderComic"
    :searchName="title"
    v-on:startSearch="comicsSearch"
    v-on:click="openSortPanel"
  />

  <SortPanel :orderArr="orders" v-on:input="comicsSort($event.target.id)" />

  <div class="comics container" :style="{marginTop:comicsTop + 'px'}">
    <button class="back-search-btn" v-on:click="listAfterSearch($event)">
      ←all comics
    </button>
    <div class="comics__list">
      <div class="comics__item" v-for="comic in results" :key="comic.results">
        <router-link v-bind:to="'/marvel/comics/' + comic.id" class="comics__link">
          <div
            class="comics__img-wrp"
            v-if="!comic.thumbnail.path.includes('image_not_available')"
          >
            <img
              v-bind:src="
                comic.thumbnail.path + '.' + comic.thumbnail.extension
              "
              class="comics__img"
            />
          </div>
          <div class="empty__img-wrp" v-else></div>
          <p class="comics__title">{{ comic.title }}</p>
        </router-link>
      </div>
    </div>
    <div class="paginate" v-if="totalResults">
      <PaginatePanel
        :current="currentPage"
        :total="totalResults"
        v-on:changeCurrent="onClickHandler"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchPanel from "@/components/panels/SearchPanel.vue";
import SortPanel from "@/components/panels/SortPanel.vue";
import PaginatePanel from "@/components/panels/PaginatePanel.vue";
export default {
  components: { SortPanel, SearchPanel, PaginatePanel },
  name: "ComicsPage",
  data() {
    return {
      comicsTop:0,
      placeholderComic: "find your comic",
      orders: ["title", "modified", "onsaleDate", "focDate", "issueNumber"],
      results: null,
      error: [],
      page: 1,
      limit: 0,
      currentPage: 1,
      title: "",
      totalResults: 0,
      searchApiURL: "http://gateway.marvel.com/v1/public/comics",
      params: {
        ts: "1",
        apikey: "cbd6c4a9cfa54613edaddcd1d0052bb6",
        hash: "8c1451da577e4cfedd1a687a2c9f8258",
      },
      searchPath: "",
    };
  },
  methods: {
    comicsList() {
      axios
        .get(this.searchApiURL, { params: this.params })
        .then((response) => {
          this.results = response.data.data.results;
          this.totalResults = response.data.data.total;
          this.limit = response.data.data.limit;
        })
        .catch((e) => {
          this.error.push(e);
        });
    },
    comicsSearch(title) {
      this.title = title;
      if (this.title) {
        if (!isNaN(this.title) && this.title.length > 2) {
          this.searchPath = this.searchApiURL + "/" + this.title;
        } else {
          this.searchPath = this.searchApiURL;
          let str = this.title.split("(");
          if (this.title.includes("#")) {
            let str1 = this.title.split("#").pop().split(" ")[0];
            if (str1) this.params.issueNumber = str1.trim();
          }
          this.title = str[0].trim();
          this.params.titleStartsWith = this.title;
        }
        this.searchApiURL = this.searchPath;
        this.comicsList();
        this.title = "";
        document.querySelector('.back-search-btn').style.display='flex';   
      }
    },
    listAfterSearch(event){
      delete this.params.titleStartsWith; 
      this.searchApiURL='http://gateway.marvel.com/v1/public/comics'; 
      this.comicsList(); 
      document.querySelector('.search-form__input').value='';
      event.target.style.display='none';
    },
    
    openSortPanel() {
      let brg = document.querySelector(".search-form__burger-svg");
      let sortPanel = document.querySelector(".order-panel");
      

      if (sortPanel.classList.contains("active")) {
        brg.style.transform = "rotate(0deg)";
        sortPanel.classList.remove("active");
        this.updateComicsTop();
      } else {
        brg.style.transform = "rotate(180deg)";
        sortPanel.classList.add("active");
        this.comicsTop='0';
      }
    },
    comicsSort(sortParam) {
      this.params.orderBy = sortParam;
      this.comicsList();
    },
    onClickHandler(page) {
      this.page = page;
      this.params.offset = (page - 1) * this.limit;
      this.comicsList();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    updateComicsTop(){
      let sortPanel = document.querySelector(".order-panel");
      this.comicsTop=-(sortPanel.offsetHeight)+64;
    }
  },
  mounted() {
    this.comicsList();
    this.updateComicsTop();
  },
  created() {
  window.addEventListener('resize', this.updateComicsTop);
  
},

};
</script>

<style>
@import "../../../public/src/css/comics-list.min.css";
@import "../../../public/src/css/back-search-btn.min.css";
</style>

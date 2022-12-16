<template>
  <MainSlider />
  <SearchPanel
    :searchName="name"
    :searchPlaceholder="placeholderCharacter"
    v-on:startSearch="charactersSearch"
    v-on:click="openSortPanel"
  />
  <SortPanel :orderArr="orders" v-on:input="charactersSort($event.target.id)" />
  <div class="characters container " :style="{marginTop:charactersTop + 'px'}">
    <button class="back-search-btn" v-on:click="listAfterSearch($event)">
      ←all characters
    </button>
    <div class="characters__list">
      <div
        class="characters__item"
        v-for="character in results"
        :key="character.results"
      >
        <router-link v-bind:to="'/marvel/' + character.id" class="characters__link">
          <div
            class="characters__img-wrp"
            v-if="!character.thumbnail.path.includes('image_not_available')"
          >
            <img
              v-bind:src="
                character.thumbnail.path + '.' + character.thumbnail.extension
              "
              class="characters__img"
            />
          </div>
          <div class="characters__img-wrp" v-else>
            <img src="src/img/no_image.webp" class="characters__img" />
          </div>
          <div class="characters__name-wrp">
            <p class="characters__name">{{ character.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-if="totalResults > limit" class="paginate">
      <PaginatePanel
        :current="currentPage"
        :total="totalResults"
        v-on:changeCurrent="onClickHandler"
      />
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SearchPanel from "@/components/panels/SearchPanel.vue";
import SortPanel from "@/components/panels/SortPanel.vue";
import PaginatePanel from "@/components/panels/PaginatePanel.vue";
import MainSlider from "@/components/slider/MainSlider.vue";
export default {
  components: {
    MainSlider,
    SortPanel,
    SearchPanel,
    PaginatePanel,
  },
  name: "CharactersPage",
  data() {
    return {
      charactersTop:0,
      placeholderCharacter:"find your character",
      orders: ["name", "modified"],
      results: null,
      error: [],
      page: 1,
      limit: 0,
      currentPage: 1,
      name: "",
      totalResults: 0,
      searchApiURL: "https://gateway.marvel.com/v1/public/characters",
      params: {
        ts: "1",
        apikey: "cbd6c4a9cfa54613edaddcd1d0052bb6",
        hash: "8c1451da577e4cfedd1a687a2c9f8258",
      },
      searchPath: "",
    };
  },
  methods: {
    charactersList() {
      axios
        .get(this.searchApiURL, { params: this.params })
        .then((response) => {
          this.results = response.data.data.results;
          this.totalResults = response.data.data.total;
          this.limit = response.data.data.limit;
        })
        .catch((e) => {
          this.results= null;
          this.totalResults=0;
          this.error.push(e);
        });
    },
    charactersSearch(name) {
      this.name = name;
      this.searchApiURL="https://gateway.marvel.com/v1/public/characters";
      delete this.params.nameStartsWith;
      if (this.name) {
        if (!isNaN(this.name) && this.name.length > 2) {
          this.searchApiURL = this.searchApiURL + "/" + this.name;
        } else {
          this.params.nameStartsWith = this.name;
        }
        this.charactersList();
      }
      this.name = "";
      document.querySelector('.back-search-btn').style.display='flex';
    },
    listAfterSearch(event){
      delete this.params.nameStartsWith;
      this.searchApiURL="https://gateway.marvel.com/v1/public/characters"; 
      this.charactersList();  
      document.querySelector('.search-form__input').value='';
      event.target.style.display='none';
    },
    openSortPanel() {
      let brg = document.querySelector(".search-form__burger-svg");
      let sortPanel = document.querySelector(".order-panel");
      if (sortPanel.classList.contains("active")) {
        brg.style.transform = "rotate(0deg)";
        sortPanel.classList.remove("active");
          this.updateCharactersTop();
      } else {
        brg.style.transform = "rotate(180deg)";
        sortPanel.classList.add("active");
        this.charactersTop='0';
      }
    },
    charactersSort(sortParam) {
      this.params.orderBy = sortParam;
      this.charactersList();
    },
    updateCharactersTop(){
      let sortPanel = document.querySelector(".order-panel");
      if(sortPanel) this.charactersTop=-(sortPanel.offsetHeight)+64;
    },
    onClickHandler(page) {
      this.page = page;
      this.params.offset = (page - 1) * this.limit;
      this.charactersList();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.charactersList();
    this.updateCharactersTop();
  },
};
</script>
<style>
@import "../../../public/src/css/characters-list.min.css";
@import "../../../public/src/css/back-search-btn.min.css";
</style>

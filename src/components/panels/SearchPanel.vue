<template>
  <div class="search">
    <div class="container">
      <div class="search-form">
        <input
          class="search-form__input"
          type="text"
          :placeholder="searchPlaceholder"
          v-model="searchCurName"
          v-on:keydown.enter="curSearch"
        />
        <input
          class="search-form__button"
          type="button"
          value=""
          v-on:click="curSearch"
        />
        <button
          v-on:click="$emit('click', $event)"
          
          class="search-form__burger-btn"
          aria-label="open menu"
        >
          <svg
            class="search-form__burger-svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.94403 9.8959H34.6564"
              stroke-width="2.475"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M28.0537 19.8H4.94403"
              stroke-width="2.475"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M4.94403 29.7041H21.4509"
              stroke-width="2.475"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchPanel',
  props:[
      'searchName',
      'searchPlaceholder'
  ],
  emits: ['click','startSearch'] ,
  data() {
    return {
      searchCurName:this.searchName
    }
  },
  methods: {
    curSearch(){
        this.$emit('startSearch', this.searchCurName);
    }
  }
}
</script>
<style>
@import "../../../public/src/css/search.min.css";
</style>
<template>
  <div class="character">
    <div class="container">
      <div class="character__main">
        <div class="character__main-left">
          <img class="character__img comic__img" v-bind:src="img">
        </div>
        <div class="character__main-right">
          <h3 class="character__name comic__title">
            {{ title }}<br><span>id{{ comicId }}</span>
          </h3>
          <p class="character__description">{{ description }}</p>
          <p v-if="pageCount" class="character__description">Page count:{{ pageCount }}</p>
          <span id="character__anchor"></span>
          <div class="character__buttons-block">
            <p class="character__description">Modified:{{ dateModified }}</p>
            <div v-for="param in availableParams" :key="param.availableParams" class="character__param">
              <button v-if="(param.count)" class="character__count-button" v-on:click="toggleVisible($event)">
                      {{param.name}}:{{param.count }}
              </button>
              <div v-if="!(param.name == 'images')" class="character__count-area" :id="param.name">
                <p  class="character__description" v-for="(title, i) in param.titles" :key="i">{{ title}}
                </p>
              </div>
              <div v-else class="character__count-area" :id="param.name">
                <p  class="character__description" v-for="(title, i) in param.titles" :key="i">>
                  <img  v-bind:src="title.replace(/http/gi, 'https')" alt="" class="character__description-img">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios'
export default {
  name: 'ComicPage',
  data() {
    return {
      comicId:null,
      availableParams:[
        {name:'creators', count:0, titles:[]},
        {name:'characters', count:0, titles:[]},
        {name:'stories', count:0, titles:[]},
        {name:'events', count:0, titles:[]},
        {name:'images', count:0, titles:[]},
      ],
      pageCount:0,
      dateModified: null,
      img: null,
      title: null,
      description:null,
      error: [],
      comicsID: useRoute().params.id,
      apiURL: 'https://gateway.marvel.com/v1/public/comics/' + useRoute().params.id,
      params: {
        ts:'1',
        apikey: 'cbd6c4a9cfa54613edaddcd1d0052bb6',
        hash:'8c1451da577e4cfedd1a687a2c9f8258'
      },
    }
  },
  methods: {
    comicsItem() {
      axios.get(this.apiURL, { params: this.params })
        .then(response => {
          this.img=response.data.data.results[0].thumbnail.path + "."+response.data.data.results[0].thumbnail.extension;
          this.title = response.data.data.results[0].title
          this.description = response.data.data.results[0].description;
          this.comicId = response.data.data.results[0].id;
          this.dateModified = (response.data.data.results[0].modified).split('T')[0];
          this.pageCount = response.data.data.results[0].pageCount;
          for (let j=0; j < this.availableParams.length;j++){
            if (j < this.availableParams.length - 1 )
            {
              this.availableParams[j].count=response.data.data.results[0][this.availableParams[j].name].available;
              for (let i = 0; i < response.data.data.results[0][this.availableParams[j].name].items.length; i++) {       
                this.availableParams[j].titles[i] = response.data.data.results[0][this.availableParams[j].name].items[i].name;
              } 
            }
            else{
              this.availableParams[j].count = response.data.data.results[0][this.availableParams[j].name].length;         
              for (let i = 0; i <  this.availableParams[j].count; i++) {
                this.availableParams[j].titles[i] = response.data.data.results[0][this.availableParams[j].name][i].path + '.' + response.data.data.results[0][this.availableParams[j].name][i].extension;
            }
            }
          }
        })
        .catch(e => {
          this.error.push(e)
        })
      window.scrollTo(0,0);
    },
    toggleVisible(event) {
      const btns = document.querySelectorAll('.character__count-button');
      let visibleOn = false;
      
      if (event.target.nextElementSibling.classList.contains('visible')) { visibleOn = true; }
      btns.forEach((btn) => {
        btn.nextElementSibling.classList.remove('visible');
        btn.classList.remove('active')
      })
      if (visibleOn) {
        event.target.nextElementSibling.classList.remove('visible');
        event.target.classList.remove('active');
        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });

      } else {
        event.target.nextElementSibling.classList.add('visible');
        event.target.classList.add('active');
        document.querySelector('#character__anchor').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
      }
    }
  },
  mounted() {
    this.comicsItem();
  }
}
</script>
<style>
@import "../../../public/src/css/character.min.css"
</style>
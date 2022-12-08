<template>
  <div class="main-slider-wrp">
    <div class="swiper-wrp container">
      <swiper class="main-slider" :modules="modules" :space-between="20" :loop="true" :pagination="{ clickable: true }"
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }">    
        <swiper-slide class="main-slider__slide" v-for="text in swiperTextBase" :key="text.description">
          <div>
            <h1 class="main-slider__title">{{ text.author }}</h1>
            <router-link v-bind:to="'/marvel/' + text.id"  class="main-slider__link">
              about→
            </router-link>
            <img class="main-slider__img" v-bind:src="text.img" alt="image">
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import { ref } from "vue"
export default {
  name: 'SwiperComponent',
  components: { Swiper, SwiperSlide },
  setup() {
    const swiperTextBase = ref([
      
      {
        author: "Agent Brand",
        id:'1011297',
        img: '/marvel/src/img/heroes/brand.webp'
      },
      {
        author: "Black Panther",
        id:'1011130',
        img: '/marvel/src/img/heroes/panter.webp'
      },
      {
        author: "Domino",
        id:'1009277',
        img: '/marvel/src/img/heroes/domino.webp'
        
      },
      {
        author: "Wolverine",
        id:'1017479',
        img: '/marvel/src/img/heroes/wolverin.webp'
      
    }
    ])
    return { modules: [Pagination, Autoplay], swiperTextBase }
  }
}
</script>
<style>
@import "../../../public/src/css/main-slider.min.css" ;
</style>
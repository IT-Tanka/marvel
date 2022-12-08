<template>
  <footer class="footer">
    <div class="footer-wrp container">
      <div class="footer__left">
        <div class="footer__logo">M</div>
        <ComponentMainMenu v-bind:menuItems="mainMenuItems" />
      </div>
      <span class="footer__note">"Data provided by Marvel. © 2014 Marvel"</span>
      <div class="social">
        <h4 class="social__title">FOLLOW MARVEL</h4>
        <div class="social__links">
          <a href="http://facebook.com/marvel" class="sociaa__link"><i class="social__icon icon-facebook"></i></a>
          <a href="http://instagram.com/marvel" class="sociaa__link"><i class="social__icon icon-instagram"></i></a>
          <a href="http://twitter.com/marvel" class="sociaa__link"><i class="social__icon icon-twitter1"></i></a>
          <a href="http://youtube.com/marvel" class="sociaa__link"><i class="social__icon icon-youtube"></i></a>
          <a href="https://www.pinterest.com/marvelofficial" class="sociaa__link"><i class="social__icon icon-pinterest2"></i></a>
          <a href="https://www.snapchat.com/add/marvelhq" class="sociaa__link"><i class="social__icon icon-snapchat-ghost"></i></a>
        </div>
      </div>
    </div>  
  </footer>
</template>

<script>
import ComponentMainMenu from '@/components/menu/MainMenu.vue'
export default {
  name: 'ComponentFooter',
  components: {
    ComponentMainMenu
  },
  data() {
    return {
      mainMenuItems: [
        {
          text: 'Characters',
          url: '/marvel/'
        },
        {
          text: 'Comics',
          url: '/marvel/comics'
        },        
      ],
    }
  }
}
</script>

<style>
@import "../../public/src/css/footer.min.css";
</style>
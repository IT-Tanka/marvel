<template>
  <header class="header header__container">
      <div class="header__nav">
        <ComponentMainMenu v-bind:menuItems="mainMenuItems"  />
      </div>    
  </header>
</template>

<script>
import ComponentMainMenu from "@/components/menu/MainMenu.vue";
export default {
  name: "ComponentHeader",
  components: {
    ComponentMainMenu,
  },
  data() {
    return {
      baseUrl: "/marvel/",
      mainMenuItems: [
        {
          text: "Characters",
          url: "/marvel/",
        },
        {
          img: "/marvel/src/img/marvel-logo.svg",
        },
        {
          text: "Comics",
          url: "/marvel/comics",
        },
      ],
    };
  }
};
</script>

<style>
@import "../../public/src/css/header.min.css";
</style>

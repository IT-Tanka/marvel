<template>
  <nav>
    <ul class="menu-items__list">
      <li v-for="item in menuItems" :key="item.menuItems">
        <router-link v-if=item.text v-bind:to="item.url">{{ item.text }}</router-link>
        <img v-else :src="item.img" alt="" class="logo"> 
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ComponentMainMenu',
  props: {
    menuItems: {}
  }
}
</script>

<style>
@import "../../../public/src/css/menu.min.css";
</style>


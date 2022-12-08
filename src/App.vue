<template>
  <ComponentHeader />
  <ComponentMain />
  <ComponentFooter />
</template>

<script>
import ComponentHeader from '@/components/Header.vue'
import ComponentMain from '@/components/Main.vue'
import ComponentFooter from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    ComponentHeader,
    ComponentMain,
    ComponentFooter,
  }
}
</script>
<style>
@import "../public/src/css/style.min.css";
</style>
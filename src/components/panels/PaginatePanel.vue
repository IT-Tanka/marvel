<template>
  <vue-awesome-paginate
        :total-items="total"
        :items-per-page="20"
        :max-pages-shown="3"
        v-model="currentP"
        paginate-buttons-class="btn"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
        :on-click="changeCurrentP"
          
      />
</template>  
<script>
export default {
  props:[
    'total',
    'current'
  ],
  name: "ComicsPage",
  data() {
    return {
      currentP:this.current
    }
  },
  methods: {
    changeCurrentP(){
        this.$emit('changeCurrent', this.currentP);    
    }
  }
}
</script>
<style>
@import "../../../public/src/css/paginate.min.css";
</style>
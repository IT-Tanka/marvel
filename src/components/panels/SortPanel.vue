<template>
  <div class="order-panel">
    <div class="container">
      <div class="order-panel__form">
        <span class="order-panel__title">OrderBy:</span>
        <div v-for="order in orderArr" :key="order.orderArr" class="order-panel__by">
          {{order}}
          <input
            class="order-panel__input"  
            v-on:input="$emit('input', $event)"
            type="radio"
            :id="order"
            name="by"
          />
          <label :for="order">↓</label>
          <input
            class="order-panel__input"
           v-on:input="$emit('input', $event)"
            type="radio"
            :id="'-'+order"
            name="by"
          />
          <label :for="'-'+order">↑</label>
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
 
export default {
  name: 'SortPanel',
  props:{
    orderArr: {}
  },
  emits: ['input'] ,

}
</script>
<style>
@import "../../../public/src/css/order.min.css";
</style>
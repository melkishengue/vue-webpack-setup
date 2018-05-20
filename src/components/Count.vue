<template>
  <div>
    <div id="counter" >
      Selected: {{ count }}
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Count',
  computed: {
    count() {
      return this.$store.getters.countSelected;
    }
  }
}
</script>

<style lang="scss" scoped>
  #counter {
    position: absolute;
    right: 25px;
    top: 25px;
    font-weight: bold;
    font-size: 16px;
    color: orange;
  }
</style>

<template>
  <div>
    <div id="counter" >
      Selected: {{ countInfo.all ? 'all (' + countInfo.count + ')'  : countInfo.count }}
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Count',
  computed: {
    countInfo () {
      return this.$store.getters.countSelected;
    }
}
}
</script>

<style lang="scss">
  #counter {
    position: absolute;
    right: 5px;
    top: 10px;
    font-size: 14px;
    color: #ff5900;
    padding: 10px;
    border-radius: 2px;
  }
</style>

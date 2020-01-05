<template>
  <div id="container">
    <CameraScene v-show="!loading" />
    <div id="loading" v-show="loading">
      <span>
        Loading...
      </span>
    </div>
  </div>
</template>

<script>
import CameraScene from 'Components/CameraScene/CameraScene.vue';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    CameraScene
  },
  computed: mapState({
    loading: (state) => state.loading
  })
}
</script>
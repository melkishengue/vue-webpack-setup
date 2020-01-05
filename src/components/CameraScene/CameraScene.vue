<template>
    <div id="container">
        <video id="camera" loop></video>
        <canvas id="canvas"></canvas>
        <canvas id="drawcanvas"></canvas>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import threeMixins from 'Src/mixins/three.mixin';
import videoMixins from 'Src/mixins/video.mixin';
import screenMixins from 'Src/mixins/screen.mixin';

import * as faceapi from 'face-api.js';

export default {
  name: 'CameraScene',
  data() {
    return {
      position: {
        x: 0, y: 0, z: 0
      },
      rotation: {
        x: 0, y: 0, z: 0
      },
      size: {
        x: 0, y: 0, z: 0
      },
      textures: {
          outside: {
              left: './glasses/left.png',
              right: './glasses/right.png',
              front: './glasses/front.png'
          }
      }
    }
  },
  mixins: [threeMixins, videoMixins, screenMixins],
  mounted() {
    this.$store.dispatch('loadModels').then(async() => {
      this.$store.dispatch('setLoading', {loading: false});
      await this.setupView();
      this.setupThree();
      this.detect();

      window.addEventListener('resize', async (event) => {
        await this.setupView();
      });
    }).catch(console.log);
  },
  methods: {
    correct (x, y) {
        return {
            x: ((this.width / 2 - x) * -1) / 2,
            y: (this.height / 2 - y) / 2
        };
    },
    animate() {
      this.cube.position.x = this.position.x;
      this.cube.position.y = this.position.y;
      this.cube.position.z = this.position.z;

      this.cube.rotation.y = this.rotation.y;
      this.cube.rotation.z = this.rotation.z;

      //upate size
      this.cube.scale.x = this.size.x;
      this.cube.scale.y = this.size.y;
      this.cube.scale.z = this.size.z;

      // this.cube.rotation.x += 0.2;

      this.renderer.render(this.scene, this.camera);
    },
    async detect() {
      // requestAnimationFrame(this.detect);
      setTimeout(this.detect, 100);
      let displaySize = {width: this.width, height: this.height};
      try {
        const detections = await faceapi.detectSingleFace(this.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        let landmarks = resizedDetections.landmarks.positions;
        let points = this.extractParts(landmarks);
        this.drawcontext.clearRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);

        let {jaw, nose} = points;

        const distance = Math.abs(90 / ((jaw[0].x.toFixed(0) - jaw[16].x.toFixed(0)) / 2));
        const hAngle = 90 - (jaw[16].x.toFixed(0) - nose[0].x.toFixed(0)) * distance;
        let zAngle = this.calcAngle(nose[0], jaw[8]);
        let center = {
            x: nose[0].x,
            y: (nose[0].y + nose[1].y) /2
        };
        center = this.correct(center.x, center.y);
        // [...jaw, ...nose].forEach((point) => {
        //   this.drawCoordinates(point.x, point.y);
        // });

        this.position.x = center.x - (hAngle / 2);
        this.position.y = center.y;
        this.rotation.x = this.degToRadians(5);
        this.rotation.y = hAngle / 100 / 2;
        this.rotation.z = this.degToRadians(zAngle);
        // this.rotation.z = zAngle / 100 / 1.5;
        //size
        this.size.x = ((jaw[16].x - jaw[0].x) / 2) + 0.05 * (jaw[16].x - jaw[0].x);
        this.size.y = (this.size.x / this.images['front'].width) * this.images['front'].height;
        this.size.z = this.size.x * 3;
        this.position.z = (this.size.z / 2) * -1;
        this.animate();
        // console.log(center);
      } catch(err) {
        console.log(err);
      }
      
      // var distance = Math.abs(90 / ((positions[0][0].toFixed(0) - positions[14][0].toFixed(0)) / 2));
      // const hAngle = 90 - (landmarks[16].x.toFixed(0) - landmarks[17].x.toFixed(0)) * distance;
      // // var hAngle = 90 - (positions[14][0].toFixed(0) - positions[33][0].toFixed(0)) * distance;
      // const zAngle = (nose[0].x - jawOutline[8].x) * -1;
      // let center = {
      //     x: nose[0].x,
      //     y: (nose[0].y + nose[1].y) / 2
      // };
      // center = this.correct(center.x, center.y);
      // this.position.x = center.x - (hAngle / 2);
      // this.position.y = center.y;
      // this.rotation.y = hAngle / 100 / 2;
      // this.rotation.z = zAngle / 100 / 1.5;
      // //size
      // this.size.x = ((jawOutline[16].x - jawOutline[0].x) / 2) + 0.05 * (jawOutline[16].x - jawOutline[0].x);
      // this.size.y = (this.size.x / this.images['front'].width) * this.images['front'].height;
      // this.size.z = this.size.x * 3;
      // this.position.z = (this.size.z / 2) * -1;
      // console.log(distance, hAngle, landmarks);
      // this.animate();
    }
  }
}
</script>
export default {
    methods: {
        setupVideo: function () {
            return new Promise(async (resolve, reject) => {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    reject('Browser API navigator.mediaDevices.getUserMedia not available');
                }

                this.video = document.getElementById('camera');
                this.video.autoplay	= true;
                this.video.loop	= true;
                this.video.width = this.width;
                this.video.height = this.height;

                const mobile = false;
                const stream = await navigator.mediaDevices.getUserMedia({
                    'audio': false,
                    'video': {
                        facingMode: 'user',
                        width: mobile ? undefined : this.width,
                        height: mobile ? undefined : this.height
                    },
                });

                this.video.srcObject = stream;
                this.video.onloadedmetadata = () => {
                    resolve();
                };
            })
          },
    }
}
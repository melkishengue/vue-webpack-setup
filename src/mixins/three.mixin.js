const THREE = require('three');

export default {
    methods: {
      setupThree() {
        this.setupScene();
        this.setupLights();
        this.setupTextures();
        this.setupCube();
        this.setupCamera();
        this.setupCanvas();
        this.setupRenderer();
      },
      setupCamera() {
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000);
        this.camera.lookAt(this.cube.position);
        this.camera.position.z = this.width / 2;
        this.scene.add(this.camera);

        // let helper = new THREE.CameraHelper( this.camera );
        // this.scene.add( helper );
      },
      setupScene() {
        this.scene = new THREE.Scene;
      },
      setupCube() {
        var geometry = new THREE.CubeGeometry(1, 1, 1);
        // this.glassMaterials = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh(geometry, this.glassMaterials);
        this.cube.doubleSided = true;
        this.scene.add(this.cube);
      },
      setupCanvas() {
        this.drawcanvas = document.getElementById("drawcanvas");
        this.drawcanvas.width = this.width;
        this.drawcanvas.height = this.height;
        this.drawcontext = this.drawcanvas.getContext('2d');
        this.drawcontext.fillStyle = "#00FF00";
        this.canvas = document.getElementById("canvas");
      },
      setupRenderer() {
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.setSize(this.width, this.height);
      },
      setupLights() {
        var lightFront = new THREE.PointLight(0xffffff);
        lightFront.position.set(0, 0, 1000);
        lightFront.intensity = 0.6;
        this.scene.add(lightFront);

        var lightLeft = new THREE.PointLight(0xffffff);
        lightLeft.position.set(1000, 0, 0);
        lightLeft.intensity = 0.7;
        this.scene.add(lightLeft);

        var lightRight = new THREE.PointLight(0xffffff);
        lightRight.position.set(-1000, 0, 0);
        lightRight.intensity = 0.7;
        this.scene.add(lightRight);
      },
      setupTextures() {
        var outside = {
          0 : 'left',
          1 : 'right',
          4 : 'front'
        };

        this.images = [];
        this.glassMaterials = [];
        for (let i = 0; i < 6; i++) {
            if (this.textures.outside[outside[i]] !== undefined) {
                var image = new Image();
                image.src = this.textures.outside[outside[i]];
                this.images[outside[i]] = image;
                this.glassMaterials.push(new THREE.MeshLambertMaterial({
                    map: new THREE.TextureLoader().load(this.textures.outside[outside[i]]), transparent: true
                }));
            } else {
                this.glassMaterials.push(new THREE.MeshLambertMaterial({
                    color: 0xffffff, transparent: true, opacity: 0
                }));
            }
        }
      },
      degToRadians(degrees) {
        return THREE.Math.degToRad(degrees);
      }
    }
  }
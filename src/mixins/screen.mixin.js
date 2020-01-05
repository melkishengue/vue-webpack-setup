export default {
    methods: {
        setDimensions () {
            var test = document.createElement( "div" );
            test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
            document.documentElement.insertBefore( test, document.documentElement.firstChild );
            
            // this.width = test.offsetWidth;
            // this.height = test.offsetHeight;
            this.width = 640;
            this.height = 480;
            document.documentElement.removeChild(test);
        },
        async setupView () {
            this.setDimensions();
            await this.setupVideo();
        },
        drawCoordinates(x, y){
            // console.log(`Drawing point ${x}, ${y}`);
            var pointSize = 3; // Change according to the size of the point.
            this.drawcontext.beginPath(); //Start path
            this.drawcontext.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
            this.drawcontext.fill(); // Close the path and fill.
        },
        extractParts(landmarks) {
            return {
              jaw: landmarks.slice(0, 17),
              rightEyeBrown: landmarks.slice(17, 22),
              leftEyeBrown: landmarks.slice(22, 27),
              nose: landmarks.slice(27, 36),
              rightEye: landmarks.slice(36, 42),
              leftEye: landmarks.slice(42, 48),
              mouth: landmarks.slice(48, 69)
            }
        },
        calcAngle(p1, p2) {
            return 90 - this.radiansToDegrees(Math.atan2(p2.y - p1.y, p2.x - p1.x));
        },
        radiansToDegrees(radians) {
            return radians * (180/Math.PI);
        }
    }
} 
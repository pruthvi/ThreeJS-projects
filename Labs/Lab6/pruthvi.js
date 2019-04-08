/*  
    Copyright Pruthvi // pruthv.com 
*/

const renderer = new THREE.WebGLRenderer({ antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1.0, 1000);

var orbitControls, controls;

var speed = 0.01, rotateScene = false, rotateWheel = false;

var wheels = [];
var wheel;
var axle = new THREE.Object3D();

var spoke, hFrame, vFrame;
var basketSupport = [];
var outerRadius = 15, innerRadius = 12.5, rimWidth = 10, axleRadius = 5, spokeL = 50, spokesNo = 12, position = 0, basketColor = 0x8b4513, wheelColor = 0x654321, axleColor = 0x48240a;
var futuristic = 0.5;

function init() {

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);

    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function setupCameraAndLight() {
    camera.position.set(-100, 50, 40);
    camera.lookAt(scene.position);

    scene.add(new THREE.AmbientLight(0x666666));

    let directionalLight = new THREE.DirectionalLight(0xeeeeee);
    directionalLight.position.set(20, 60, 10);
  //  scene.add(directionalLight);

    let spotLight = new THREE.SpotLight();
    spotLight.position.set(10, 60, 10);
    scene.add(spotLight);
    let spotLightHelper = new THREE.SpotLightHelper(spotLight);
 //   scene.add(spotLightHelper);

}

function createGeometry() {

    //scene.add(new THREE.AxesHelper(100));
    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshLambertMaterial({ color: 0x4286f4 })
    );
    plane.material.side = THREE.DoubleSide;
    plane.position.set(0, -12, 0);
    plane.receiveShadow = true;
    plane.castShadow = true;
    plane.rotation.x = -Math.PI * 0.5;
    scene.add(plane);


    createWheel(position, outerRadius, innerRadius, rimWidth, axleRadius, spokeL, spokesNo, basketColor, wheelColor, axleColor);
}

function createWheel(position, outerRadius, InnerRadius, rimWidth, axleRadius, spokeL, spokesNo, basketColor, wheelColor, axleColor) {
    return new function () {
        wheel = new THREE.Group();

        // Axle
        this.axle = new THREE.Mesh(new THREE.CylinderGeometry(axleRadius, axleRadius, rimWidth, 40), new THREE.MeshLambertMaterial({ color: axleColor }));
        this.axle.position.set(position, outerRadius + 5, 0);
        this.axle.rotation.z = Math.PI * 0.5;
        this.axle.castShadow = true;
        this.axle.receiveShadow = true;

        wheel.add(this.axle);
        scene.add(wheel);

        // Spokes
        this.angle = 0;
        for (let i = 0; i < spokesNo; i++) {
            this.spoke = new THREE.Mesh(new THREE.CubeGeometry(spokeL, 0.5, 0.5, 10), new THREE.MeshLambertMaterial({ color: axleColor }));
            this.spoke.position.set(0, -rimWidth / 2 + 1, 0);
            this.spoke.geometry.scale(1, 1, 1);
            this.spoke.rotation.x = Math.PI * 0.5;
            this.spoke.rotation.z = Math.PI * this.angle;
            this.spoke.geometry.translate(0, futuristic, 0);
            this.spoke.castShadow = true;
            this.axle.add(this.spoke);

            this.spoke2 = new THREE.Mesh(new THREE.CubeGeometry(spokeL, 0.5, 0.5, 10), new THREE.MeshLambertMaterial({ color: axleColor }));
            this.spoke2.position.set(0, rimWidth / 2 - 1, 0);
            this.spoke2.geometry.scale(1, 1, 1);
            this.spoke2.rotation.x = Math.PI * 0.5;
            this.spoke2.rotation.z = Math.PI * this.angle;
            this.angle += 1 / (spokesNo / 2);
            this.spoke2.geometry.translate(0, futuristic, 0);
            this.spoke2.castShadow = true;
            this.axle.add(this.spoke2);

            // Horizontal Frame
            this.hFrame = new THREE.Mesh(new THREE.CubeGeometry(0.25, 0.25, rimWidth / 2 + 2, 40),//10
                new THREE.MeshLambertMaterial({ color: 0xE3F3E1 }));
            this.hFrame.position.set(20 * Math.cos(Math.PI * this.angle), 1, 20 * Math.sin(Math.PI * this.angle));
            this.hFrame.rotation.x = Math.PI * 0.5;
            this.hFrame.geometry.translate(0, 0, 1);
            this.hFrame.castShadow = true;
            this.axle.add(this.hFrame);
            basketSupport.push(this.hFrame);

            // Vertical Frame
            this.vFrame = new THREE.Mesh(new THREE.CubeGeometry(0.25, 0.25, 2, 20),
                new THREE.MeshLambertMaterial({ color: 0xE3F3E1 }));
            this.vFrame.position.set(0, 0, 0.5);
            this.vFrame.rotation.y = Math.PI * 0.5;
            this.vFrame.geometry.translate(0, 0, -1);
            this.vFrame.castShadow = true;
            this.hFrame.add(this.vFrame);

            // Basket
            this.basket = new THREE.Mesh(new THREE.SphereGeometry(2.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7),
                new THREE.MeshLambertMaterial({ color: basketColor, side: THREE.DoubleSide }));
            this.basket.geometry.translate(0, 2, 0);
            this.basket.rotation.z = Math.PI * 0.5;
            this.hFrame.add(this.basket);
        }

        //  Create outer ring
        this.extrudeSettings = {
            steps: 10,
            depth: 5,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1,
            curveSegments: 32
        };

        this.ring = new THREE.Shape();
        //   this.ring.moveTo(50, 10);
        this.ring.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
        this.hole = new THREE.Path();
        // this.hole.moveTo(20, 10);
        this.hole.absarc(0, 0, InnerRadius, 0, Math.PI * 2, true);
        this.ring.holes.push(this.hole);
        this.ring = new THREE.Mesh(new THREE.ExtrudeGeometry(this.ring, this.extrudeSettings), new THREE.MeshLambertMaterial({ color: wheelColor }));
        this.ring.castShadow = true;
        this.ring.position.set(0, this.extrudeSettings.depth / 2, 0);
        this.ring.rotation.x = Math.PI * 0.5;
        this.axle.add(this.ring);
        wheels.push(this);

        this.rotateAxle = function (rotationSpeed) {
            this.axle.rotation.x += rotationSpeed * Math.PI;
            basketSupport.forEach((support) => support.rotation.z -= rotationSpeed * Math.PI);
        }
    }
}

function setupDatGui() {

    controls = new function () {

        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
        this.rimWidth = rimWidth;
        this.axleRadius = axleRadius;
        this.spokeL = spokeL;
        this.spokesNo = spokesNo;
        this.wColor = 0x654321;
        this.bColor = 0x8b4513;
        this.aColor = 0x48240a;
        this.rotateWheel = rotateWheel;
        this.rotate = rotateScene;
        this.position = position;
        this.newWheel = function () {
            scene.remove(wheel);
            createWheel(position, outerRadius, innerRadius, rimWidth, axleRadius, spokeL, spokesNo, basketColor, wheelColor, axleColor);
        }
    }

    let gui = new dat.GUI();
    gui.add(controls, 'outerRadius', 6, 20).name("Wheel Size").onChange((c) => outerRadius = c);
    gui.add(controls, 'innerRadius', 0, 20).name("Wheel Breadth").onChange((c) => innerRadius = c);
    gui.addColor(controls, 'wColor').name('Wheel Color').onChange((c) => { wheelColor = new THREE.Color(c); });
    gui.add(controls, 'rimWidth', 3, 20).name("Rim Length").onChange((c) => rimWidth = c);
    gui.add(controls, 'axleRadius', 0, 5).name("Rim Size").onChange((c) => axleRadius = c);
    gui.addColor(controls, 'aColor').name('Axle Color').onChange((c) => { axleColor = new THREE.Color(c); });
    gui.add(controls, 'spokeL', 40, 60).name("Spoke Length").onChange((c) => spokeL = c);
    gui.add(controls, 'spokesNo', 2, 20).step(2).name("No. of Spoke").onChange((c) => spokesNo = c);
    gui.addColor(controls, 'bColor').name('Basket Color').onChange((c) => { basketColor = new THREE.Color(c); });
    gui.add(controls, 'position', -20, 20).name("Wheel PositionX").step(1).onChange((c) => position = c);
    gui.add(controls, 'rotateWheel').name("Rotate Wheel").onChange((c) => rotateWheel = c);
    gui.add(controls, 'rotate').name("Rotate Scene").onChange((c) => rotateScene = c);
    gui.add(controls, 'newWheel').name("Generate Wheel");

}

function render() {

    orbitControls.update();

    if (rotateWheel) {
        wheels.forEach((wheel) => wheel.rotateAxle(0.005));
    }
    if (rotateScene) {
        scene.rotation.y += speed;  //rotates the scene
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.onload = () => {
    init();
    setupCameraAndLight();
    createGeometry();
    setupDatGui();
    render();
}

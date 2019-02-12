const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
const scene = new THREE.Scene();

var control,
    trackballControl,
    clock,
    speed = 0.001,
    balls = [],
container = new THREE.Object3D();

function init() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x112211);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();

    control = new function () {
        this.planetSpeed = speed;
    }

    gui = new dat.GUI();
    gui.add(control, 'planetSpeed', 0, 0.01).name('Planet Speed').onChange((s) => speed = s);

}

function setupCameraAndLight() {
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    let ambient = new THREE.SpotLight(0x3c3c3c);
    ambient.position.set(60, 0, 60);
    scene.add(ambient);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);

}

function createGeometry(myShape, size, myColor) {

    let plane = new THREE.Mesh(new THREE.PlaneGeometry(60, 20, 1, 1), new THREE.MeshLambertMaterial({ color: 0xffffff }));

    plane.rotateX = -0.5 * Math.PI;
    //plane.position.set(15,0,0);
    scene.add(plane);

    for (let i = 0; i < 10; i++) {
        let obj = createBall(new THREE.Vector2(60, 40), 0xffaaaa);
        balls.push(obj);
        scene.add(obj.mesh);
        //  container.add(obj.mesh);
    }

}

function render() {
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    balls.forEach((obj) => obj.update(speed));
    //   container.rotation.y += yRot;
    requestAnimationFrame(render);
}

function createBall(area, bColor) { // area -> vector2, bColor is hexvalue for color
    let radius = 1.9;
    let max_Height = 30;
    let angle = 30;

    return new function () {
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 12, 12), new THREE.MeshStandardMaterial({ color: bColor })

        );
        let x = area.x * (Math.random() - 0.5)
        let z = area.y * (Math.random() - 0.5)
        this.maxHeight = max_Height * Math.random();
        this.angle = Math.random() * Math.PI;
        let y = this.maxHeight * Math.abs(Math.sin(angle));
        this.mesh.position.set(x, y, z);
        this.update = function (delta) {
            this.angle += delta;
            this.mesh.position.y = this.maxHeight * Math.abs(Math.sin(angle));
        }
    };
}



window.onload = () => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
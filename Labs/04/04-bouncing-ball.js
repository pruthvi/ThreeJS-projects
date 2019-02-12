//name: Narendra
//date: Jan 15, 2019
//file: 01-dat-gui-demo.js

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
const scene = new THREE.Scene();
const clock = new THREE.Clock();

var control,
    trackballControl,
    speed = 0.001,
    yRot = 0.01;
    balls = [],
    container = new THREE.Object3D();

function init(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x112211);
    document.body.appendChild(renderer.domElement);
   

    //setup the dat-gui widget
    control =  new function() {
        this.planetSpeed = speed;
    }
    var gui = new dat.GUI();
    gui.add(control, 'planetSpeed', 0, 0.01).onChange((s) => speed = s);
    scene.add(container);
}

function setupCameraAndLight(){

    camera.position.set(-100, 50, 40);
    camera.lookAt(scene.position);

    let ambient = new THREE.AmbientLight(0x3c3c3c);
    scene.add(ambient);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
    let light = new THREE.DirectionalLight(0xeeffee);
    light.position.set(20, 60, 10);
    scene.add(light);
}

function createGeometry(){

    let plane = new THREE.Mesh(
        new THREE.PlaneGeometry(80, 60, 1, 1), 
        new THREE.MeshLambertMaterial({color: 0xffffff})
        );
    plane.rotateX = -0.5 * Math.PI;
    // plane.position.set(15, 0, 0);
    scene.add(plane);

    let area = new THREE.Vector2(60, 40);
    for(let i = 0; i < 10;i++){
        let obj = createBall(area, 0xffaaaa);
        balls.push(obj);
        //scene.add(obj.mesh);
        container.add(obj.mesh);
    }
    let moon = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 12),
        new THREE.MeshStandardMaterial({color: 0xFF0000})
    );
    moon.position.set(0, 4, 0);
    balls[9].mesh.add(moon);
}

function createBall(area, bColor){ //area -> Vector2, bColor is a hexnumber
    let RADIUS = 1.9;
    let MAX_HEIGHT = 30;

    return new function(){
        this.mesh = new THREE.Mesh(
            new THREE.SphereGeometry(RADIUS, 12, 12),
            new THREE.MeshStandardMaterial({color: bColor})
        );

        let x = area.x * (Math.random() - 0.5);
        let z = area.y * (Math.random() - 0.5);

        this.maxHeight = MAX_HEIGHT * Math.random();
        this.angle = Math.random() * Math.PI;
        let y = this.maxHeight * Math.abs(Math.sin(this.angle));
        this.mesh.position.set(x, y, z);

        this.update = function(delta){
            this.angle += delta;
            this.mesh.position.y = this.maxHeight * Math.abs(Math.sin(this.angle));
        }
    };
}
function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    balls.forEach((obj) => obj.update(speed));
    container.rotation.y += yRot;
    requestAnimationFrame(render);
}

window.onload = () =>{
    init();
    setupCameraAndLight();
    createGeometry();
    render();
}

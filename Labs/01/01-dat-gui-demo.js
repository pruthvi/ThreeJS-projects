var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xaaffaa);
    document.body.appendChild(renderer.domElement);


    clock = new THREE.Clock();


    control = new function(){
        this.gpa = 3.5;
        this.course = 'COMP';
        this.fullTime = 'true';
        this.myColor =  0xff00ff; 
        this.addCube = function(){};

    }

    gui = new dat.GUI();
    gui.add(control, 'gpa', 0, 4.5);
    gui.add(control, 'course');
    gui.add(control, 'fullTime');
    gui.addColor(control, 'myColor');
    gui.add(control,'addCube', function(){});
}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    let ambient = new THREE.AmbientLight(0x3c3c3c);
    scene.add(ambient);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);

}

function createGeometry(){
    let geom = new THREE.PlaneGeometry(60,20,1,1);
    let mat = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(geom, mat);

    plane.rotateX = -0.5 * Math.PI;
    plane.position.set(15,0,0);
    scene.add(plane);
}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

window.onload = ()  => {
    init();
    setupCameraAndLight();
    createGeometry();
    render();
}
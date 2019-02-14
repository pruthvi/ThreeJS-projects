var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

var sun, planet1, planet2, moon1, moon2;



function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    clock = new THREE.Clock();

}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(500,0,500);
    camera.lookAt(scene.position);

    let ambient = new THREE.AmbientLight(0x3c3c3c,5);
    ambient.position.set(0,0,0);
    scene.add(ambient);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);
}



function createGeometry(){

    sun = new THREE.Object3D();
    sun.position.set(0,0,0);
    addSphere(sun, 10, 0xFFE22E, 0);

    planet1 = new THREE.Object3D();
    planet1.position.set(0,0,0);
    addSphere(planet1, 3, 0xFF4A2E, 60);

    planet2 = new THREE.Object3D();
    planet2.position.set(0,0,0);
    addSphere(planet2, 6, 0x2E69FF, 100);

    moon1 = new THREE.Object3D();
    moon1.position.set(100,0,0);
    addSphere(moon1, 1, 0xFF4A2E, 10);
    moon1.rotation.y = 60;
    planet2.add(moon1);
    
    moon2 = new THREE.Object3D();
    moon2.position.set(100,0,0);
    addSphere(moon2, 2, 0xFF4A2E, 12);
    planet2.add(moon2);
}


function addSphere(container, size, myColor, x){

        let geom = new THREE.SphereGeometry(size,32,32);
        let mat = new THREE.MeshLambertMaterial({color: myColor});
        let sphere = new THREE.Mesh(geom, mat);
        sphere.position.set(x,0,0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        container.add(sphere);
        scene.add(container);

}



function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    
    sun.rotation.y = 0;
    planet1.rotation.y += 0.01;
    planet2.rotation.y += 0.02;
    moon2.rotation.z += 0.01;
    moon1.rotation.z += 0.01;  
    
    requestAnimationFrame(render);
}

window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
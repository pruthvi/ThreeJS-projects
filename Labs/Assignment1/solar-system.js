var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

var container;

function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);


    clock = new THREE.Clock();


    control = new function(){

      /*  this.addGeometry= function(){  
             addShapes(this.myShape,this.size,this.myColor);     
            };
*/
    }

    gui = new dat.GUI();

  //  gui.add(control, 'addGeometry').name('Add Geometry');

}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(100,0,100);
    camera.lookAt(scene.position);

    let ambient = new THREE.AmbientLight(0x3c3c3c,5);
    ambient.position.set(0,0,0);
    scene.add(ambient);

    let spot = new THREE.SpotLight(0x3c3c3c,20);
    spot.position.set(0,20,0);
  //  scene.add(spot);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);

}

function createGeometry(){

    addSphere(10,0xFFE22E,20);
    addSphere(5,0xFF4A2E,60);
    addSphere(3,0x2E69FF,120);


}

function addSphere(size,myColor,x){

        container = new THREE.Object3D();
        container.position.set(0,0,0);

        let geom = new THREE.SphereGeometry(size,32,32);
        let mat = new THREE.MeshLambertMaterial({color: myColor});
        let sphere = new THREE.Mesh(geom, mat);
        sphere.position.set(x,0,0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        container.add(sphere);
        scene.add(container);

}

function orbit(){
    
}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    container.rotation.y += 0.01;

    requestAnimationFrame(render);
}

window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
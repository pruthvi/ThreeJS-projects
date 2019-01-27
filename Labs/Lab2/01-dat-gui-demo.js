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
        this.size = 5;
        this.myShape = '';
        this.myColor =  0xf2e851; 
        this.addGeometry= function(){  
             addShapes(this.myShape,this.size,this.myColor);     
            };
        this.showVariables= function(){
            console.log("Size : " + this.size);
            console.log("Shape : " + this.myShape);
            console.log("Color : "  + this.myColor);
        };
    }

    gui = new dat.GUI();
    gui.add(control, 'showVariables').name('Show Variables'); 
    gui.add(control, 'size', 2, 6).step(1);
    gui.add(control,'myShape', [ 'sphere', 'cube' ]);
    gui.addColor(control, 'myColor');
    gui.add(control, 'addGeometry').name('Add Geometry');

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

function createGeometry(myShape,size,myColor){

    let geom = new THREE.PlaneGeometry(60,20,1,1);
    let mat = new THREE.MeshLambertMaterial({color: 0xffffff});
    let plane = new THREE.Mesh(geom, mat);

    plane.rotateX = -0.5 * Math.PI;
    plane.position.set(15,0,0);
    scene.add(plane);

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    scene.add(spotLight);




}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function addShapes(myShape,size,myColor){
    

    if(myShape == 'sphere'){
        let geom = new THREE.SphereGeometry(size,32,32);
        let mat = new THREE.MeshLambertMaterial({color: myColor});
        let sphere = new THREE.Mesh(geom, mat);
        sphere.rotateX = -0.5 * Math.PI;
        sphere.position.set(10,5,5);
        scene.add(sphere);
    }
    else
    if(myShape == 'cube'){
        let boxGeometry = new THREE.BoxGeometry(size, size, size);
        let boxMaterial = new THREE.MeshLambertMaterial({ color: myColor });
        let box = new THREE.Mesh(boxGeometry, boxMaterial);
        box.rotation.x = -0.5 * Math.PI;
        box.position.set(-10,5,5);
        scene.add(box);
    }
    else{

    console.log("Select Shape!!!");
    }
}

window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
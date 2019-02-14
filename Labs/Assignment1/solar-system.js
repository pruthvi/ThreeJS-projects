var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

//var container;
var sun, mercury, earth, moon, moon1;



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
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(2000,0,2000);
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



/*
 planet     diameter    distance    orbit period

 SUN        1,391,980
 MERCURY 	4879	    57.9	    88
 VENUS 	    12,104	    108.2	    224.7
 EARTH  	12,756  	149.6	    365.2
 MARS 	    6792	    227.9	    687
 JUPITER 	142,984	    778.6	    4331
 SATURN 	120,536	    1433.5	    10,747
 URANUS 	51,118	    2872.5	    30,589
 NEPTUNE 	49,528	    4495.1	    59,800
 PLUTO 	    2370	    5906.4	    90,560



*/

    sun = new THREE.Object3D();
    sun.position.set(0,0,0);
    addSphere(sun, 139, 0xFFE22E, 0);
//    addSphere(sun, 10, 0xFFE22E, 0);

    mercury = new THREE.Object3D();
    mercury.position.set(0,0,0);
    addSphere(mercury, 4.8, 0xFF4A2E, 57.9);

    earth = new THREE.Object3D();
    earth.position.set(0,0,0);
    addSphere(earth, 12.7, 0x2E69FF, 149.6);
//    addSphere(earth, 6, 0x2E69FF, 149.6);
   // addOrbit(149.6);

    moon = new THREE.Object3D();
    moon.position.set(1496,0,0);
    addMoon(moon, 2, 0xFF4A2E, 5, 0);
    earth.add(moon);

    moon1 = new THREE.Object3D();
    moon1.position.set(1496,0,0);
    addMoon(moon1, 1, 0xFF4A2E, 6, 45);
    earth.add(moon1);

}

function addOrbit(x){

    let geometry = new THREE.TorusGeometry( x, 0.5, 16, 100 );
    let material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(0,0,0);
    mesh.rotation.x = Math.PI / 2;
    scene.add( mesh );

}

function addSphere(container, size, myColor, x){

        x = x * 10;
        let geom = new THREE.SphereGeometry(size,32,32);
        let mat = new THREE.MeshLambertMaterial({color: myColor});
        let sphere = new THREE.Mesh(geom, mat);
        sphere.position.set(x,0,0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;

        let geometry = new THREE.TorusGeometry( x, 0.3, 16, 100 );
        let material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,0,0);
        mesh.rotation.x = Math.PI / 2;
        container.add( mesh );

        container.add(sphere);
        scene.add(container);

}

function addMoon(container, size, myColor, x, angle){

    // container = new THREE.Object3D();
   //  container.position.set(0,0,0);

    container.rotation.y = angle;

     x = x * 10;

     let geom = new THREE.SphereGeometry(size,32,32);
     let mat = new THREE.MeshLambertMaterial({color: myColor});
     let sphere = new THREE.Mesh(geom, mat);
     sphere.position.set(x, 0, 0);
     sphere.castShadow = true;
     sphere.receiveShadow = true;


     let geometry = new THREE.TorusGeometry( x, 0.3, 16, 100 );
     let material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
     let mesh = new THREE.Mesh( geometry, material );
     mesh.position.set(0,0,0);
    // mesh.rotation.x = Math.PI * 0.5;
     container.add( mesh );


     container.add(sphere);
     scene.add(container);
    

}



function orbit(){
    sun.rotation.y = 0;
    mercury.rotation.y += 0.01 / 0.88;
   // earth.rotation.y += 0.01 / 3.65;
   
  //moon.position = earth.children[0].position;
   // let pos = earth.children[0];
   // moon.position = pos.position;
    moon.rotation.z += 0.01;
    moon1.rotation.z += 0.01;

}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    orbit();   
    requestAnimationFrame(render);
}

window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

//var container;
var sun, mercury, venus, earth, mars, jupiter, saturn, urnaus, neptune, pluto;
var earthMoon, satMoon1, satMoon2, satMoon3, jupMoon1, jupMoon2, jupMoon3, jupMoon4, jupMoon5,
moon1;

var mercurySpeed, venusSpeed, earthSpeed, marsSpeed, jupiterSpeed, saturnSpeed, urnausSpeed, neptuneSpeed, plutoSpeed;
var earthMoonSpeed, satMoon1Speed, satMoon2Speed, satMoon3Speed, jupMoon1Speed, jupMoon2Speed, jupMoon3Speed,
jupMoon4Speed, jupMoon5Speed, moon1Speed;

function init(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);


    clock = new THREE.Clock();
    mercurySpeed = 1.0; venusSpeed = 1.0; earthSpeed = 1.0; marsSpeed = 1.0; jupiterSpeed = 1.0; saturnSpeed = 1.0; urnausSpeed = 1.0; neptuneSpeed = 1.0;
    plutoSpeed = 1.0;
    earthMoonSpeed = 1.0; satMoon1Speed = 1.0; satMoon2Speed = 1.0; satMoon3Speed = 1.0;
    jupMoon1Speed = 1.0; jupMoon2Speed = 1.0;
    jupMoon3Speed = 1.0; jupMoon4Speed = 1.0; jupMoon5Speed = 1.0; moon1Speed = 1.0;

    control = new function(){
        this.mercurySpeed = 1.0; this.venusSpeed = 1.0; this.earthSpeed = 1.0; this.marsSpeed = 1.0; this.jupiterSpeed = 1.0;
        this.saturnSpeed = 1.0; this.urnausSpeed = 1.0; this.neptuneSpeed = 1.0; this.plutoSpeed = 1.0;
        this.earthMoonSpeed = 1.0; this.satMoon1Speed = 1.0; this.satMoon2Speed = 1.0; this.satMoon3Speed = 1.0;
         this.jupMoon1Speed = 1.0; this.jupMoon2Speed = 1.0;
         this.jupMoon3Speed = 1.0; this.jupMoon4Speed = 1.0; this.jupMoon5Speed = 1.0; this.moon1Speed = 1.0;

      /*  this.addGeometry= function(){  
             addShapes(this.myShape,this.size,this.myColor);     
            };
*/
    }

    gui = new dat.GUI();

    gui.add(control, 'mercurySpeed', 0, 5.0).name('Mercury Speed').onChange((s) => mercurySpeed = s);
    gui.add(control, 'venusSpeed', 0, 5.0).name('Venus Speed').onChange((s) => venusSpeed = s);
    var ea = gui.addFolder('Earth');
    ea.add(control, 'earthSpeed', 0, 5.0).name('Earth Speed').onChange((s) => earthSpeed = s);
    ea.add(control, 'earthMoonSpeed', 0, 5.0).name('Moon Speed').onChange((s) => earthMoonSpeed = s);

    gui.add(control, 'marsSpeed', 0, 5.0).name('Mars Speed').onChange((s) => marsSpeed = s);

    var jp = gui.addFolder('Jupiter');
    jp.add(control, 'jupiterSpeed', 0, 5.0).name('Jupiter Speed').onChange((s) => jupiterSpeed = s);
    jp.add(control, 'jupMoon1Speed', 0, 5.0).name('Moon1').onChange((s) => jupMoon1Speed = s);
    jp.add(control, 'jupMoon2Speed', 0, 5.0).name('Moon2').onChange((s) => jupMoon2Speed = s);
    jp.add(control, 'jupMoon3Speed', 0, 5.0).name('Moon3').onChange((s) => jupMoon3Speed = s);
    jp.add(control, 'jupMoon4Speed', 0, 5.0).name('Moon4').onChange((s) => jupMoon4Speed = s);
    jp.add(control, 'jupMoon5Speed', 0, 5.0).name('Moon5').onChange((s) => jupMoon5Speed = s);

    var sa = gui.addFolder('Saturn');
    sa.add(control, 'saturnSpeed', 0, 5.0).name('Saturn Speed').onChange((s) => saturnSpeed = s);
    sa.add(control, 'satMoon1Speed', 0, 5.0).name('Moon1').onChange((s) => satMoon1Speed = s);
    sa.add(control, 'satMoon2Speed', 0, 5.0).name('Moon2').onChange((s) => satMoon2Speed = s);
    sa.add(control, 'satMoon3Speed', 0, 5.0).name('Moon3').onChange((s) => satMoon3Speed = s);

    gui.add(control, 'urnausSpeed', 0, 5.0).name('Uranus Speed').onChange((s) => urnausSpeed = s);
    gui.add(control, 'neptuneSpeed', 0, 5.0).name('Naptune Speed').onChange((s) => neptuneSpeed = s);
    gui.add(control, 'plutoSpeed', 0, 5.0).name('Pluto Speed').onChange((s) => plutoSpeed = s);

  //  gui.add(control, 'addGeometry').name('Add Geometry');

}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 10000);
    camera.position.set(2000,500,2000);
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
    addObject(sun, "star", 139, 0xFFE22E, 0, 0);

    mercury = new THREE.Object3D();
    mercury.position.set(0,0,0);
    addObject(mercury, "planet", 4.8, 0xFF4A2E, 57.9,0);

    earth = new THREE.Object3D();
    earth.position.set(0,0,0);
    addObject(earth, "planet", 12.7, 0x2E69FF, 149.6,0);

    earthMoon = new THREE.Object3D();
    earthMoon.position.set(1496,0,0);
    addObject(earthMoon, "moon", 2, 0xFF4A2E, 5, 0);
    earth.add(earthMoon);

    moon1 = new THREE.Object3D();
    moon1.position.set(1496,0,0);
    addObject(moon1, "moon", 1, 0xFF4A2E, 6, 45);
    earth.add(moon1);

}


function addObject(container, obj, size, myColor, x, angle){

    //    container.rotation.y = angle;

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

        switch(obj)
        {
        case 'planet':
            mesh.rotation.x = Math.PI / 2;
            break;
        case 'moon':
            container.rotation.y = angle;
            break;
        case 'star':
            mesh.visible = false;
            break;
        default:
            console.log("Object not defined");
            break;
        }

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

    mercury.rotation.y += mercurySpeed * (0.01 / 0.88);
 //   venus.rotation.y += venusSpeed * (0.01 / 3.65);
    earth.rotation.y += earthSpeed * (0.01 / 3.65);
/*    mars.rotation.y += marsSpeed * (0.01 / 6.87);
    jupiter.rotation.y += jupiterSpeed * (0.01 / 43.31);
    saturn.rotation.y += saturnSpeed * (0.01 / 100.74);
    urnaus.rotation.y += urnausSpeed * (0.01 / 305.89);
    neptune.rotation.y += neptuneSpeed * (0.01 / 598.00);
    pluto.rotation.y += plutoSpeed * (0.01 / 905.60);
*/

    earthMoon.rotation.z += 0.01 * earthMoonSpeed;
/*
    satMoon1.rotation.z += 0.01 * satMoon1Speed;
    satMoon2.rotation.z += 0.01 * satMoon2Speed;
    satMoon3.rotation.z += 0.01 * satMoon3Speed;

    jupMoon1.rotation.z += 0.01 * jupMoon1Speed;
    jupMoon2.rotation.z += 0.01 * jupMoon2Speed;
    jupMoon3.rotation.z += 0.01 * jupMoon3Speed;
    jupMoon4.rotation.z += 0.01 * jupMoon4Speed;
    jupMoon5.rotation.z += 0.01 * jupMoon5Speed;

*/
    moon1.rotation.z +=  0.01 * moon1Speed;

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
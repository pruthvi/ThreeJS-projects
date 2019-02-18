var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

//var container;
var sun, mercury, venus, earth, mars, jupiter, saturn, urnaus, neptune, pluto;
var earthMoon, satMoon1, satMoon2, satMoon3, jupMoon1, jupMoon2, jupMoon3, jupMoon4, jupMoon5;

var mercurySpeed, venusSpeed, earthSpeed, marsSpeed, jupiterSpeed, saturnSpeed, urnausSpeed, neptuneSpeed, plutoSpeed;
var earthMoonSpeed, satMoon1Speed, satMoon2Speed, satMoon3Speed, jupMoon1Speed, jupMoon2Speed, jupMoon3Speed,
jupMoon4Speed, jupMoon5Speed;

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
    jupMoon3Speed = 1.0; jupMoon4Speed = 1.0; jupMoon5Speed = 1.0;

    control = new function(){
        this.mercurySpeed = 1.0; this.venusSpeed = 1.0; this.earthSpeed = 1.0; this.marsSpeed = 1.0; this.jupiterSpeed = 1.0;
        this.saturnSpeed = 1.0; this.urnausSpeed = 1.0; this.neptuneSpeed = 1.0; this.plutoSpeed = 1.0;
        this.earthMoonSpeed = 1.0; this.satMoon1Speed = 1.0; this.satMoon2Speed = 1.0; this.satMoon3Speed = 1.0;
         this.jupMoon1Speed = 1.0; this.jupMoon2Speed = 1.0;
         this.jupMoon3Speed = 1.0; this.jupMoon4Speed = 1.0; this.jupMoon5Speed = 1.0;

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
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 75000);
    camera.position.set(2000,500,2000);
    camera.lookAt(scene.position);

    /*
    let ambient = new THREE.AmbientLight(0x3c3c3c, 5);
    ambient.position.set(0,0,0);
    scene.add(ambient);
*/
    let point = new THREE.PointLight(0x3c3c3c,5);
    point.position.set(0,0,0);
    scene.add(point);

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
    addObject(sun, "star", 1391,"lamb", 0xFFE22E, 0, 0);

    mercury = new THREE.Object3D();
    mercury.position.set(0,0,0);
    addObject(mercury, "planet", 4.8, "standard",0xFF4A2E, 57.9, 0);

    venus = new THREE.Object3D();
    venus.position.set(0,0,0);
    addObject(venus, "planet", 12.1, "lamb",0x52f9f7, 108.2, 0);

    earth = new THREE.Object3D();
    earth.position.set(0,0,0);
    addObject(earth, "planet", 12.7, "standard",0x2E69FF, 149.6, 0);

    mars = new THREE.Object3D();
    mars.position.set(0,0,0);
    addObject(mars, "planet", 6.7, "lamb",0xad0101, 227.9, 0);

    jupiter = new THREE.Object3D();
    jupiter.position.set(0,0,0);
    addObject(jupiter, "planet", 142, "phong",0xb79f61, 778.6/2, 0);

    saturn = new THREE.Object3D();
    saturn.position.set(0,0,0);
    addObject(saturn, "planet", 120, "lamb",0xeb42f4, 1433.5/2, 0);

    urnaus = new THREE.Object3D();
    urnaus.position.set(0,0,0);
    addObject(urnaus, "planet", 51.1, "lamb",0x2E69FF, 2872.5/2, 0);

    neptune = new THREE.Object3D();
    neptune.position.set(0,0,0);
    addObject(neptune, "planet", 49.5, "lamb",0x2E69FF, 4495.1/2, 0);

    pluto = new THREE.Object3D();
    pluto.position.set(0,0,0);
    addObject(pluto, "planet", 2.3, "lamb",0x2E69FF, 5906.4/2, 0);


    earthMoon = new THREE.Object3D();
    earthMoon.position.set(149.6*25,0,0);
    addObject(earthMoon, "moon", 2, "basic",0xFF4A2E, 5, 0);
    earth.add(earthMoon);

    jupMoon1 = new THREE.Object3D();
    jupMoon1.position.set(778.6*12.5,0,0);
    addObject(jupMoon1, "moon", 2,"phong", 0xFF4A2E, 10, 0);
    jupiter.add(jupMoon1);

    jupMoon2 = new THREE.Object3D();
    jupMoon2.position.set(778.6*12.5,0,0);
    addObject(jupMoon2, "moon", 2, "lamb",0xFF4A2E, 10, 45);
    jupiter.add(jupMoon2);

    jupMoon3 = new THREE.Object3D();
    jupMoon3.position.set(778.6*12.5,0,0);
    addObject(jupMoon3, "moon", 2, "lamb",0xFF4A2E, 10, 90);
    jupiter.add(jupMoon3);

    jupMoon4 = new THREE.Object3D();
    jupMoon4.position.set(778.6*12.5,0,0);
    addObject(jupMoon4, "moon", 2, "lamb",0xFF4A2E, 10, 120);
    jupiter.add(jupMoon4);

    jupMoon5 = new THREE.Object3D();
    jupMoon5.position.set(778.6*12.5,0,0);
    addObject(jupMoon5, "moon", 2,"lamb", 0xFF4A2E, 10, 150);
    jupiter.add(jupMoon5);

    satMoon1 = new THREE.Object3D();
    satMoon1.position.set(1433.5*12.5,0,0);
    addObject(satMoon1, "moon", 1,"lamb", 0xFF4A2E, 6, 45);
    saturn.add(satMoon1);

    satMoon2 = new THREE.Object3D();
    satMoon2.position.set(1433.5*12.5,0,0);
    addObject(satMoon2, "moon", 1, "lamb",0xFF4A2E, 6, 220);
    saturn.add(satMoon2);
        
    satMoon3 = new THREE.Object3D();
    satMoon3.position.set(1433.5*12.5,0,0);
    addObject(satMoon3, "moon", 1, "lamb",0xFF4A2E, 6, 120);
    saturn.add(satMoon3);

}


function addObject(container, obj, size, mater, myColor, x, angle){

        x = x * 25;
        let geom = new THREE.SphereGeometry(size,32,32);
        var mat;
        switch(mater){
            case 'basic':
            mat = new THREE.MeshBasicMaterial( { color: myColor} );
            break;
            case 'lamb':
            mat = new THREE.MeshLambertMaterial({color: myColor, emissive: myColor });
            break;
            case 'standard':
            mat = new THREE.MeshStandardMaterial( { color: myColor } );
            break;
            case 'phong':
            mat = new THREE.MeshPhongMaterial( { color: myColor } );
            break;
            default:
            console.log("Material not defined");
            break;
        }

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
    venus.rotation.y += venusSpeed * (0.01 / 2.24);
    earth.rotation.y += earthSpeed * (0.01 / 3.65);
   mars.rotation.y += marsSpeed * (0.01 / 6.87);
    jupiter.rotation.y += jupiterSpeed * (0.01 / 43.31);
    saturn.rotation.y += saturnSpeed * (0.01 / 100.74);
    urnaus.rotation.y += urnausSpeed * (0.01 / 305.89);
    neptune.rotation.y += neptuneSpeed * (0.01 / 598.00);
    pluto.rotation.y += plutoSpeed * (0.01 / 905.60);


    earthMoon.rotation.z += 0.01 * earthMoonSpeed;

    satMoon1.rotation.z += 0.01 * satMoon1Speed;
    satMoon2.rotation.z += 0.01 * satMoon2Speed;
    satMoon3.rotation.z += 0.01 * satMoon3Speed;

    jupMoon1.rotation.z += 0.01 * jupMoon1Speed;
    jupMoon2.rotation.z += 0.01 * jupMoon2Speed;
    jupMoon3.rotation.z += 0.01 * jupMoon3Speed;
    jupMoon4.rotation.z += 0.01 * jupMoon4Speed;
    jupMoon5.rotation.z += 0.01 * jupMoon5Speed;


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
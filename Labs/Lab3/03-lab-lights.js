var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

var ambientLight, spotLight, pointLight, dirLight, rectAreaLight, skyColor, groundColor, mat;

function init(){
    skyColor = 0xf2e8ff;
    groundColor = 0xf20051;

    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(skyColor);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);


    clock = new THREE.Clock();

    control = new function(){
        
        this.amLight = false;
        this.amColor =  0xf2e851; 
        this.spLight = false;
        this.spColor =  0xFF3366; 
        this.poLight = false;
        this.poColor =  0xFF00FF; 
        this.dLight = false;
        this.dColor =  0xFFF33F; 
        this.reLight = false;
        this.reColor =  0xFFFF66; 
        this.hLight = false;
        this.hColor =  0xFF33FF; 

        this.skyColor = 0xf2e8ff;
        this.groundColor = 0xf20051;

    }

    gui = new dat.GUI();
 
    gui.add(control, 'amLight').name('Ambient Light').onChange((e) => { 
        if(e){  ambientLight.visible = true;    }
        else{   ambientLight.visible = false;   }
    });
    gui.addColor(control, 'amColor').name('Ambient Color').onChange((c) => { ambientLight.color = new THREE.Color(c); });

    gui.add(control, 'spLight').name('Spot Light').onChange((e) => { 
        if(e){  spotLight.visible = true;    }
        else{   spotLight.visible = false;   }
    });
    gui.addColor(control, 'spColor').name('Spot Color').onChange((c) => { spotLight.color = new THREE.Color(c); });


    gui.add(control, 'poLight').name('Point Light').onChange((e) => { 
        if(e){  pointLight.visible = true;    }
        else{   pointLight.visible = false;   }
    });
    gui.addColor(control, 'poColor').name('Point Color').onChange((c) => { pointLight.color = new THREE.Color(c); });


    gui.add(control, 'dLight').name('Directional Light').onChange((e) => { 
        if(e){  dirLight.visible = true;    }
        else{   dirLight.visible = false;   }
    });
    gui.addColor(control, 'dColor').name('Directional Color').onChange((c) => { dirLight.color = new THREE.Color(c); });

    gui.add(control, 'reLight').name('Rect Area Light').onChange((e) => { 
        if(e){  rectAreaLight.visible = true;    }
        else{   rectAreaLight.visible = false;   }
    });
    gui.addColor(control, 'reColor').name('Area Color').onChange((c) => { rectAreaLight.color = new THREE.Color(c); });

    gui.add(control, 'hLight').name('HemiSphere Light').onChange((e) => { 
        if(e){  hemLight.visible = true;    }
        else{   hemLight.visible = false;   }
    });
    gui.addColor(control, 'hColor').name('HemiSphere Color').onChange((c) => { hemLight.color = new THREE.Color(c); });
    
    
    /* I could not find specification of SkyColor and GroundColor usage,
    thus I have interpreted it as changing scene background color and plane color */

    gui.addColor(control, 'skyColor').name('Sky Color').onChange((c) => {     renderer.setClearColor(c);    });
    gui.addColor(control, 'groundColor').name('Ground Color').onChange((c) => { mat.color =  new THREE.Color(c); });



}

function setupCameraAndLight(){
    camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    trackballControl = new THREE.TrackballControls(camera, renderer.domElement);

}

function createGeometry(){

    let geom = new THREE.PlaneGeometry(60,20,1,1);
    mat = new THREE.MeshLambertMaterial({color: groundColor});
    let plane = new THREE.Mesh(geom, mat);
    plane.rotateX = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);

    let boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    let boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });

    /*      Uncomment below code to see RectAreaLight effect.    */
    //  let boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });

    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.rotation.x = -0.5 * Math.PI;
    box.position.set(-10,0,5);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);

    let sphereGeometry = new THREE.SphereGeometry(5,32,32);
    let sphereMat = new THREE.MeshPhongMaterial({color: 0x66aa66, specular: 0x0000ff });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMat);
    sphere.rotateX = -0.5 * Math.PI;
    sphere.position.set(10,0,8);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add(sphere);


    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(5,0,20);
    ambientLight.castShadow = true; 
    scene.add(ambientLight);
    ambientLight.visible = false;

    spotLight = new THREE.SpotLight(0xFF3366);
    spotLight.position.set(5,0,20);
    spotLight.castShadow = true; 
    scene.add(spotLight);
    spotLight.visible = false;


    pointLight = new THREE.PointLight(0xFF00FF);
    pointLight.position.set(5,0,20);
    pointLight.castShadow = true; 
    pointLight.intensity = 1;
    scene.add(pointLight);
    pointLight.visible = false;


    dirLight = new THREE.DirectionalLight(0xFFF33F);
    dirLight.position.set(5,0,20);
    dirLight.castShadow = true; 
    scene.add(dirLight);
    dirLight.visible = false;

    /*
    RectAreaLight won't be visible as it requires Standard or Physical Material.
    As lab doesn't specify to use these materials, I have not included it.
    
    However, I have added it in Cube Geometry by commenting it.
    If you'd like to see it please uncomment it and comment lambertMaterial line.
    */
 
    rectAreaLight = new THREE.RectAreaLight(0xFFFF66,10,20,20);
    rectAreaLight.position.set(-20,0,10);
    rectAreaLight.lookAt( -10, 0, 5 );
    rectAreaLight.castShadow = true;
    scene.add(rectAreaLight);
    rectAreaLight.visible = false;
    
    var rectLightHelper = new THREE.RectAreaLightHelper( rectAreaLight );
    rectAreaLight.add( rectLightHelper );


    hemLight = new THREE.HemisphereLight(0xFF33FF);
    hemLight.position.set(5,0,20);
    hemLight.castShadow = true;
    scene.add(hemLight);
    hemLight.visible = false;


}

function render(){
    trackballControl.update(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}


window.onload = ()  => {
    init();
    createGeometry();
    setupCameraAndLight();
    render();
}
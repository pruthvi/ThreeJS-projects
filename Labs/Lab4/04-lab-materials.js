var camera,
    renderer,
    scene,
    control,
    trackballControl,
    clock,
    gui;

var angle,
    torus,
    torusMaterial,
    wireT = 0.001;

function init(){

    angle = 0;
   
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf2e8ff);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);


    clock = new THREE.Clock();

    control = new function(){
        
        this.wire = false;
        this.wireThick = wireT;
        this.emiColor = 0xff33ff;
        this.emiIntensity = 0.01;
        this.metal = 1.0;
        this.rough = 1.0;
        this.wireLineJoin = '';
        this.wireLineCap = '';

        this.isStand  = function(){  
            if(torusMaterial.isMeshStandardMaterial)
                {  console.log("It is Standard Material");    }
            else{   console.log("It is NOT Standard Material");   }
        };
        this.isSkin  = function(){  
            if(torusMaterial.skinning)
                {  console.log("It is Skinning");    }
            else{   console.log("It is NOT Skinning");   }
        };
        this.isMorphNormal  = function(){  
            if(torusMaterial.morphNormals)
                {  console.log("Material uses morphNormals");    }
            else{   console.log("Material does not use morphNormals");   }
        };
        this.isMorphTarget  = function(){  
            if(torusMaterial.morphTargets)
                {  console.log("Material uses morphTarget");    }
            else{   console.log("Material does not use morphTarget");   }
        };

    }

    gui = new dat.GUI();
  
    gui.add(control, 'wire').name('Wireframe').onChange((e) => { 
        if(e){  torusMaterial.wireframe = true;    }
        else{   torusMaterial.wireframe = false;   }
    });
    gui.add(control, 'wireThick', 0, 1.0).name('Wireframe Thickness').onChange((s) => torusMaterial.wireframeLinewidth = s);
    gui.addColor(control, 'emiColor').name('Emissive Color').onChange((c) => { torusMaterial.emissive = new THREE.Color(c); });
    gui.add(control, 'emiIntensity', 0, 10.0).name('Emissive Intensity').onChange((s) => torusMaterial.emissiveIntensity = s);
    gui.add(control, 'metal', 0, 10.0).name('Metalness').onChange((s) => torusMaterial.metalness = s);
    gui.add(control, 'rough', 0, 10.0).name('Roughness').onChange((s) => torusMaterial.roughness = s);

    gui.add(control,'wireLineJoin', [ 'round', 'bevel', 'miter' ]).onChange((s) => torusMaterial.wireframeLinejoin = s);
    gui.add(control,'wireLineCap', [ 'round', 'butt', 'square' ]).onChange((s) => torusMaterial.wireframeLinecap = s);

    gui.add(control, 'isStand').name('Is Standard Material?');
    gui.add(control, 'isSkin').name('IsSkinning?');
    gui.add(control, 'isMorphNormal').name('Is Morph Normal?');
    gui.add(control, 'isMorphTarget').name('Is Morph Target?');

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
    mat = new THREE.MeshLambertMaterial({color: 0xf20051});
    let plane = new THREE.Mesh(geom, mat);
    plane.rotateX = -0.5 * Math.PI;
    plane.position.set(0,0,0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    scene.add(plane);


    var torusGeometry = new THREE.TorusGeometry( 5, 1, 16, 100 );
    torusMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } );
    torus = new THREE.Mesh( torusGeometry, torusMaterial );
    torus.position.set(-10,0,5);
    scene.add( torus );

    ambientLight = new THREE.AmbientLight(0xFFFFFF);
    ambientLight.position.set(5,0,20);
    ambientLight.castShadow = true; 
    scene.add(ambientLight);
    ambientLight.visible = false;

    spotLight = new THREE.SpotLight(0xFF3366);
    spotLight.position.set(5,0,20);
    spotLight.castShadow = true; 
    scene.add(spotLight);

}

function render(){
   torus.rotation.y = angle += 0.1;
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
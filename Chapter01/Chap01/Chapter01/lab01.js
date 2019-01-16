/// <reference path="lib/three.min.js" />
/// <reference path="lib/trackballcontrols.js" />
//name: Narendra
//date: January 11, 2019
//file: lab01.js

//recurrent const
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();

//global variables
var trackballControls;
var axesHelper;

//function definitions
function init() {
    //the renderer
    renderer.setClearColor(new THREE.Color(0X0095DE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    trackballControls = new THREE.TrackballControls(camera, renderer.domElement)
    axesHelper = new THREE.AxesHelper(5);
}

function setupCameraAndLight() {
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    let ambient = new THREE.AmbientLight(0x353535);
    scene.add(ambient);

}

function createGeometry() {


    // Sphere
    let sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    let sphereMaterial = new THREE.MeshLambertMaterial({ color: 0X3162d6 });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.rotation.x = -0.5 * Math.PI;
    sphere.position.x = 15;
    sphere.position.y = 0;
    sphere.position.z = 0;

    scene.add(sphere);

    // Box
    let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    let boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.rotation.x = -0.5 * Math.PI;
    box.position.x = -15;
    box.position.y = 5;
    box.position.z = 5;

    scene.add(box);

    // Cylinder
    let cyGeometry = new THREE.CylinderGeometry(3,3,20,25);
    let cyMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    let cy = new THREE.Mesh(cyGeometry, cyMaterial);
    cy.rotation.x = -0.5 * Math.PI;
    cy.position.x = 10;
    cy.position.y = -5;
    cy.position.z = -5;

    scene.add(cy);

    // Axes Helper
    scene.add(axesHelper);

    //Spot Light
    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    // If you want a more detailled shadow you can increase the 
    // mapSize used to draw the shadows.
    // spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(spotLight);



}

function render() {
    //update the controlls
    trackballControls.update(clock.getDelta());
    renderer.render(scene, camera);

    //to call itself
    requestAnimationFrame(render);
}
//launch
window.onload = () => {

    init();
    setupCameraAndLight();
    createGeometry();
    render();

}

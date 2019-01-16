/// <reference path="libs/three.min.js" />

//author: Narendra Pershad January 9, 2019
//filename: 01-basic-skeleton.js

//declare global variables
var variables;

//function definitions
function init() {
    //to setup the three.js/WebGL environment
    //1. create the THREE.Scene object
    //2. create and initialize the THREE.WebGLRenderer
    //3. add the output of the renderer to the html element
    //this is invoked once
}

function createCameraAndLights() {
    //1. create and initialize the camera
    //2. create and initialize light (if needed)
    //this is invoked once

}

function createGeometry() {
    //to create the required object in your scene
    //this is invoked once
}

function render() {
    //to animate the scene
    //this is invoked continuously

    //the last statement calls itself
    requestAnimationFrame(render);
}

//javascript function to drive your scene
window.onload = () => {
    init();
    createCameraAndLights();
    createGeometry();
    render();
}

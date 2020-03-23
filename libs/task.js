
var renderer;
var scene, camera;
var init_complated = false;
var object_container = {};

var init = function () {
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x333333)
    document.body.appendChild( renderer.domElement );

    window.addEventListener('resize', handleResize, false);

    camera.position.z = 5;
    init_objects();
    init_complated = true;
}

var init_objects = function(){
    scene.add(biliard())
}

function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var animate = function () {
    requestAnimationFrame( animate );

    if(!init_complated)
        return;

    //let cube = object_container["cube"];

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};
animate();
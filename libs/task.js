var renderer;
var scene, camera, controls;
var init_complated = false;
var object_container = {};

var init = function () {
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x333333)
    document.body.appendChild( renderer.domElement );


    controls = new THREE.TrackballControls( camera, renderer.domElement );

    window.addEventListener('resize', handleResize, false);

    camera.position.z = 8;
    controls.update();

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

    controls.update();

    renderer.render( scene, camera );
};
animate();
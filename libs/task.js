var renderer;
var scene, camera, controls, effect;
var init_complated = false;
var object_container = {};

var init = function () {
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x333333)
    renderer.outputEncoding = THREE.sRGBEncoding;
    effect = new OutlineEffect( renderer );
    document.body.appendChild( renderer.domElement );


    controls = new THREE.TrackballControls( camera, renderer.domElement );

    window.addEventListener('resize', handleResize, false);

    camera.position.z = 8;
    controls.update();

    init_objects();
    init_complated = true;
}

var init_objects = function(){
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    let pointLight = new THREE.PointLight( 0xffffff, 1, 800 );
    scene.add( pointLight );

    scene.add(directionalLight)
    scene.add( new THREE.AmbientLight( 0xffffff ) );

    object_container["billiard"] = biliard()
    object_container["billiard"].position.x  = 10;
    object_container["billiard"].scale.set(2, 2, 2)
    scene.add(object_container["billiard"]);
    bar(scene, object_container);
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

    effect.render( scene, camera );
};
animate();
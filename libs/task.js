var renderer;
var scene, camera, controls, effect;
var init_complated = false;
var object_container = {};
var isTweening = false, isTweening2 = false;

var init = function () {
    
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.set(10, 10, 10)

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
    // Lights
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLight );

    let pointLight = new THREE.PointLight( 0xffffff, 1, 800 );
    scene.add( pointLight );

    scene.add(directionalLight)
    scene.add( new THREE.AmbientLight( 0xffffff ) );

    // Billiard table with binary operators
    object_container["billiard"] = biliard()
    object_container["billiard"].position.x  = 10;
    object_container["billiard"].scale.set(2, 2, 2)
    scene.add(object_container["billiard"]);

    // Bar table
    bar(scene, object_container);

    // Walls
    let wall_texture = new THREE.TextureLoader().load('assets/textures/wall.png');
    wall_texture.wrapS = THREE.RepeatWrapping;
    wall_texture.wrapT = THREE.RepeatWrapping;
    wall_texture.repeat.set(8, 4);
    let wall_material = new THREE.MeshBasicMaterial( { map: wall_texture } );

    let wall_1 = new THREE.BoxGeometry(0.5, 12, 30);
    object_container["wall_1"] = new THREE.Mesh(wall_1, wall_material);
    object_container["wall_1"].position.set(-6.25, 4.0, -1.5);

    let wall_2 = new THREE.BoxGeometry(25, 12, 0.5);
    object_container["wall_2"] = new THREE.Mesh(wall_2, wall_material);
    object_container["wall_2"].position.set(6, 4.0, 13.75);

    // Floor
    let floor_texture = new THREE.TextureLoader().load('assets/textures/floor.png');
    floor_texture.wrapS = THREE.RepeatWrapping;
    floor_texture.wrapT = THREE.RepeatWrapping;
    floor_texture.repeat.set(4, 6);
    let floor_material = new THREE.MeshBasicMaterial( { map: floor_texture } );

    let floor = new THREE.BoxGeometry(25, 0.5, 30);
    object_container["floor"] = new THREE.Mesh(floor, floor_material);
    object_container["floor"].position.set(6, -2.25, -1.5);

    scene.add(object_container["wall_1"]);
    scene.add(object_container["wall_2"]);
    scene.add(object_container["floor"]);

    // Ball
    let ball_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    let ball = new THREE.SphereGeometry(0.15, 32, 32);
    object_container["ball"] = new THREE.Mesh(ball, ball_material);
    object_container["ball"].position.set(10, 4, 0);

    scene.add(object_container["ball"])
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

    bounceBall(object_container["ball"], 0, 2.2, 5000);
    moveBall(object_container["ball"], 0, 3, 5000)

    controls.update();

    effect.render( scene, camera );
    TWEEN.update();
};

function bounceBall(object, start, end, time) {
    if (!isTweening) {
        let original = object.position.y
        let tween = new TWEEN.Tween({ x: start, object: object, previous: 0})
            .to({ x: end }, time )
            .easing(TWEEN.Easing.Bounce.Out)
            .onStart(function () {
                isTweening = true;
            })
            .onUpdate(function () {
                object.position.y = original - this.x;
            })
            .onComplete(function () {
                object.position.set(10, 4, 0);
                isTweening = false;
            })
            .start();
    }
}

function moveBall(object, start, end, time) {
    if (!isTweening2) {
        let original = object.position.x
        let tween = new TWEEN.Tween({ x: start, object: object, previous: 0})
            .to({ x: end }, time )
            .easing(TWEEN.Easing.Linear.None)
            .onStart(function () {
                isTweening2 = true;
            })
            .onUpdate(function () {
                object.position.x = original + this.x;
            })
            .onComplete(function () {
                object.position.set(10, 4, 0);
                isTweening2 = false;
            })
            .start();
    }
}

animate();
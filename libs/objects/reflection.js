function mirror_material() {
    let mat = new THREE.MeshBasicMaterial({color: 0xffffff});
    mat.envMap = cubeCamera.renderTarget.texture;
    return mat;
}

function build_mirror() {
    let group = new THREE.Group();

    let frame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5.5, 5.5));
    frame.rotateY(Math.PI/2);
    let frame_bsp = new ThreeBSP(frame);

    let cut = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5, 5));
    cut.rotateY(Math.PI/2);
    cut.position.z = 0.25;
    let cut_bsp = new ThreeBSP(cut);
    cut_bsp = frame_bsp.subtract(cut_bsp);

    let mirror = new THREE.PlaneGeometry(5, 5, 4, 4);
    let mirrorMesh = new THREE.Mesh(mirror, mirror_material());
    mirrorMesh.position.z = 0.1;


    let final = cut_bsp.toMesh();
    final.geometry.mergeVertices();
    final.geometry.computeFaceNormals();
    final.geometry.computeVertexNormals();

    let alpha = 0.1;

    let material = new THREE.MeshToonMaterial( {
        bumpScale: 1,
        color: new THREE.Color("hsl(31, 100%, 1%)"),
        specular: new THREE.Color("hsl(31, 100%, 8%)"),
        shininess: Math.pow( 2, alpha * 10 ),
    } );
    let geom = new THREE.Mesh(final.geometry, material);
    geom.rotateY(Math.PI/2);

    group.add(mirrorMesh);
    group.add(geom);

    group.position.y = 5;
    group.rotateY(Math.PI);
    return group;
}
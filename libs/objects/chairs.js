function build_chair() {
    let group = new THREE.Group();
    let base = new THREE.Mesh(new THREE.CubeGeometry(6, 4, 3));
    let base_bsp = new ThreeBSP(base);


    let cut_1 = new THREE.Mesh(new THREE.CubeGeometry(6, 2, 2));
    cut_1.position.z = -1;
    cut_1.position.y = 1;
    let cut_1_bsp = new ThreeBSP(cut_1);
    let sub1 = base_bsp.subtract(cut_1_bsp);

    let cut_2 = new THREE.Mesh(new THREE.CubeGeometry(7, 2, 2));
    cut_2.position.z = -0.7;
    cut_2.position.y = 1.3;
    cut_2.rotateX(Math.PI/12);
    let cut_2_bsp = new ThreeBSP(cut_2);
    sub1 = sub1.subtract(cut_2_bsp);
    

    
    let final = sub1.toMesh();
    final.geometry.mergeVertices();
    final.geometry.computeFaceNormals();
    final.geometry.computeVertexNormals();

    let alpha = 0.1;

    let diffuseColor = new THREE.Color("hsl(31, 100%, 1%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(31, 100%, 8%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    let g2 = new THREE.Mesh(final.geometry, material);

    group.add(g2);
    return group
}
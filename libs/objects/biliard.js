function biliard(){
    let base = new THREE.Mesh(new THREE.CubeGeometry(4, 2, 2, 5, 5, 5));
    let base_bsp = new ThreeBSP(base);

    // Bottom cutting pieces
    let bottom_cut_1 = new THREE.Mesh(new THREE.BoxGeometry(4, 1.5, 1.5));
    bottom_cut_1.position.y = -0.25;
    let bottom_cut_2 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.5, 2));
    bottom_cut_2.position.y = -0.25;

    let bottom_cut_1_bsp = new ThreeBSP(bottom_cut_1);
    let bottom_cut_2_bsp = new ThreeBSP(bottom_cut_2);

    // Cutting bottom of the table
    let sub1 = base_bsp.subtract(bottom_cut_1_bsp);
    let sub2 = sub1.subtract(bottom_cut_2_bsp);

    // Top cutting pieces
    let top1 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.2, 1.6));
    top1.position.y = 0.9;

    let top2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.65));
    top2.position.y = 0.95;

    // Cutting top of the table
    let top1_bsp = new ThreeBSP(top1);
    let sub3 = sub2.subtract(top1_bsp);

    let top2_bsp = new ThreeBSP(top2);
    sub3 = sub3.subtract(top2_bsp);

    // Cylinders for holes
    y = 0.8;
    x = [-1.75, 0, 1.75];
    z = [-0.8, 0.8];

    holes = [];

    x.forEach(e1 => {
        z.forEach(e2 => {
            let hole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 32))
            hole.position.y = y;
            hole.position.x = e1;
            hole.position.z = e2;
            holes.push(new ThreeBSP(hole))
        });
    });

    // Cutting holes
    holes.forEach(e => {
        sub3 = sub3.subtract(e);
    });
    
    // Grouping objects
    let group = new THREE.Group();
    let final = sub3.toMesh();
    final.geometry.mergeVertices();
    final.geometry.computeFaceNormals();
    final.geometry.computeVertexNormals();

    let alpha = 1;
    let beta = 1;
    let gamma = 1;

    var diffuseColor = new THREE.Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
    var bumpScale = 1;
    var specularShininess = Math.pow( 2, alpha * 10 );
    var specularColor = new THREE.Color( beta * 0.2, beta * 0.2, beta * 0.2 );

    var material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );

    group.add(new THREE.Mesh(final.geometry, material));
    return group;
}
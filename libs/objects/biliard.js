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

    // Cloth
    let cloth = new THREE.Mesh(new THREE.CubeGeometry(3.5, 0.05, 1.6));
    cloth.position.y = 0.8;
    let cloth_bsp = new ThreeBSP(cloth);

    // Cylinders for holes
    y = 0.8;
    x = [-1.75, 0, 1.75];
    z = [-0.8, 0.8];


    // We are cutting the holes in defferent size for the cloth and for the base of the table to avoid the flickering effect when to mesh overlaps
    holes = []; // holes for the base of the table
    holes2 = []; // holes for the cloth

    x.forEach(e1 => {
        z.forEach(e2 => {
            let hole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 32))
            hole.position.y = y;
            hole.position.x = e1;
            hole.position.z = e2;
            holes.push(new ThreeBSP(hole))

            let hole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.4, 32))
            hole2.position.y = y;
            hole2.position.x = e1;
            hole2.position.z = e2;
            holes2.push(new ThreeBSP(hole2))
        });
    });

    // Cutting holes
    holes.forEach(e => {
        // cut from table
        sub3 = sub3.subtract(e);
    });
    holes2.forEach(e => {
        // cut from cloth
        cloth_bsp = cloth_bsp.subtract(e);
    });
    
    // Grouping objects
    let group = new THREE.Group();
    let final = sub3.toMesh();
    final.geometry.mergeVertices();
    final.geometry.computeFaceNormals();
    final.geometry.computeVertexNormals();

    cloth = cloth_bsp.toMesh(); 
    cloth.geometry.mergeVertices();
    cloth.geometry.computeFaceNormals();
    cloth.geometry.computeVertexNormals();

    // material for the base of the table
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

    // material for the cloth

    diffuseColor = new THREE.Color("hsl(97, 100%, 10%)");
    specularColor = new THREE.Color("hsl(97, 100%, 41%)");
    alpha = 0.01;

    let material2 = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );

    let g1 = new THREE.Mesh(cloth.geometry, material2);
    g1.position.y = 0.8;
    let g2 = new THREE.Mesh(final.geometry, material);

    group.add(g1);
    group.add(g2);
    return group;
}
function build_table(){
    let group = new THREE.Group();
    let p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 3.25, 32));
    let p2 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.3, 6));
    let p3 = new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 2));


    
    let alpha = 0.1;

    let diffuseColor = new THREE.Color("hsl(31, 70%, 1%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(31, 100%, 8%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );

    let g2 = new THREE.Mesh(p2.geometry, material);
    let g1 = new THREE.Mesh(p1.geometry, steel_material());

    alpha = 0.1;

    diffuseColor = new THREE.Color("hsl(31, 10%, 1%)");
    bumpScale = 1;
    specularShininess = Math.pow( 2, alpha * 10 );
    specularColor = new THREE.Color("hsl(31, 100%, 8%)");

    let material2 = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    let g3 = new THREE.Mesh(p3.geometry, material2);

    
    g3.position.y = -1.625;
    g2.position.y = 1.625;

    group.add(g1);
    group.add(g2);
    group.add(g3);

    group.rotateY(Math.PI/2);

    return group;
}
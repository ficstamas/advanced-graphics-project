function biliard(){
    let base = createMesh(new THREE.BoxGeometry(4, 2, 2));
    let base_bsp = new ThreeBSP(base);

    // Bottom cutting pieces
    let bottom_cut_1 = createMesh(new THREE.BoxGeometry(4, 1.5, 1.5));
    bottom_cut_1.position.y = -0.25;
    let bottom_cut_2 = createMesh(new THREE.BoxGeometry(3.5, 1.5, 2));
    bottom_cut_2.position.y = -0.25;

    let bottom_cut_1_bsp = ThreeBSP(bottom_cut_1);
    let bottom_cut_2_bsp = ThreeBSP(bottom_cut_2);

    // Cutting bottom of the table
    let result_bsp = base.subtract(bottom_cut_1_bsp);
    result_bsp = subtract.subtract(bottom_cut_2_bsp);

    // Grouping objects
    let group = new THREE.Group();
    let final = result_bsp.toMesh()
    //final.geometry.computeFaceNormals();
    //final.geometry.computeVertexNormals();
    group.add(final);
    return group;
}
function createMesh(geom) {

    var meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    var plane = createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
    return plane;
}

var createMultiMaterialObject = function ( geometry, materials ) {

    var group = new THREE.Group();

    for ( var i = 0, l = materials.length; i < l; i ++ ) {

        group.add( new THREE.Mesh( geometry, materials[ i ] ) );

    }

    return group;

}
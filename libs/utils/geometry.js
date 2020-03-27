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

var _load_objects = function (path, scene, object_container, name, callback) {
    let loader = new THREE.OBJLoader();
    loader.load(
        // resource URL
        path,
        // called when resource is loaded
        function ( object ) {
            object_container[name] = object;
            
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.side = THREE.DoubleSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            scene.add(object);
            callback(object);
        },
        // called when loading is in progresses
        function ( xhr ) {
    
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );
}
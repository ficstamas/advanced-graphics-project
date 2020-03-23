function biliard(){
    sphere = createMesh(new THREE.SphereGeometry(1, 10, 10));
    sphere.position.x = -3
    cube = createMesh(new THREE.BoxGeometry(2, 2, 2));
    let group = new THREE.Group();
    group.add(sphere);
    group.add(cube);
    group.position.x = 1.5
    return group;
}
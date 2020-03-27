var bar = function (scene, object_container) {
    return _load_objects("assets/obj/bar_table.obj", scene, object_container, "bar", bar_callback)
}

function bar_callback(obj) {
    obj.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
            if (child.name.includes("chair")){
                child.material = steel_material();
            } 
            else if (child.name.includes("glass")){
                child.material = glass_material();
            }
            else if (child.name.includes("bottle")){
                child.material = bottle_material();
            }
            else{
                child.material = wood_material();
            }
        }
    });
}

function wood_material() {
    let alpha = 0.1;

    let diffuseColor = new THREE.Color("hsl(31, 100%, 1%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(31, 100%, 5%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    return material;
}

function steel_material() {
    let alpha = 0.6;

    let diffuseColor = new THREE.Color("hsl(19, 6%, 3%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(19, 6%, 5%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    return material;
}
function glass_material() {
    let alpha = 0.6;

    let diffuseColor = new THREE.Color("hsl(19, 6%, 97%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(19, 6%, 97%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    material.transparent = true;
    material.opacity = 0.4;
    return material;
}

function bottle_material() {
    let alpha = 0.9;

    let diffuseColor = new THREE.Color("hsl(83, 83%, 32%)");
    let bumpScale = 1;
    let specularShininess = Math.pow( 2, alpha * 10 );
    let specularColor = new THREE.Color("hsl(83, 83%, 32%)");

    let material = new THREE.MeshToonMaterial( {
        bumpScale: bumpScale,
        color: diffuseColor,
        specular: specularColor,
        shininess: specularShininess,
    } );
    material.transparent = true;
    material.opacity = 0.4;
    return material;
}
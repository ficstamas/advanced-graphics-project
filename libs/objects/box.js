function build_box() {
    let group = new THREE.Group();

    let table = build_table();
    table.position.z = -4;

    let chair_1 = build_chair();
    let chair_2 = build_chair();
    chair_2.rotateY(Math.PI);
    chair_2.position.z = -8;
    
    group.add(table);
    group.add(chair_2);
    group.add(chair_1);

    return group;
}

function build_boxes() {
    let group = new THREE.Group();

    x = [-2.5, 12.5]
    z = [0, -11, -22]
    x.forEach(e1 => {
        z.forEach(e2 => {
            let box = build_box();
            box.position.x = e1;
            box.position.z = e2;
            group.add(box);
        });
    });
    return group;
}
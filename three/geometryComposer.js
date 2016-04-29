function composeGeometry(parent, material, num, optArgs) {
                //Process Args
                var argTypes = [
                    "randRot",
                    "spread",
                    "dims",
                    "type",
                    "nested",
                ]
                
                if (optArgs["dims"] == undefined)
                    optArgs["dims"] = [300, 300, 300]
                    
                if (optArgs["type"] == undefined)
                    optArgs["type"] = "CUBE"
                
                //Set Geometry Type
                var geometry;
                var dims = optArgs["dims"];
                switch(optArgs["type"]) {
                    case "CUBE":
                        geometry = new THREE.CubeGeometry(dims[0], dims[1], dims[2]);
                        break;
                    case "SPHERE":
                        geometry = new THREE.SphereGeometry( dims[0], dims[1], dims[2] );
                        break;
                    case "TETRAHEDRON":
                        geometry = new THREE.TetrahedronGeometry(dims[0]);
                        break;
                } 
                
                //REMOVE ALL EXISTING CUBES
                if (parent != null) {
                    var l = parent.children.length;
                    for (i = 0; i < l; i++) {
                        parent.remove(parent.children[0]);
                    }
                }
                
				for(var i = 0; i < num; i++) {
                    var cube = new THREE.Mesh(geometry, material);
                    parent.add(cube);
					//randomize size, posn + rotation
					//cube.scale.x = cube.scale.y = cube.scale.z = Math.random() * 3 + .05;
                    if (optArgs['nested']) {
                        console.log("nested")
                        var s = (i + 1.0) * 1.0 / num;
                        cube.scale.set(s,s,s)
                    }
                    if (optArgs['randRot']) {
                        cube.rotation.x = Math.random() * 2 * Math.PI - Math.PI;
                        cube.rotation.y = Math.random() * 2 * Math.PI - Math.PI;
                        cube.rotation.z = Math.random() * 2 * Math.PI - Math.PI;
                    }
                    if (optArgs['spread'] != undefined) {
                        cube.position.x = 
                            Math.random() * optArgs['spread'] - optArgs['spread'] / 2;
                        cube.position.y = 
                            Math.random() * optArgs['spread'] - optArgs['spread'] / 2;
                        cube.position.z = 
                            Math.random() * optArgs['spread'] - optArgs['spread'] / 2;
                    }
                    
				}
            }
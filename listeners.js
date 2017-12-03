function updateElementClicked(type, elem){
	console.log("Element clicked: " + type + ", " + elem);
	
	for (i = 0; i < modelObjects.pyramidsTG.length; ++i){
		modelObjects.pyramidsTG[i].selected = (type == "P" && i == elem);
	}
	
	for (i = 0; i < modelObjects.spheresTG.length; ++i){
		modelObjects.spheresTG[i].selected = (type == "S" && i == elem);
	}
	
	for (i = 0; i < modelObjects.cubesTG.length; ++i){
		modelObjects.cubesTG[i].selected = (type == "C" && i == elem);
	}
	updateVisualElements();
}

// ev, id del boton
// objectTG, transformaciones geometricas y tipo, por ejemplo 'pyramidsTG'
function onButtonAddObjectClick(ev) {
	var objectAdded = null;
	if (ev == "buttonAddPyramid") {
		console.log("Adding Pyramid");
		isObjectAdded = true;
			
		var actualNumberOfCubes = modelObjects.cubesTG.length;			
		var actualNumberOfSpheres = modelObjects.spheresTG.length;	
		var actualNumberOfPyramids = modelObjects.pyramidsTG.length;	
		
		modelObjects.pyramidsTG[actualNumberOfPyramids] = newObjectValues();
		
		objectAdded = modelObjects.pyramidsTG[actualNumberOfPyramids];
		
		modifyObjectTGFromControls(objectAdded);
	
		// Marcamos la actual piramide como seleccionada
		updateElementClicked("P", actualNumberOfPyramids);
		
		onItemSelectedForColor("pyramid");
	} else if (ev == "buttonAddSphere") {
		console.log("Adding Sphere");
		isObjectAdded = true;
		
		var actualNumberOfCubes = modelObjects.cubesTG.length;			
		var actualNumberOfSpheres = modelObjects.spheresTG.length;	
		var actualNumberOfPyramids = modelObjects.pyramidsTG.length;
		
		modelObjects.spheresTG[actualNumberOfSpheres] = newObjectValues();
		
		objectAdded = modelObjects.spheresTG[actualNumberOfSpheres];
		
		modifyObjectTGFromControls(objectAdded);
		
		// Marcamos la actual sphere como seleccionada		
		updateElementClicked("S", actualNumberOfSpheres);
		onItemSelectedForColor("sphere");
	} else if (ev == "buttonAddCube") {
		console.log("Adding Cube");
		isObjectAdded = true;
		
		var actualNumberOfCubes = modelObjects.cubesTG.length;			
		var actualNumberOfSpheres = modelObjects.spheresTG.length;	
		var actualNumberOfPyramids = modelObjects.pyramidsTG.length;	
		
		modelObjects.cubesTG[actualNumberOfCubes] = newObjectValues();
		
		objectAdded = modelObjects.cubesTG[actualNumberOfCubes];
		
		modifyObjectTGFromControls(objectAdded);
		
		// Marcamos la actual cube como seleccionada		
		updateElementClicked("C", actualNumberOfCubes);
		onItemSelectedForColor("cube");
	}
	
	if (objectAdded != null) {
		playSound(soundsUrl[1], true);
		drawScene();
	}
	
	updateVisualElements();
}

function setKeyboardListener() {
	document.body.addEventListener('keydown', function(evt) {
		var keyCode = evt.keyCode;
		console.log("Key: " + evt.key + ", code: " + keyCode)
		
		// Object controls
		if (keyCode == 68) { //d
			var object = getSelectedObject();
			
			if (object != null) {
				modifyObjectTG(object, "position-x", parseFloat(object.translate[0]) + 0.2, true);
			}
		} else if (keyCode == 65) {//a
			var object = getSelectedObject();
			
			if (object != null) {
				modifyObjectTG(object, "position-x", parseFloat(object.translate[0]) - 0.2, true);
			}
		} else if (keyCode == 87) {//w
			var object = getSelectedObject();
			
			if (object != null) {
				modifyObjectTG(object, "position-y", parseFloat(object.translate[1]) + 0.2, true);
			}
		} else if (keyCode == 83) {//s
			var object = getSelectedObject();
			
			if (object != null) {
				modifyObjectTG(object, "position-y", parseFloat(object.translate[1]) - 0.2, true);
			}
		}
		
		// Camera controls
		if (keyCode == 76) {			
			if (camera != null) {//l
				modifyObjectTG(camera, "position-x", parseFloat(camera.translate[0]) + 0.2, true);
			}
		} else if (keyCode == 74) {//j		
			if (camera != null) {
				modifyObjectTG(camera, "position-x", parseFloat(camera.translate[0]) - 0.2, true);
			}
		} else if (keyCode == 73) {//i			
			if (camera != null) {
				modifyObjectTG(camera, "position-y", parseFloat(camera.translate[1]) + 0.2, true);
			}
		} else if (keyCode == 75) {//k	
			if (camera != null) {
				modifyObjectTG(camera, "position-y", parseFloat(camera.translate[1]) - 0.2, true);
			}
		} else if (keyCode == 33) {//pageup		
			if (camera != null) {
				modifyObjectTG(camera, "scale-x", parseFloat(camera.scale[0]) + 0.1, true);
				modifyObjectTG(camera, "scale-y", parseFloat(camera.scale[1]) + 0.1, true);
				modifyObjectTG(camera, "scale-z", parseFloat(camera.scale[2]) + 0.1, true);
			}
			if (camera != null) {
				modifyObjectTG(camera, "position-z", parseFloat(camera.translate[2]) + 0.2, true);
			}
		} else if (keyCode == 34) {//pagedown	
			if (camera != null) {
				if (parseFloat(camera.scale[0]) > 0.1){
					modifyObjectTG(camera, "scale-x", parseFloat(camera.scale[0]) - 0.1, true);
					modifyObjectTG(camera, "scale-y", parseFloat(camera.scale[1]) - 0.1, true);
					modifyObjectTG(camera, "scale-z", parseFloat(camera.scale[2]) - 0.1, true);				
				} else {
					modifyObjectTG(camera, "scale-x", 0.0, true);
					modifyObjectTG(camera, "scale-y", 0.0, true);
					modifyObjectTG(camera, "scale-z", 0.0, true);
				}
			}
			if (camera != null) {
				modifyObjectTG(camera, "position-z", parseFloat(camera.translate[2]) - 0.2, true);
			}
		}

		// Se trata de hacer una dependencia circular, el objeto no es un array así que automaticamente
		// no es capaz de hacerlo. Asi que itera por los cubos, cuando termina itera por spheres y
		// cuando termina itera por piramides
		if (keyCode == 39) {//arrowright
		  var isCubeSelected = false;
		  for (i = 0; i < modelObjects.cubesTG.length; ++i){
			if (modelObjects.cubesTG[i].selected) {
				isCubeSelected = true;
				modelObjects.cubesTG[i].selected = false;
				
				if (i < modelObjects.cubesTG.length - 1) {
					modelObjects.cubesTG[i + 1].selected = true;					
				} else {
					if (modelObjects.spheresTG.length != 0) {
						modelObjects.spheresTG[0].selected = true;	
					} else if (modelObjects.pyramidsTG.length != 0) {
						modelObjects.pyramidsTG[0].selected = true;	
					} else {
						modelObjects.cubesTG[0].selected = true;							
					}
				}
				break;
			}
		  }
		  
		  var isSphereSelected = false;
		  if (!isCubeSelected) {
			  for (i = 0; i < modelObjects.spheresTG.length; ++i){
				if (modelObjects.spheresTG[i].selected) {
					isSphereSelected = true;
					modelObjects.spheresTG[i].selected = false;
					
					if (i < modelObjects.spheresTG.length - 1) {
						modelObjects.spheresTG[i + 1].selected = true;					
					} else {
						if (modelObjects.pyramidsTG.length != 0) {
							modelObjects.pyramidsTG[0].selected = true;	
						} else if (modelObjects.cubesTG.length != 0) {
							modelObjects.cubesTG[0].selected = true;	
						} else {
							modelObjects.spheresTG[0].selected = true;							
						}
					}
					break;
				}
			  }
		  }
		  
		  if (!isCubeSelected && !isSphereSelected){
			  for (i = 0; i < modelObjects.pyramidsTG.length; ++i){
				if (modelObjects.pyramidsTG[i].selected) {
					isSphereSelected = true;
					modelObjects.pyramidsTG[i].selected = false;
					
					if (i < modelObjects.pyramidsTG.length - 1) {
						modelObjects.pyramidsTG[i + 1].selected = true;					
					} else {
						if (modelObjects.cubesTG.length != 0) {
							modelObjects.cubesTG[0].selected = true;	
						} else if (modelObjects.spheresTG.length != 0) {
							modelObjects.spheresTG[0].selected = true;	
						} else {
							modelObjects.pyramidsTG[0].selected = true;							
						}
					}
					break;
				}
			  }
			  
		  }
		  updateVisualElements();
		} else if (keyCode == 37) {//arrowleft
		  var isCubeSelected = false;
		  for (i = 0; i < modelObjects.cubesTG.length; ++i){
			if (modelObjects.cubesTG[i].selected) {
				isCubeSelected = true;
				modelObjects.cubesTG[i].selected = false;
				
				if (i != 0) {
					modelObjects.cubesTG[i - 1].selected = true;					
				} else {
					if (modelObjects.pyramidsTG.length != 0) {
						modelObjects.pyramidsTG[modelObjects.pyramidsTG.length - 1].selected = true;	
					} else if (modelObjects.spheresTG.length != 0) {
						modelObjects.spheresTG[modelObjects.spheresTG.length - 1].selected = true;	
					} else {
						modelObjects.cubesTG[modelObjects.cubesTG.length - 1].selected = true;							
					}
				}
				break;
			}
		  }
		  
		  var isSphereSelected = false;
		  if (!isCubeSelected) {
			  for (i = 0; i < modelObjects.spheresTG.length; ++i){
				if (modelObjects.spheresTG[i].selected) {
					isSphereSelected = true;
					modelObjects.spheresTG[i].selected = false;
					
					if (i != 0) {
						modelObjects.spheresTG[i - 1].selected = true;					
					} else {
						if (modelObjects.cubesTG.length != 0) {
							modelObjects.cubesTG[modelObjects.cubesTG.length - 1].selected = true;
						} else if (modelObjects.pyramidsTG.length != 0) {
							modelObjects.pyramidsTG[modelObjects.pyramidsTG.length - 1].selected = true;	
						} else {
							modelObjects.spheresTG[modelObjects.spheresTG.length - 1].selected = true;							
						}
					}
					break;
				}
			  }
		  }
		  
		  if (!isCubeSelected && !isSphereSelected){
			  for (i = 0; i < modelObjects.pyramidsTG.length; ++i){
				if (modelObjects.pyramidsTG[i].selected) {
					isSphereSelected = true;
					modelObjects.pyramidsTG[i].selected = false;
					
					if (i != 0) {
						modelObjects.pyramidsTG[i - 1].selected = true;					
					} else {
						if (modelObjects.spheresTG.length != 0) {
							modelObjects.spheresTG[modelObjects.spheresTG.length - 1].selected = true;							
						} else if (modelObjects.cubesTG.length != 0) {
							modelObjects.cubesTG[modelObjects.cubesTG.length - 1].selected = true;	
						} else {
							modelObjects.pyramidsTG[modelObjects.pyramidsTG.length - 1].selected = true;							
						}
					}
					break;
				}
			  }			  
		  }
		  updateVisualElements();
		}
	}, false);
}

function onSwitchChangedPosition() {
	playSound(soundsUrl[0], true);
	drawScene();
}

function onCheckboxSliderChangedPosition(value) {
	if (document.getElementById("checkbox-fragment").checked) {
		gl.uniform1f(shaderProgram.isFragmentShaderColorActivatedUniform, value);			
	}
	drawScene();	
}

function onCheckboxChangedPosition(type) {
	if (type == "fragment") {
		if (document.getElementById("checkbox-fragment").checked) {
			gl.uniform1f(shaderProgram.isFragmentShaderColorActivatedUniform, document.getElementById("slider-fragment-shader").value);	
			document.getElementById("checkbox-vertex").checked = false;		
			gl.uniform1f(shaderProgram.isVertexShaderColorActivatedUniform, 0.0);	
		} else {
			gl.uniform1f(shaderProgram.isFragmentShaderColorActivatedUniform, 0.0);					
		}
	} else if (type == "vertex") {
		if (document.getElementById("checkbox-vertex").checked) {
			gl.uniform1f(shaderProgram.isVertexShaderColorActivatedUniform, 0.8);	
			document.getElementById("checkbox-fragment").checked = false;			
			gl.uniform1f(shaderProgram.isFragmentShaderColorActivatedUniform, 0.0);	
		} else {
			gl.uniform1f(shaderProgram.isVertexShaderColorActivatedUniform, 0.0);					
		}		
	}
	playSound(soundsUrl[0], true);
	
	drawScene();		
}

function updateSliderAndColorPicker() {
	document.getElementById("slider0").value = rgb_To_Hex(parseInt(aSliderColor.R*255), parseInt(aSliderColor.G*255), parseInt(aSliderColor.B*255));	
	document.getElementById("slider1").value = aSliderColor.R;
	document.getElementById("slider2").value = aSliderColor.G;
	document.getElementById("slider3").value = aSliderColor.B;
}

function onSliderChange(e) {			
	if (e.target.id == "slider1") {
		aSliderColor.R = e.target.value;
	} else if (e.target.id == "slider2") {
		aSliderColor.G = e.target.value;
	} else if (e.target.id == "slider3") {
		aSliderColor.B = e.target.value;
	}
	
	document.getElementById("slider0").value = rgb_To_Hex(parseInt(aSliderColor.R*255), parseInt(aSliderColor.G*255), parseInt(aSliderColor.B*255));		
	
	setOffsetValuesToPosition();	
	
	drawScene();
}

function onColorPickerChange(e) {
	console.log("Picked color: " + e.target.value + ", " + hex_to_RGB(e.target.value));
	aSliderColor = hex_to_RGB(e.target.value);
	
	document.getElementById("slider1").value = aSliderColor.R;
	document.getElementById("slider2").value = aSliderColor.G;
	document.getElementById("slider3").value = aSliderColor.B;
	
	setOffsetValuesToPosition();	
	
	drawScene();
}

function randomizeColorButton() {
	aSliderColor = getRandomRGBColors();
	
	setOffsetValuesToPosition();
	
	drawScene();
}

function onItemSelectedForColor(id) {	
	if (id == "cube") {
		document.getElementById('selector-cube').innerHTML = "<b>Cube</b>"
		aSliderColor.R = cube.vertexColorData[0];
		aSliderColor.G = cube.vertexColorData[1];
		aSliderColor.B = cube.vertexColorData[2];
	} else {
		document.getElementById('selector-cube').innerHTML = "Cube"
	}
	if (id == "sphere") {
		document.getElementById('selector-sphere').innerHTML = "<b>Sphere</b>"	
		aSliderColor.R = sphere.vertexColorData[0];
		aSliderColor.G = sphere.vertexColorData[1];
		aSliderColor.B = sphere.vertexColorData[2];	
	} else {
		document.getElementById('selector-sphere').innerHTML = "Sphere"
	}
	if (id == "pyramid") {
		document.getElementById('selector-pyramid').innerHTML = "<b>Pyramid</b>"	
		aSliderColor.R = pyramid.vertexColorData[0];
		aSliderColor.G = pyramid.vertexColorData[1];
		aSliderColor.B = pyramid.vertexColorData[2];	
	} else {
		document.getElementById('selector-pyramid').innerHTML = "Pyramid"
	}
	
	updateSliderAndColorPicker();
}

function getItemSelectedForColor() {
	if ((document.getElementById('selector-cube').innerHTML).indexOf("<b>") != -1) {
		return "cube";
	} else if ((document.getElementById('selector-sphere').innerHTML).indexOf("<b>") != -1) {
		return "sphere";
	} else if ((document.getElementById('selector-pyramid').innerHTML).indexOf("<b>") != -1) {
		return "pyramid";
	}
}
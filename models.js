function getObjectTG() {
	var pyramidsTG = [];
	var spheresTG = [];
	var cubesTG = [];

	return {
		"pyramidsTG": pyramidsTG,
		"spheresTG": spheresTG,
		"cubesTG": cubesTG,
	}
}

function newObjectValues() {
	return {
		"selected": false,
		"rotateAng": 0,
		"rotate": [0, 0, 0],
		"translate": [0, 0, 0],
		"scale": [1.0, 1.0, 1.0]	
	}
}

/* PYRAMID FUNCTIONS */
function getBasePyramid() {	
	return {
		"vertexPositionData": DEFAULT_VERTICES_PYRAMID,
		"vertexPositionDataItemSize": DEFAULT_VERTICES_ITEM_SIZE_PYRAMID,
		"vertexPositionDataNumItems": DEFAULT_VERTICES_NUM_ITEMS_PYRAMID,
		"vertexPositionBuffer": 0,
		"vertexColorData": DEFAULT_COLORS_PYRAMID,
		"vertexColorDataItemSize": DEFAULT_COLORS_ITEM_SIZE_PYRAMID,
		"vertexColorDataNumItems": DEFAULT_COLORS_NUM_ITEMS_PYRAMID,
		"vertexColorBuffer": 0 
	}
}

var DEFAULT_VERTICES_PYRAMID = [
	// Front face
	 0.0,  1.0,  0.0,
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	// Right face
	 0.0,  1.0,  0.0,
	 1.0, -1.0,  1.0,
	 1.0, -1.0, -1.0,
	// Back face
	 0.0,  1.0,  0.0,
	 1.0, -1.0, -1.0,
	-1.0, -1.0, -1.0,
	// Left face
	 0.0,  1.0,  0.0,
	-1.0, -1.0, -1.0,
	-1.0, -1.0,  1.0,
	// Bottom face 1
	 1.0, -1.0,  1.0,
	-1.0, -1.0, -1.0,
	-1.0, -1.0,  1.0,
	// Bottom face 2
	 1.0, -1.0,  1.0,
	-1.0, -1.0, -1.0,
	 1.0, -1.0, -1.0
];

var DEFAULT_COLORS_PYRAMID = [
	// Front face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	// Right face
	1.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	// Back face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	// Left face
	1.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	// Bottom face 1
	1.0, 1.0, 0.0, 1.0,
	0.0, 1.0, 1.0, 1.0,
	1.0, 0.0, 1.0, 1.0,
	// Bottom face 2
	1.0, 1.0, 0.0, 1.0,
	0.0, 1.0, 1.0, 1.0,
	1.0, 0.0, 1.0, 1.0
];
	
var DEFAULT_VERTICES_ITEM_SIZE_PYRAMID = 3;
var DEFAULT_VERTICES_NUM_ITEMS_PYRAMID = 18;		
var DEFAULT_COLORS_ITEM_SIZE_PYRAMID = 4;
var DEFAULT_COLORS_NUM_ITEMS_PYRAMID = 18;

/* SPHERE FUNCTIONS */
function getBaseSphere() {	
	var latitudeBands = 50;
	var longitudeBands = 50;
	var radius = 1;
	
	var vertexPositionData = [];
	var vertexColorData = [];
	var vertexIndexData = [];
	
	// Calculate sphere vertex positions, normals, and texture coordinate
	for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
		var theta = latNumber * Math.PI / latitudeBands;
		var sinTheta = Math.sin(theta);
		var cosTheta = Math.cos(theta);
		for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
			var phi = longNumber * 2 * Math.PI / longitudeBands;
			var sinPhi = Math.sin(phi);
			var cosPhi = Math.cos(phi);
			var x = cosPhi * sinTheta;
			var y = cosTheta;
			var z = sinPhi * sinTheta;
			var u = 1 - (longNumber / longitudeBands);
			var v = 1 - (latNumber / latitudeBands);
			vertexPositionData.push(radius * x);
			vertexPositionData.push(radius * y);
			vertexPositionData.push(radius * z);
			vertexColorData.push(radius * x + 0.75);
			vertexColorData.push(radius * y + 0.75);
			vertexColorData.push(radius * z + 0.75);
		}
	}
	
	// Calculate sphere indices
	for (var latNumber=0; latNumber < latitudeBands; latNumber++) {
		for (var longNumber=0; longNumber < longitudeBands; longNumber++) {
			var first = (latNumber * (longitudeBands + 1)) + longNumber;
			var second = first + longitudeBands + 1;
			vertexIndexData.push(first);
			vertexIndexData.push(second);
			vertexIndexData.push(first + 1);
			vertexIndexData.push(second);
			vertexIndexData.push(second + 1);
			vertexIndexData.push(first + 1);
		}
	}		
	
	var positionNumItems = vertexPositionData.length / DEFAULT_VERTICES_POSITION_SIZE_SPHERE;
	var colorNumItems = vertexColorData.length / DEFAULT_VERTICES_COLORS_SIZE_SPHERE;
	var indexNumItems = vertexIndexData.length / DEFAULT_VERTICES_INDEX_SIZE_SPHERE;
		
	return {
		"vertexPositionData": vertexPositionData,
		"vertexPositionDataItemSize": DEFAULT_VERTICES_POSITION_SIZE_SPHERE,
		"vertexPositionDataNumItems": positionNumItems,
		"vertexPositionBuffer": 0,
		"vertexColorData": vertexColorData,
		"vertexColorDataItemSize": DEFAULT_VERTICES_COLORS_SIZE_SPHERE,
		"vertexColorDataNumItems": colorNumItems,
		"vertexColorBuffer": 0,
		"vertexIndexData": vertexIndexData,
		"vertexIndexDataItemSize": DEFAULT_VERTICES_INDEX_SIZE_SPHERE,
		"vertexIndexDataNumItems": indexNumItems,
		"vertexIndexBuffer": 0,
	}	
}

var DEFAULT_VERTICES_POSITION_SIZE_SPHERE = 3;
var DEFAULT_VERTICES_COLORS_SIZE_SPHERE = 3;
var DEFAULT_VERTICES_INDEX_SIZE_SPHERE = 1;

/* CUBES FUNCTIONS */
function getBaseCube() {	
	return {
		"vertexPositionData": DEFAULT_VERTICES_CUBE,
		"vertexPositionDataItemSize": DEFAULT_VERTICES_ITEM_SIZE_CUBE,
		"vertexPositionDataNumItems": DEFAULT_VERTICES_NUM_ITEMS_CUBE,
		"vertexPositionBuffer": 0,
		"vertexColorData": DEFAULT_COLORS_CUBE,
		"vertexColorDataItemSize": DEFAULT_COLORS_ITEM_SIZE_CUBE,
		"vertexColorDataNumItems": DEFAULT_COLORS_NUM_ITEMS_CUBE,
		"vertexColorBuffer": 0,
		"vertexIndexData": DEFAULT_INDEX_CUBE,
		"vertexIndexDataItemSize": DEFAULT_INDEX_ITEM_SIZE_CUBE,
		"vertexIndexDataNumItems": DEFAULT_INDEX_NUM_ITEMS_CUBE,
		"vertexIndexBuffer": 0 
	}
}

var DEFAULT_VERTICES_CUBE = [
	// Front face
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	// Back face
	-1.0, -1.0, -1.0,
	-1.0,  1.0, -1.0,
	 1.0,  1.0, -1.0,
	 1.0, -1.0, -1.0,
	// Top face
	-1.0,  1.0, -1.0,
	-1.0,  1.0,  1.0,
	 1.0,  1.0,  1.0,
	 1.0,  1.0, -1.0,
	// Bottom face
	-1.0, -1.0, -1.0,
	 1.0, -1.0, -1.0,
	 1.0, -1.0,  1.0,
	-1.0, -1.0,  1.0,
	// Right face
	 1.0, -1.0, -1.0,
	 1.0,  1.0, -1.0,
	 1.0,  1.0,  1.0,
	 1.0, -1.0,  1.0,
	// Left face
	-1.0, -1.0, -1.0,
	-1.0, -1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0,  1.0, -1.0
];

var DEFAULT_COLORS_CUBE = [
	// Front face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	// Back face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	// Top face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 0.0, 1.0, 1.0,	
	// Bottom face
	1.0, 0.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	// Right face
	1.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	1.0, 1.0, 0.0, 1.0,
	0.0, 1.0, 0.0, 1.0,
	// Left face
	1.0, 0.0, 0.0, 1.0,
	0.0, 0.0, 1.0, 1.0,
	0.0, 1.0, 1.0, 1.0,
	0.0, 1.0, 0.0, 1.0
];

var DEFAULT_INDEX_CUBE = [
	0, 1, 2,      0, 2, 3,    // Front face
	4, 5, 6,      4, 6, 7,    // Back face
	8, 9, 10,     8, 10, 11,  // Top face
	12, 13, 14,   12, 14, 15, // Bottom face
	16, 17, 18,   16, 18, 19, // Right face
	20, 21, 22,   20, 22, 23  // Left face
];
	
var DEFAULT_VERTICES_ITEM_SIZE_CUBE = 3;
var DEFAULT_VERTICES_NUM_ITEMS_CUBE = 24;		
var DEFAULT_COLORS_ITEM_SIZE_CUBE = 4;
var DEFAULT_COLORS_NUM_ITEMS_CUBE = 24;	
var DEFAULT_INDEX_ITEM_SIZE_CUBE = 1;
var DEFAULT_INDEX_NUM_ITEMS_CUBE = 36;
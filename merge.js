var fs = require("fs");  

var inputFileName = process.argv[2];

function mergeData(outputData, mapDatas, v) {
	var layers = outputData.layers;
	for(var l = 0; l < layers.length; l++) {
		layers[l].data = [];
		if(v) {
			outputData.layers[l].height= 0;
		}
		else {
			outputData.layers[l].width = 0;
		}
	}

	var n = mapDatas.length;
	for(var i = 0; i < n; i++) {
		var iter = mapDatas[i];
		var layers = iter.layers;
		for(var l = 0; l < layers.length; l++) {
			outputData.layers[l].data = outputData.layers[l].data.concat(layers[l].data);
			if(v) {
				outputData.layers[l].height += layers[l].height;
			}
			else {
				outputData.layers[l].width += layers[l].width;
			}
		}
	}

	return outputData;
}

function mergeV(mapDatas) {
	var height = 0;
	var n = mapDatas.length;
	var outputData = JSON.parse(JSON.stringify(mapDatas[0]));

	for(var i = 0; i < n; i++) {
		var iter = mapDatas[i];
		height += iter.height;
	}
	outputData.height = height;

	return mergeData(outputData, mapDatas, true);
}

function mergeH(mapDatas) {
	var width = 0;
	var n = mapDatas.length;
	var outputData = JSON.parse(JSON.stringify(mapDatas[0]));

	for(var i = 0; i < n; i++) {
		var iter = mapDatas[i];
		width += iter.width;
	}
	outputData.width = width;

	return mergeData(outputData, mapDatas, false);
}

function merge(inputData) {
	var files = inputData.files;
	var mapDatas = [];

	for(var i = 0; i < files.length; i++) {
		var name = files[i];
		var data = JSON.parse(fs.readFileSync(name, "utf-8"));
		mapDatas.push(data);
	}

	if(inputData.direction && inputData.direction[0] === 'v') {
		var outputData = mergeV(mapDatas);
	}
	else {
		var outputData = mergeH(mapDatas);
	}

	var output = inputData.output;
	console.log("Output: " + output)
	var str = JSON.stringify(outputData, null, '\t');
	fs.writeFileSync(output, str);
}

if(inputFileName) {
	var data = fs.readFileSync(inputFileName,"utf-8");

	if(data) {
		var json = JSON.parse(data);
		merge(json);
	}
}

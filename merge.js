var fs = require("fs");  

var inputFileName = process.argv[2];

function mergeData(output, outputData, mapDatas, v) {
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
//			console.log(outputData.layers[l].width + "x" + outputData.layers[l].height);;
		}
	}

	var str = JSON.stringify(outputData, null, '\t');
	fs.writeFileSync(output, str);
	console.log("Output: " + output)
}

function mergeV(output, mapDatas) {
	var height = 0;
	var n = mapDatas.length;
	var outputData = JSON.parse(JSON.stringify(mapDatas[0]));

	for(var i = 0; i < n; i++) {
		var iter = mapDatas[i];
		height += iter.height;
	}
	outputData.height = height;

	mergeData(output, outputData, mapDatas, true);
}

function mergeH(output, mapDatas) {
	var width = 0;
	var n = mapDatas.length;
	var outputData = JSON.parse(JSON.stringify(mapDatas[0]));

	for(var i = 0; i < n; i++) {
		var iter = mapDatas[i];
		width += iter.width;
	}
	outputData.width = width;

	mergeData(output, outputData, mapDatas, false);
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
		mergeV(inputData.output, mapDatas);
	}
	else {
		mergeH(inputData.output, mapDatas);
	}
}

if(inputFileName) {
	var data = fs.readFileSync(inputFileName,"utf-8");

	if(data) {
		var json = JSON.parse(data);
		merge(json);
	}
}

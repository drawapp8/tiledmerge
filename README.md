Tiled Merge
--------------------------------
本工具用于将多个tiled生成的地图拼接成一个大的地图，目前支持水平和垂直拼接两种方式。

使用方法
--------------------------------
* 1.先安装node.js
* 2.编写input.json，描述拼接的规则。
```
{
	"output":"data/new.json",
	"direction": "vertical",
	"files": [
		"data/map1.json",
		"data/map2.json",
		"data/map3.json",
		"data/map4.json",
		"data/map5.json",
		"data/map6.json",
		"data/map7.json",
		"data/map8.json",
		"data/map9.json",
		"data/map10.json",
		"data/map11.json",
		"data/map12.json",
		"data/map13.json",
		"data/map14.json",
		"data/map15.json",
		"data/map16.json",
		"data/map17.json",
		"data/map18.json",
		"data/map19.json",
		"data/map20.json"]
}
```
_output_: 用于指定输出的文件。

_direction_: 拼接的方向。vertical表示垂直，horizonal表示水平。

_files_: 文件列表，按照指定的顺序拼接。

* 3.运行脚本
```
node merge.js input.json
```

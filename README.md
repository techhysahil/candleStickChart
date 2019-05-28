# candleStickChart (1.0.0)

## Description
Candle stick chart using Vanilla JavaScript and canvas.

## Features
* Candle stick chart using vanilla JS, no library dependency.
* Normalize plot points based on canvas height, canvas width, Data Min Low and Data Max High.
* override available list of options.

## Demo
[JavaScript Candle stick chart Demo](https://boiling-brushlands-19660.herokuapp.com/)

## Quick Overview
```sh
git clone <Repo URL> test-app
cd test-app
npm install
npm start
```

Now you visit : http://localhost:3000/

## Usage
Include candleStickChart.js.
```html
<script type="text/javascript" src="path/to/candleStickChart.js"></script>
```

```js
var graph = new candleStickChart({
    width : 900,
    height : 400,
    bottomMargin : 50,
    leftMargin : 50,
    rightMargin : 50,
    increasingTrendColor : '#00FF00',
    deccreasingTrendColor : '#FF0000',
    candleWidth : 6,
    lineWidth : 1,
    candleLRMargin : 3,
});

graph.draw(data);
```

# Input Data Format
You can pass data in OHLC data format as shown below:

```json
[{
    "Close": 100,
    "Open": 99.74,
    "High": 100.09,
    "Low": 99.59,
    "DT": "2019-02-12T14:30:00.000Z"
}, {
    "Close": 99.86,
    "Open": 98.88,
    "High": 99.94,
    "Low": 98.88,
    "DT": "2019-02-12T14:31:00.000Z"
}, {
    "Close": 99.79,
    "Open": 99.9,
    "High": 100.15,
    "Low": 99.2,
    "DT": "2019-02-12T14:32:00.000Z"
}]
```

## Feature (To be added) 
* Detailed documenttaion of all the options available and methods available.
* Test and add example for update method.
* Adding features like scrolling and zooming based on mousewheel event.
* Adding a tooltip for providing rich information.
* Add test cases for library.
* Option override needs to be testing and fix cases if any.

## License
This project is available under the [MIT](https://opensource.org/licenses/mit-license.php) license.
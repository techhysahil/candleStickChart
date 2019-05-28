/*
jqCandlestick v0.1.0
*/

'use strict';


var candleStickChart = function (options) {
	var defaultOptions = {
		candleWidth : 6,
		lineWidth : 1,
		candleLRMargin : 3,
		minLimit : null,
		maxLimit : null,
		bottomMargin : 50,
		leftMargin : 50,
		rightMargin : 50,
		increasingTrendColor : '#008000',
		deccreasingTrendColor : '#FF0000',
	};
	var options = extend(defaultOptions, options || {});

	//Throw error if canvasId is missing
	if(!options.canvasId){
		throw new Error('canvasId is mandatory arguments');
	}

	var canvas = document.getElementById(options.canvasId);
	var ctx = canvas.getContext("2d");


	/************************* 
		Exposed Function 
	*************************/
	var draw = function(data){
		// Trim array size based on width, candleWidth and Candle left-right margin
		data = data.slice(0, parseInt(options.width/12))

		// Set minLimit and maxLimit value calculated based on Trimmed data
		var minMaxlimit = calcMinMaxLimit(data);
		options.minLimit = minMaxlimit.min;
		options.maxLimit = minMaxlimit.max;
		
		// Update Canvas width and height
		if (ctx.canvas.width !== options.width || ctx.canvas.height !== options.height) {
			ctx.canvas.width = options.width + options.leftMargin + options.rightMargin;
			ctx.canvas.height = options.height + options.bottomMargin;
		}
		
		// Draw X and Y axis
		drawAxis(ctx)

		// Draw X-axis labels
		drawLabels(ctx, data)

		// Traverse each item and draw candle stick
		data.forEach(function(item,index){
			drawCandleStick(options.leftMargin + (index+1)*(options.candleWidth + 2*options.candleLRMargin), scaledValue(item.High), scaledValue(item.Low), scaledValue(item.Open), scaledValue(item.Close));
		})

		ctx.canvas.addEventListener('mousewheel',function(event){
		    if(event.deltaX > 0){
		    	// console.log(event.deltaX)
		    	//TODO : Scroll Left
		    }else{
		    	// console.log(event.deltaX)
		    	//TODO : Scroll Right
		    }

		    if(event.deltaY > 0){
		    	//TODO : Zoom In
		    }else{
		    	//TODO : Zoom Out
		    }
		    return false; 
		}, false);
	}

	var update = function(){
		//TODO : add update code here
		// this.draw()
	}

	/************************* 
		Private Function
	*************************/
	var drawCandleStick = function(x, low, high, close, open){
		if(open < close){
			if(high > close){
				ctx.lineWidth = options.lineWidth;
				ctx.beginPath();
				ctx.moveTo(x,high);
				ctx.lineTo(x,close);
				ctx.strokeStyle = options.increasingTrendColor;
				ctx.stroke();
			}

			if(open > low){
				ctx.lineWidth = options.lineWidth;
				ctx.beginPath();
				ctx.moveTo(x,open);
				ctx.lineTo(x,low);
				ctx.strokeStyle = options.increasingTrendColor;
				ctx.stroke();
			}

			if(close - open > 0){
				ctx.fillStyle = options.increasingTrendColor;
				ctx.beginPath();
				ctx.fillRect(x-(options.candleWidth/2), open, options.candleWidth, close - open);
				ctx.closePath();
			}
		}else{
			if(high > open){
				ctx.lineWidth = options.lineWidth;
				ctx.beginPath();
				ctx.moveTo(x,high);
				ctx.lineTo(x,open);
				ctx.strokeStyle = options.deccreasingTrendColor;
				ctx.stroke();
			}

			if(close > low){
				ctx.lineWidth = options.lineWidth;
				ctx.beginPath();
				ctx.moveTo(x,close);
				ctx.lineTo(x,low);
				ctx.strokeStyle = options.deccreasingTrendColor;
				ctx.stroke();
			}

			if(open - close > 0){
				ctx.fillStyle = options.deccreasingTrendColor;
				ctx.beginPath();
				ctx.fillRect(x-(options.candleWidth/2), close, options.candleWidth, open - close);
				ctx.closePath();
			}
		}
	}

	// Adjust each OHLC Data item based on maxLimit, 
	// minLimit, height and width to normalize the plot
	var scaledValue = function(x){
		var temp = (((options.height - 0)*(x - options.minLimit))/(options.maxLimit - options.minLimit)+0);
		return options.height - temp;
	}

	var drawAxis = function(ctx){
		var leftMargin = options.leftMargin || 0;

		ctx.beginPath();
		ctx.moveTo(leftMargin,0);
		ctx.lineTo(leftMargin,options.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(leftMargin,options.height);
		ctx.lineTo(options.width+leftMargin,options.height);
		ctx.stroke();
	}

	var calcMinMaxLimit = function(data){
		var minLimit, maxLimit;

		data.forEach(function(item, index){
			if(index === 0){
				minLimit = item.Low;
				maxLimit = item.High;
			}

			if(item.High > maxLimit){
				maxLimit = item.High;
			}

			if(item.Low < minLimit){
				minLimit = item.Low;
			}
		})

		return {
			min : minLimit,
			max : maxLimit
		}
	}

	var drawLabels = function(ctx, data){
		// Draw X-axis Labels
		data.forEach(function(item,index){
			if(index%5 === 0){
				var date = new Date(item.DT);
				var time = date.getHours()+ ":" +date.getMinutes(); //Format to display X-axis Labels

				ctx.textAlign = "start"; //Start aligned text. Replace it with "center" to center align text
				ctx.font = "12px Arial";
				ctx.fillText(time, options.leftMargin + (index+1)*(options.candleWidth + 2*options.candleLRMargin) , options.height + 20);	
			}
		})

		// Draw Y-axis Labels
		new Array(11).fill(1).forEach(function(item, index, arr){
			ctx.font = "12px Arial";
			ctx.fillText((options.minLimit + index*(options.maxLimit - options.minLimit)/10).toFixed(3) , 0 , (options.height - index * options.height/10) + 10);	
			
		})
	}

	return {
		draw : draw,
		update : update
	}
}

/******************************************
	 		Helper Functions
******************************************/
var extend = function ( defaults, options ) {
    var extended = {};
    var prop;
    for (prop in defaults) {
        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
            extended[prop] = defaults[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
};
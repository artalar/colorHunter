//"use strict"

let LogOn = false;
function lo9(str, handler, flag){
	if	(!LogOn) return;
	if	(handler) handler(str);
	else console.log(str);
}

lo9("Data.js: Inicializate!");

let targetColorField, activeColorField, dynamicColorField, resultColorField, speed;
let HTMLRoot = document.getElementsByTagName("html")[0];
let userMove = function (){};
let defaultColors = {
	basic: [
		[255, 0, 0],	//"hsl(0, 100, 50)", //red
		[255, 255, 0],	//"hsl(60, 100, 50)", //yellow
		[0, 0, 255]		//"hsl(240, 100, 50)", //blue
	],
	simple: [
		[255, 128, 0],	//"hsl(30, 100, 50)", //orange = yellow + red
		[0, 255, 0],	//"hsl(120, 100, 50)", //green = yellow + blue
		[170, 0, 255]	//"hsl(280, 100, 50)", //violet = blue + red
	],
	composite: [
		[255, 0, 170],	//"hsl(320, 100, 50)", //purple = violet + red
		[0, 0, 255],	//"hsl(240, 100, 50)", //dark blue = violet + blue
		[0, 255, 191],	//"hsl(165, 100, 50)", // = green + blue
		[128, 255, 0]	//"hsl(90, 100, 50)", // = green + yellow
	]
}

function CreateColor (colorCodes, colorType)
{
	lo9("Color: Inicializate: ");
	
	let colorSystems, inputOptions = {
		"colorCodes": colorCodes,
		"colorType": colorType
	}
	newColor();
	
	this.setRGB = function(colorCodes)
	{
		lo9("Color.setRGB: input colorCodes: " + colorCodes);
		inputOptions.colorCodes = colorCodes;
		inputOptions.colorType = 'rgb';
		newColor();
	}
	
	this.setRYB = function(colorCodes)
	{
		lo9("Color.setRYB: input colorCodes: " + colorCodes);
		inputOptions.colorCodes = colorCodes;
		inputOptions.colorType = 'ryb';
		newColor();
	}
	
	this.setHSL = function(colorCodes)
	{
		lo9("Color.setHSL: input colorCodes: " + colorCodes);
		inputOptions.colorCodes = colorCodes;
		inputOptions.colorType = 'hsl';
		newColor();
	}
	
	this.getRGB = function()
	{
		lo9("Color.getRGB: inicializate!");
		let rgb;
		if(colorSystems.rgb) rgb = colorSystems.rgb;
		if(colorSystems.ryb) rgb = colorSystems.rgb = ryb2rgb(colorSystems.ryb);
		if(colorSystems.hsl) rgb = colorSystems.rgb = hsl2rgb(colorSystems.hsl);
		
		lo9("Color.getRGB: output rgb: " + rgb);
		return rgb;
	}
	
	this.getRYB = function()
	{
		lo9("Color.getRYB: inicializate!");
		let ryb;
		if(colorSystems.ryb) ryb = colorSystems.ryb;
		if(colorSystems.rgb) ryb = colorSystems.ryb = rgb2ryb(colorSystems.rgb);
		if(colorSystems.hsl) ryb = colorSystems.ryb = rgb2ryb(colorSystems.rgb = hsl2rgb(colorSystems.hsl));
		
		lo9("Color.getRYB: output ryb: " + ryb);
		return ryb;
	}
	
	this.getHSL = function()
	{
		lo9("Color.getHSL: inicializate!");
		let hsl;
		if(colorSystems.hsl) hsl = colorSystems.hsl;
		if(colorSystems.rgb) hsl = colorSystems.hsl = rgb2hsl(colorSystems.rgb);
		if(colorSystems.ryb) hsl = colorSystems.hsl = rgb2hsl(colorSystems.rgb = ryb2rgb(colorSystems.ryb));
		
		lo9("Color.getHSL: output hsl: " + hsl);
		return hsl;
	}
	
	function newColor ()
	{
		lo9("Color.newColor: input colorCodes: " + inputOptions.colorCodes + '\n' +
		"input colorType: " + inputOptions.colorType);
		
		colorSystems = {
			"ryb": "",
			"rgb": "",
			"hsl": ""
		};
		validateInput();
		
		colorSystems[inputOptions.colorType] = inputOptions.colorCodes;
		lo9("Color.newColor: result colorSystems: " + colorSystems);
	}
	
	function validateInput ()
	{
		lo9("Color.validateInput: Inicializate!")
		
		let colorCodes = inputOptions.colorCodes, colorType = inputOptions.colorType;
		
		if(Object.keys(colorSystems).indexOf(colorType) == -1)
		{
			inputOptions.colorType = "rgb";
			lo9("Color.validateInput: unexepted colorType. Default colorType " + inputOptions.colorType, false, "error");
		} else lo9("Color.validateInput: colorType validate succes!");
		
		switch (inputOptions.colorType) {
			case "rgb":
			case "ryb":
				if (colorCodes && colorCodes.length == 3 &&
					colorCodes[0] >= 0 && colorCodes[0] <= 255 &&
					colorCodes[1] >= 0 && colorCodes[1] <= 255 &&
					colorCodes[2] >= 0 && colorCodes[2] <= 255 )
				{
					lo9("Color.validateInput: Color colorCodes validate succes!");
					break;
				}
				else
				{
					inputOptions.colorCodes = [0,0,0];
					lo9("Color.validateInput: unexepted colorCodes. Default colorCodes " + inputOptions.colorCodes, false, "error");
					break;
				}
			case "hsl":
				if (colorCodes && colorCodes.length == 3 &&
					colorCodes[0] >= 0 && colorCodes[0] <= 360 &&
					colorCodes[1] >= 0 && colorCodes[1] <= 1 &&
					colorCodes[2] >= 0 && colorCodes[2] <= 1 )
				{
					lo9("Color.validateInput: Color colorCodes validate succes!");
					break;
				}
				else
				{
					inputOptions.colorCodes = [0,0,0];
					lo9("Color.validateInput: unexepted colorCodes. Default colorCodes " + inputOptions.colorCodes, false, "error");
					break;
				}
		}
	}
	
	function rgb2ryb (RGB)
	{
		lo9("Color.rgb2ryb: input RGB: " + RGB);
		
		let r = RGB[0], g = RGB[1], b = RGB[2], y, ryb;
		
		// Remove the white from the color
		const White = Math.min(r, g, b);
		
		r -= White;
		g -= White;
		b -= White;
		
		const MaxG = Math.max(r, g, b);
		
		// Get the yellow out of the red+green
		y = Math.min(r, g);
		
		r -= y;
		g -= y;
		
		// If this unfortunate conversion combines blue and green, then cut each in half to
		// preserve the value's maximum range.
		if (b > 0 && g > 0)
		{
			b /= 2;
			g /= 2;
		}
		
		// Redistribute the remaining green.
		y += g;
		b += g;
		
		// Normalize to values.
		const MaxY = Math.max(r, y, b);
		
		if (MaxY > 0)
		{
			let N = MaxG / MaxY;
			
			r *= N;
			y *= N;
			b *= N;
		}
		
		// Add the white back in.
		r += White;
		y += White;
		b += White;
		
		ryb = [
			Math.floor(r),
			Math.floor(y),
			Math.floor(b)
		];
		
		lo9("Color.rgb2ryb: output ryb: " + ryb);
		
		return ryb;
	}
	
	function ryb2rgb (RYB)
	{
		lo9("Color.ryb2rgb: input RYB: " + RYB);
		
		let r = RYB[0], y = RYB[1], b = RYB[2], g, rgb;
		
		// Remove the whiteness from the color.
		const White = Math.min(r, y, b);
		
		r -= White;
		y -= White;
		b -= White;

		const MaxY = Math.max(r, y, b);

		// Get the green out of the yellow and blue
		g = Math.min(y, b);
		
		y -= g;
		b -= g;

		if (b > 0 && g > 0)
		{
			b *= 2.0;
			g *= 2.0;
		}
		
		// Redistribute the remaining yellow.
		r += y;
		g += y;

		// Normalize to values.
		const MaxG = Math.max(r, g, b);
		
		if (MaxG > 0)
		{
			const N = MaxY / MaxG;
			
			r *= N;
			g *= N;
			b *= N;
		}
		
		// Add the white back in.
		r += White;
		g += White;
		b += White;
		
		rgb = [
			Math.floor(r),
			Math.floor(g),
			Math.floor(b)
		];

		lo9("Color.ryb2rgb: output rgb: " + rgb);
		
		return rgb;
	}
	
	function rgb2hsl (RGB)
	{
		lo9("Color.rgb2hsl: input RGB: " + RGB);
		
		let R, G, B, H, S, L, Min, Max, delta, del_R, del_G, del_B, HSL;
		R = RGB[0]/255;
		G = RGB[1]/255;
		B = RGB[2]/255;

		Min = Math.min( R, G, B );
		Max = Math.max( R, G, B );
		delta = Max - Min ;

		L = ( Max + Min ) / 2;

		if ( delta == 0 )
		{
			H = 0;
			S = 0;
		}
		else
		{
			if ( L < 0.5 ) S = delta / ( Max + Min )
			else           S = delta / ( 2 - Max - Min );

			del_R = ( ( ( Max - R ) / 6 ) + ( delta / 2 ) ) / delta;
			del_G = ( ( ( Max - G ) / 6 ) + ( delta / 2 ) ) / delta;
			del_B = ( ( ( Max - B ) / 6 ) + ( delta / 2 ) ) / delta;

			if      ( R == Max ) H = del_B - del_G
			else if ( G == Max ) H = ( 1 / 3 ) + del_R - del_B
			else if ( B == Max ) H = ( 2 / 3 ) + del_G - del_R;

			if ( H < 0 ) H += 1;
			if ( H > 1 ) H -= 1;
		}
		
		H *= 360; S *= 100; L *= 100;
		
		HSL = [
			Math.round(H),
			Math.round(S)/100,
			Math.round(L)/100
		];
		lo9("Color.hsl2rgb: output HSL: " + HSL);
		return HSL;
	}
	
	function hsl2rgb (HSL)
	{
		lo9("Color.hsl2rgb: input HSL: " + HSL);
		
		let H = HSL[0]/360, S = HSL[1], L = HSL[2],
			R, G, B, var_1, var_2, RGB;

		if ( S == 0 )
		{
			R = L * 255;
			G = L * 255;
			B = L * 255;
		}
		else
		{
			if ( L < 0.5 ) var_2 = L * ( 1 + S )
			else           var_2 = ( L + S ) - ( S * L )

			var_1 = 2 * L - var_2

			R = 255 * Hue_2_RGB( var_1, var_2, H + ( 1 / 3 ) ) 
			G = 255 * Hue_2_RGB( var_1, var_2, H )
			B = 255 * Hue_2_RGB( var_1, var_2, H - ( 1 / 3 ) )
		}
		
		RGB = [
			Math.round(R),
			Math.round(G),
			Math.round(B)
		]
		lo9("Color.hsl2rgb: output RGB: " + RGB);
		return RGB;

		function Hue_2_RGB ( v1, v2, vH )
		{
			lo9("Color.hsl2rgb.Hue_2_RGB: v1, v2, vH: " + [v1, v2, vH]);
			
			let color;
			
			if ( vH < 0 ) vH += 1
			if ( vH > 1 ) vH -= 1
			if ( ( 6 * vH ) < 1 ) {color = ( v1 + ( v2 - v1 ) * 6 * vH )}
			else if ( ( 2 * vH ) < 1 ) {color = v2 }
			else if ( ( 3 * vH ) < 2 ) {color = ( v1 + ( v2 - v1 ) * ( ( 2 / 3 ) - vH ) * 6 )}
			else {color = v1};
			
			lo9("Color.hsl2rgb.Hue_2_RGB: color: " + color);
			return color;
		}
	}
	
}

function getRandomColor (type, exclude){
	lo9("Data.getRandomColor: type: " + type + '\n' +
	"exclude: " + exclude);
	
	let colorsArr = defaultColors[type];
	if(exclude) colorsArr = colorsArr.filter(item => item != exclude);
	let count = colorsArr.length - 1;
	let rIndx = Math.round(Math.random() * count);
	
	lo9("Data.getRandomColor: output color: " + colorsArr[rIndx]);
	return colorsArr[rIndx];
}

function getColorsSum (colors, colorSystem){ //in RYB system
	lo9("Data.getColorsSum: input colors: " + colors +
	"\ninput colorSystem: " + colorSystem);
	
	if (colorSystem) 
	{
		for (let color = 0; color < colors.length; color++) {
			colors[color] = (new CreateColor(colors[color], colorSystem)).getRYB();
		}
	}
	
	let resultColor = new Array(3);
	for(let oneThirdColor = 0; oneThirdColor < 3; oneThirdColor++){
		resultColor[oneThirdColor] = 0;
		for(let count = colors.length - 1; count >= 0; count--){
			resultColor[oneThirdColor] += colors[count][oneThirdColor];
		}
	}

	let max = resultColor.reduce((previousValue, currentItem) => previousValue > currentItem ? previousValue : currentItem);
	resultColor = resultColor.map(color => Math.floor(color / max * 255));
	
	resultColor = (new CreateColor(resultColor, 'ryb')).getRGB()
	
	lo9("Data.getColorsSum: output color: " + resultColor);
	return resultColor;
}

function calcColorsDif(colors, colorSystem){ //in HSL system
	lo9("Data.calcColorsDif: input colors: " + colors +
	"\ninput colorSystem: " + colorSystem);
	
	if (colorSystem) 
	{
		for (let color = 0; color < colors.length; color++) {
			colors[color] = (new CreateColor(colors[color], colorSystem)).getHSL();
		}
	}
	
	let def, factors = new Array(3);
	factors[0] = Math.abs(colors[0][0] - colors[1][0]);
	factors[0] = factors[0] >= 40 ? 1 : factors[0] / 40;
	
	factors[1] = Math.abs(colors[0][1] - colors[1][1]);
	//factors[1] = (factors[1] / 0.5) / 2;
	
	factors[2] = Math.abs(colors[0][2] - colors[1][2]);
	//factors[2] = factors[2] > 60 ? 0 : factors[2] / 60;
	
	//def = (factors[0] + factors[1] + factors[2]) / 3;
	def = Math.round(factors[0]  * 100);
	
	lo9("Data.calcColorsDif: result difference: " + def);
	return def;
}

function animateColorField (element, colorsObj, colorName)
{
	lo9("Data.animateColorField: input element: " + element +
	"\ninput colors object: " + colorsObj + 
	"\ninput color name: " + colorName);
	
	return setInterval(changeHSLColor, 20, element, colorsObj, colorName)
	
	function changeHSLColor(element, colorsObj, colorName){
		lo9("Data.animateColorField.changeHSLColor: input element: " + element +
		"\ninput colors object: " + colorsObj + 
		"\ninput color name: " + colorName);
		
		let hue = colorsObj[colorName][0];
		let saturation = colorsObj[colorName][1]*100;
		let lightness = colorsObj[colorName][2]*100;
		let color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
		
		lo9("Data.animateColorField.changeHSLColor: result color: " + color);
		
		element.style.backgroundColor = color;
		
		hue = hue == 360 ? 0 : ++hue;
		colorsObj[colorName][0] = hue;
		colorsObj[colorName][1] = saturation/100;
		colorsObj[colorName][2] = lightness/100;
	}
}
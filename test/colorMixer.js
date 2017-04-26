function mix(colors) {
		let iterations = 19;
		let color1 = colors[0]; //r
		let color2 = colors[1]; //i
		let result;
		//let s = '<li><span class="color_mix_t">Color variations:</span> <font class="rgb-code">RGB values</font> <font class="hex-code">Hex values</font></li>';
		stepR = Math.round((color1.r - color2.r) / iterations);
		stepG = Math.round((color1.g - color2.g) / iterations);
		stepB = Math.round((color1.b - color2.b) / iterations);
		for (let index = 0, a = color1.r, f = color1.g, l = color1.b; index < iterations; index++) {
			if (index == iterations - 1) {
				a = color2.r;
				f = color2.g;
				l = color2.b
			}
			if (a > 255) {
				a = 255
			} else {
				if (a < 0) {
					a = 0
				}
			}
			if (f > 255) {
				f = 255
			} else {
				if (f < 0) {
					f = 0
				}
			}
			if (l > 255) {
				l = 255
			} else {
				if (l < 0) {
					l = 0
				}
			}
			//let c = rgb2hex(a, f, l);
			//s += '<li><div class="color_mix_1" style="background-color:#' + c + ';"></div> <pre class="rgb-code">rgb(' + a + "," + f + "," + l + ')</pre>  <pre class="hex-code">#' + c.toUpperCase() + "</pre>  </li>";
			if (index == 10) result = [a,f,l];
			console.log(result);
			
			a += stepR;
			f += stepG;
			l += stepB
			
		}
		//$("#shades").html(s)
		return result;
	}

/*function mix(colors) {
    var n = 19;
    var r = colors[0];
    var i = colors[1];
    var s = '<li><span class="color_mix_t">Color variations:</span> <font class="rgb-code">RGB values</font> <font class="hex-code">Hex values</font></li>';
    stepR = Math.round((i.r - r.r) / n);
    stepG = Math.round((i.g - r.g) / n);
    stepB = Math.round((i.b - r.b) / n);
    for (var o = 0, u = n, a = r.r, f = r.g, l = r.b; o < u; o++) {
        if (o == u - 1) {
            a = i.r;
            f = i.g;
            l = i.b
        }
        if (a > 255) {
            a = 255
        } else {
            if (a < 0) {
                a = 0
            }
        }
        if (f > 255) {
            f = 255
        } else {
            if (f < 0) {
                f = 0
            }
        }
        if (l > 255) {
            l = 255
        } else {
            if (l < 0) {
                l = 0
            }
        }
        //var c = rgb2hex(a, f, l);
        //s += '<li><div class="color_mix_1" style="background-color:#' + c + ';"></div> <pre class="rgb-code">rgb(' + a + "," + f + "," + l + ')</pre>  <pre class="hex-code">#' + c.toUpperCase() + "</pre>  </li>";
        result = a + "," + f + "," + l;
        console.log(result);
        a += stepR;
        f += stepG;
        l += stepB
    }
    //$("#shades").html(s)
}*/


function createColor(r,g,b){
    return {
        "r": r,
        "g": g,
        "b": b
    }
}

function setColor(doc, color){
    doc.style.backgroundColor = 'rgb(' + [color.r,color.g,color.b] + ')';
}
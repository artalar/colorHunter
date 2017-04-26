"use strict"

lo9("Interface.js: Inicializate!");

function CreateLevel (){
	lo9("Interface.createLevel: Inicializate!");
	
	this.default = function(){
		lo9("Interface.createLevel.default: Inicializate!");
		
		userMove = function(){};
		
		let fields = document.getElementsByClassName("insideField");
		for (let i = 0; i < fields.length; i++) {
			fields[i].style.cssText = "";
			fields[i].innerText = ""
		}
	}
	this.first = function(){
		lo9("Interface.createLevel.first: Inicializate!");
		
		let scoreField = document.getElementById("score");
		let colorFields = {
			"active": document.getElementById("firstActiveField"),
			"dynamic": document.getElementById("firstDynamicField"),
			"target": document.getElementById("firstTargetField"),
			"result": document.getElementById("secondTargetField"),
			"resultText": document.getElementById("thirdTargetField"),
		};
		
		scoreField.innerText = 0;
		colorFields.target.style.width = "100%";
		colorFields.active.style.width = "100%";
		colorFields.dynamic.style.width = "100%";
		
		
		let visibleColors = {};
		visibleColors.active =  getRandomColor("basic");
		visibleColors.dynamic = getRandomColor("basic", visibleColors.active);
		visibleColors.target =  getColorsSum(
			[visibleColors.active, visibleColors.dynamic], 'rgb'
		);
		visibleColors.dynamic =  [0,1,0.5]; //hsl
		
		colorFields.active.style.backgroundColor = "rgb(" + visibleColors.active + ")";
		colorFields.target.style.backgroundColor = "rgb(" + visibleColors.target + ")";
		
		let intervalId = animateColorField(colorFields.dynamic, visibleColors, "dynamic");
		
		userMove = function (){
			lo9("Interface.createLevel.first.userMove: Inicializate!");
			
			clearInterval(intervalId);
			userMove = function(){};
			
			colorFields.target.style.width = "49.5%";
			colorFields.result.style.left = "50.5%";
			colorFields.result.style.width = "49.5%";
			
			visibleColors.dynamic = (new CreateColor(visibleColors.dynamic, 'hsl')).getRGB();
			visibleColors.result = getColorsSum(
				[visibleColors.active, visibleColors.dynamic], 'rgb'
			);
			colorFields.result.style.backgroundColor = "rgb(" + visibleColors.result + ")";
			
			let dif = calcColorsDif(
				[visibleColors.target, visibleColors.result], 'rgb'
			);
			
			colorFields.resultText.style.backgroundColor = "rgba(255,255,255,0.7)";
			colorFields.resultText.innerHTML = "Equal to: " + (100 - dif) + "%";
			
			//FIX IT BY RIGHT WAY
			function next(param){
				(new CreateLevel).second(param[0], param[1])
			}
			console.log(dif);
			if (dif < 100){
				scoreField.innerText = +scoreField.innerText + (100 - dif);
				setTimeout(next, 5000, [visibleColors.result, visibleColors.target])
			}else{
				alert("You lose!");
				location.reload()
			}
		}
	}
	
	this.second = function(privResultColor, privTargetColor){
		lo9("Interface.createLevel.second: Inicializate!");
		
		this.default();
		
		let scoreField = document.getElementById("score");
		let colorFields = {
			"active": document.getElementById("firstActiveField"),
			"dynamic": document.getElementById("firstDynamicField"),
			"target": document.getElementById("firstTargetField"),
			"result": document.getElementById("secondTargetField"),
			"resultText": document.getElementById("thirdTargetField"),
		};
		
		colorFields.target.style.width = "100%";
		colorFields.active.style.width = "100%";
		colorFields.dynamic.style.width = "100%";
		
		
		let visibleColors = {};
		visibleColors.active =  privResultColor;
		visibleColors.dynamic = getRandomColor("basic", privTargetColor);
		visibleColors.target =  getColorsSum(
			[visibleColors.active, visibleColors.dynamic], 'rgb'
		);
		visibleColors.dynamic =  [0,1,0.5]; //hsl
		
		colorFields.active.style.backgroundColor = "rgb(" + visibleColors.active + ")";
		colorFields.target.style.backgroundColor = "rgb(" + visibleColors.target + ")";
		
		let intervalId = animateColorField(colorFields.dynamic, visibleColors, "dynamic");
		
		userMove = function (){
			lo9("Interface.createLevel.first.userMove: Inicializate!");
			
			clearInterval(intervalId);
			userMove = function(){};
			
			colorFields.target.style.width = "49.5%";
			colorFields.result.style.left = "50.5%";
			colorFields.result.style.width = "49.5%";
			
			visibleColors.dynamic = (new CreateColor(visibleColors.dynamic, 'hsl')).getRGB();
			visibleColors.result = getColorsSum(
				[visibleColors.active, visibleColors.dynamic], 'rgb'
			);
			colorFields.result.style.backgroundColor = "rgb(" + visibleColors.result + ")";
			
			let dif = calcColorsDif(
				[visibleColors.target, visibleColors.result], 'rgb'
			);
			
			colorFields.resultText.style.backgroundColor = "rgba(255,255,255,0.7)";
			colorFields.resultText.innerHTML = "Equal to: " + (100 - dif) + "%";
			
			//FIX IT BY RIGHT WAY
			function next(param){
				(new CreateLevel).second(param[0], param[1])
			}
			console.log(dif);
			if (dif < 100){
				scoreField.innerText = +scoreField.innerText + (100 - dif);
				setTimeout(next, 5000, [visibleColors.result, visibleColors.target])
			}else{
				alert("You lose!\nYour score is: " + scoreField.innerText);
				location.reload()
			}
		}
	}
}
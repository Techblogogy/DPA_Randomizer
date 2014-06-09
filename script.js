var canvas; //= document.getElementById('imageHolder');
var	context; //= canvas.getContext("2d");
var	canvasHolder = document.getElementById("canvasHolder");

var conrol = document.getElementById("contr");
var qAmmount = document.getElementById("nO");
var noRandom = document.getElementById("ch");
var genButton = document.getElementById("startB");

noRandom.checked = true;

genButton.addEventListener("click", GenerateVariant, false);

window.onload = Init;

var questionDir = "images/";

var randomQ = 17;
var randomV = [];

var randomImg = [];

var canWidth = 3120;
	canHeight = 4099;

var variant = 1;
var noRandomB = false;

function GenerateVariant()
{
	noRandomB = noRandom.checked;
	$("#contr").remove();

	canvas = document.createElement("canvas");
		canvas.width = canWidth;
		canvas.height = canHeight;
		canvas.className = "imageHolder";
	context = canvas.getContext("2d");

	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,canvas.width,canvas.height);

	if (!noRandomB)
		randomGen();
	else
		staticGen();
	
	randomGet();
	//randomPut();

	canvasHolder.appendChild(canvas);
}

function randomGen()
{
	for (var i=0; i<randomQ; i++)
	{
		randomV[i] = Math.floor((Math.random() * 20) + 1);
	}

	console.log(randomV);
}

function staticGen()
{
	for (var i=0; i<randomQ; i++)
	{
		randomV[i] = qAmmount.value;
	}
}

var index = 0;
var firstT = true;
var img;
function randomGet()
{
	if (!firstT)
	{
		randomImg[index] = img;
		index++;
	}

	if (index < randomQ)
	{
		img = new Image();
		img.src = questionDir + ("v"+randomV[index]) + "/" + ("q"+(index+1)+".png");
		img.onload = randomGet;

		firstT = false;
	}
	else
	{
		randomPut();
	}

	/*for (var i=0; i<randomQ; i++)
	{
		img = new Image();
		img.src = questionDir + ("v"+randomV[index]) + "/" + ("q"+(index+1)+".png");
		//img.onload = randomGet;
	}*/
}

var lastX = 0;
var lastY = 110;
function randomPut()
{
	for (var i=0; i<randomQ; i++)
	{
		var newW = randomImg[i].width; //canvas.width; //randomImg[i].width/2;
		var newH = randomImg[i].height; //randomImg[i].height/randomImg[i].width * newW;

		randomImg[i].width = newW;
		randomImg[i].height = newH;

		if (lastY+newH > canvas.height)
		{
			lastX += newW;
			lastY = 0;
		}

		context.drawImage(randomImg[i],lastX,lastY/*, newW, newH*/);
		lastY += newH;
	}

	context.font = "80px Times New Roman";
	context.fillStyle = "#000000";
	context.fillText("Варіант "+qAmmount.value,0,80);
}

function Init()
{
	//for (var a=0; a<10; a++)
	//{
		//GenerateVariant(context);
	//}
}
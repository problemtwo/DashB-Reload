window.onload = function() {
	function id(i){return document.getElementById(i);}
	function cls(c){return document.getElementsByClassName(c);}
	function tag(t){return document.getElementsByTagName(t);}

	let shift = false;
	let alt = false;

	window.onkeydown = function(e){
		if(e.keyCode === 16){shift = true;}
		else if(e.keyCode === 18){alt = true;}
	};
	window.onkeyup = function(e){
		if(e.keyCode === 16){shift = false;}
		else if(e.keyCode === 18){alt = false;}
	};

	[].forEach.call(cls('circle'),function(el){
		el.onclick = function(e){
			if(shift){
				el.textContent = Math.max(0,parseInt(el.textContent) - (alt ? 10 : 1));
				e.preventDefault();
			}else{
				el.textContent = Math.min(100,parseInt(el.textContent) + (alt ? 10 : 1));
			}
			let value = 0;
			[].forEach.call(cls('percent'),function(el){
				value += parseInt(el.textContent);
			});
			value /= cls('percent').length;
			id('main-percent').textContent = value;
			}	
	});

	id('main-percent').onclick = function(){};

	setInterval(function(){
		[].forEach.call(cls('circle'),function(el){
			let context = el.getContext('2d');
			context.clearRect(0,0,el.width,el.height);
			context.strokeStyle = getComputedStyle(tag('body')[0])
				.getPropertyValue('--accent');
			context.lineWidth = 5;
			context.beginPath();
			let percent = parseInt(el.textContent) * Math.PI / 50;
			context.arc(el.width/2,el.height/2,
				Math.min(el.width/2,el.height/2)*0.9,0,percent);
			context.stroke();

			context.fillStyle = getComputedStyle(tag('body')[0])
				.getPropertyValue('--accent');
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.font = '36px VT323';
			context.fillText(el.textContent + '%',el.width/2,el.height/2);
		});

	},1000/60);
};

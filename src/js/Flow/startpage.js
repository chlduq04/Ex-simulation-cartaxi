function startpage(){
	var self = this;
	this.simulation_start = true;
	this.simulation_speed = 30;
	this.target = $("#loading-bar");
	this.video = $("#opening")[0];
	this.click = false;
	this.replay = false;

	this.initPersent = 0;
	this.persent = 0;
	this.targetWidth = 317;

	this.init = function(){
		$("#road").hide();
		self.startbuttonLightOff();
		self.startbuttonClick();
		self.replaybuttonClick();
		self.loadingBar();
		start.setPersent();
	}
	this.setPersent = function(){
		this.persent+=10;
	}
	this.startbuttonLightOff = function(){
		$("#sp-startbutton").fadeOut(800,function(){
			if(!self.click){
				self.startbuttonLightOn();
			}
		});
	}
	this.startbuttonLightOn = function(){
		$("#sp-startbutton").fadeIn(800,function(){
			if(!self.click){
				self.startbuttonLightOff();
			}
		});
	}
	this.startbuttonClick = function(){
		$("#sp-startbutton").click(function(){
			self.click = true;
			self.video.pause();
			$("#sp-startbutton").removeClass("sp-startbutton").addClass("sp-startbutton-down");
			$("#sp-startbutton-light").removeClass("sp-startbutton-light").addClass("sp-startbutton-light-down");
			$("#opening").css({"display":"none"});
			$("#startpage").fadeOut(500,function(){
				$("#road").fadeIn(500,function(){
					self.simulation_reset();					
				});
			});
		});
	}
	this.simulation_reset  = function(){
		this.simulation_start = false;
		setTimeout(function () {
			self.simulation();
		},50);
	}
	this.simulation = function(){
		this.simulation_start = true;
//		simul = new Traffic({
//		drawCar3D : gl.drawCar3D,
//		drawCarBack3D : gl.drawCarBack3D,
//		deleteCar3D : gl.deleteCar,
//		camera3D : gl.controlCamera,
//		initCamera3D : gl.initCamera,
//		render3D : gl.rendering,
//		drawPlayer : gl.drawCarPlayer3D
//		});
		front.settingSound();
		simul.drawLoad();
		simul.init();
		self.myLoop();
		tutorials.init();
	}
	this.myLoop = function(){           
		setTimeout(function () {    
			if ( simul.moveCars()) { 
				self.myLoop();            
			}                      
		}, self.simulation_speed)
	}

	this.replaybuttonClick = function(){
		$("#sp-replaybutton-light").click(function(){
			$(this).removeClass("sp-replaybutton-light").addClass("sp-replaybutton");
			setTimeout(function(){
				$("#sp-replaybutton-light").removeClass("sp-replaybutton").addClass("sp-replaybutton-light");
				self.replay = true;
				$("#sp-replaybutton").fadeOut();
				self.video.play();
			},200);
		});
		$("#opening").bind('ended', function(){
			self.replay = false;
		});
	}

	this.loadingBar = function(){
		var loading = self.targetWidth / 100 * self.initPersent;
		self.target.css({"width":loading+"px"});
		if( self.initPersent < self.persent ){
			setTimeout(function(){
				self.initPersent += 2;
				self.loadingBar();
			}, 100 );
		}else if( self.initPersent >= 99 ){
			self.target.css({"width":self.targetWidth+"px"});
			$("#loading-background").fadeOut(1000);
		}else{
			setTimeout(function(){
				self.loadingBar();
			}, 100);
		}
	}
	return this;
}

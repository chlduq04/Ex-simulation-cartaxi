function paringpage(){
	var self = this;
	var initPersent = 570;
	var marginPersent = 0;
	var switchPersent = true;
	var paring = true;
	this.paringLight = false;
	this.count;
	this.click;
	this.paringbuttonSwitch;
	this.init = function(){ 
		self.click = false;
		self.paringbuttonSwitch = false;
		start.setPersent();
	}
	this.paringClickSwitch = function(){
		self.paringbuttonSwitch = true;
	}
	this.paringStart = function(){
		$("#paringpage").fadeIn(500);

	}
	this.paringReady = function( persent ){
		if( switchPersent ){
			if( persent > 97 ){
				$("#prepare1").css({ "margin-left" : "285px" });
				$("#prepare2").css({ "width" : "0px" });
				switchPersent = false;
				self.paringLight = true;
				self.paringSuccess();
			}else{
				initPersent = Math.floor( 570 - persent * 5.7 );
				marginPersent = Math.floor( persent * 2.83 );
				$("#prepare1").css({ "margin-left" : marginPersent });
				$("#prepare2").css({ "width" : initPersent });
			}
		}
	}
	this.paringLightOff = function(){
		$("#paringpreparebuttonoff").fadeOut(500,function(){
			if(!self.paringLight){
				self.paringLightOn();
			}
		});
	}
	this.paringLightOn = function(){
		$("#paringpreparebuttonoff").fadeIn(500,function(){
			if(!self.paringLight){
				self.paringLightOff();
			}
		});	
	}
	this.paringSuccess = function(){
		$("#paringmoney").css({ "display" : "block" })
		$("#paringinfo").css({ "display" : "block" })
		$("#paringnumber").css({ "display" : "block" })
		$("#paringpreparebuttonoff").css({ "display" : "none" });
		$("#paringpreparebutton").css({"display":"none"});
		self.paringbutton();
	}
	this.paringbutton = function(){
		$("#paringpreparebutton").fadeOut(1000,function(){
			$("#prepare1").fadeOut(500);
			$("#prepare2").fadeOut(500);
			$("#prepare3").fadeOut(500);
			$("#paringstartbutton").fadeIn(1000,function(){
				$(this).click(function(){
					if(paring){
						$(this).removeClass("paringstartbutton").addClass("paringstartbuttonclick");
						$(this).fadeOut(500,function(){
							$(this).removeClass("paringstartbuttonclick").addClass("paringsuccessbutton");
							$(this).fadeIn(500);
							$("#paringnumber").removeClass("paringnumber").addClass("paringnumbersuccess");
						});
						simul.defaults.paringSuccess();
						paring  = false;
						tutorials.tutorialNext(12);
					}else{
						$("#paringpage").fadeOut(500);
						simul.desearchMotion();
						simul.defaults.unparing();
						self.reset();
						$("#car0").mousedown();
						paring = true;
						tutorials.tutorialNext(25);
					}
				});
			});
		});
	}
	/*
	this.paringLightOff = function(){
		$("#pm-first").fadeOut(800,function(){
			if(!self.click){
				self.paringLightOn();
			}
		});
	}
	this.paringLightOn = function(){
		$("#pm-first").fadeIn(800,function(){
			if(!self.click){
				self.paringLightOff();
				if( self.paringbuttonSwitch ){
					self.paringButton();
				}
			}
		});
	}
	this.paringButton = function(){
		$("#paringinfo-middle").click(function(){
			simul.defaults.paringSuccess();
			self.paringSuccess();
		})
		self.click = true;
	}
	this.paringSuccess = function(){
		self.click = true;
		$("#pm-first").hide();
		$("#paringinfo-middle").css({
			"background":"url('./image/navigation/navigation-paring-alert-unparing.png')",
			"background-position":"-278px 32px",
			"background-repeat": "no-repeat"
		});
		$("#paringinfo-middle").click(function(){
			$("#paringinfo-middle").css({
				"background-position":"22px 32px"
			});
			$("#paringpage").hide();
			simul.desearchMotion();
			simul.defaults.unparing();
			self.reset();
			$("#car0").mousedown();
		});
		$("#pr-second").hide();
		$("#pl-second").hide();
		$("#pr-first").css({
			"background":"url('./image/navigation/navigation-paring-alert-success.png')",
			"background-repeat": "no-repeat",
			"background-position": "70px 35px"
		});
	}
	this.reset = function(){
		var a = $("#paringpage");
		while( a.length > 0 ){
			a.removeAttr("style");
			a = a.children();
		}
		self.init();
	}
	 */
	this.reset = function(){
		var a = $("#paringpage");
		while( a.length > 0 ){
			a.removeAttr("style");
			a = a.children();
		}
		self.init();
	}

}
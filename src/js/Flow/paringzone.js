function paringzone(){
	var self = this;
	var paringSuccess = false;
	var redArrowLeft = 5;
	var redArrowLeftToken = false;
	var redArrowLeftSpeed = 0.4;
	var redArrowLeftMax = 70;
	var redArrowRight = 5;
	var redArrowRightToken = false;
	var redArrowRightSpeed = 0.4;
	var redArrowRightMax = 10;

	var ArrowMove = 70;
	var paringBar = 0;
	var minimumParingBar = 0;
	var maximumParingBar = 555;
	var textParingBar = 485;

	var paring = false;
	var prepareParing = true;
	var rotate = 0;

	var speedValue = 50;
	var initSpeed = 100;
	var leftSpeed = -59;
	var limitSpeed = 50;
	var nowSpeed = -1;

	var hpaValue = 0;
	var initHpa = 0;
	var limitHpa = 20;
	var nowHpa = 1;

	var successParing = false;

	var breakSpeed = false;

	this.init = function(){ 

	}

	/*** Prepare Paring Car ***/

	this.startParing = function(){
		$("#ui-center").fadeIn(1000);
	}
	this.startParingPersent = function(){
		setTimeout(function(){
			paring = true;
		},10000)
	}
	this.paringRedArrowRightSpeed = function(value){
		redArrowRightSpeed += value;
	}
	this.paringRedArrowLeftSpeed  = function(value){
		redArrowLeftSpeed += value;
	}

	this.paringRedArrowRight = function(){
		if( redArrowRight < redArrowRightMax ){
			redArrowRight += redArrowRightSpeed;
			$("#ucr-2").css({"margin-right":redArrowRight+"px"});
		}
	}
	this.paringRedArrowLeft = function(){
		if( redArrowLeft < redArrowLeftMax ){
			redArrowLeft += redArrowLeftSpeed;
			$("#ucr-1").css({"margin-left":redArrowLeft+"px"});
		}
	}
	this.prepareParing = function( value ){
		if(paring){
			self.paringRedArrowRight();
			self.paringRedArrowLeft();
			if(value != null){
				ArrowMove += value*2;
			}
			if(ArrowMove < 60){
				ArrowMove = 60;
			}
			if(ArrowMove > 68){
				ArrowMove = 68;
			}
			rotate = ArrowMove*8 - 510;
			
			$('#ui-center-red').css({"margin-left":ArrowMove+"px"});
			$("#ui-bar-center-point").css({ "transform":"rotate("+rotate+"deg)" });
		}
	}
	this.prepareParingBar = function( value ){
		if(paring){
			if( paringBar + value > minimumParingBar && paringBar + value < maximumParingBar ){
				paringBar += value;
				var value = paringBar;
				if( paringBar < 70 ){
					$('#ui-center-prepare1').css({"height":value+"px"});										
				}else if( paringBar >= 70 && paringBar < 75 ){
					$('#ui-center-prepare1').css({"height":value+"px"});										
					value -= 47;
					$('#ui-center-prepare1').css({"width":value+"px"});										
				}else if( paringBar >= 75 && paringBar < 279 ){
					value -= 47;
					$('#ui-center-prepare1').css({"height":"75px"});										
					$('#ui-center-prepare1').css({"width":value+"px"});										
				}else if( paringBar >= 279 && paringBar < 488 ){
					value -= 279;
					$('#ui-center-prepare1').css({"width":"232px"});										
					$('#ui-center-prepare2').css({"width":value+"px"});										
				}else{
					var revalue;
					value -= 279;
					$('#ui-center-prepare2').css({"width":value+"px"});										
					value -= 199;
					$('#ui-center-prepare2').css({"height":value+"px"});													
					value -= 75;					
					$('#ui-center-prepare2').css({"background-position-y":value+"px"});										
					revalue = 20-value;
					$('#ui-center-prepare2').css({"margin-top":revalue+"px"});										
				}
			}
		}
	}
	this.prepareParingText = function( value ){
		self.prepareParingBar( value * 1.2 );
		if( prepareParing && paring ){
			var text = Math.floor( paringBar / maximumParingBar * 100 ) + 10;
			if( text > 98 ){
				text = 100;
				$("#ui-center").fadeOut(300,function(){
					$(this).removeClass("prepareParingSuccess").addClass("ui-center-success");
					$(this).fadeIn(300);
					simul.paringArrowStart = true;
				});
				prepareParing = false;
			}
			$('#ui-bar-center-persent').html(text+"%");
			return text;
		}
	}
	this.endPreparePage = function(){
		paring = false;
	}

	/*** Now Paring ***/

	this.paringUI = function(){
		$("#ui-center").addClass("prepareParingSuccess");
		$("#ui-center-prepare").css({ "display":"none" });
		$("#ui-bar-center-point").css({"display" : "block"});
		$("#ui-bar-center-persent").css({"display":"none"});
		$("#ui-bar-left-range").css({"display":"block"});
		$("#ui-bar-left-persent").css({"display":"block"});
		$("#ui-bar-right-range").css({"display":"block"});
		$("#ui-bar-right-persent").css({"display":"block"});
		self.paringPersentSpd();
//		self.paringPersentHpa();
	}

	this.unparingPrepare = function(){
		$("#ui-bar-center-arrow").css({"display":"none"});
		self.unparingAlert();
		$("#bnc-video")[0].pause();
		$("#bottom-navigation-normal")[0].className = "bottom-navigation-normal";
		$("#bnc-video").fadeOut(500,function(){
			setTimeout(function(){
				$("#bnc-9").css({"display":"none"});
				$("#bnc-1").removeClass("bnc-1-paring").addClass("bnc-1");
				$("#bnc-8").removeClass("bnc-8-paring").addClass("bnc-8");
				$("#bnc-1").hide();
				$("#bnc-8").hide();
				$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-down-paring";
				$("#top-navigation-normal")[0].className = "top-navigation-normal-slide-up";
				$("#prepareparing")[0].className = "prepareparing-slide-down";
				setTimeout(function(){
					$("#top-navigation-normal").css({"display":"none"});
					$("#bottom-navigation").show();
					$('#top-navigation')[0].className = "top-navigation-after-paring";
				},500);
			},1000);
		});
	}
	
	this.paringPersentSpd = function(){
		if( nowSpeed + initSpeed > limitSpeed && nowSpeed + initSpeed < 200 ){
			initSpeed += nowSpeed;
			leftSpeed -= nowSpeed;
			$("#ui-bar-left-persent").css({
				"margin-left" : initSpeed,
				"background-position-x" : leftSpeed
			});
			speedValue -= nowSpeed;
			$("#ui-bar-left-range").html( speedValue );
		}

		if( !breakSpeed && ( initSpeed > limitSpeed ) ){
			if( Math.random() * 100 > 90 ){
				breakSpeed = true;
				nowSpeed = -nowSpeed;
				self.paringPersentHpa();
			}else{
				$("#ui-bar-right-range").html( hpaValue );
			}
		}else if( initSpeed < limitSpeed + 10 ){
			initSpeed -= nowSpeed;
			leftSpeed += nowSpeed;
			speedValue += nowSpeed;
			$("#ui-bar-right-range").html( hpaValue );
		}else{
			$("#ui-bar-right-range").html( hpaValue );
		}

		setTimeout(function(){
			if(!successParing){
				self.paringPersentSpd();
			}
		},1500);
	}

	this.paringPersentHpa = function(){
		if( nowHpa + initHpa >= 0 ){
			initHpa += nowHpa;
			var width = initHpa *4;
			$("#ui-bar-right-persent").css({
				"width" : width
			});
			hpaValue += nowHpa;
			$("#ui-bar-right-range").html( hpaValue );
		}else{
			nowSpeed = -nowSpeed;
			breakSpeed = false;
		}

		if( initHpa < limitHpa ){
			if( breakSpeed ){
				setTimeout(function(){
					self.paringPersentHpa();
				},100);
			}else{
				var ran = Math.floor( Math.random() * 6 ) - 3;
				limitSpeed -= ran;
				limitHpa += ran;
				nowHpa = -nowHpa;
			}
		}else{
			nowHpa = -nowHpa;
			setTimeout(function(){
				self.paringPersentHpa();
			},100);
		}
	}


	/*** Prepare Unparing Car ***/

	this.unparing = function(){
		successParing = true;
		$("#ui-center").css({ "display" : "none" });
	}
	this.unparingAlert = function(){
		$("#ui-center-bar").addClass("successParingSuccess");
	}

}
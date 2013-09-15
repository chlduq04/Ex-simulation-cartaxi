var paringPage;
function navigation(){
	var self = this;
	this.tutorial = true;
	this.slide = 120;
	this.slideSpeed = 0;
	this.paringStart = false;
	this.init = function(){
		paringPage = new paringpage();
		$("#bottom-navigation-clicked").hide();
		$("#bnc-1").hide();
		$("#bnc-8").hide();
		$("#bnc-2").hide();
		$("#bnc-3").hide();
		$("#bnc-4").hide();
		$("#bnc-5").hide();
		$("#bnc-6").hide();
		$("#bnc-7").hide();
		self.navigationBottomButtonClick();
		self.navigationBottomButtonClickUp();
		self.paring();
		paringPage.init();
		$("#bnc-9").click(function(){
			$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-up-paring-dmb";
			setTimeout(function(){
				$("#bnc-video").css({ "display" : "block" });
				$("#bnc-video")[0].play();
				$("#bottom-navigation-normal")[0].className = "bottom-navigation-video"
				setTimeout(function(){
					tutorials.tutorialNext(18);
				},7000)
			},500)
		});
		start.setPersent();
	}
	
	this.navigationBottomButtonClick = function(){
		$("#bn-button").click(function(){
			if(self.paringStart){
				tutorials.tutorialNext(7);
				$("#bn-button").css({
					"background" : "url('./image/navigation/navigation-bottom-button.png')",
					"background-position" : "0 0",
					"background-repeat" : "no-repeat"
				});
				setTimeout(function(){
					$("#bottom-navigation").hide();
					self.navigationBottomSlideUpParing();
				},200);
			}else{
				$("#bn-button").css({
					"background" : "url('./image/navigation/navigation-bottom-button.png')",
					"background-position" : "0 0",
					"background-repeat" : "no-repeat"
				});
				setTimeout(function(){
					$("#bottom-navigation").hide();
					self.navigationBottomSlideUp();
				},200);
			}
		});
	}

	this.navigationBottomSlideUp = function(){
		$("#bottom-navigation-clicked").show();
		self.clickSlideUp();
		$("#bn-button").css({
			"background-position" : "-50px 0",
		});
	}
	
	this.clickSlideUp = function(){
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-up";
		$("#bnc-1").fadeIn(1000);
		$("#bnc-2").fadeIn(1000);
		$("#bnc-3").fadeIn(1000);
		$("#bnc-4").fadeIn(1000);
		$("#bnc-5").fadeIn(1000);
		$("#bnc-6").fadeIn(1000);
		$("#bnc-7").fadeIn(1000);
		$("#bnc-8").fadeIn(1000,function(){
			tutorials.tutorialNext(8);
		});
	}
	
	this.navigationBottomSlideUpParing = function(){
		$("#bottom-navigation-clicked").show();
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-up-paring";
		$("#top-navigation-normal")[0].className = "top-navigation-normal-slide-up";
		$("#prepareparing")[0].className = "prepareparing-slide-up";
		
		if( $("#top-navigation-normal").css("display") != "block" ){
			$("#top-navigation")[0].className = "top-navigation-after-paring-up";
		}

		$("#bnc-1").removeClass("bnc-1").addClass("bnc-1-paring");
		$("#bnc-8").removeClass("bnc-8").addClass("bnc-8-paring");
		$("#bnc-1").fadeIn(1000);
		$("#bnc-8").fadeIn(1000);
		$("#bn-button").css({
			"background-position" : "-50px 0",
		});
		$("#bnc-9").css({"display":"block"});
		tutorials.tutorialNext(17);
	}
	
	this.paring = function(){
		$("#bnc-2").click(function(){
			self.paringStart = true;
			$(this).css({"background-position" : "8px 30px"})
			setTimeout(function(){
				self.navigationBottomSlideDown();
				simul.searchMotion();
				simul.startparing(42);
				$("#car0").mousedown();
			},100);
		})
	}
	
	this.navigationBottomSlideDown = function(){
		$("#bnc-1").fadeOut(50);
		$("#bnc-2").fadeOut(50);
		$("#bnc-3").fadeOut(50);
		$("#bnc-4").fadeOut(50);
		$("#bnc-5").fadeOut(50);
		$("#bnc-6").fadeOut(50);
		$("#bnc-7").fadeOut(50);
		$("#bnc-8").fadeOut(50);
		self.clickSlideDown();
	}
	
	this.navigationBottomSlideDownParing = function(){
		$("#bnc-9").css({"display":"none"});
		$("#bnc-1").removeClass("bnc-1-paring").addClass("bnc-1");
		$("#bnc-8").removeClass("bnc-8-paring").addClass("bnc-8");
		$("#bnc-1").hide();
		$("#bnc-8").hide();
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-down-paring";
		$("#top-navigation-normal")[0].className = "top-navigation-normal-slide-down";
		if( $("#top-navigation-normal").css("display") != "block" ){
			$("#top-navigation")[0].className = "top-navigation-after-paring";
		}
		$("#prepareparing")[0].className = "prepareparing-slide-down";
		setTimeout(function(){
			$("#bottom-navigation").show();
		},500);
	}

	this.navigationBottomButtonClickUp = function(){
		$("#bnc1-button").click(function(){
			if(self.paringStart){
				$("#bnc1-button").css({
					"background-position" : "-1px -2px",
					"background-repeat" : "no-repeat"
				});
				setTimeout(function(){
					self.navigationBottomSlideDownParing();
					$("#bnc1-button").css({
						"background-position" : "-51px -2px",
						"background-repeat" : "no-repeat"
					});
				},200);
			}else{
				$("#bnc1-button").css({
					"background-position" : "-1px -2px",
					"background-repeat" : "no-repeat"
				});
				setTimeout(function(){
					self.navigationBottomSlideDown();
					$("#bnc1-button").css({
						"background-position" : "-51px -2px",
						"background-repeat" : "no-repeat"
					});
				},200);
			}
		});	
	}

	this.clickSlideDown = function(){
		$("#bottom-navigation-clicked")[0].className = "bottom-navigation-clicked-down";
		setTimeout(function(){
			$("#bottom-navigation").show();
		},500);
	}

	
	this.simulationKeySet = function(){
		/** Mouse click **/
		$(".dr-reflesh").click(function(){
			self.simulationStart();
		});


		$(".ds-searching").click(function(){
			simul.searchLink($(".ds-target").val());
		});
		$('.make-car1-blue').click(function(){
			simul.startCar( "top", 30, false );
		});
		$('.make-car1-red').click(function(){
			simul.startCar( "top", 30, true );
		});
		$('.make-car2-blue').click(function(){
			simul.startCar( "top", 34, false );
		});
		$('.make-car2-red').click(function(){
			simul.startCar( "top", 34, true );
		});
		$('.make-car3-blue').click(function(){
			simul.startCar( "bottom", 39, false );
		});
		$('.make-car3-red').click(function(){
			simul.startCar( "bottom", 39, true );
		});
		$('.make-car4-blue').click(function(){
			simul.startCar( "bottom", 43, false );
		});
		$('.make-car4-red').click(function(){
			simul.startCar( "top", 43, true );
		});
	}

	return this;
}

function tutorial(){
	var self = this;
	this.fadein = 200;
	this.fadeout = 200;
	this.timeout = 6000;
	this.timeout1 = 5000;
	this.timeout2 = 4000;

	this.crmk1time = 8000;	//8000;
	this.crmk2time = 17000;	//17000;
	this.crmk3time = 22000;	//22000;

	this.endingtime = 10000;
	this.tutorial_count = 1;
	this.crmk_count = 1;
	this.tutorial_start = true;
	this.div_3d = $("#tutorial_3d");
	this.div_navi = $("#tutorial_navi");
	this.sound = $("#tutorial_effect")[0];
	this.init = function(){
	/*
		self.div_navi.click(function(){
			$(this).fadeOut(self.fadeout);
		});
	*/
		self.tutorialNext();
	}
	this.soundPlay = function(){
		setTimeout(function(){
			self.sound.play();	
		},200);
	}
	this.crmkNext = function(){
		switch(self.crmk_count){
		case 1:
			self.crmk1();
			break;
		case 2:
			self.crmk2();
			break;
		case 3:
			self.crmk3();
			break;
		}
		self.crmk_count++;
	}
	this.setTutorialBackground = function(){
		$("#crmk-background").fadeIn(self.fadein);
	}
	this.unsetTutorialBackground = function(){
		$("#crmk-background").fadeOut(self.fadeOut);
	}
	this.tutorialNext = function(number){
		if(self.tutorial_start){
			if(number){
				if(self.tutorial_count == number){
					self.soundPlay();
					switch(self.tutorial_count){
					case 1:
						self.tutorial1();
						break;
					case 2:
						self.tutorial2();
						break;
					case 3:
						self.tutorial3();
						break;
					case 4:
						self.tutorial4();
						break;
					case 5:
						self.tutorial5();
						break;
					case 6:
						simul.startCarTaxi = true;
						self.tutorial6();
						break;
					case 7:
						self.tutorial7();
						break;
					case 8:
						self.tutorial8();
						break;
					case 9:
						self.tutorial9();
						break;
					case 10:
						self.tutorial10();
						break;
					case 11:
						self.tutorial11();
						break;
					case 12:
						self.tutorial12();
						break;
					case 13:
						self.tutorial13();
						break;
					case 14:
						self.tutorial14();
						break;
					case 15:
						self.tutorial15();
						break;
					case 16:
						self.tutorial16();
						break;
					case 17:
						self.tutorial17();
						break;
					case 18:
						self.tutorial18();
						break;
					case 19:
						self.tutorial19();
						break;
					case 20:
						self.tutorial20();
						break;
					case 21:
						self.tutorial21();
						break;
					case 22:
						self.tutorial22();
						break;
					case 23:
						self.tutorial23();
						break;
					case 24:
						self.tutorial24();
						break;
					case 25:
						self.tutorial25();
						break;
					case 26:
						self.tutorial26();
						break;
					case 27:
						self.tutorial27();
						break;
					case 28:
						self.tutorial28();
						break;
					}	
				}
			}else{
				self.soundPlay();
				switch(self.tutorial_count){
				case 1:
					self.tutorial1();
					break;
				case 2:
					self.tutorial2();
					break;
				case 3:
					self.tutorial3();
					break;
				case 4:
					self.tutorial4();
					break;
				case 5:
					self.tutorial5();
					break;
				case 6:
					simul.startCarTaxi = true;
					self.tutorial6();
					break;
				case 7:
					self.tutorial7();
					break;
				case 8:
					self.tutorial8();
					break;
				case 9:
					self.tutorial9();
					break;
				case 10:
					self.tutorial10();
					break;
				case 11:
					self.tutorial11();
					break;
				case 12:
					self.tutorial12();
					break;
				case 13:
					self.tutorial13();
					break;
				case 14:
					self.tutorial14();
					break;
				case 15:
					self.tutorial15();
					break;
				case 16:
					self.tutorial16();
					break;
				case 17:
					self.tutorial17();
					break;
				case 18:
					self.tutorial18();
					break;
				case 19:
					self.tutorial19();
					break;
				case 20:
					self.tutorial20();
					break;
				case 21:
					self.tutorial21();
					break;
				case 22:
					self.tutorial22();
					break;
				case 23:
					self.tutorial23();
					break;
				case 24:
					self.tutorial24();
					break;
				case 25:
					self.tutorial25();
					break;
				case 26:
					self.tutorial26();
					break;
				case 27:
					self.tutorial27();
					break;
				case 28:
					self.tutorial28();
					break;
				}	
			}
		}
	}

	this.tutorial1 = function(){
		setTimeout(function(){
			self.div_3d[0].className = "tutorial1";
			self.div_3d.fadeIn( self.fadein );
			self.tutorial_count = 2;
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout ,function(){
					self.tutorialNext();
				} );
			},self.timeout1);			
		},10000)
	}

	this.tutorial2 = function(){
		self.div_3d[0].className = "tutorial2";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 3;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}

	this.tutorial3 = function(){
		self.div_3d[0].className = "tutorial3";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 4;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout);
	}

	this.tutorial4 = function(){
		self.div_3d[0].className = "tutorial4";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 5;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}

	this.tutorial5 = function(){
		self.div_3d[0].className = "tutorial5";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 6;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}

	this.tutorial6 = function(){
		self.div_3d[0].className = "tutorial6";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 7;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}

	this.tutorial7 = function(){
		self.div_navi[0].className = "tutorial7";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 8;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},self.timeout1);
	}

	this.tutorial8 = function(){
		self.div_navi[0].className = "tutorial8";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 9;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},self.timeout1);
	}

	this.tutorial9 = function(){
		self.div_navi[0].className = "tutorial9";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 10;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial10 = function(){
		self.div_3d[0].className = "tutorial10";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 11;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial11 = function(){
		self.div_navi[0].className = "tutorial11";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 12;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},11000/*self.timeout1*/);
	}
	
	this.tutorial12 = function(){
		self.div_navi[0].className = "tutorial12";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 13;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial13 = function(){
		self.div_3d[0].className = "tutorial13";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 14;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial14 = function(){
		self.div_3d[0].className = "tutorial14";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 15;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout);
	}
	
	this.tutorial15 = function(){
		self.div_3d[0].className = "tutorial15";
		self.setTutorialBackground();
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 16;
		setTimeout(function(){
			self.crmkNext();
			self.tutorialNext();
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},self.crmk1time);
		},self.timeout1);
	}
	
	this.tutorial16 = function(){
		self.div_navi[0].className = "tutorial16";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 17;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},10000);
	}
	
	this.tutorial17 = function(){
		self.div_navi[0].className = "tutorial17";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 18;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},self.timeout);
	}
	
	this.tutorial18 = function(){
		self.div_3d[0].className = "tutorial18";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 19;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial19 = function(){
		self.div_3d[0].className = "tutorial19";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 20;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout2);
	}
	
	this.tutorial20 = function(){
		self.div_3d[0].className = "tutorial20";
		self.tutorial_count = 21;
		setTimeout(function(){
			self.crmkNext();
			setTimeout(function(){
				self.div_3d.fadeIn( self.fadein );
			},6000);
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},13500);
			setTimeout(function(){
				self.tutorialNext();
			},self.crmk2time);
		},2000)
	}
	
	this.tutorial21 = function(){
		self.div_3d[0].className = "tutorial21";
		self.tutorial_count = 22;
		setTimeout(function(){
			self.crmkNext();
			setTimeout(function(){
				self.div_3d.fadeIn( self.fadein );
			},5000);
			setTimeout(function(){
				self.div_3d.fadeOut( self.fadeout );
			},14000);
			setTimeout(function(){
				self.unsetTutorialBackground();
			},self.crmk3time)
			setTimeout(function(){
				self.tutorialNext();
			},25000);
		},2000);
	}
	
	this.tutorial22 = function(){
		paringZone.unparingPrepare();
		self.div_3d[0].className = "tutorial22";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 23;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial23 = function(){
		self.div_navi[0].className = "tutorial23";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 24;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout , function(){
				self.tutorialNext();
			} );
		},self.timeout1);
	}
	
	this.tutorial24 = function(){
		self.div_navi[0].className = "tutorial24";
		self.div_navi.fadeIn( self.fadein );
		self.tutorial_count = 25;
		setTimeout(function(){
			self.div_navi.fadeOut( self.fadeout );
		},self.timeout1);
	}
	
	this.tutorial25 = function(){
		self.div_3d[0].className = "tutorial25";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 26;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout);
	}
	
	this.tutorial26 = function(){
		self.div_3d[0].className = "tutorial26";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 27;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout ,function(){
				self.tutorialNext();
			} );
		},self.timeout);
	}
	
	this.tutorial27 = function(){
		self.div_3d[0].className = "tutorial27";
		self.div_3d.fadeIn( self.fadein );
		self.tutorial_count = 28;
		setTimeout(function(){
			self.div_3d.fadeOut( self.fadeout );
		},self.timeout2);
	}
	this.tutorial28Navi = function(){
		self.div_navi[0].className = "tutorial28-navi";
		self.div_navi.fadeIn( self.endingtime );
	}
	this.tutorial28 = function(){
		self.div_3d[0].className = "tutorial28";
		self.div_3d.fadeIn( self.endingtime );
		setTimeout(function(){
			location.reload();
		},10000);
	}

	this.crmk1 = function(){
		$("#crmk1").css({"display":"block"});
		setTimeout(function(){
			$("#crmk1").css({"display":"none"});
		},self.crmk1time)
	}

	this.crmk2 = function(){
		$("#crmk2").fadeIn(500);
		setTimeout(function(){
			$("#crmk2").css({"display":"none"});
		},self.crmk2time)
	}
	
	this.crmk3 = function(){
		$("#crmk3").css({"display":"block"});
		setTimeout(function(){
			$("#crmk3").css({"display":"none"});
		},self.crmk3time)
	}
}
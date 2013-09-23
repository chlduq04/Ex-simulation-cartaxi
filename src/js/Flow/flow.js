var tutorials;
var start;
var front;
var navi;
var simul;
window.onload = function() {	
	tutorials = new tutorial();
	start = new startpage();
	front = new $(".view_3d").WebGL();
	navi = new navigation();

	front.init();
	navi.init();	

	simul = new Traffic({
		drawCar3D : front.drawCar3D,
		drawCarBack3D : front.drawCarBack3D,
		deleteCar3D : front.deleteCar,
		camera3D : front.controlCamera,
		initCamera3D : front.initCamera,
		render3D : front.rendering, 
		drawPlayer : front.drawCarPlayer3D,
		road3D : front.startRoad,
		cameraEnding : front.cameraView,

		paringZoneRedArrowStart : paringZone.startParing,
		paringZonePrepare : paringZone.prepareParing,
		paringZonePrepareBar : paringZone.prepareParingText,
		paringSuccess : paringZone.paringUI,
		unparing : paringZone.unparing,
		paringPersent : paringZone.startParingPersent,

		naviParing : paringPage.paringReady,
		paringButtonSwitch : paringPage.paringClickSwitch,
		paring : function(){ 
			paringPage.paringStart();
			paringPage.paringLightOn();
		}
	})

	start.init();
};
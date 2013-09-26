function restart(){
	start.simulStart = false;
	setTimeout(function(){
	$( "body" ).unbind();
	$("#simulation-panel").html(
	'		<div id="loading-background">'+
	'		<div id="loading-bar">'+
	'		</div>'+
	'	</div>'+
	'	<div id="road" class="road">'+
	'		<div id="top-navigation-normal" class="top-navigation-normal"></div>'+
	'		<div id="top-navigation" class="top-navigation"></div>'+
	'		<div id="bottom-navigation-normal" class="bottom-navigation-normal"></div>'+
	'		<div id="bottom-navigation" class="bottom-navigation">'+
	'			<div id="bn-button" class="bn-button"></div>'+
	'			<div id="bn-reset-button" class="bn-reset-button"></div>'+
	'		</div>'+
	'		<div id="bottom-navigation-clicked" class="bottom-navigation-clicked">'+
	'			<video id="bnc-video" class="bnc-video" width="1280" height="725">'+
	'				<source src="../../video/baseball.mp4" type="video/mp4">'+
	'			</video>'+
	'			<div id="bnc-1" class="bnc-1">'+
	'				<div id="bnc1-button" class="bnc1-button"></div>'+
	'			</div>'+
	'			<div id="bnc-2" class="bnc-2"></div>'+
	'			<div id="bnc-3" class="bnc-3"></div>'+
	'			<div id="bnc-4" class="bnc-4"></div>'+
	'			<div id="bnc-5" class="bnc-5"></div>'+
	'			<div id="bnc-6" class="bnc-6"></div>'+
	'			<div id="bnc-7" class="bnc-7"></div>'+
	'			<div id="bnc-8" class="bnc-8">'+
	'				<div id="bnc8-button" class="bnc8-button"></div>'+
	'			</div>'+
	'			<div id="bnc-9" class="bnc-9"></div>'+
	'		</div>'+
	'		<div class="road-make-car1">'+
	'			<div class="make-car1-blue"></div>'+
	'			<div class="make-car1-red"></div>'+
	'		</div>'+
	'		<div class="road-make-car2">'+
	'			<div class="make-car2-blue"></div>'+
	'			<div class="make-car2-red"></div>'+
	'		</div>'+
	'		<div class="road-make-car3">'+
	'			<div class="make-car3-blue"></div>'+
	'			<div class="make-car3-red"></div>'+
	'		</div>'+
	'		<div class="road-make-car4">'+
	'			<div class="make-car4-blue"></div>'+
	'			<div class="make-car4-red"></div>'+
	'		</div>'+
	'	</div>'+
	'	<div id="paringpage" class="paringpage">'+
	'		<div id="prepareparing" class="prepareparing">'+
	'			<div id="paringmoney" class="paringmoney"></div>'+
	'			<div id="paringinfo" class="paringinfo"></div>'+
	'			<div id="paringnumber" class="paringnumber">'+
	'				<div id="paringtargetnumber" class="paringtargetnumber"></div>'+
	'			</div>'+
	'			<div id="paringstartbutton" class="paringstartbutton"></div>'+
	'			<div id="paringpreparebutton" class="paringpreparebutton"></div>'+
	'			<div id="paringpreparebuttonoff" class="paringpreparebuttonoff">'+
	'			</div>'+
	'			<div id="prepare1" class="prepare1"></div>'+
	'			<div id="prepare2" class="prepare2">'+
	'				<div id="pre2-top" class="pre2-top"></div>'+
	'				<div id="pre2-bottom" class="pre2-bottom"></div>'+
	'			</div>'+
	'			<div id="prepare3" class="prepare3"></div>'+
	'		</div>'+
	'	</div>'+
	'	<div id="tutorial_navi">'+
	'	</div>'+
	'	<div id="startpage" class="startpage">'+
	'		<div id="sp-startbutton" class="sp-startbutton"></div>'+
	'		<div id="sp-startbutton-light" class="sp-startbutton-light"></div>'+
	'		<div id="sp-replaybutton-light" class="sp-replaybutton-light"></div>'+
	'	</div>'+
	'	<div id="detail" class="detail" style="display: none;">'+
	'		<h4 class="d-name-clear">(- START -)</h4>'+
	'		<div class="d-reflesh">'+
	'			<button class="dr-reflesh"></button>'+
	'		</div>'+
	'		<h4 class="d-name-setting">- SETTING -</h4>'+
	'		<div class="d-setting">'+
	'			<div class="ds-name-maxcar">Max of cars</div>'+
	'			<input class="ds-maxcar" value="200" placeholder="Init 300" />'+
	'			<div class="ds-name-limitspeed">Speed of cars</div>'+
	'			<input class="ds-limitspeed" value="1" placeholder="Init 2" />'+
	'			<div class="ds-name-simulationspeed">Simulation speed</div>'+
	'			<input class="ds-simulationspeed" value="30" placeholder="Init 30" />'+
	'		</div>'+
	'		<h4 class="d-name-linking">- LINKING -</h4>'+
	'		<div class="d-link">'+
	'			<input class="dl-target" placeholder="ID of target(blue)" /> <input'+
	'				class="dl-leader" placeholder="ID of leader(red)" />'+
	'			<button class="dl-linking"></button>'+
	'		</div>'+
	'		<h4 class="d-name-searching">- SEARCH -</h4>'+
	'		<div class="d-search">'+
	'			<input class="ds-target" placeholder="ID of target(blue)" />'+
	'			<button class="ds-searching"></button>'+
	'		</div>'+
	'		<h4 class="d-name-unlinking">- UNLINKING -</h4>'+
	'		<div class="d-unlink">'+
	'			<input class="ds-unlink-target" placeholder="ID of target(black)" />'+
	'			<button class="ds-unlinking"></button>'+
	'		</div>'+
	'		<h4 class="d-name-speed">- SPEED( Km ) -</h4>'+
	'		<div class="d-speed">'+
	'			<input class="ds-speed-value" placeholder="0" />'+
	'		</div>'+
	'		<div class="empty" style="width: 100%; height: 30px;"></div>'+
	'		<h4 class="three-name-title">(- 3D SETTING -)</h4>'+
	'	</div>'+
	'	<div id="cars" class="cars"></div>'+
	'	<div class="view_3d">'+
	'		<div id="crmk-background">'+
	'			<img class="crmk1" id="crmk1" src="./image/tutorial/stretch.gif"></img>'+
	'			<img class="crmk2" id="crmk2" src="./image/tutorial/work.gif"></img>'+
	'			<img class="crmk3" id="crmk3" src="./image/tutorial/food.gif"></img>'+
	'		</div>'+
	'		<div id="tutorial_3d" class="tutorial_3d">'+
	'			<video id="opening" class="opening" width="1920" height="1080"'+
	'				controls>'+
	'				<source src="../../video/Comp.mp4" type="video/mp4">'+
	'			</video>'+
	'		</div>'+
	'		<div class="ui">'+
	'			<div class="ui-left"></div>'+
	'			<div id="ui-center" class="ui-center">'+
	'				<div id="ui-center-prepare" class="ui-center-prepare">'+
	'					<div id="ui-center-prepare1"></div>'+
	'					<div id="ui-center-prepare2"></div>'+
	'				</div>'+
	'				<div id="ui-center-bar" class="ui-center-bar">'+
	'					<div id="ui-bar-left" class="ui-bar-left">'+
	'						<div id="ui-bar-left-range" class="ui-bar-left-range"></div>'+
	'						<div id="ui-bar-left-persent" class="ui-bar-left-persent"></div>'+
	'					</div>'+
	'					<div class="ui-bar-center">'+
	'						<div id="ui-bar-center-arrow" class="ui-bar-center-arrow">'+
	'							<div id="ui-bar-center-point" class="ui-bar-center-point">'+
	'							</div>'+
	'						</div>'+
	'						<div id="ui-bar-center-persent" class="ui-bar-center-persent">0%</div>'+
	'					</div>'+
	'					<div id="ui-bar-right" class="ui-bar-right">'+
	'						<div id="ui-bar-right-range" class="ui-bar-right-range"></div>'+
	'						<div id="ui-bar-right-persent" class="ui-bar-right-persent">'+
	'						</div>'+
	'					</div>'+
	'				</div>'+
	'				<div id="ui-center-red" class="ui-center-red">'+
	'					<div id="ucr-1" class="ucr-1"></div>'+
	'					<div id="ucr-2" class="ucr-2"></div>'+
	'				</div>'+
	'			</div>'+
	'			<div class="ui-right"></div>'+
	'		</div>'+
	'	</div>'
	);
	tutorials.refresh();
	start.refresh();
	front.refresh();
	navi.refresh();

	front.reInit();
	navi.init();	

	simul.refresh({
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
	});
	start.init();	
	setTimeout(function(){start.persent = 100;},1000	);
	},1000);
}
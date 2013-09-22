var paringZone;
var camera;
if(jQuery)(function($){
	$.extend($.fn, {
		WebGL : function(opt){
			var self = this;
			var canvas;
			var defaults = {
					sound : false,
					width :  1920,
					height : 1080,
					key_right : "D",
					key_left : "A",
					key_down : "S",
					key_up : "W",
					key_break : "M",
					load_width : 800,
					load_length : 2000,
					map_length : 1000,
					other_width : 300,
					other_length : 6000
			};$.extend(defaults, opt);

			/** System value **/
			
			var scene;
			var o_positions = {};
			var sound_position = {};
			var recycle_o_position_back = [];
			var recycle_o_position_front = [];
			var recycle_sound_position = [];
			var objs = [];
			var taxi;

			var renderer;
			var camara;
//			var bcamera;
			var target = new THREE.Vector3(), lon = 90, lat = 0, phi = 0, theta = 0;
			var isUserInteracting = false;
			var onPointerDownPointerX,onPointerDownPointerY;
			var onPointerDownLon,onPointerDownLat;
			var simulation_speed = 20;
			var currentlyPressedKeys = {};

			/** Simulation value **/

			var camera_lookat = { x : 5, y : 0, z : 100 };
			var camera_position = { x : 5, y : 40, z : 900 };
			var camera_lookat_next = { x : 0 , y : 0 , z : 0 };
			var m_position = { x : 0, y : 0, z : 0 };
			var m_speed = { x : 0, y : 0, z : 0 };
			var m_limitspeed = { x : 50, y : 50, z : 50 };
			var spotlight;
			var light;
			
//			var bcamera_lookat = { x : 5, y : 0, z : -100 };
//			var bcamera_position = { x : 5, y : 40, z : 900 };
			
			/** Others value **/

			var others_position = { x : -15, y : -120, z : -180 };
			var others_scale = { x : defaults.other_width, y : 2, z : defaults.other_length };
			var others_object = {};
			var depart_num = 0;

			
			var road_position = { x : -15, y : 0, z : -500 };
			var road_scale = { x : defaults.load_width, y : 2, z : defaults.load_length };
			var road_speed = 20;
			var road_limit = defaults.map_length * 3;
			
			/** Move Camera **/


			var camera_move = 1;
			var camera_view_road = false;
			var camera_posy_move = 0.7;
			var camera_looky_move = 0.63;

			/** Player position **/

			var player_position;
			var player_lookat;
			var player;

			/** Car value **/

			var road = new Image();
			var skymesh;

			/** mirror **/
			
			var mirrorCubeCamera, mirrorCube;
			
			/** unparing **/
			
			var unparingValue = 0;
			
			var car_geometry = new THREE.CubeGeometry( 5, 5, 10 );
			var car_front_material = new THREE.MeshLambertMaterial( { color : 0xFFFFFF } );
			var car_back_material = new THREE.MeshLambertMaterial( { color : 0xFFFFFF } );
			var car_leader = new THREE.MeshLambertMaterial( { color : 0xFF0000 } );
			var car_follower = new THREE.MeshLambertMaterial( { color : 0x00FFFF } );
			var car_normal = new THREE.MeshLambertMaterial( { color : 0x0000FF } );
			var depart_material = new THREE.MeshLambertMaterial( { color : 0xFFFFFF } );

			var Sound = function ( sources, radius, volume ) {

				var audio = document.createElement( 'audio' );

				for ( var i = 0; i < sources.length; i ++ ) {
					var source = document.createElement( 'source' );
					source.src = sources[ i ];

					audio.appendChild( source );
				}

				this.position = new THREE.Vector3();

				this.play = function () {
					audio.play();
				}

				this.update = function ( camera ) {

					var distance = this.position.distanceTo( camera );

					if ( distance <= radius ) {
						audio.volume = volume * ( 1 - distance / radius );
					} else {
						audio.volume = 0;
					}
				}
			}
			
			/** Paring Zone Show **/
			
			paringZone = new paringzone();

			this.returnCanvas = function(){
				return canvas;
			},
			
			/** Initialize **/

			this.init = function(){
				self.settingRender( defaults.width, defaults.height )
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, camera_lookat )
				self.settingSkybox();
				self.initCar();
				self.drawRoad( 1, road_scale, "road" );
				self.settingSpotLight( 0xFFFFFF, -300, 300, 900 );
				self.settingLight( 0xFFFFEE, 400, 200, 550 );
				self.settingKey();
				self.settingMouse();

//				self.settingBackCamera( bcamera_position.x, bcamera_position.y, bcamera_position.z, bcamera_lookat );
//				self.backView();
//				self.drawOther( others_position, others_scale, "others" );

				renderer.render( scene, camera );
			},
			this.initMirror = function(){
				var cubeGeom = new THREE.CubeGeometry(100, 100, 10, 1, 1, 1);
				mirrorCubeCamera = new THREE.CubeCamera( 0.1, 5000, 512 );
				// mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
				scene.add( mirrorCubeCamera );

				var mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorCubeCamera.renderTarget } );
				mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
				mirrorCube.position.set(-75,50,400);
				mirrorCubeCamera.position = mirrorCube.position;
				scene.add(mirrorCube);	
			},

			/** Setting **/
			
			this.cameraView = function(){
				camera_view_road = true;
			},
			
			/** 3D model **/
			
			this.initCar = function(){
				var car3D;

				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {
					console.log( item, loaded, total );
				};

				var loader0 = new THREE.OBJMTLLoader();
				loader0.addEventListener('load',function(event){
					taxi = event.content;
					for(k in taxi.children){
						taxi.children[k].castShadow = true;
					}
					start.setPersent();
				});
				loader0.load( './image/obj/cartaxi.obj', './image/obj/cartaxi.mtl');

				var loader1 = new THREE.OBJMTLLoader();
				loader1.addEventListener('load',function(event){
					var cube = event.content;
					for(k in cube.children){
						cube.children[k].castShadow = true;
					}
					objs.push(cube);
					start.setPersent();
				});
				loader1.load( './image/obj/car1.obj', './image/obj/car1.mtl');

				var loader2 = new THREE.OBJMTLLoader();
				loader2.addEventListener('load',function(event){
					var cube = event.content;
					for(k in cube.children){
						cube.children[k].castShadow = true;
					}
					objs.push(cube);
					start.setPersent();
				});
				loader2.load( './image/obj/car2.obj', './image/obj/car2.mtl');

				var loader3 = new THREE.OBJMTLLoader();
				loader3.addEventListener('load',function(event){
					var cube = event.content;
					for(k in cube.children){
						cube.children[k].castShadow = true;
					}
					objs.push(cube);
					start.setPersent();
				});
				loader3.load( './image/obj/car3.obj', './image/obj/car3.mtl');
			},
			this.returnRequest = function(){
				return request;
			},
			this.returnScene = function(){
				return scene;
			},
			this.initCamera = function(){
				camera_lookat_next.x = camera.position.x;
				camera_lookat_next.y = camera.position.y;
				camera_lookat_next.z = camera.position.z + 50;
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, target )
			},
			this.settingRender = function( width, height ){
				renderer = new THREE.WebGLRenderer();
				scene = new THREE.Scene();
				renderer.setSize( width, height );
				renderer.shadowMapEnabled = true;
				renderer.shadowMapSoft = true;
				renderer.autoClear = true;
				canvas = $(this)[0].appendChild( renderer.domElement );
			}
			this.settingCamera = function( x, y, z, target ){
				camera = new THREE.PerspectiveCamera(
						35,             // Field of view
						800 / 600,      // Aspect ratio
						0.1,            // Near plane
						10000           // Far plane
				);
				camera.position.set( x, y, z );                 
				camera.lookAt( target );
				scene.add(camera);
			},
			this.settingBackCamera = function(  x, y, z, target ){
				bcamera = new THREE.PerspectiveCamera(
						35,             // Field of view
						800 / 600,      // Aspect ratio
						0.1,            // Near plane
						10000           // Far plane
				);
				bcamera.position.set( x, y, z );                 
				bcamera.lookAt( target );
				scene.add(bcamera);
			}
			this.settingSpotLight = function( color, x, y, z ){
				spotlight = new THREE.SpotLight( color );
				spotlight.position.set( x, y, z );
				spotlight.castShadow = true;

				spotlight.shadowMapWidth = 2048;    // power of 2
				spotlight.shadowMapHeight = 2048;

				spotlight.shadowCameraNear = 100;	// keep near and far planes as tight as possible
				spotlight.shadowCameraFar = 1500;	// shadows not cast past the far plane
				spotlight.shadowCameraFov = 50;
				spotlight.shadowBias = -0.00022;    // a parameter you can tweak if there are artifacts
				spotlight.shadowDarkness = 0.8;
				
				spotlight.target.position.y = -300;
//				spotlight.shadowCameraVisible = true;
				scene.add( spotlight );
				start.setPersent();
			},
			this.settingLight = function( color, x, y, z ){
				light = new THREE.PointLight( color );
				light.position.set( x, y, z );
				scene.add( light );
			},
			this.settingKey = function(){
				document.onkeydown = self.controlKeyDown;
			},
			this.settingMouse = function(){
				var target = renderer.domElement;
				$(target).bind("mousewheel",function(e){
//					self.controlMouseWheel(e);
				});
			},
			this.backView = function(){
				var planeGeometry = new THREE.CubeGeometry( 400, 200, 1, 1 );
				var finalRenderTarget = new THREE.WebGLRenderTarget( 512, 512, { format: THREE.RGBFormat } );
				var planeMaterial = new THREE.MeshBasicMaterial( { map: finalRenderTarget } );
				plane = new THREE.Mesh( planeGeometry, planeMaterial );
				scene.add(plane);
			}
			this.rendering = function(){
				self.startRoad(camera_view_road);
				renderer.render( scene, camera );
			},
			

			/** audio **/

			this.settingSound = function(){
				self.BGMsound("./sound/BGM.mp3");
			},

			/** Control **/

			this.controlLight = function(){
				light = new THREE.PointLight( color );
				light.position.set( x, y, z );
				scene.add( light );
			},

			this.controlCamera = function( posx, posy, posz, lookat ){
				camera.position.set( posx, posy, posz );
				camera.lookAt( lookat );
			},

			this.controlKeyDown =  function (event) {
				if( String.fromCharCode(event.keyCode) == "M" ){
					unparingValue = 1;
					camera_move = -camera_move;
					if(camera_move == -1){
						$(".ui").css({"visibility":"hidden"});
					}else{
						$(".ui").css({"visibility":"visible"});
					}
				}
			},

			this.controlKeyUp = function(event) {
				currentlyPressedKeys[event.keyCode] = false;
			},

			this.controlMouseDown = function(event){
				event.preventDefault();
				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;
			},

			this.controlMouseMove = function(event){
				if ( isUserInteracting ) {
					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

					lat = Math.max( - 85, Math.min( 85, lat ) );
					phi = THREE.Math.degToRad( 90 - lat );
					theta = THREE.Math.degToRad( lon );

					target.x = camera_lookat.z * Math.sin( phi ) * Math.cos( theta ) * 5;
					target.y = camera_lookat.y * Math.cos( phi ) * 5;
					target.z = camera_lookat.x * Math.sin( phi ) * Math.sin( theta ) * 5;

					self.controlCamera( camera_position.x, camera_position.y, camera_position.z,  target );
					renderer.render( scene, camera );
				}
			},
			this.controlMouseWheel = function( event ) {
				if( unparingValue != 0 ){
					var value = event.originalEvent.wheelDeltaY;
					camera_position.y += value * 2;
					camera_lookat.y += value * 1.9;
					self.settingCamera( camera_position.x, camera_position.y, camera_position.z, camera_lookat )
					camera.lookAt(camera_lookat);
					camera.updateProjectionMatrix();
				}
			},
			this.controlMouseUp = function(event){
				isUserInteracting = false;
			},

			this.controlMouseOut = function(){
				isUserInteracting = false;
			},
			


			/** Game Setting **/

			this.settingSkybox = function(){
				var sky = new Image();
				sky.src = "./image/skybox/sky.jpg";
				sky.onload = function(){
					var sky_material = new THREE.MeshLambertMaterial( { map: THREE.ImageUtils.loadTexture(sky.src), transparent: false } );
					var geometry = new THREE.CubeGeometry( 3600, 1500, 1 );
					skymesh = new THREE.Mesh( geometry, sky_material );
					skymesh.position.x = -150;
					skymesh.position.y = 450;
					skymesh.position.z = -2000;
					scene.add( skymesh );
					start.setPersent();
				}
			},

			/** Other setting function **/

			this.loadTexture = function( path ) {

				var texture = new THREE.Texture( renderer );
				var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );

				var image = new Image();
				image.onload = function () {
					texture.needsUpdate = true;
					material.map.image = this;
					renderer.render( scene, camera );

				};
				image.src = path;

				return material;

			},

			/** Draw objects **/
			this.unparingView = function(){
				if( camera_position.y < 80 ){
					camera_lookat = { x : position.x-4, y : position.y+18, z : position.z-30 };
					camera_position = { x : position.x-4, y : position.y+18, z : position.z+5 }
					self.settingCamera( position.x-4, position.y+8, position.z+5, camera_lookat )
					camera.lookAt(camera_lookat);
				}
			} 
			this.drawCar = function( position, name ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh = new THREE.Mesh( car_geometry, car_front_material );
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCarBack = function( position, name ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh = new THREE.Mesh( car_geometry, car_back_material );
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			this.drawCarColor = function( position, name, color ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					if(color == "leader"){
						mesh = new THREE.Mesh( car_geometry, car_leader );
					}else if(color == "follower"){
						mesh = new THREE.Mesh( car_geometry, car_follower );
					}else{
						mesh = new THREE.Mesh( car_geometry, car_normal );
					}
					mesh.overdraw = true;
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					o_positions[name] = mesh;
					scene.add( mesh );
				}else{
					if(color == "leader"){
						target.material = car_leader;
					}else if(color == "follower"){
						target.material = car_follower;
					}else{
						target.material = car_normal;
					}

					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
				}
			},
			
			this.drawCarPlayer3D = function( position, name, color, rotate, relate ){
				player = o_positions[name];
				if( player == undefined ){
					player = objs[0].clone();
					player.name = name;
					player.position.x = position.x;
					player.position.y = position.y;
					player.position.z = position.z;
					player.scale.x = 0.128;
					player.scale.y = 0.16
					player.scale.z = 0.12;
					o_positions[name] = player;
					scene.add( player );
					camera_lookat = { x : position.x-2, y : position.y+17, z : position.z-30 };
					camera_position = { x : position.x-2, y : position.y+18, z : position.z-1 }
					self.settingCamera( position.x-2, position.y+18, position.z-1, camera_lookat )
//					bcamera_lookat = { x : position.x-2, y : position.y+17, z : position.z+30 };
//					bcamera_position = { x : position.x-2, y : position.y+18, z : position.z+10 }
//					self.settingBackCamera( position.x-2, position.y+18, position.z+10, bcamera_lookat )
					
//					plane.position.set( position.x-2, position.y+18, position.z-10 );
					camera.fov += 12;
					camera.updateProjectionMatrix();
				}else{
					player.position.x = position.x;
					player.position.y = position.y;
					player.position.z = position.z;
					player_position = position;
					o_positions['road'].position.x += relate;

					if(unparingValue == 0){
						camera_lookat = { x : position.x-2, y : position.y+17, z : position.z-30 };
						camera_position = { x : position.x-2, y : position.y+18, z : position.z-1 }
						self.settingCamera( position.x-2, position.y+18, position.z-1, camera_lookat );
//						bcamera_lookat = { x : position.x-2, y : position.y+17, z : position.z+30 };
//						bcamera_position = { x : position.x-2, y : position.y+18, z : position.z+10 };
//						self.settingBackCamera( position.x-2, position.y+18, position.z+10, bcamera_lookat );
						
//						plane.position.set( position.x-2, position.y+18, position.z-10 );
						camera.fov += 12;
						camera.updateProjectionMatrix();
					}
				}
			},
			
			this.drawCarBack3D = function( position, name, color, rotate ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					if(color == "leader"){
						mesh = taxi.clone();
						scene.add( mesh );
					}else{
						mesh = recycle_o_position_back.pop();
						if( mesh == undefined ){
							mesh = objs[Math.floor( Math.random() * objs.length )].clone();
						}
						scene.add( mesh );
					}
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;
					mesh.scale.x = 0.128;
					mesh.scale.y = 0.16
					mesh.scale.z = 0.12;

					o_positions[name] = mesh;
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;
					if( target.rotation.y - Math.PI/360 > -Math.PI/180 * (rotate/3) ){
						target.rotation.y -= Math.PI/360;
					}else if( target.rotation.y + Math.PI/360 < -Math.PI/180 * (rotate/3) ){
						target.rotation.y += Math.PI/360;
					}
					if( rotate == 0 && Math.abs(target.rotation.y) < 0.04 ){
						target.rotation.y = 0;
					}
				}
			},
			
			this.drawCar3D = function( position, name, color, rotate ){
				var target = o_positions[name];
				if( target == undefined ){
					var mesh;
					var sound = new Sound( [ "./sound/background.mp3" ], 500, 1 );
					if(color == "leader"){
						mesh = taxi.clone();
						scene.add( mesh );
					}else{
						mesh = recycle_o_position_front.pop();
						if( mesh == undefined ){
							mesh = objs[Math.floor( Math.random() * objs.length )].clone();
						}
						scene.add( mesh );
					}
					
					mesh.name = name;
					mesh.position.x = position.x;
					mesh.position.y = position.y;
					mesh.position.z = position.z;					

					mesh.scale.x = 0.128;
					mesh.scale.y = 0.16
					mesh.scale.z = 0.12;
					mesh.rotation.y = Math.PI;

					o_positions[name] = mesh;
					sound.position.copy( position );
					sound_position[name] = sound;
					sound.play();
				}else{
					target.position.x = position.x;
					target.position.y = position.y;
					target.position.z = position.z;

					if( target.rotation.y - Math.PI/360 - Math.PI > -Math.PI/180 * (rotate/3) ){
						target.rotation.y -= Math.PI/360;
					}else if( target.rotation.y + Math.PI/360 - Math.PI < -Math.PI/180 * (rotate/3) ){
						target.rotation.y += Math.PI/360;
					}
					if( rotate == 0 && Math.abs(target.rotation.y) < 0.04 ){
						target.rotation.y = 0;
					}

					var sound = sound_position[name]
					sound.position.copy( target.position );
					sound.update(player_position);
				}
			},
			this.rotateCar = function( name, radius ){
				o_position[name].rotateY(radius)
			},
			this.deleteCar = function( name, front, leader ){
				if(!leader){
					if(front){
						recycle_o_position_front.push( o_positions[name] );
					}else{
						recycle_o_position_back.push( o_positions[name] );
					}
				}	
				
				scene.remove( o_positions[name] );
				scene.remove( sound_position[name] );

				delete sound_position[name];
				delete o_positions[name];
			},
			this.resetCar = function(){

			},
			this.drawOther = function( position, scale, name ){
				var material = new THREE.MeshLambertMaterial( { color : 0x000000 } );
				var geometry = new THREE.CubeGeometry( scale.x * 3, scale.y, scale.z );
				var mesh = new THREE.Mesh( geometry, material );
				mesh.name = name;
				mesh.position.x = position.x;
				mesh.position.y = position.y-2;
				mesh.position.z = position.z;
				o_positions[name] = mesh;
				scene.add( mesh );

				material = new THREE.MeshLambertMaterial( { color : 0xFFCC33 } );
				geometry = new THREE.CubeGeometry( scale.x * 1.2, scale.y, scale.z );
				mesh = new THREE.Mesh( geometry, material );
				mesh.name = name;
				mesh.position.x = position.x;
				mesh.position.y = position.y-1;
				mesh.position.z = position.z;
				o_positions[name] = mesh;
				scene.add( mesh );				
			},
			this.drawRoad = function( position, scale, name ){
				var loaderRoad = new THREE.OBJMTLLoader();
				loaderRoad.addEventListener('load',function(event){
					road_object = event.content;
					for(k in road_object.children){
						road_object.children[k].receiveShadow = true;
					}
					road_object.position.x = 50;
					road_object.position.y = -200;
					road_object.position.z = 1050;
					road_object.scale.x = 30;
					road_object.scale.y = 20;
					road_object.scale.z = 60;
					o_positions[name] = road_object;
					scene.add( road_object );
					renderer.render( scene, camera );
					start.setPersent();
				});
				loaderRoad.load( './image/obj/highway.obj', './image/obj/highway.mtl');
			},
			this.startRoad = function(position){
				if(position){
					self.carUnparing();
					road_speed = 12;
					o_positions['road'].position.z =  1400;
					o_positions['road'].position.z += road_speed;
					player.rotation.y = -Math.PI/12;
					road_limit += 600;
				}else{
					o_positions['road'].position.z += road_speed;
					if(o_positions['road'].position.z > road_limit ){
						o_positions['road'].position.z = -defaults.map_length * 3;
					}
				}
			},
			this.drawDepartments = function(){
				var position;
				if( Math.random() > 0.5 ){
					position = { x : -250+Math.random()*10, y : 0, z : -1000 };
				}else{
					position = { x : 200+Math.random()*10, y : 0, z : -1000 };
				}
				var geometry = new THREE.CubeGeometry( 50+Math.random()*20-20, 300+Math.random()*100-100, 200+Math.random()*50-50 );
				var mesh = new THREE.Mesh( geometry, depart_material );
				mesh.overdraw = true;
				mesh.name = "department"+depart_num;
				mesh.position.x = position.x;
				mesh.position.y = position.y;
				mesh.position.z = position.z;
				others_object["department"+depart_num] = mesh;
				scene.add( mesh );
				depart_num++;
			},
			
			this.startDepartments = function(){
				if( Math.random()*200 > 190 ){
					self.drawDepartments();
				}
				for( var i in others_object ){
					others_object[i].position.z += 10 ;
					if( others_object[i].position.z > defaults.map_length ){
						delete others_object[i];
					}
				}
			},
			this.BGMsound = function(url){
				var sound = {};
				var request = new XMLHttpRequest();

				window.AudioContext = (
						window.AudioContext ||
						window.webkitAudioContext ||
						null
				);

				if (!AudioContext) {
					throw new Error("AudioContext not supported!");
				} 

				// Create a new audio context.
				var ctx = new AudioContext();

				// Create a AudioGainNode to control the main volume.
				var mainVolume = ctx.createGain();
				// Connect the main volume node to the context destination.
				mainVolume.connect(ctx.destination);

				// Create an object with a sound source and a volume control.
				sound.source = ctx.createBufferSource();
				sound.volume = ctx.createGain();

				// Connect the sound source to the volume control.
				sound.source.connect(sound.volume);
				// Hook up the sound volume control to the main volume.
				sound.volume.connect(mainVolume);

				// Make the sound source loop.
				sound.source.loop = true;

				// Load a sound file using an ArrayBuffer XMLHttpRequest.
				request.open("GET", url, true);
				request.responseType = "arraybuffer";
				request.onload = function(e) {

					// Create a buffer from the response ArrayBuffer.
					var buffer = ctx.createBuffer(this.response, false);
					sound.buffer = buffer;

					// Make the sound source use the buffer and start playing it.
					sound.source.buffer = sound.buffer;
					sound.source.start(ctx.currentTime);
				};
				request.send();
			}
			
			/** Camera Up **/
			
			this.carUnparing = function(){
				self.carParingHud();
				self.carParingFirst();
			}
			
			this.carParingHud = function(){
				$(".ui").css({"visibility":"hidden"});
				spotlight.castShadow = false;
					for(k in road_object.children){
						road_object.children[k].receiveShadow = false;
					}
			}
			
			this.carParingFirst = function(){
				unparingValue++;
				camera_position.z += 2.5;
				camera_lookat.z += 2.5;
				camera_position.y +=camera_posy_move ;
				camera_lookat.y += camera_looky_move;
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, camera_lookat )
				if( unparingValue < 100 ){
					setTimeout(function(){
						self.carParingFirst()
					},10);
				}else{
					self.carParing();
				}				
			}
			
			this.carParing = function(){
				if( unparingValue < 100 ){
					camera_position.z -= 0.4;
					camera_lookat.z -= 0.4;
				}				
				if( camera_posy_move < 2 ){
					camera_posy_move *= 1.05;
					camera_looky_move *= 1.05;
				}
				camera_position.y +=camera_posy_move ;
				camera_lookat.y += camera_looky_move;
				self.settingCamera( camera_position.x, camera_position.y, camera_position.z, camera_lookat )
				camera.lookAt(camera_lookat);
				camera.updateProjectionMatrix();
				unparingValue++;
				if( unparingValue < 700 ){
					setTimeout(function(){
						self.carParing()
					},10);
				}else{
					tutorials.tutorialNext(28);
				}
			}
			

			return this;
		},
	})
})(jQuery);
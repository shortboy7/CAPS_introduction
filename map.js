'use strict';

let indoorview = null;

function usleep(millisec) {
	return new Promise(resolve => setTimeout(resolve, millisec));
}

let scenes = [
	{
		title : '충무로역 앞',
		path : [
			new kakao.maps.LatLng(37.56150116048476,126.9955451361924),
			new kakao.maps.LatLng(37.561526392442545, 126.99565378994144),
			new kakao.maps.LatLng(37.561551624462645, 126.99576697106745),
			new kakao.maps.LatLng(37.56157685621608,126.99587562496463)
		],
		viewpoint : [new kakao.maps.Viewpoint(65.68570864245034, -1.299032822938166, -3)],
		panorams : [1154398462, 1154398465, 1154398463, 1154398464]
	},
	{
		title : '컴포즈 앞',
		path : [
			new kakao.maps.LatLng(37.56160208786941,126.99598427893508),
			new kakao.maps.LatLng(37.56153721748539,126.99602502814203),
			new kakao.maps.LatLng(37.56144711811804,126.99603408752347),
			new kakao.maps.LatLng(37.561357018444816, 126.99603409229934),
			new kakao.maps.LatLng(37.56127052290923,126.9960386241708),
			new kakao.maps.LatLng(37.561180423385125, 126.99604315622237),
			new kakao.maps.LatLng(37.561090324010934, 126.99605221553875),
			new kakao.maps.LatLng(37.56100022448354,126.99605674756303),
			new kakao.maps.LatLng(37.5609101249546,126.9960612795764),
		],
		viewpoint : [new kakao.maps.Viewpoint(153.45115707540825, 0, -3),
			new kakao.maps.Viewpoint(107.73301232741484, -2.2371185697201947, -3, null)],
		panorams : [
			1154398466, 1154101111, 1154101112, 1154101113, 1154101114, 1154101115, 1154101116, 1154101117,   1154101118
		]
	},
	{
		title : '골목길 진입',
		path : [
		new kakao.maps.LatLng(37.56088129619005,126.99615635361926),
		new kakao.maps.LatLng(37.56084525980469,126.99626500973278),
		new kakao.maps.LatLng(37.560827243671916, 126.99638724664777),
		new kakao.maps.LatLng(37.560809227144496, 126.99650042898641),
		],
		viewpoint : [new kakao.maps.Viewpoint(101.89105278820338, 9.326918985748962, -3),
			{pan: 131.8006366022935, tilt: 13.976538131652072, zoom: -3, panoId: null}],
		panorams : [1094506171, 1094506173, 1048632828, 1048632831]
	},
	{
		title : '필동 함박 앞',
		path : [
			new kakao.maps.LatLng(37.56074075298331,126.99655475924438),
			new kakao.maps.LatLng(37.56063263975059, 126.99678112662578)
		],
		viewpoint : [{pan: 144.7633441775924, tilt: 1.573631989423258, zoom: -3, panoId: null},
			{pan: 163.92333187845944, tilt: 1.573631989423207, zoom: -3, panoId: null}
			],
		panorams : [1048632836, 1154101628]
	},
	{
		title : '마라 식객 앞',
		path : [
			new kakao.maps.LatLng(37.560542540311346, 126.99679018498713),
			new kakao.maps.LatLng(37.56045244074721 , 126.9967947160895),
			new kakao.maps.LatLng(37.560362341181516, 126.99679924718096),
			new kakao.maps.LatLng(37.56027224185904 , 126.996812832714),
			new kakao.maps.LatLng(37.560192954982014, 126.99684452664157),
		],
		viewpoint: [{pan: 170.8290329909842, tilt: 6.219882552119878, zoom: -3, panoId: null},
			{pan: 94.25740407232524, tilt: 0.0455256391363174, zoom: -3, panoId: null}],
		panorams : [
			1154101629,1154101630,1154101631,1154101632, 1154101633,
		]
	},
	{
		title : '골목을 빠져 나온 후',
		path : [
			// new kakao.maps.LatLng(37.56013168851172 , 126.9968943286206),
			new kakao.maps.LatLng(37.56018935408153 , 126.99696223454572),
			new kakao.maps.LatLng(37.56017133643804 , 126.99705277968027),
			// new kakao.maps.LatLng(37.56009565437174 , 126.99712069089492),
		],
		viewpoint: [{pan: 103.84383821578895, tilt: 11.433329123633055, zoom: -3, panoId: null},
			{pan: 118.99583658695063, tilt: 4.321044796492001, zoom: -3, panoId: null}],
		panorams : [
			// 1154101915,
			1154101914, 1154101635
			// ,1154101636
		]
	},
	{
		title: '언덕 오르기 전',
		path: [
		new kakao.maps.LatLng(37.5600379926341  ,126.99720671014344),
		new kakao.maps.LatLng(37.55996951855761 ,126.99727914802678),
		new kakao.maps.LatLng(37.559897440346376, 126.9973470587015),
		new kakao.maps.LatLng(37.559850590699995, 126.997446658779),
		new kakao.maps.LatLng(37.55981815701489 , 126.99755078545782),
		new kakao.maps.LatLng(37.55978572323773 ,126.99765491204634),
		new kakao.maps.LatLng(37.55977491346771 ,126.99776809228933),
		new kakao.maps.LatLng(37.559771311565044, 126.99788127229549)
		],
		viewpoint: [{pan: 118.99583658695063, tilt: 4.321044796492001, zoom: -3, panoId: null},new kakao.maps.Viewpoint(122.32436743166602, 1.4524060217604733, -3)],
		panorams : [
			1154101637,1154101638,1154101639,1154101640, 1154101641,1154101642,1154101643,1154101644
		]
	},
	{
		title: '오른쪽 언덕',
		path: [
			new kakao.maps.LatLng(37.55976410548895 ,126.99798992519186),
			new kakao.maps.LatLng(37.55969923491668 ,126.99806236199998),
			new kakao.maps.LatLng(37.559627156251615, 126.99813027167491),
			new kakao.maps.LatLng(37.55952264109566 ,126.99816196455289),
		],
		viewpoint: [new kakao.maps.Viewpoint(128.22478880179614, -0.5588319956903898, -3),
			{pan: 80.23282515294578, tilt: -5.121413074087461, zoom: -3, panoId: null}],
		panorams : [1154101645, 1154101646, 1154101647, 1154101648]
	}
];

function startOfItems(Items){
	return Items[0];
}

function endOfItems(Items){
	return Items[Items.length - 1];
}

// let curPhase = scenes.length - 1;
// let curStep = scenes[curPhase].path.length - 1;
let curPhase = 0;
let curStep = 0;

let nextMarker = 0;
let	prevMarker = 0;
let markerHistory = [];

function findMarker(path, map) {
	for (let history of markerHistory) {
		if (history.marker.getPosition().equals(path) && history.map == map) {
			return (history.marker);
		}
	}
	return (null);
}

// Marker Functions
function addMarker(path, map) {
	let marker = findMarker(path, map);
	if (marker === null) {
		marker = new kakao.maps.Marker({
			position: path,
			map: map
		});
		markerHistory.push({marker: marker, map: map});
	}else{
		marker.setMap(map);
		kakao.maps.event.removeListener(marker, 'click', nextPhase);
	}
	return (marker);
}

function removeMarker(marker) {
	let delMarker = findMarker(marker.getPosition(), marker.getMap());
	if (delMarker !== null) {
		delMarker.setMap(null);
	}
}

function updateMarker(){
	if (curPhase == scenes.length - 1 && curStep == scenes[curPhase].path.length - 1){
		return;
	}

	if (curStep == 0) {
		let endMarker = addMarker(endOfItems(scenes[curPhase].path), map);
		let r_endMarker = addMarker(endOfItems(scenes[curPhase].path), roadview);
		if (prevMarker)
			removeMarker(prevMarker);
		prevMarker = nextMarker;
		nextMarker = r_endMarker;
		kakao.maps.event.addListener(r_endMarker, 'click', nextPhase);
	}else {
		let r_startMarker = addMarker(startOfItems(scenes[curPhase + 1].path), roadview);
		if (prevMarker)
			removeMarker(prevMarker);
		prevMarker = nextMarker;
		nextMarker = r_startMarker;
		kakao.maps.event.addListener(r_startMarker, 'click', nextPhase);
	}
}

function resetMarker() {
	for (let history of markerHistory) {
		history.marker.setMap(null);
	}
}

// life cycle event handler
async function reset(){
	curPhase = 0;
	curStep = 0;
	prevMarker = 0;
	nextMarker = 0;
	resetMarker();
	indoorview.style.display = 'none';
	roadview_container.style.display = 'block';
	roadview.setPanoId(scenes[curPhase].panorams[curStep], scenes[curPhase].path[curStep]);
	await usleep(500);
	addMarker(startOfItems(scenes[curPhase].path), roadview);
	updateMarker();
}

// DOM object for kakao map
let plain_container = document.getElementById('plainview');
let roadview_container = document.getElementById('roadview');
let roadviewClient = new kakao.maps.RoadviewClient();
let options = {
	center:	new kakao.maps.LatLng(37.56063263975059, 126.99678112662578),
	level : 3
};

// kakao map object
let roadview = new kakao.maps.Roadview(roadview_container,{
	pan:startOfItems(scenes[0].viewpoint).pan,
	tilt:startOfItems(scenes[0].viewpoint).tilt,
	zoom:startOfItems(scenes[0].viewpoint).zoom
});

let map = new kakao.maps.Map(plain_container, options);

// Kakao roadview Event Listener
kakao.maps.event.addListener(roadview, 'position_changed', async function() {
	if (curStep == 0) {
		roadview.setViewpoint(startOfItems(scenes[curPhase].viewpoint));
	}else {
		roadview.setViewpoint(endOfItems(scenes[curPhase].viewpoint));
	}

	if (curPhase == scenes.length - 1 && curStep == scenes[curPhase].path.length - 1)
	{
		indoorview.style.display = 'block';
		roadview_container.style.display = 'none';
	}
});

// Update roadview functions
function updateView(){
	if (curStep == 0)
	{
		console.log('end view',endOfItems(scenes[curPhase].viewpoint));
		curStep = scenes[curPhase].path.length - 1;
	}else {
		curStep = 0;
		curPhase++;
	}
	roadview.setPanoId(scenes[curPhase].panorams[curStep], scenes[curPhase].path[curStep]);
}


function nextPhase(){
	console.log(scenes[curPhase].title, scenes[curPhase].viewpoint);
	updateView();
	updateMarker();
}

window.onload = () =>{
	let resetButton = document.querySelector('.reset');
	resetButton.addEventListener('click', reset);
	// Make invisible
	indoorview = document.querySelector('#indoorview');
	indoorview.style.display = 'none';
	let startMarker =new kakao.maps.Marker({position: startOfItems(scenes[curPhase].path), map: map});

	addMarker(startOfItems(scenes[0].path), roadview);
	roadview.setPanoId(scenes[curPhase].panorams[curStep], scenes[curPhase].path[curStep]);
	updateMarker();
}

window.addEventListener('focus', ()=>{
	reset();
});
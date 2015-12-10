#pragma strict
static var Activation: boolean =false;

function OnGUI (){
if(Activation ==false){
if(GUI.Button(Rect(10,10,100,50),"PLAY")){
	SaveSystem.PlayerStats.Load();
	Activation = true;
	}
}
}


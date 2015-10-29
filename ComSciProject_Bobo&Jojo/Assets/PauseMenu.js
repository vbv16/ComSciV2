#pragma strict

var paused : boolean;
var menu : int;

function OnGUI () {
	if(paused){
		
		if(GUI.Button(Rect(10,100,100,30),"EQUIPMENT"))	menu =1;
		if(GUI.Button(Rect(10,130,100,30),"BACKBAG"))	menu =2;
		if(GUI.Button(Rect(10,160,100,30),"CHARACTER"))	menu =3;
		if(GUI.Button(Rect(10,190,100,30),"OPTIONS"))	menu =4;
		if(GUI.Button(Rect(10,220,100,30),"RESUME"))	paused = false;
		if(GUI.Button(Rect(10,250,100,30),"EXIT GAME"))	Application.Quit();
		
		switch(menu){ //case 0, "default" = no menu selected.
			case 1:
				GUI.Box(Rect(110, 70, 200, 300),"EQUIPMENT");
				break;
			case 2:
				GUI.Box(Rect(110, 70, 200, 300),"BACKBAG");
				break;
			case 3:
				GUI.Box(Rect(110, 70, 200, 300),"CHARACTER");
				break;
			case 4:
				GUI.Box(Rect(110, 70, 200, 300),"OPTIONS");
				break;
			default:
				Debug.Log("No Menu Selected");
break;
		}
	}
}

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)){
		paused = !paused;
	}
}
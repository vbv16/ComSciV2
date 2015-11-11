#pragma strict
/**
*  @authour Patrick wong
*  @lastUpdated October 26, 2015
*  @mPause menu
*  @version 1.0
**/
var paused : boolean;// determines wheter the state of the game is paused
var menu : int; // determies the selection of the menu
//Part of the GUI system
function OnGUI () {
	
var PlayerStats : SaveSystem;
PlayerStats = gameObject.FindWithTag("Player").GetComponent(SaveSystem);

  while(GUI.RepeatButton(Rect(50,400,40,40),"UP"))PlayerMovement.Options = 1 ;
  while(GUI.RepeatButton(Rect(50,455,40,40),"DOWN"))PlayerMovement.Options = 2 ;
  while(GUI.RepeatButton(Rect(5,455,40,40),"LEFT"))PlayerMovement.Options = 3 ;
  while(GUI.RepeatButton(Rect(95,455,40,40),"RIGHT"))PlayerMovement.Options= 4 ;
  
  

	if(GUI.Button(Rect(10,10,100,50),"SETTINGS")){
	paused = !paused;
	}
	
	if(paused){
		
		//when pause state is true then it creates the buttons on the side of the screen
		//each button has been giving a number to corspond its function
		if(GUI.Button(Rect(10,60,100,30),"EQUIPMENT"))	menu =1;
		if(GUI.Button(Rect(10,90,100,30),"BACKBAG"))	menu =2;
		if(GUI.Button(Rect(10,120,100,30),"CHARACTER"))	menu =3;
		if(GUI.Button(Rect(10,150,100,30),"OPTIONS"))	menu =4;
		if(GUI.Button(Rect(10,180,100,30),"RESUME"))	paused = false;
		if(GUI.Button(Rect(10,210,100,30),"EXIT GAME"))	Application.Quit();
		
		switch(menu){ // case 0 = nothing has been selected
		//each case is found by the value of menu which whas been asigned previously 
			case 1:
				GUI.Box(Rect(110, 10, 200, 300),"EQUIPMENT");
				break;
			case 2:
				GUI.Box(Rect(110, 10, 200, 300),"BACKBAG");
				break;
			case 3:
				GUI.Box(Rect(110, 10, 200, 300),"CHARACTER");
				break;
			case 4:
				GUI.Box(Rect(110, 10, 200, 300),"OPTIONS");
				if(GUI.Button(Rect(110,90,100,30),"SAVE")){
					PlayerStats.Save();
				}
				break;
				
			default:
				Debug.Log("No Menu Selected");
break;
		}
	}
}

function Update () {
//pauses the state of the game if a key is presseed
 
		if(paused){
		Time.timeScale = 0;
	PlayerMovement.speed = 0;
	}
	else{
	Time.timeScale = 1;
	PlayerMovement.speed = 3;
	}
}
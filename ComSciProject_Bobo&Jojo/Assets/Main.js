#pragma strict
import System.Collections.Generic;

//All monsters
var allMonsters : Monster[];
//Instance of monster in combat
var enemyMonster : Monster;

//All spells
var PlayerSpells: Spells[];
//Instance of spell being cast in battle
var spellBeingCast: Spells;

var items: Item[];

var itemsEquipped: Item[];

//Turn value, to indicate whose turn it is
var turn : int;
//Value to indicate it is players turn
var isTurn : boolean = false;
//Value to indicate that math equation is to be shown
var showMath: boolean = false;
//Value to compare answer used by user to real answer
var compareAnswer: String;

//Allows use of other classes
var calculateDamage:CalculateDamage;
var playerMovement: PlayerMovement; 
var playerStats: PlayerStats;
var math: Math;

function Start () {
compareAnswer = "null";
}
function OnGUI() {
if(StartMenu.Activation == true){

if(playerMovement.isInCombat == true){ 


GUI.Label(Rect(50,60,200,100),"Name:" + "Bobo");
GUI.Label(Rect(50,70,200,100),"Health:" + playerStats.currentHealth + "/" + enemyMonster.baseHealth);
GUI.Label(Rect(50,80,200,100),"Attack:" + playerStats.currentAttack);
GUI.Label(Rect(50,90,200,100),"Dodge:" + playerStats.dodgeRate);
GUI.Label(Rect(50,100,200,100),"Defense:" + playerStats.curDef);
GUI.DrawTexture(Rect(130,65,90,90), playerStats.image);

GUI.Label(Rect(750,60,200,100),"Name:" +enemyMonster.name);
GUI.Label(Rect(750,70,200,100),"Health:" +enemyMonster.currentHealth + "/" + enemyMonster.baseHealth);
GUI.Label(Rect(750,80,200,100),"Attack:" +enemyMonster.currentAttack);
GUI.Label(Rect(750,90,200,100),"Dodge:" + enemyMonster.dodgeRate);
GUI.Label(Rect(750,100,200,100),"Defense:" +enemyMonster.curDef);
GUI.DrawTexture(Rect(600,65,128,128), enemyMonster.image);

if(isTurn == false){
math.mathGenerator();
isTurn = true;
}

if(showMath == true){
GUI.Label(Rect(400,250,200,100), math.varX + "  ___  " + math.varY + "  =  " + math.Output);
if(GUI.Button(Rect(350,300,50,50), " + ")){
compareAnswer = "+";
}
if(GUI.Button(Rect(400,300,50,50), " - ")){
compareAnswer = "-";
}
if(GUI.Button(Rect(450,300,50,50), " * ")){
compareAnswer = "*";
}
if(GUI.Button(Rect(500,300, 50,50), " / ")){
compareAnswer = "/";
}
if(compareAnswer == "+"||compareAnswer == "-"||compareAnswer == "*"||compareAnswer == "/" ){
if(compareAnswer == math.operation){
	playerAttacked();
	isTurn = false;
	showMath = false;
	compareAnswer = "null";
	}	
else if(compareAnswer != math.operation){	
	playerMissed();
	isTurn = false;
	showMath = false;
	compareAnswer = "null";	 
		}	
	}
}

if(turn==0 && showMath == false){
		for(var i=0; i<4; i++){	
		if(GUI.Button(Rect(150,200 + (i*50),100,30),""+ PlayerSpells[i].name)){
		Debug.Log("used " + PlayerSpells[i].name);
		showMath = true;	
		spellBeingCast = PlayerSpells[i];
					}
				}
			}
		}
	}
}
function Update () {
playerMovement = GameObject.Find("Monkey").GetComponent(PlayerMovement); 
playerStats = GameObject.Find("Monkey").GetComponent(PlayerStats);
math = gameObject.Find("Main").GetComponent(Math);
calculateDamage = gameObject.Find("Main").GetComponent(CalculateDamage);
}
function playerAttacked(){
Debug.Log("player Attacked");
turn =1;
calculateDamage.calculateDamage(spellBeingCast);
enemyAttacked();
}
function playerMissed(){
Debug.Log("player Missed");
turn =1;
calculateDamage.miss();
enemyAttacked();
}
function enemyAttacked(){
	yield WaitForSeconds(2);
	Debug.Log("enemy Attacked");
	yield WaitForSeconds(2);
	turn=0;
	calculateDamage.calculateEnemyAttack();	
}

function randomizeMonster(){
	var length:int= 0;
	var tempMonsters: List.<Monster> = new List.<Monster>();	
	
	
		for(var i = 0; i<allMonsters.Length; i++){
		var tempString:String = allMonsters[i].type.ToString();
		Debug.Log(tempString + playerMovement.currentTileTag);
		if(tempString == playerMovement.currentTileTag){
			tempMonsters.Add(allMonsters[i]);
			//Debug.Log("Truth");
			Debug.Log(tempMonsters[length].name);
				length++;
		}
	}
	
		var randomNum : int = Random.Range(0,1);
	//Debug.Log(randomNum + "   " + tempMonsters.Capacity);
	enemyMonster = tempMonsters[randomNum];

}
#pragma strict
import System.Collections.Generic;

//All monsters
var allMonsters : Monster[];
//Monster we encountered
var enemyMonster : Monster;
//Monster being currently fought
var monsterEquipped: Monster;
function Start () {

}
function OnGUI() {
var other: PlayerMovement;
other = GameObject.Find("Monkey").GetComponent(PlayerMovement);


if(other.isInCombat == true){
GUI.Label(Rect(50,100,200,100),"" +enemyMonster.name);
GUI.Label(Rect(50,110,200,100),"" +enemyMonster.baseHealth + "/" + enemyMonster.currentHealth);
GUI.DrawTexture(Rect(100,100,128,128), enemyMonster.image);
if(GUI.Button(Rect(250,255,200,100),"Finish Battle")){
other.isInCombat = false;
}
}


}
function Update () {
	
}
function randomizeMonster(){
	var other: PlayerMovement;
	other = gameObject.Find("Monkey").GetComponent(PlayerMovement);
	
	var tempMonsters: List.<Monster> = new List.<Monster>();
	
		for(var i = 0; i<allMonsters.Length; i++){
		var tempString:String = allMonsters[i].type.ToString();
		Debug.Log(tempString +other.currentTileTag);
		if(tempString == other.currentTileTag){
			tempMonsters.Add(allMonsters[i]);
			Debug.Log("Truth");
			
		}
	}
	
	var randomNum : int = Random.Range(0,1);
	//Debug.Log(randomNum + "   " + tempMonsters.Capacity);
	enemyMonster = tempMonsters[randomNum];
	
	
	
	
	var random = Random.Range(0,2);	
	enemyMonster = allMonsters[random];
	Debug.Log(enemyMonster);
}
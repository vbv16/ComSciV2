#pragma strict

	var name : String;
    var baseDef : float;
    var curDef : float;
    var intelligence : float;
    var strength : float;
    var agility : float;
   
  	var image: Texture2D;
    
    var baseHealth : int = (strength*10); 
    var currentHealth: float;
  	var baseAttack : float = (intelligence *10);
    var currentAttack : float;
 	var dodgeRate : float = (agility*0.5);
 	
 	var curXP:int;
 	var xpRequiredToLevel:int;
 	var statPoints:int;
 	
 	


function Start () {

}

function Update () {
isLevelUp();



}
function isLevelUp(){
if(curXP > xpRequiredToLevel){
curXP = curXP - xpRequiredToLevel;
statPoints = statPoints+2;
		}
}
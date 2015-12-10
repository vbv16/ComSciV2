#pragma strict

class Monster{
    
    var name : String;
    var type : type;
   
    var baseDef : float;
    var curDef : float;
    var intelligence : float;
    var strength : float;
    var agility : float;
   
  	var image: Texture2D;
    
    var baseHealth : float = (strength*10); 
    var currentHealth: float;
  	var baseAttack : float = (intelligence *10);
    var currentAttack : float;
 	var dodgeRate : float = (agility*0.5);
	
	
    }
       
    
   enum type{
    Water,
    Tallgrass,
    Dungeon,




    } 
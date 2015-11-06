#pragma strict
/**
*  @authour Nicholas Trindade
*  @lastUpdated October 26, 2015
*  @movementScript
*  @version 1.0
**/


var startPoint : Vector3; //Character start point
var endPoint : Vector3;//Character after-movement point
static var speed : float;//Character speed
var increment: float;//Character movement size
var isMoving : boolean;//Character isMoving boolean

var animator : Animator;//Calls upon the animator tool on character

//Determiners of the combat chance
var walkCounter : int;
var walkCounter2 : int;
var isInCombat : boolean;
static var Options : int ;

//Start function
function Start (){

    startPoint = transform.position;//Sets the Vector3 start point
    endPoint = transform.position;//Sets the Vector3 end point
    walkCounter2 = Random.Range(5,15);//Sets the walkCounter 2
    animator = GetComponent("Animator");//Sets the anim	ator variable to tool
}
//Update function runs while game is running
function FixedUpdate (){
		//If increment is less than 1 it will set the increment size
    if(increment <= 1 && isMoving == true){
      	 increment += speed/100;
       // Debug.Log("Moving");
    }
    //If increment size is larger than one it will set isMoving to false
    else {
        isMoving = false;
       // Debug.Log("Stopped");
        animator.SetInteger("AnimState",0);//Set monkey animState to default
    }
	//If the monkey is moving 
    if(isMoving)	
        transform.position = Vector3.Lerp(startPoint, endPoint, increment);//Method to move character from startpoint to endpoint during x 
	
    if(!isInCombat){ //If is not in combat moving will be possible
    var hit : RaycastHit;//Creates rayCasting variable
    var isCollider: boolean = false;//Creates is collide variable
    var distanceToGround;//Creates distanceToGround variable
    if(Input.GetKey("w")|| Options == 1 && isMoving == false){//If movekey is forward and isMoving false let moving occur

    if(Physics.Raycast (transform.position, Vector3.forward, hit));//Theoretically move the character 1 unit forward
    {
    		distanceToGround = hit.distance; //Calculates the distance of theoretical move to the ground
    	
       if(hit.collider.gameObject.tag == "Collidable"){//Checkes to see if character will come in contact with the tag collidable
        	isCollider = true; //If it comes into contact with a collidbale to true
           Debug.Log("Collidable");
     
         	}
      }		
      		//Only allow movement if collidable is false
    		if(isCollider == false){
            calculateWalk();//Calls a method to check what block will be hit
            increment = 0;//Sets increment to 0 therefore allowing movement to occur again
            isMoving = true;//Sets movement to true
            startPoint = transform.position;//Sets startPoint to initial point
            endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z + 1);//Sets endpoint to one unit forward
            animator.SetInteger("AnimState",1);//Calls upon animation
            //Note: the start point and endpont are now put into the Lerp function to make char move
        }
       }
       
       //Same concept of movement for the rest of the keys
        else if(Input.GetKey("s")|| Options == 2 && isMoving == false){
      
       if(Physics.Raycast (transform.position, -Vector3.forward, hit));
    {
       		distanceToGround = hit.distance;
      	 if(hit.collider.gameObject.tag == "Collidable"){
        	isCollider = true;
            Debug.Log("Collidable");
        }
    }
            
            if(isCollider ==false){       
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z - 1);
            animator.SetInteger("AnimState",2);
        }
        }

        else if(Input.GetKey("a")|| Options == 3 && isMoving == false){
    
         if(Physics.Raycast (transform.position, Vector3.left, hit));
    {
    		distanceToGround = hit.distance;
      	 if(hit.collider.gameObject.tag == "Collidable"){
        	isCollider = true;
            Debug.Log("Collidable");
        }
    }	
        if(isCollider==false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x - 1,transform.position.y, transform.position.z);
            animator.SetInteger("AnimState",3);
        }
        }
        else if(Input.GetKey("d")|| Options == 4 && isMoving == false){
       
          if(Physics.Raycast (transform.position, Vector3.right, hit));
    {
    		distanceToGround = hit.distance;
      	 if(hit.collider.gameObject.tag == "Collidable"){
        	isCollider = true;
            Debug.Log("Collidable");
        }
    }	
            if(isCollider==false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x + 1,transform.position.y, transform.position.z);
            animator.SetInteger("AnimState",4);
        }}
    }
}
//Calculate walkfunction checks to see what block will be hit next
function calculateWalk (){
    yield WaitForSeconds(0.4);//Waits abit as to allow movement to complete (if it did not they could enter battle or trigger triggers without actually being on the block yet
    var hit : RaycastHit;//Create rayCast varible
     Options =0;
    var distanceToGround;//Create distanceToGround variable
	if(Physics.Raycast(transform.position, -transform.up, hit,100)){//Raycast the unit down one block
	distanceToGround = hit.distance;//Get the distance to ground 
	//Use the distance to ground to see which tile the character came into contact with
	if(hit.collider.gameObject.tag == "NoUse"){//If the character is ontop of a tile of NoUse
        	Debug.Log("NoUse");
     }
       if(hit.collider.gameObject.tag == "TallGrass"){//If the character is ontop of a tile of TallGrass
            walkCounter++;//Increase the walk counter
            Debug.Log("TallGrass");
        }
        if(hit.collider.gameObject.tag == "Water"){//If the character is ontop of a tile of Water
            walkCounter++;//Increase the walk counter
            Debug.Log("Water");
        }
        if(hit.collider.gameObject.tag == "Dungeon"){//If the character is ontop of a tile of Dungeon
            walkCounter++;//Increase the walk counter
            Debug.Log("Dungeon");
        }
        
	}
	//if the walkcounter is larger than walkcounter2 (Which was randomly generated in the start function) character will enter battle
 if(walkCounter >= walkCounter2){
        walkCounter2 = Random.Range(5,10);//Create a new walkCoutner2 to add abit of randomness as to when you enter battle
        walkCounter = 0;//Rest walkcounter
        enterCombat();//Call the enterCombat function
    }
  }//Enters combat
function enterCombat () {
    isInCombat = true;//Turns combat true (inhibits movement)
    Debug.Log("You have entered COMBAT!");
}

//Patricks code Teleportation
function OnTriggerEnter (col : Collider) {
	// checks the tag of the tile to see what telportation it is
    if(col.gameObject.tag == "dungeonEntrance1")
    {
    //debug 
        Debug.Log("Teleport");
      //stores the position of the character
      startPoint = transform.position;
      // transformt he store position of the character to the set location
      endPoint = new Vector3(transform.position.x+30,transform.position.y, transform.position.z);
  
}
    if(col.gameObject.tag == "dungeonExit1")
    {
   	
    }
}

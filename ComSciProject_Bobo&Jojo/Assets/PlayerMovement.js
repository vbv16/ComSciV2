#pragma strict

var startPoint : Vector3;
var endPoint : Vector3;
var speed : float;
var increment: float;
var isMoving : boolean;

var animator : Animator;

//Walking stats
var walkCounter : int;
var walkCounter2 : int;
var isInCombat : boolean;

//var teleportLoc : GameObject[];



function Start (){

    startPoint = transform.position;
    endPoint = transform.position;
    walkCounter2 = Random.Range(5,15);
    animator = GetComponent("Animator");
}
function Update (){

    if(increment <= 1 && isMoving == true){
        increment += speed/50;
       // Debug.Log("Moving");
    }
    else {
        isMoving = false;
       // Debug.Log("Stopped");
        animator.SetInteger("AnimState",0);
    }

    if(isMoving)
        transform.position = Vector3.Lerp(startPoint, endPoint, increment);


    if(!isInCombat){
    var hit : RaycastHit;
    var isCollider: boolean = false;
    var distanceToGround;
    if(Input.GetKey("w") && isMoving == false){
    if(Physics.Raycast (transform.position, Vector3.forward, hit));
    {
    		distanceToGround = hit.distance;
    	
       if(hit.collider.gameObject.tag == "Collidable"){
        	isCollider = true;
           Debug.Log("Collidable");
                   
        }
      }		
    		if(isCollider == false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z + 1);
            animator.SetInteger("AnimState",1);
        }
       }
        else if(Input.GetKey("s") && isMoving == false){
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

        else if(Input.GetKey("a") && isMoving == false){
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
        else if(Input.GetKey("d") && isMoving == false){
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

function tileTag(hit :RaycastHit){
/*if(hit.collider.gameObject.tag == "NoUse"){
        	Debug.Log("NoUse");
        }
        if(hit.collider.gameObject.tag == "TallGrass"){
            walkCounter++;
            Debug.Log("TallGrass");
        }
        if(hit.collider.gameObject.tag == "Water"){
            walkCounter++;
            Debug.Log("Water");
        }
        if(hit.collider.gameObject.tag == "Dungeon"){
            walkCounter++;
            Debug.Log("Water");
        }*/
}
function calculateWalk (){
  
    yield WaitForSeconds(0.3);
    var hit : RaycastHit;
    var distanceToGround;
	if(Physics.Raycast(transform.position, -transform.up, hit,100)){
	distanceToGround = hit.distance;
	if(hit.collider.gameObject.tag == "NoUse"){
        	Debug.Log("NoUse");
     }
       if(hit.collider.gameObject.tag == "TallGrass"){
            walkCounter++;
            Debug.Log("TallGrass");
        }
        if(hit.collider.gameObject.tag == "Water"){
            walkCounter++;
            Debug.Log("Water");
        }
        if(hit.collider.gameObject.tag == "Dungeon"){
            walkCounter++;
            Debug.Log("Water");
        }
	}
 if(walkCounter >= walkCounter2){
        walkCounter2 = Random.Range(5,10);
        walkCounter = 0;
        enterCombat();
    }
  }
function enterCombat () {
    isInCombat = true;
    Debug.Log("You have entered COMBAT!");
}

function OnTriggerEnter (col : Collider) {
    if(col.gameObject.tag == "dungeonEntrance1")
    {
        Debug.Log("fuckingwork");
        
        calculateWalk();
        increment = 0;
        isMoving = true;
        startPoint = transform.position;
        endPoint = new Vector3(transform.position.x + 10,transform.position.y, transform.position.z);
        /*this.transform.position =  new Vector3(300,100,0);
  /* this.transform.position = teleportLoc[0].transform.position;
    this.transform.position.y += 10;*/
}
    if(col.gameObject.tag == "dungeonExit1")
    {
        /*this.transform.position = teleportLoc[1].transform.position;
        this.transform.position.y +=10;*/
    }
}

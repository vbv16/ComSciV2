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

function Start (){

    startPoint = transform.position;
    endPoint = transform.position;
    walkCounter2 = Random.Range(5,15);
    animator = GetComponent("Animator");
}
function Update (){

    if(increment <= 1 && isMoving == true){
        increment += speed/100;
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
        if(Input.GetKey("w") && isMoving == false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z + 1);
            animator.SetInteger("AnimState",1);
        }
        else if(Input.GetKey("s") && isMoving == false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z - 1);
            animator.SetInteger("AnimState",2);
        }

        else if(Input.GetKey("a") && isMoving == false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x - 1,transform.position.y, transform.position.z);
            animator.SetInteger("AnimState",3);
        }
        else if(Input.GetKey("d") && isMoving == false){
            calculateWalk();
            increment = 0;
            isMoving = true;
            startPoint = transform.position;
            endPoint = new Vector3(transform.position.x + 1,transform.position.y, transform.position.z);
            animator.SetInteger("AnimState",4);
        }
    }
}
function calculateWalk (){
  
     yield WaitForSeconds(0.3);
    var hit : RaycastHit;
    if(Physics.Raycast (transform.position, -Vector3.up, hit));
    {
        var distanceToGround = hit.distance;
    }
    if(hit.collider.gameObject.tag == "TallGrass"){
        walkCounter++;
        Debug.Log("TallGrass");
    }


    if(walkCounter >= walkCounter2){
        walkCounter2 = Random.Range(5,15);
        walkCounter = 0;
        enterCombat();
    }
  }
function enterCombat () {
    isInCombat = true;
    Debug.Log("You have entered COMBAT!");
}
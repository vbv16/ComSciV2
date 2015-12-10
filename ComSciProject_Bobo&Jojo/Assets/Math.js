	 	#pragma strict
/* @author Nicholas Trindade
*  @since December 12, 2015
*/


//Equation being used: varX operation varY = Output
//Ex. 10 + 5 = 15
var varX:int;//Initiate x variable
var varY:int;//Initiate y variable
var Output:int;//Initiate output variable

var gradeLevel: int;//Initiate gradeLevel variable (serves as a multiplier of the difficulty)

var operationChoice:int;//Initiate operationChoice 
var operation:String;//Initiate operation


function Start () {
//Debug
gradeLevel = 5;	
}

//Generates two random numbers and determines the operation (+,-,*,/)
function mathGenerator(){

operationChoice = Random.Range(1, gradeLevel);//Operation choice randomizs which operation will be the answer
varX = Random.Range(1, (gradeLevel*10));//Sets the first random 
  
//If operation choice is 1, answer is addition
if(operationChoice == 1){
operation = "+";//Sets answer
varY =  Random.Range(1,(gradeLevel*20));//Generates second random number
getAdditionOutput(varX, varY);//Calls function to get output of the two numbers added
}

//if operation choice is 2, answer is subtraction
else if(operationChoice == 2){
operation = "-";//Sets answer
varY =  Random.Range(1,(gradeLevel*20));//Generates random number
getSubtractionOutput(varX,varY);//Cals function to get the output of two numbers subtracted from one another
}

//If operation choice is 3, answer is multiplication
else if(operationChoice ==3){
operation = "*";//Sets answer
varY =  Random.Range(1,(gradeLevel*10));//Generates random number
getMultiplicationOutput(varX,varY);//Calls fucntion to get output of the two numbers
}
 
//If operation choice is 4, answer is division
else if(operationChoice == 4){
operation = "/";//Sets answer
Output =  Random.Range(1,(gradeLevel*10));//Generates random OUTPUT
getDivisionDividend(varX, Output);//Calls function to get the Y value
}
}

//Sets addition output
function getAdditionOutput(x:int,y:int){
Output =(x + y);
debug();
}

//Sets the subtraction output
function getSubtractionOutput(x:int, y:int){
//Uses if statements so output is not negative
if(x>y){
Output = (x - y);

}
else{
Output = (y-x);
varX = y;
varY = x;	
}
debug();
}

//Sets the multiplication output
function getMultiplicationOutput(x:int,y:int){
Output = (x * y);
debug();
}

//Sets the varY value (the output is multiplied by x so that x divided by y is an even and clean number
function getDivisionDividend(x:int, output:int){
varX = (output * x);
varY = x;
debug();

}
function debug(){
// Debug.Log(varX + " " + operation + " " + varY + " = " + Output);
}
function increaseGrade(){
gradeLevel++;
}
  
function Update () {
/*if(Input.GetKey("l")){
mathGenerator();
}*/
}	

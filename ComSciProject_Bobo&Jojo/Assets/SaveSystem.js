#pragma strict

var player : GameObject;


function Start () {

player = GameObject.FindWithTag("Player");
Load();
}

function Load () {
	if(PlayerPrefs.GetFloat("Player") != null  ){
	Debug.Log("game Loaded");
	player.transform.position.x = (PlayerPrefs.GetFloat("playerX"));
	player.transform.position.y = (PlayerPrefs.GetFloat("playerY"));
	player.transform.position.z = (PlayerPrefs.GetFloat("playerZ"));
	
	}
}
function Save () {

	Debug.Log("game saved");
	
	PlayerPrefs.SetFloat("playerX",player.transform.position.x);
	PlayerPrefs.SetFloat("playerY",player.transform.position.y);
	PlayerPrefs.SetFloat("playerZ",player.transform.position.z);
}
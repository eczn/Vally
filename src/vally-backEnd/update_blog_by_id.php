<?php
require("./SQL_config.php");

headerPub(); 

$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$id = $_POST['id']; 
$title = $_POST['title'];
$body = $_POST['body'];
$type = $_POST['type'];
$tags = $_POST['tags']; 
$archive = $_POST['archive']; 
$client_hash = $_POST['cHash']; 
$client_rand = $_POST['cRand']; 

if ($sql_info->very_pwd($client_hash, $client_rand) == false){
	echo '{"status": "-1", "msg": "pwd false"}';
	exit(); 
}

// $req = $_POST['req']; 
$introdution = $_POST['intro']; 


if ($type == 'text'){
	// $format = str_replace(PHP_EOL, '<br>', $body);
	$format = nl2br($body);
} else {
	$format = '';
	$body = str_replace('\'', '\\\'', $body);
	$body = str_replace('\"', '\\\"', $body);
	// $introdution = str_replace('\'', '\\\'', $introdution);
	// $introdution = str_replace('\"', '\\\"', $introdution);
}

$update = "UPDATE blog SET title = '$title', body = '$body', update_date = now(), type = '$type', format = '$format', intro = '$introdution', tags = '$tags', archive = '$archive' WHERE id = $id";

// $sql_info->inject_check($update);

mysql_query("SET NAMES utf8");
$result = mysql_query($update);

// $tagsNew = "UPDATE tags SET tagName = '$tags' WHERE id=$id"; 
// $resultTag = mysql_query($tagsNew);

echo '{"status": "1", "msg": "update success"}';


mysql_close($con);
?>

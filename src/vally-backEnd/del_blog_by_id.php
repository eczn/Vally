<?php
// DELETE FROM 表名称 WHERE 列名称 = 值
require_once("./SQL_config.php");

$sql_info->headerPub(); 

$sql_info = new sql_config(); 


$client_hash = $_POST['cHash']; 
$client_rand = $_POST['cRand']; 

if ($sql_info->very_pwd($client_hash, $client_rand) == false){
	echo '{"status": "-1", "msg": "pwd false"}';
	exit(); 
}


$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$delId = $_POST['id']; 
// echo $delId;
$sql = "DELETE FROM blog WHERE id=$delId";
// $sql = mysql_real_escape_string($sql); 

mysql_query("SET NAMES utf8");
$result = mysql_query($sql);

echo '{"status": "1", "msg": "delete success!"}';
mysql_close($con);
?>

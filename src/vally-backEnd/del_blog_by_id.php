<?php
// DELETE FROM 表名称 WHERE 列名称 = 值
require_once("./SQL_config.php");

header("Content-type: text/plain; charset=utf-8;");
header("Access-Control-Allow-Origin: *");

$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$delId = $_GET['id']; 
// echo $delId;
$sql = "DELETE FROM blog WHERE id=$delId";

mysql_query("SET NAMES utf8");
$result = mysql_query($sql);

echo '{ "sql_status": true }';
mysql_close($con);
?>

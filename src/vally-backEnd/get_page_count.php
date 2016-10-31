<?php
require_once("./SQL_config.php");

function article_count(){
	$sql_info = new sql_config(); 
	$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
	$dd = mysql_select_db($sql_info->database, $con);

	header('Content-type: text/html;charset=utf-8;');
	header("Access-Control-Allow-Origin: *");

	// $insertBlog = "INSERT INTO blog (title, body) VALUES ('$title', '$body')";
	$sql = "SELECT count(*) as cou FROM blog";
	// $sql_info->inject_check($sql); 
	$sql = mysql_real_escape_string($sql); 
	mysql_query("SET NAMES utf8");
	$result = mysql_query($sql);
	$temp = mysql_fetch_array($result); 
	// var_dump($result);
	// print_r(mysql_fetch_array($result));
	mysql_close($con);
	
	return $temp['cou'];
}

?>

<?php
require("./SQL_config.php");

header('Content-type: text/html;charset=utf-8;');
header("Access-Control-Allow-Origin: *");

$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$title = $_POST['title'];
$body = $_POST['body'];
$type = $_POST['type'];
// $req = $_POST['req']; 
$introdution = $_POST['intro']; 

if ($sql_info->api_pwd != $_POST['pwd']){
	exit(); 
}

if ($type == 'text'){
	// $format = str_replace(PHP_EOL, '<br>', $body);
	$format = nl2br($body);
} else {
	$format = '';
	$body = str_replace('\'', '\\\'', $body);
	$body = str_replace('\"', '\\\"', $body);
	// $introdution = str_replace('\'', '\\\'', $introdution);
	// $introdution = str_replace('\"', '\\\"', $introdution);
	// ' asdasd"asdasd"123123 '
}

// $insertBlog = "INSERT INTO blog (title, body) VALUES ('$title', '$body')";
$insertBlog = "INSERT INTO blog (title, body, date, format, type, update_date, intro) VALUES ('$title', '$body', now(), '$format', '$type', now(), '$introdution')";

mysql_query("SET NAMES utf8");
$result = mysql_query($insertBlog);

echo '{ "sql_status": true }'; 
// echo json_encode(
// 	array(
// 		'target' => $tempArr,
// 		'count' => $count
// 	)
// );

mysql_close($con);
?>

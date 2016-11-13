<?php
// get_blog.php
require_once("./SQL_config.php");
require('./get_page_count.php');

$count = article_count();
$sql_info = new sql_config(); 

headerPub(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);



$id = $_GET['id'];
$id = intval($id); 

if (is_int($id)){
	// true 
	$sql = "SELECT * FROM comments WHERE id = $id ORDER BY update_date";
	$sql = mysql_real_escape_string($sql); 
} else {
	echo '{"status": "-999", msg: "有话好好说.. id要纯数字..."}';
	exit(); 
}

mysql_query("SET NAMES utf8");
$result = mysql_query($sql);

$temp = array(); 
$needToSend = array(); 

while ($temp = mysql_fetch_array($result)){

	array_push($needToSend, array(
		'id'=> $temp['id'], 
		'who_say'=> $temp['who_say'],
		'avatar'=> $temp['avatar'],
		'email'=> $temp['email'],
		'website'=> $temp['website'],
		'comment'=> $temp['comment'],
		'update_date'=> $temp['update_date']
	)); 

}

echo json_encode($needToSend); 

mysql_close($con);

?>

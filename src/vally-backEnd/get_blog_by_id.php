<?php
// get_blog.php
require_once("./SQL_config.php");
require('./get_page_count.php');

$count = article_count();
$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$blog_num = 7; 

headerPub(); 

$id = $_GET['id'];
$id = intval($id); 

if (is_int($id)){
	// true 
	$sql = "SELECT * FROM blog WHERE id = $id";
	$sql = mysql_real_escape_string($sql); 
} else {
	echo '{"status": "-999", msg: "有话好好说.. id要纯数字..."}';
	exit(); 
}

mysql_query("SET NAMES utf8");
$result = mysql_query($sql);

$temp = mysql_fetch_array($result);

$temp = array(
	'id'=> $temp['id'], 
	'title'=> $temp['title'],
	'intro'=> $temp['intro'],
	'body'=> $temp['body'],
	'format'=> $temp['format'],
	'type'=> $temp['type'],
	'date'=> $temp['date'],
	'updateDate'=> $temp['update_date']
); 

echo json_encode(
	array(
		'blog' => $temp,
		// 'count' => $count
	)
); 

mysql_close($con);

?>

<?php
require("./SQL_config.php");

headerPub(); 

$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

$target_blog_id = $_POST['id']; 
$who_say = $_POST['who_say'];
$comment = $_POST['comment']; 
$avatar = $_POST['avatar'];
$website = $_POST['website'];
$email = $_POST['email']; 

if ($comment == ''){
	echo json_encode(array(
		'status' => '0', 
		'msg' => '非法输入'
	));
}

$comment = str_replace('\'', '\\\'', $comment);
$comment = str_replace('\"', '\\\"', $comment);
// $comment = str_replace('\"', '\\\"', $comment);

$avatar = str_replace('\'', '\\\'', $avatar);
$avatar = str_replace('\'', '\\\'', $avatar);

$website = str_replace('\'', '\\\'', $website);
$website = str_replace('\'', '\\\'', $website);


// $insertComment = "INSERT INTO comments (id, who_say, comment, avatar, website, email, update_date) VALUES ($target_blog_id, '$who_say', $comment, '$avatar', '$website', '$email', now())";
$insertComment = "INSERT INTO comments (id, who_say, comment, avatar, website, email, update_date) VALUES ($target_blog_id, '$who_say', '$comment', '$avatar', '$website', '$email', now())";

mysql_query("SET NAMES utf8");
$result = mysql_query($insertComment);

echo json_encode(array(
	'status' => "1", 
	'msg' => "post comment success!", 
)); 

mysql_close($con);
?>

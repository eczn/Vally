<?php
// get_blog.php
require_once("./SQL_config.php");
require('./get_page_count.php');

$count = article_count();
$sql_info = new sql_config(); 

$con = mysql_connect($sql_info->host, $sql_info->account, $sql_info->pwd);
$dd = mysql_select_db($sql_info->database, $con);

// INSERT INTO 表名称 VALUES (值1, 值2,....)

$blog_num = 7; 

header("Content-type: text/plain; charset=utf-8;");
header("Access-Control-Allow-Origin: *");
$id = 3007; 
$title = "asd"; 
$body = "<a class='footer-head' onclick=\"alert('123123')\">宇工大</a>";


$body = str_replace('\'', '\\\'', $body);
$body = str_replace('\"', '\\\"', $body);

$sql = "UPDATE blog SET title = '$title', body = '$body', update_date = now() WHERE id = $id";

echo $sql;



mysql_query("SET NAMES utf8");
$result = mysql_query($sql);

?>

<?php
// get_blog.php
require_once("./SQL_config.php"); 
require('./get_page_count.php'); 

$count = article_count();
$sql_info = new sql_config();

headerPub();

$client_hash = $_POST['hash'];
$client_rand = $_POST['rand'];

if ( $sql_info->very_pwd($client_hash, $client_rand) ){
	echo '{"status": "1", "msg": "pwd is true!"}';
} else {
	echo '{"status": "0", "msg": "pwd is not true... try it again"}'; 
}

?>

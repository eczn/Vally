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

// header("Content-type: text/plain; charset=utf-8;");
// header("Access-Control-Allow-Origin: *");
$sql_info->headerPub(); 

// $blogId = $_GET['id'];
// $_GET['page'];
// select * from blog limit 2,3
$page = $_GET['page'];
$needBody = $_GET['need_body']; 

//  order by c desc
$sql = "SELECT * FROM blog ORDER BY id DESC LIMIT ". ($page-1)*$blog_num .",".$page*$blog_num;
$sql = mysql_real_escape_string($sql); 
// $sql_info->inject_check($sql);

// echo $insertBlog;
mysql_query("SET NAMES utf8");
$result = mysql_query($sql);
//$temp = mysql_fetch_array($result);

$tempArr = array(); 



// $echo '{ "blogList": [';
while ( $temp = mysql_fetch_array($result) ) {
	// $temp['body'] = nl2br($temp['body']);
	// $temp['body'] = str_replace(PHP_EOL, '', $temp['body']);
	if ($needBody == 'yes') {
		$tempBody = $temp['body']; 
	} else {
		$tempBody = 'nobody';
	}

	// $targetId = $temp['id']; 
	// $tagSQL = "SELECT * FROM tags WHERE id=$targetId"; 
	// $tagRes = mysql_query($tagSQL);
	// $tagRes = mysql_fetch_array($tagRes); 

	array_push($tempArr, array(
		'id'=> $temp['id'], 
		'title'=> $temp['title'],
		'intro'=> $temp['intro'],
		// 'body'=> $temp['body'],
		'body'=> $tempBody,
		'format'=> $temp['format'],
		'type'=> $temp['type'],
		'date'=> $temp['date'],
		'updateDate'=> $temp['update_date'],
		// 'tags'=> $tagRes['tagName']
		'tags'=> $temp['tags']
	)); 

	// echo '{"id": "'.$temp[0].'", "title": "'.$temp[1].'", "body": "'.$temp[2].'"},';
}
// echo '{ "id": "-1", "title": "End Of This Page", "body": "这页到底了"}]}';

echo json_encode(
	array(
		'blogList' => $tempArr,
		'count' => $count
	)
); 

mysql_close($con);

?>

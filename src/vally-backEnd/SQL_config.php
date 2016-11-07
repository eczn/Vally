<?php
class sql_config {
	public $host = "127.0.0.1"; 
	public $database = "ku"; 
	public $account = "root"; 
	public $pwd = "root";
	public $api_pwd = "asd123";


	public function very_pwd($client_hash, $client_rand ){
		$server_hash = md5($this->api_pwd.$client_rand);

		if ($server_hash == $client_hash) {
			return true; 
		} else {
			return false; 
		}
		
	}
	//过滤Sql注入
	public function inject_check($Sql_Str){
		$check = preg_match('/select|insert|update|delete|\'|\\*|\*|\.\.\/|\.\/|union|into|load_file|outfile/i',$Sql_Str);

		if ($check) {
			echo '{"status": "-999", "msg": "有话好好说...."}';
			exit();
		} else {
			return $Sql_Str;
		}
	}

	public function headerPub(){
		// header("Content-type: text/plain; charset=utf-8;");
		// header("Access-Control-Allow-Origin: *");
	}

}
?>

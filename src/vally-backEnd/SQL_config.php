<?php
class sql_config {
	public $host = "127.0.0.1"; 
	public $database = "ku"; 
	public $account = "root"; 
	public $pwd = "asd123";
	public $api_pwd = "asd123";


	public function very_pwd($client_hash, $client_rand ){
		$server_hash = md5($this->api_pwd.$client_rand);

		if ($server_hash == $client_hash) {
			return true; 
		} else {
			return false; 
		}
		
	}
}
?>

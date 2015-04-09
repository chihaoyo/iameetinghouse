<?php

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET')
	echo file_get_contents('data');
else if($method == 'POST') {
	$data = $_POST['data'];
	file_put_contents('data', $data);
}

?>
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Items extends CI_Controller {
	
	private $response = "";
	private $noItems = 0;
	private $errorUserName = 1;
	private $errorEmail = 2;
	private $isOK = 3;
	
	function index()
	{
		//
	}
	
	function load(){
		//$this->load->database();
		$query = $this->db->get("items");
		$data['data'] = $query->result();
		
		echo json_encode($data);
	}
	
	function makePurchase($username, $email, $ItemCount){
		
		$email = urldecode($email);
		
		if (!$ItemCount){
			$this->response = $this->noItems;
		}
		else if (strlen($username) <= 6)
		{
			$this->response = $this->errorUserName;
		}
		
		else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$this->response = $this->errorEmail;
		}
		
		else 
			$this->response = $this->isOK; 
		
		$data['code'] = $this->response;
		echo json_encode($data);
		
	}
	
	function search($itemName){
		$this->db->where('name', $itemName);
		$query = $this->db->get("items");
		$data['data'] = $query->result();
		
		echo json_encode($data);
	}
	
}

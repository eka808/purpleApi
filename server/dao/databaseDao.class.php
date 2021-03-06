<?php
include_once('classes/idiorm.php');

/**
 * DAO implementation for using database storing via Idiorm (https://github.com/j4mie/idiorm)
 * @author eka808
**/
class databaseDao
{

	private $db;

	/**
	 * Default constructor
	 * Configure the idiorm db connection
	 * @param pdoConnectionString : the connection string of PDF to access the db
	**/
	function __construct($pdoConnectionString)
	{
		// Connect to the demo database file
    	ORM::configure($pdoConnectionString);
    	$this->db = ORM::get_db();
	}

	/**
	 * Return the entities
	**/
	public function listEntities($tableName)
	{
		return ORM::for_table($tableName)->find_many();
	}	


	/**
	 * Add an entity and save to db
	**/	
	public function addEntity($tableName, $entity) 
	{
		$fruit = ORM::for_table($tableName)->create();

		// Fetch properties of source object into the one to store in db
		foreach ($entity as $key => $value)
		if ($key != 'Id')
			$fruit->$key = $value;	

		$fruit->save();
	}

	/**
	 * Remove entity from db
	**/	
	public function removeEntity($tableName, $Id) 
	{
		$fruit = ORM::for_table($tableName)->where_equal('Id', $Id)->delete_many();
	}

	public function executeSqlQuery($sqlQuery)
	{
    	$this->db->exec($sqlQuery);
	}
}
?>
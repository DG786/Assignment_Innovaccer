<?php 
	
	include("config.php");
	$datas = $_POST['expenses'];

	$sql = "INSERT IGNORE INTO `fnrtend` (`id`, `category`, `amount`, `expense_day`, `expense_time`, `createdAt`, `reason`) VALUES ";
	$count_data = count($datas);
	for($i=0;$i<$count_data;$i++)
		{
			$id = $datas[$i][0];
			$category = $datas[$i][1];
			$amount = $datas[$i][2];
			$reason = $datas[$i][3];
			$date = $datas[$i][4];
			$time = $datas[$i][5];
			$createdAt = $datas[$i][6];

			$sql .= "( '$id' , '$category' , '$amount' , '$reason', '$date', '$time', '$createdAt')";
			if($i != $count_data-1) 
				$sql .= ",";

		}

	$sql .= ";";

	if(!$db->query($sql)) echo "something went worng";
	else{
		echo "synchronisation sucessfull";
	}
?>

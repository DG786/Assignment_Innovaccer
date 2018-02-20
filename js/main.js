var db = null;
var db_created = false;
var id = 1;
$(document).ready(function(){
//Open database

var request = indexedDB.open('expenseManager',2);

request.onupgradeneeded = function(e){

		db = e.target.result;
		var table_name = "category_names";
		if(!db.objectStoreNames.contains(table_name)){
			var os = db.createObjectStore(table_name,{autoIncrement:true});
			os.createIndex('name','name',{unique:false});
		}


		var table_name2 = "expense_table";
		if(!db.objectStoreNames.contains(table_name2)){
			var os = db.createObjectStore(table_name2,{keyPath:'id' , autoIncrement:true});
			os.createIndex('category','category',{unique:false});
			os.createIndex('amount','name',{unique:false});
			os.createIndex('day','name',{unique:false});
			os.createIndex('time','name',{unique:false});
			os.createIndex('reason','reason',{unique:false});
			os.createIndex('createdAt','createdAt',{unique:false});
		}
};

request.onsuccess = function(e){
	console.log('Success: opened the database....');
	db=e.target.result;	
	db_created = true;
	showExpenses(e);
    setCategory();
    setCategory2();

}


request.onerror = function(e){
	console.error('Error: could not not open the database...');
}
});


function addCategory(){
	var category = { name : $('#category').val() }
	var transaction = db.transaction(["category_names"],"readwrite");
	var store = transaction.objectStore("category_names");
	var requestadd =store.put(category);
	requestadd.onsuccess = function(){
		console.log("sucessfully added to the table");
	};

	requestadd.onerror = function(){
		console.log("failed");
	};

	setCategory();
}



function addExpense(){

	// var transaction2 = db.transaction(["expense_table"],"readwrite");
	// var store2 = transaction.objectStore("expense_table");

	var category = $('#select_cat').val();
	var amount = $('#amount').val();
	var time = $('#time').val();
	var day = $('#day').val();
	var reason = $('#reason').val();
	var transaction = db.transaction(["expense_table"],"readwrite");
	var store = transaction.objectStore("expense_table");


	var createdAt = new Date().toLocaleTimeString(); 
	var expense = {
		category : category,
		amount: amount,
		day: day,
		time: time,
		reason: reason,
		createdAt : createdAt

	}


	var request = store.add(expense);

	request.onsuccess = function(e){
		window.location.href="index.html";
	}

	request.onerror = function(e){
		alert("sorry, the customers were not added");
		console.log('Error', e.target.error.amount);
	}
}

function showCategory(e){
	var transaction = db.transaction(["category_names"],"readonly");
	var store = transaction.objectStore("category_names");
	var index = store.index("name");
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
      	console.log(cursor.value.name);
        cursor.continue();
      } else {
        
      }

  };
}


function getCategory(e){
	
	categories = []
	var transaction = db.transaction(["category_names"],"readonly");
	var store = transaction.objectStore("category_names");
	var index = store.index("name");
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
      	categories.push(cursor.value.name);
      	console.log(cursor.value.name);
        cursor.continue();
      } else {
        
      }

  };

  return categories;
}

function getTimeAndExpense(){
	
	var category = $('#disp_cat').val();
	var total = addToTable(category);
	expenses = [];
	time = [];
	var transaction = db.transaction(["expense_table"],"readonly");
	var store = transaction.objectStore("expense_table");
	var index = store.index("createdAt");
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      console.log(category);
      if (cursor) {
      	if(cursor.value.category == category){
      		console.log(cursor.value.category);
      		expenses.push(cursor.value.amount);
      		time.push(cursor.value.time);
      		console.log(cursor.value.time);}
        	cursor.continue();
      } else {
        createGraph(time,expenses);
        var output = '';
		output += "<tr id='"+cursor.value.id+"'>";
		output += "<td>"+""+"</td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='category' data-id='"+cursor.value.id+"'>"+""+"</span></td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='amount' data-id='"+cursor.value.id+"'>"+""+"</span></td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='day' data-id='"+cursor.value.id+"'>"+""+"</span></td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='time' data-id='"+cursor.value.id+"'>"+""+"</span></td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='reason' data-id='"+cursor.value.id+"'>"+"<b>Total:</b>"+"</span></td>";
		output += "<td><span class='cursor customer' contenteditable='true' data-field='createdAt' data-id='"+cursor.value.id+"'>"+total+"</span></td>";
		output += "<td></td>";
		output += "</tr>";
		$('#expenses').html(output);
      }

  };



}

function addToTable(category){
		var transaction = db.transaction(["expense_table"],"readonly");
	var store = transaction.objectStore("expense_table");
	var index = store.index("createdAt");
	var total = 0;
	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if (cursor) {


			if(cursor.value.category == category){
				total += cursor.value.amount;
				output += "<tr id='Expense_"+cursor.value.id+"'>";
				output += "<td>"+cursor.value.id+"</td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='category' data-id='"+cursor.value.id+"'>"+cursor.value.category+"</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='amount' data-id='"+cursor.value.id+"'>"+cursor.value.amount+"</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='day' data-id='"+cursor.value.id+"'>"+cursor.value.day+"</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='time' data-id='"+cursor.value.id+"'>"+cursor.value.time+"</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='reason' data-id='"+cursor.value.id+"'>"+cursor.value.reason+"</span></td>";
				output += "<td><span class='cursor customer' contenteditable='true' data-field='createdAt' data-id='"+cursor.value.id+"'>"+cursor.value.createdAt+"</span></td>";
				output += "<td><a onclick='removeExpense("+cursor.value.id+")' href=''>Delete</a></td>";
				output += "</tr>";
				}
			cursor.continue();
		}else{
			return total;	
		
		}

		$('#expenses').html(output);


	}

		

}

function createGraph(labels , data){
	var ctx = document.getElementById("myChart");
        
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              lineTension: 0,
              backgroundColor: 'transparent',
              borderColor: '#007bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: false
                }
              }]
            },
            legend: {
              display: false,
            }
          }
        });
}


function showExpenses(){
	var transaction = db.transaction(["expense_table"],"readonly");
	var store = transaction.objectStore("expense_table");
	var index = store.index("createdAt");

	var output = '';
	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if (cursor) {
			output += "<tr id='Expense_"+cursor.value.id+"'>";
			output += "<td>"+cursor.value.id+"</td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='category' data-id='"+cursor.value.id+"'>"+cursor.value.category+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='amount' data-id='"+cursor.value.id+"'>"+cursor.value.amount+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='day' data-id='"+cursor.value.id+"'>"+cursor.value.day+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='time' data-id='"+cursor.value.id+"'>"+cursor.value.time+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='reason' data-id='"+cursor.value.id+"'>"+cursor.value.reason+"</span></td>";
			output += "<td><span class='cursor customer' contenteditable='true' data-field='createdAt' data-id='"+cursor.value.id+"'>"+cursor.value.createdAt+"</span></td>";
			output += "<td><a onclick='removeExpense("+cursor.value.id+")' href=''>Delete</a></td>";
			output += "</tr>";
			cursor.continue();
		}
		$('#customers').html(output);
	}
}

function removeExpense(id) {
	var transaction = db.transaction(["expense_table"],"readwrite");
	var store = transaction.objectStore("expense_table");
	var request=store.delete(id);

	request.onsuccess=function(){
		console.log('Expense_ '+id+' Deleted');
		$('.Expense'+id).remove();
	}

	request.onerror = function(e){
		alert("sorry, the expense were not deleted");
		console.log('Error', e.target.error.name);
	}
}

function setCategory(){



          // var categories = getCategory();

	var transaction = db.transaction(["category_names"],"readonly");
	var store = transaction.objectStore("category_names");
    var result1 = '';
	var index = store.index("name");
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        result1 += "<option value="+ cursor.value.name+">"+cursor.value.name+"</option>";      	
      	console.log(cursor.value.name);
        cursor.continue();
      } else {
        
          $('#select_cat').html(result1);
      }

  };
 }

 function setCategory2(){

	var transaction = db.transaction(["category_names"],"readonly");
	var store = transaction.objectStore("category_names");
    var result1 = '';
	var index = store.index("name");
    index.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        result1 += "<option value="+ cursor.value.name+">"+cursor.value.name+"</option>";      	
      	console.log(cursor.value.name);
        cursor.continue();
      } else {
        
          $('#disp_cat').html(result1);
      }

  };
 }




function syncAux(){
	var transaction = db.transaction(["expense_table"],"readonly");
	var store = transaction.objectStore("expense_table");
	var index = store.index("createdAt");
	var result = [];
		


	index.openCursor().onsuccess = function(e){
		var cursor = e.target.result;
		if (cursor) {
			var output = [];
			output.push(cursor.value.id);
			output.push(cursor.value.category);
			output.push(cursor.value.amount);
			output.push(cursor.value.reason);
			output.push(cursor.value.day);
			output.push(cursor.value.time);
			output.push(cursor.value.createdAt);
			cursor.continue();
			result.push(output);
		}else{
			sync(result);
		}
	}
}

function sync(data){
	console.log(JSON.stringify(data));
	$.ajax({
				type : "POST",
				url : "sync.php",
				data: { expenses : data },
				success : function(data, status){
					// console.log(data);
					alert("Successfully synced");
					},
				error : function(data,status){
					alert("Sync failed");
				}
			});

}


function clearExpense() {
	indexedDB.deleteDatabase("expenseManager");
	window.location.href="index.html";
}

$('#customers').on('blur','.customer',function(){
	var newText = $(this).html();
	var field = $(this).data('field');
	var id = $(this).data('id');
	var transaction = db.transaction(["expense_table"],"readwrite");
	var store = transaction.objectStore("expense_table");
	console.log(id);
	console.log(newText);
	console.log(field);
	var request = store.get(id);

	request.onsuccess = function(){
		var data = request.result;
		if(field == 'category'){
			data.category = newText;
		} else if(field == 'reason'){
			data.reason = newText;
		}else if(field == 'day'){
			data.day = newText;
		}else if(field == 'time'){
			data.time = newText;
		}else if(field == 'createdAt'){
			data.createdAt = newText;
		}else if(field == 'amount'){
			data.amount = newText;
		}

		var requestUpdate = store.put(data);
		requestUpdate.onsuccess = function(){
			console.log('customer field updated.....');
		}

		requestUpdate.onerror = function(){
			console.log('Error: Expense field not updated....')
		}
	}
});

function getExpenseData(filename){
	var transaction = db.transaction(["expense_table"],"readonly");
	var store = transaction.objectStore("expense_table");
	var index = store.index("createdAt");
	var result = [["#","category", "amount", "reason" , "date", "time" ,"createdAt"]];

	index.openCursor().onsuccess = function(e){
		

		var cursor = e.target.result;
		if (cursor) {
			var output = [];
			output.push(cursor.value.id);
			output.push(cursor.value.category);
			output.push(cursor.value.amount);
			output.push(cursor.value.reason);
			output.push(cursor.value.day);
			output.push(cursor.value.time);
			output.push(cursor.value.createdAt);
			cursor.continue();
			result.push(output);
		}else{
			exportToCsv(filename ,result);
		}
	}
};

function exportToCsv(filename,rows) {

		// var rows = getExpenseData();
		console.log("roes:")
		console.log(rows);
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

$('#import_data').on("click",function(e){
    e.preventDefault();
 
    $('#files').parse({
        config: {
            delimiter: "auto",
            complete: buildTable,
        },
        before: function(file, inputElem)
        {
            //console.log("Parsing file...", file);
        },
        error: function(err, file)
        {
            //console.log("ERROR:", err, file);
        },
        complete: function()
        {
            //console.log("Done with all files");
        }
    });
});


function buildTable(results){
    var markup = "<table class='table'>";
    var data = results.data;
     
    for(i=0;i<data.length;i++){
        markup+= "<tr>";
        var row = data[i];
        var cells = row.join(",").split(",");
         
        for(j=0;j<cells.length;j++){
            markup+= "<td>";
            markup+= cells[j];
            markup+= "</th>";
        }
        markup+= "</tr>";
    }
    markup+= "</table>";
    $("#app").html(markup);
}


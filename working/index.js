//*******************************************************
// renderTransactions(transactions)
//   given a list of transactions, will generate an HTML
//   string representing the transactions
//*******************************************************
function renderTransactions(transactions) { // render means taking data and turning it to visual stuff. Takes an array and turns it to HTML. Most of the design here happened outside of JS. 
	var finalHTML = '<div class="buffer">TRANSACTIONS</div>'; // this contains the gray area that says transactions. SLowly turning this JS into a big block of HTML

	var transactionsHTML = _.map(transactions, function(transaction) {  //.map takes an array and spits out different array. Parameter of transaction can help us acceess the individual transactions
		var transactionHTML = '<div class="transaction">'; //chose transactionHTML because we know that it is going to take this and put it into HTMLformat
		transactionHTML += '<div class="name">'   + transaction.name   + '</div>'; 
		transactionHTML += '<div class="date">'   + transaction.date   + '</div>';
		transactionHTML += '<div class="amount">' + transaction.amount + '</div>';
		transactionHTML += '</div>';

		return transactionHTML;
	});

	finalHTML += transactionsHTML.join(''); // lets you concatenate a string + array. Just have to tell it not to put a comma in with ''.

	return finalHTML; // buffer with a bunch of transactions
}

//*******************************************************
//   Displays the full transaction list on page load
//   Listens for keyboard input to filter the list of 
//   transactions based on the search string. 
//*******************************************************
$(document).ready(function(){
	$('.transactions').html(renderTransactions(fullTransactionData)); // makes it so you can see the transactions when the page first loads. 
	
	$('.search-input').on('input', function(e) { //.search-input is the "listener"....  .on('input (makes it so that it reloads every time you press key in searchbar), function(e) -- e will tell you what text is currenly in the searchbar)
		debugger;
		var searchString = e.target.value.toLowerCase();
		var filteredData = _.filter(fullTransactionData, function(transaction){
			var foundInName    = transaction.name.toLowerCase().indexOf(searchString) > -1;
			var foundInFor     = transaction.for.toLowerCase().indexOf(searchString) > -1;
			var foundInDate    = transaction.date.toLowerCase().indexOf(searchString) > -1;
			var foundInAmount  = transaction.amount.toLowerCase().indexOf(searchString) > -1;
			return foundInName || foundInFor || foundInDate || foundInAmount;
		});

		$('.transactions').html(renderTransactions(filteredData));
	});

});
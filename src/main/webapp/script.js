//-----------------DISPLAY ALL books SCRIPT---------------//
function loadAllBooksPage(page, size) {
	$("#json-xml-div").empty();
	$("#loading").show();

	$.get("http://localhost:8080/BookProjectREST/BookController", { format: "json", page: page, size: size }, function(responseText) {
		$("#loading").hide();
		showJsonDisplayAllBooksInfo(responseText);
		//update pagination
		updatePagination(page, size);
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}
// When HTML DOM "click" event is invoked on element with ID "getBooksBtn", execute the following function...
$(document).on("click", "#getBooksBtn", function() {
	$("#json-xml-div").empty();
	$("#loading").show();

	var format = $("#format").val();
	var page = 1; // Reset page to 1 when requesting new data
	var size = 20; // Default size
	$.get("http://localhost:8080/BookProjectREST/BookController", { format: format, page: page, size: size }, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfo(responseText);
		} else if (format === 'xml') {
			showDisplayXmlBookInfo(responseText);
		} else if (format == 'string') {
			showDisplayStringBookInfo(responseText);
		}
		updatePagination(page, size);
		$("#json-xml-div").show();
	});
});
function updatePagination(page, size) {
	// Clear existing pagination 
	$("#pagination").empty();

	// Add previous page link
	$("#pagination").append(`<li class="page-item ${page === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`);

	// Add page numbers (assuming you want to show 5 pages)
	for (let i = page; i <= page + 4; i++) {
		$("#pagination").append(`<li class="page-item ${i === page ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`);
	}

	// Add next page link
	$("#pagination").append(`<li class="page-item"><a class="page-link" href="#" data-page="${page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`);
}
//JSON DISPLAY
function showJsonDisplayAllBooksInfo(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	var table = getTableForDisplayAllBooks(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}
function getTableForDisplayAllBooks(rows, subElementNames) {
	var table = "";
	console.log("Row##:  " + rows.length);
	if (rows.length < 1) {
		table = "<p style='text-align: center; color: red;'><b>No data found</b></p>";
	} else {
		table =
			"<table class='table table-striped'>\n" +
			"<thead><tr>" +
			`<th width="5%" style='border: 1px solid black; text-align: center'><b>Id</b></th>` +
			`<th width="10%" style='border: 1px solid black; text-align: center'><b>Title</b></th>` +
			`<th width="10%" style='border: 1px solid black; text-align: center'><b>Date</b></th>` +
			`<th width="5%" style='border: 1px solid black; text-align: center'><b>Author</b></th>` +
			` <th width="10%" style='border: 1px solid black; text-align: center'><b>Genres</b></th>` +
			` <th width="30%" style='border: 1px solid black; text-align: center'><b>Characters</b></th>` +
			` <th width="30%" style='border: 1px solid black; text-align: center'><b>Synopsis</b></th>` +
			"</tr></thead>" +
			getTableBody(rows, subElementNames) +
			"</table>";
	}

	return (table);
}
function getTableBody(rows, subElementNames) {
	var body = "";

	for (var i = 0; i < rows.length; i++) {
		body += "  <tr>";
		var row = rows[i];
		for (var j = 0; j < Object.keys(row).length; j++) {
			body += "<td style='border: 1px solid black;'>" + row[subElementNames[j]] + "</td>";
		}
		body += "</tr>\n";
	}
	return (body);
}


// XML DISPLAY
function showDisplayXmlBookInfo(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length; i++) {
		rows[i] = getElementValues(books[i], subElementNames);
	}
	var table = getTableForDisplayAllBooks(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}

function showDisplayStringBookInfo(responseText) {
	var books = responseText.split("###");
	var rows = new Array(books.length - 1);
	console.log("Books: " + books);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length - 1; i++) {
		rows[i] = {};
		rows[i]["id"] = books[i].split("--")[0].split("=")[1];
		rows[i]["title"] = books[i].split("--")[1].split("=")[1];
		rows[i]["date"] = books[i].split("--")[2].split("=")[1];
		rows[i]["author"] = books[i].split("--")[3].split("=")[1];
		rows[i]["genres"] = books[i].split("--")[4].split("=")[1];
		rows[i]["characters"] = books[i].split("--")[5].split("=")[1];
		rows[i]["synopsis"] = books[i].split("--")[6].split("=")[1];
	}
	var table = getTableForDisplayAllBooks(rows, subElementNames);
	htmlInsert("json-xml-div", table);

}



function getBodyContent(element) {
	element.normalize();
	return (element.childNodes[0] ? element.childNodes[0].nodeValue.trim() : "");
}

function getElementValues(element, subElementNames) {
	var values = {};
	if (element && element.nodeType === Node.ELEMENT_NODE) {
		for (var i = 0; i < subElementNames.length; i++) {
			var name = subElementNames[i];
			var subElement = element.getElementsByTagName(name)[0];
			values[name] = getBodyContent(subElement);
		}
	}
	return values;
}

function htmlInsert(id, table) {
	var targetElement = document.getElementById(id);
	if (targetElement) {
		targetElement.innerHTML = table;
	} else {
		console.error("Target element with id '" + id + "' not found.");
	}
}










//-----------------SEARCH books SCRIPT---------------//
// XML DISPLAY
function showSearchXmlBookInfo(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length; i++) {
		rows[i] = getElementValues(books[i], subElementNames);
	}
	var table = getSearchBookTable(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}

function getSearchBookTable(rows, subElementNames) {
	var table = "";
	console.log("Row##:  " + rows.length);
	if (rows.length < 1) {
		table = "<p style='text-align: center; color: red;'><b>No data found</b></p>";
	} else {
		table =
			"<table class='table table-striped'>\n" +
			"<thead><tr>" +
			`<th width="5%" style='border: 1px solid black; text-align: center'><b>Id</b></th>` +
			`<th width="10%" style='border: 1px solid black; text-align: center'><b>Title</b></th>` +
			`<th width="10%" style='border: 1px solid black; text-align: center'><b>Date</b></th>` +
			`<th width="5%" style='border: 1px solid black; text-align: center'><b>Author</b></th>` +
			` <th width="10%" style='border: 1px solid black; text-align: center'><b>Genres</b></th>` +
			` <th width="30%" style='border: 1px solid black; text-align: center'><b>Characters</b></th>` +
			` <th width="30%" style='border: 1px solid black; text-align: center'><b>Synopsis</b></th>` +
			"</tr></thead>" +
			getTableBody(rows, subElementNames) +
			"</table>";
	}

	return (table);
}

//JSON DISPLAY
function showSearchJsonBookInfo(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	var table = getSearchBookTable(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}


$(document).on("click", "#submitBtn", function() {
	var title = $("#bookTitleTextBox").val();
	var id = $("#bookIdTextBox").val();

	if ($("#bookTitleTextBox").is(':disabled')) {
		title = null;
	} else {
		if (!id.trim()) { // Check if id is empty or contains only whitespace
			id = null;
		}
	}

	if (!title && !id) {
		alert("Enter value to continue")
		return;
	}
	$("#json-xml-div").empty();
	$("#loading").show();
	var format = $("#format").val();
	var page = 1; // Reset page to 1 when requesting new data
	var size = 20; // Default size
	$.get("http://localhost:8080/BookProjectREST/BookController", { title: title, id: id, format: format, page: page, size: size }, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfo(responseText);
		} else if (format === 'xml') {
			showDisplayXmlBookInfo(responseText);
		} else if (format == 'string') {
			showDisplayStringBookInfo(responseText);
		}
		let listSize = responseText ? responseText.length : 1;
		updatePaginationSearch(page, size, listSize)
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
});
function updatePaginationSearch(page, size, listSize) {
	// Clear existing pagination 
	$("#pagination").empty();
	if (listSize < 20) {
		$("#pagination").hide();
	}
	// Add previous page link
	$("#pagination").append(`<li class="page-item ${page === 1 ? 'disabled' : ''}"><a class="page-link-s" href="#" data-page="${page - 1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`);

	// Add page numbers (assuming you want to show 5 pages)
	for (let i = page; i <= page + 4; i++) {
		$("#pagination").append(`<li class="page-item ${i === page ? 'active' : ''}"><a class="page-link-s" href="#" data-page="${i}">${i}</a></li>`);
	}

	// Add next page link
	$("#pagination").append(`<li class="page-item"><a class="page-link-s" href="#" data-page="${page + 1}" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`);

	// Disable previous button if on the first page
	if (page === 1) {
		$("#pagination li:first-child").addClass("disabled");
	}

}

//pagination
$(document).on("click", ".page-link-s", function() {
	var page = parseInt($(this).data("page"));

	console.log(page)

	var title = $("#bookTitleTextBox").val();
	var id = $("#bookIdTextBox").val();
	if ($("#bookTitleTextBox").is(':disabled')) {
		title = null;
	} else {
		if (!id.trim()) { // Check if id is empty or contains only whitespace
			id = null;
		}
	}

	if (!title && !id) {
		alert("Enter value to continue")
		return;
	}
	var format = $("#format").val();
	// var params = title ? "title=" + title : "id=" + id;
	var size = 20; // Default size

	// Show loading indicator
	$("#loading").show();

	// Make AJAX request to fetch data for the selected page
	$.get("http://localhost:8080/BookProjectREST/BookController", { title: title, id: id, format: format, page: page, size: size }, function(responseText) {
		// Hide loading indicator
		$("#loading").hide();

		// Update the displayed data based on the response format
		if (format === "json") {
			showJsonDisplayAllBooksInfo(responseText);
		} else if (format === "xml") {
			showDisplayXmlBookInfo(responseText);
		} else if (format === "string") {
			showDisplayStringBookInfo(responseText);
		}

		// Update pagination based on the current page and size
		updatePaginationSearch(page, size);
	});
});

$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});

function hideBookTitle(x) {
	if (x.checked) {
		document.getElementById('bookTitleTextBox').disabled = true;
		document.getElementById('bookIdTextBox').disabled = false;
	}
}

function hideBookId(x) {
	if (x.checked) {
		document.getElementById('bookIdTextBox').disabled = true;
		document.getElementById('bookTitleTextBox').disabled = false;
	}
}


//-----------------INSERT books SCRIPT---------------//
function getTable(responseText) {
	var table = "<table class='table table-striped'>\n" +
		"<tr>" +
		"<th><b>" + (responseText) + "</b></th>" +
		"</tr>" +
		"</table>";
	return (table);
}

function showSuccessXMLBook(responseText) {
	var xmlDocument = responseText;
	var response = xmlDocument.getElementsByTagName("response");
	var outputText = response[0].textContent;

	var table = getTable(outputText);
	htmlInsert("json-xml-div", table);
}

function showSuccessStringBook(responseText) {
	var table = getTable(responseText);
	htmlInsert("json-xml-div", table);
}

//JSON DISPLAY
function showSuccessJsonBookInfo(responseText) {
	var rawData = responseText;
	var table = getTable(rawData["response"]);

	htmlInsert("json-xml-div", table);
}

function convertBookToXml(book) {
	// Implement conversion of book object to XML format
	// You can use libraries like xml-js or manually create XML string
	// Example:
	var xmlString = '<book>' +
		'<title>' + book.title + '</title>' +
		'<date>' + book.date + '</date>' +
		'<author>' + book.author + '</author>' +
		'<genres>' + book.genres + '</genres>' +
		'<characters>' + book.characters + '</characters>' +
		'<synopsis>' + book.synopsis + '</synopsis>' +
		'</book>';
	return xmlString;
}

function convertBookToString(book) {
	// Construct the string representation
	var stringData =
		"title=" + book.title + "--" +
		"date=" + book.date + "--" +
		"author=" + book.author + "--" +
		"genres=" + book.genres + "--" +
		"characters=" + book.characters + "--" +
		"synopsis=" + book.synopsis;

	return stringData;
}


jQuery(document).on("click", "#btnSubmit", function() {
	var title = $("#title").val();
	var author = $("#author").val();
	var date = $("#date").val();
	var genres = $("#genres").val();
	var characters = $("#characters").val();
	var synopsis = $("#synopsis").val();

	if (title == "" || author == "" || date == "" || genres == "" || characters == "" || synopsis == "") {
		alert("Please insert a value in all fields to continue")
		return;
	}

	$("#json-xml-div").empty();
	$("#loading").show();

	var book = {
		"title": title,
		"author": author,
		"date": date,
		"genres": genres,
		"characters": characters,
		"synopsis": synopsis
	}
	var format = $("#format").val();
	var finalFormat;
	if (format == "json") {
		finalFormat = "application/json";
		var jsonData = JSON.stringify(book);
		//sending json
		sendData(jsonData, finalFormat);
	}
	else if (format == "xml") {
		finalFormat = "application/xml";
		// Convert book object to XML
		var xmlData = convertBookToXml(book);

		// Send XML data
		sendData(xmlData, finalFormat);
	}
	else {
		finalFormat = "text/plain";

		// Convert book object to string
		var stringData = convertBookToString(book);
		// Send string data
		sendData(stringData, finalFormat);
	}
	var page = 1; // Reset page to 1 when requesting new data
	var size = 20; // Default size
	function sendData(data, contentType) {
		$.ajax({
			url: "http://localhost:8080/BookProjectREST/BookController",
			type: "POST",
			data: data,
			contentType: contentType,
			success: function(responseText) {
				$("#loading").hide();
				//$("#message").show();
				loadAllBooksPageAdd(page, size, format);
				$("#json-xml-div").show();
				$("#json-xml-div").text();
				updatePagination(page, size);
				alert("Successfully added book");
				//$("#message").hide();
			},
			error: function(xhr, status, error) {
				// Handle error
				console.error(error);
			}
		});
	}
}
);
$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});
function loadAllBooksPageAdd(page, size, format) {
	$("#json-xml-div").empty();
	$("#loading").show();

	$.get("http://localhost:8080/BookProjectREST/BookController", { format: format, page: page, size: size }, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfo(responseText);
		} else if (format === 'xml') {
			showDisplayXmlBookInfo(responseText);
		} else if (format == 'string') {
			showDisplayStringBookInfo(responseText);
		}
		//update pagination
		updatePagination(page, size);
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}


//-----------------UPDATE books SCRIPT---------------//
function getUpdateBookTable(responseText) {
	var updateTable =
		"<table class='table table-striped'>\n" +
		"<tr>" +
		"<th><b>" + (responseText) + "</b></th>" +
		"</tr>" +
		"</table>";
	return (updateTable);
}

jQuery(document).on("click", "#submitUpdateBtn", function() {
	var format = $("#format").val();
	var id = $("#id").val();
	var title = $("#title").val();
	var author = $("#author").val();
	var genres = $("#genres").val();
	var date = $("#date").val();
	var characters = $("#characters").val();
	var synopsis = $("#synopsis").val();

	if (id == "" || title == "" || author == "" || genres == "" || date == "" || characters == "" || synopsis == "") {
		alert("Please insert a value in all fields to continue")
		return;
	}
	$("#json-xml-div").empty();
	$("#loading").show();
	var book = {
		"id": id,
		"title": title,
		"author": author,
		"date": date,
		"genres": genres,
		"characters": characters,
		"synopsis": synopsis
	}
	var format = $("#format").val();
	var finalFormat;
	if (format == "json") {
		finalFormat = "application/json";
		var jsonData = JSON.stringify(book);
		//sending json
		updateData(jsonData, finalFormat);
	}
	else if (format == "xml") {
		finalFormat = "application/xml";
		// Convert book object to XML
		var xmlData = convertBookToXmlForUpdate(book);

		// Send XML data
		updateData(xmlData, finalFormat);
	}
	else {
		finalFormat = "text/plain";

		// Convert book object to string
		var stringData = convertBookToStringForUpdate(book);
		// Send string data
		updateData(stringData, finalFormat);
	}

	var page = 1; // Reset page to 1 when requesting new data
	var size = 20; // Default size
	console.log("Format: " + format);
	function updateData(data, format) {
		$.ajax({
			url: 'http://localhost:8080/BookProjectREST/BookController',
			type: 'PUT',
			contentType: format, // Set content type to avoid preflight OPTIONS request
			data: data,
			success: function(responseText) {
				console.log(responseText);
				$("#loading").hide();
				loadAllBooksOnUpdatePage(page, size);
				showSuccessJsonBookInfo(responseText);
				updatePagination(page, size);
				alert("Successfully updated book");
				$("#json-xml-div").show();
				$("#json-xml-div").text();
			},
			error: function(xhr, status, error) {
				console.error("Error occurred while updating book:", error);
				alert("Error occurred while updating book");
			}
		});
	}
});

function convertBookToXmlForUpdate(book) {
	// Implement conversion of book object to XML format
	// You can use libraries like xml-js or manually create XML string
	// Example:
	var xmlString = '<book>' +
		'<id>' + book.id + '</id>' +
		'<title>' + book.title + '</title>' +
		'<author>' + book.author + '</author>' +
		'<date>' + book.date + '</date>' +
		'<genres>' + book.genres + '</genres>' +
		'<characters>' + book.characters + '</characters>' +
		'<synopsis>' + book.synopsis + '</synopsis>' +
		'</book>';
	return xmlString;
}

function convertBookToStringForUpdate(book) {
	// Construct the string representation
	var stringData =
		"id=" + book.id + "--" +
		"title=" + book.title + "--" +
		"date=" + book.date + "--" +
		"author=" + book.author + "--" +
		"genres=" + book.genres + "--" +
		"characters=" + book.characters + "--" +
		"synopsis=" + book.synopsis;

	return stringData;
}

$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});


//-----------------UPDATE books SCRIPT---------------//
function loadAllBooksOnUpdatePage(page, size) {
	$("#json-xml-div").empty();
	$("#loading").show();
	var format = $("#format").val();
	$.get("http://localhost:8080/BookProjectREST/BookController", { format: format, page: page, size: size }, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfoForUpdate(responseText);
		} else if (format === 'xml') {
			showXMLDisplayAllBooksInfoForUpdate(responseText);
		} else if (format == 'string') {
			showStringDisplayAllBooksInfoForUpdate(responseText);
		}
		updatePagination(page, size)
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}

function showJsonDisplayAllBooksInfoForUpdate(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis", "Action"];
	var table = getTableForDisplayAllBooksForUpdate(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}

function showXMLDisplayAllBooksInfoForUpdate(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	console.log(rows);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length; i++) {
		rows[i] = getElementValues(books[i], subElementNames);
	}
	var table = getTableForDisplayAllBooksForUpdate(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}

function showStringDisplayAllBooksInfoForUpdate(responseText) {
	var books = responseText.split("###");
	var rows = new Array(books.length - 1);
	console.log("Books: " + books);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis", "Action"];
	for (var i = 0; i < books.length - 1; i++) {
		rows[i] = {};
		rows[i]["id"] = books[i].split("--")[0].split("=")[1];
		rows[i]["title"] = books[i].split("--")[1].split("=")[1];
		rows[i]["date"] = books[i].split("--")[2].split("=")[1];
		rows[i]["author"] = books[i].split("--")[3].split("=")[1];
		rows[i]["genres"] = books[i].split("--")[4].split("=")[1];
		rows[i]["characters"] = books[i].split("--")[5].split("=")[1];
		rows[i]["synopsis"] = books[i].split("--")[6].split("=")[1];
	}
	var table = getTableForDisplayAllBooksForUpdate(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}

function getTableForDisplayAllBooksForUpdate(rows, subElementNames) {
	var table =
		"<table class='table table-striped'>\n" +
		"<tr>" +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>Id</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>Title</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>Date</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>Author</b></th>` +
		` <th width="20%" style='border: 1px solid black; text-align: center'><b>Genres</b></th>` +
		` <th width="10%"style='border: 1px solid black; text-align: center'><b>Characters</b></th>` +
		` <th width="15%"style='border: 1px solid black; text-align: center'><b>Synopsis</b></th>` +
		` <th width="10%" style='border: 1px solid black; text-align: center'><b>Action</b></th>` +
		"  </tr>" +
		getTableBodyForUpdate(rows, subElementNames) +
		"</table>";
	return (table);
}

function getTableBodyForUpdate(rows, subElementNames) {
	var body = "";
	for (var i = 0; i < rows.length; i++) {
		body += "  <tr>";
		var row = rows[i];
		for (var j = 0; j < Object.keys(row).length; j++) {
			body += "<td style='border: 1px solid black; text-align: center'>" + row[subElementNames[j]] + "</td>";
		}
		body += "<td style='border: 1px solid black; text-align: center'><b><button class=\"btn btn-primary\" onclick='updateById(this)' id =\"" + row[subElementNames[0]] +
			"\" >Update</button></b></td>";
		body += "</tr>\n";
	}
	return (body);
}

function updateById(element) {
	var id = $(element).attr("id");
	var format = $("#format").val();
	console.log("Update by Id: " + id);
	console.log("Format: " + format);
	$.ajax({
		url: "http://localhost:8080/BookProjectREST/BookController?format=json" + "&id=" + id,
		type: 'GET',
		success: function(responseText) {
			$("#id").val(responseText[0].id);
			$("#title").val(responseText[0].title);
			$("#date").val(responseText[0].date);
			$("#author").val(responseText[0].author);
			$("#genres").val(responseText[0].genres);
			$("#characters").val(responseText[0].characters);
			$("#synopsis").val(responseText[0].synopsis);
		}
	});
}


//-----------------DELETE books SCRIPT---------------//

function loadAllBooksOnDeletePage(page, size) {
	$("#json-xml-div").empty();
	$("#loading").show();
	var format = $("#format").val();
	$.get("http://localhost:8080/BookProjectREST/BookController", { format: format, page: page, size: size }, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfoForDelete(responseText);
		} else if (format === 'xml') {
			showXMLDisplayAllBooksInfoForDelete(responseText);
		} else if (format == 'string') {
			showStringDisplayAllBooksInfoForDelete(responseText);
		}
		//showJsonDisplayAllBooksInfoForDelete(responseText);
		updatePagination(page, size);
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}

function showXMLDisplayAllBooksInfoForDelete(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	console.log(rows);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length; i++) {
		rows[i] = getElementValues(books[i], subElementNames);
	}
	var table = getTableForDisplayAllBooksForDelete(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}
function showStringDisplayAllBooksInfoForDelete(responseText) {
	var books = responseText.split("###");
	var rows = new Array(books.length - 1);
	console.log("Books: " + books);
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis", "Action"];
	for (var i = 0; i < books.length - 1; i++) {
		rows[i] = {};
		rows[i]["id"] = books[i].split("--")[0].split("=")[1];
		rows[i]["title"] = books[i].split("--")[1].split("=")[1];
		rows[i]["date"] = books[i].split("--")[2].split("=")[1];
		rows[i]["author"] = books[i].split("--")[3].split("=")[1];

		rows[i]["genres"] = books[i].split("--")[4].split("=")[1];
		rows[i]["characters"] = books[i].split("--")[5].split("=")[1];
		rows[i]["synopsis"] = books[i].split("--")[6].split("=")[1];
	}
	var table = getTableForDisplayAllBooksForDelete(rows, subElementNames);
	htmlInsert("json-xml-div", table);
}


function deleteById(element) {
	var id = $(element).attr("id");
	var format = $("#format").val();
	$.ajax({
		url: "http://localhost:8080/BookProjectREST/BookController?format=" + format + "&id=" + id,
		type: 'DELETE',
		success: function(responseText) {
			console.log(responseText);	
			alert(id + "is successfully deleted");
			loadAllBooksOnDeletePage(1);
		}
	});
}

function showJsonDisplayAllBooksInfoForDelete(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "date", "author", "genres", "characters", "synopsis", "Delete"];
	var table = getTableForDisplayAllBooksForDelete(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}

function getTableBodyForDelete(rows, subElementNames) {
	var body = "";
	for (var i = 0; i < rows.length; i++) {
		body += "  <tr>";
		var row = rows[i];
		for (var j = 0; j < Object.keys(row).length; j++) {
			body += "<td style='border: 1px solid black; text-align: center'>" + row[subElementNames[j]] + "</td>";
		}
		body += "<td style='border: 1px solid black; text-align: center'><b><button class=\"btn btn-secondary\" onclick='deleteById(this)' id =\"" + row[subElementNames[0]] +
			" \" >Delete</button></b></td>";
		body += "</tr>\n";
	}
	return (body);
}

function getTableForDisplayAllBooksForDelete(rows, subElementNames) {
	var table =
		"<table class='table table-striped'>\n" +
		"<tr>" +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>Id</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>Title</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>Date</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>Author</b></th>` +
		` <th width="20%" style='border: 1px solid black; text-align: center'><b>Genres</b></th>` +
		` <th width="10%"style='border: 1px solid black; text-align: center'><b>Characters</b></th>` +
		` <th width="35%"style='border: 1px solid black; text-align: center'><b>Synopsis</b></th>` +
		` <th width="5%" style='border: 1px solid black; text-align: center'><b>Action</b></th>` +
		"  </tr>" +
		getTableBodyForDelete(rows, subElementNames) +
		"</table>";
	return (table);
}

$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});

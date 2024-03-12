//-----------------DISPLAY ALL books SCRIPT---------------//
function loadAllBooksPage() {
	$("#json-xml-div").empty();
	$("#loading").show();

	$.get("http://localhost:8080/BookProjectREST/book/get-all-books", "format=json", function(responseText) {
		$("#loading").hide();
		showJsonDisplayAllBooksInfo(responseText);
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}


// XML DISPLAY
function showDisplayXmlBookInfo(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis"];
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
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis"];
	for (var i = 0; i < books.length - 1; i++) {
		rows[i] = {};
		rows[i]["id"] = books[i].split("--")[0].split("=")[1];
		rows[i]["title"] = books[i].split("--")[1].split("=")[1];
		rows[i]["author"] = books[i].split("--")[2].split("=")[1];
		rows[i]["date"] = books[i].split("--")[3].split("=")[1];
		rows[i]["genres"] = books[i].split("--")[4].split("=")[1];
		rows[i]["characters"] = books[i].split("--")[5].split("=")[1];
		rows[i]["synopsis"] = books[i].split("--")[6].split("=")[1];
		console.log("Row: " + rows[i]["id"]);
		console.log("Row: " + rows[i]["title"]);
		console.log("Row: " + rows[i]["author"]);
		console.log("Row: " + rows[i]["date"]);
		console.log("Row: " + rows[i]["genres"]);
		console.log("Row: " + rows[i]["characters"]);
		console.log("Row: " + rows[i]["synopsis"]);
	}
	var table = getTableForDisplayAllBooks(rows, subElementNames);
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
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[0]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[1]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[2]}</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[3]}</b></th>` +
		` <th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[4]}</b></th>` +
		` <th width="30%" style='border: 1px solid black; text-align: center'><b>${subElementNames[5]}</b></th>` +
		` <th width="30%" style='border: 1px solid black; text-align: center'><b>${subElementNames[6]}</b></th>` +
		"</tr></thead>" +
		getTableBody(rows, subElementNames) +
		"</table>";
	}

	return (table);
}

function getBodyContent(element) {
	element.normalize();
	return (element.childNodes[0] ? element.childNodes[0].nodeValue : "");
}

function getElementValues(element, subElementNames) {
	var values = {};
	for (var i = 0; i < subElementNames.length; i++) {
		var name = subElementNames[i];
		var subElement = element.getElementsByTagName(name)[0];
		values[name] = getBodyContent(subElement);
	}
	return (values);
}

function htmlInsert(id, table) {
	document.getElementById(id).innerHTML = table;
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



//JSON DISPLAY
function showJsonDisplayAllBooksInfo(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis"];
	var table = getTableForDisplayAllBooks(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}

// When HTML DOM "click" event is invoked on element with ID "getBooksBtn", execute the following function...
$(document).on("click", "#getBooksBtn", function() {
	$("#json-xml-div").empty();
	$("#loading").show();
	var format = $("#format").val();
	$.get("http://localhost:8080/BookProjectREST/book/get-all-books", "format=" + format, function(responseText) {
		$("#loading").hide();
		if (format === 'json') {
			showJsonDisplayAllBooksInfo(responseText);
		} else if (format === 'xml') {
			showDisplayXmlBookInfo(responseText);
		} else if (format == 'string') {
			showDisplayStringBookInfo(responseText);
		}
		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
});

//-----------------SEARCH books SCRIPT---------------//
// XML DISPLAY
function showSearchXmlBookInfo(responseText) {
	var xmlDocument = responseText;
	var books = xmlDocument.getElementsByTagName("item");
	var rows = new Array(books.length);
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis"];
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
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[0]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[1]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[2]}</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[3]}</b></th>` +
		` <th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[4]}</b></th>` +
		` <th width="30%" style='border: 1px solid black; text-align: center'><b>${subElementNames[5]}</b></th>` +
		` <th width="30%" style='border: 1px solid black; text-align: center'><b>${subElementNames[6]}</b></th>` +
		"</tr></thead>" +
		getTableBody(rows, subElementNames) +
		"</table>";
	}

	return (table);
}

//JSON DISPLAY
function showSearchJsonBookInfo(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis"];
	var table = getSearchBookTable(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}


$(document).on("click", "#submitBtn", function() {

	var format = $("#format").val();
	var title = $("#bookTitleTextBox").val();
	var id = $("#bookIdTextBox").val();

	if ($("#bookTitleTextBox").is(':disabled')) {
		title = null;
	} else {
		id = null;
	}

	if (!title && !id) {
		alert("Enter value to continue")
		return;
	}
	$("#json-xml-div").empty();
	$("#loading").show();
	var params = title ? "title=" + title : "id=" + id;
	format = $("#format").val();
	$.get("http://localhost:8080/BookProjectREST/book/get-book-search", params + "&format=json", function(responseText) {
		$("#loading").hide();
		showSearchJsonBookInfo(responseText);
		$("#json-xml-div").show();
		$("#json-xml-div").text();
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

jQuery(document).on("click", "#btnSubmit", function() {
	var format = $("#format").val();
	var title = $("#title").val();
	var author = $("#author").val();
	var date = $("#genres").val();
	var genres = $("#date").val();
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
	$.post("http://localhost:8080/BookProjectREST/book/add-book" + "?format=json", book, function(responseText) {
		$("#loading").hide();
		$("#message").show();
		document.getElementById("message").innerHTML = (responseText.response);
		loadAllBooksPage();
		showSuccessJsonBookInfo(responseText);		
		$("#json-xml-div").show();
		$("#json-xml-div").text();
		$("#message").hide();
	});
}
);
$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});


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


	$.ajax({
		url: 'http://localhost:8080/BookProjectREST/book/update-book' + "?id=" + id + "&title=" + title + "&author=" + author + "&date=" + date + "&genres=" + genres + "&characters=" + characters + "&synopsis=" + synopsis + "&format=" + format,
		type: 'PUT',
		data: "id=" + id + "&title=" + title + "&author=" + author + "&date=" + date + "&genres=" + genres + "&characters=" + characters + "&synopsis=" + synopsis + "&format=" + format,
		success: function(responseText) {
			console.log(responseText);
			$("#loading").hide();
			$("#message").show();
			document.getElementById("message").innerHTML = (responseText.response);
			loadAllBooksOnUpdatePage();
			showSuccessJsonBookInfo(responseText);
			$("#json-xml-div").show();
			$("#json-xml-div").text();
			$("#message").hide();
		}
	});
});

$(document).ready(function() {
	$("#json-xml-div").hide();
	$("#loading").hide();
});


//-----------------UPDATE books SCRIPT---------------//
function loadAllBooksOnUpdatePage() {
	$("#json-xml-div").empty();
	$("#loading").show();

	$.get("http://localhost:8080/BookProjectREST/book/get-all-books", "format=json", function(responseText) {
		$("#loading").hide();
		showJsonDisplayAllBooksInfoForUpdate(responseText);

		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}

function showJsonDisplayAllBooksInfoForUpdate(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis", "Action"];
	var table = getTableForDisplayAllBooksForUpdate(rawData, subElementNames);
	htmlInsert("json-xml-div", table);
}

function getTableForDisplayAllBooksForUpdate(rows, subElementNames) {
	var table =
		"<table class='table table-striped'>\n" +
		"<tr>" +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[0]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[1]}</b></th>` +
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>${subElementNames[2]}</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[3]}</b></th>` +
		` <th width="20%" style='border: 1px solid black; text-align: center'><b>${subElementNames[4]}</b></th>` +
		` <th width="10%"style='border: 1px solid black; text-align: center'><b>${subElementNames[5]}</b></th>` +
		` <th width="35%"style='border: 1px solid black; text-align: center'><b>${subElementNames[6]}</b></th>` +
		` <th width="5%" style='border: 1px solid black; text-align: center'><b>${subElementNames[7]}</b></th>` +
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
			" \" >Update</button></b></td>";
		body += "</tr>\n";
	}
	return (body);
}

function updateById(element) {
	var id = $(element).attr("id");
	$.ajax({
		url: "http://localhost:8080/BookProjectREST/book/get-book-search?format=json&" + "id=" + id,
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

function loadAllBooksOnDeletePage() {
	$("#json-xml-div").empty();
	$("#loading").show();

	$.get("http://localhost:8080/BookProjectREST/book/get-all-books", "format=json", function(responseText) {
		$("#loading").hide();
		showJsonDisplayAllBooksInfoForDelete(responseText);

		$("#json-xml-div").show();
		$("#json-xml-div").text();
	});
}

function deleteById(element) {
	var id = $(element).attr("id");
	$.ajax({
		url: "http://localhost:8080/BookProjectREST/book/delete-book?" + "id=" + id,
		type: 'DELETE',
		success: function(responseText) {
			showJsonDisplayAllBooksInfoForDelete(responseText);
			console.log(responseText);
			alert(id + "is successfully deleted");
		}
	});
}

function showJsonDisplayAllBooksInfoForDelete(responseText) {
	var rawData = responseText;
	var subElementNames = ["id", "title", "author", "date", "genres", "characters", "synopsis", "Delete"];
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
		`<th width="10%" style='border: 1px solid black; text-align: center'><b>Author</b></th>` +
		`<th width="5%" style='border: 1px solid black; text-align: center'><b>Date</b></th>` +
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

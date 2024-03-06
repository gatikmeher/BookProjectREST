<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
	crossorigin="anonymous">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="script.js"></script>
<title>Search Book/s</title>
</head>
<body style="background-color: ivory">
	<div align="center">
		<h1 class="mt-2">Search Book</h1>

		<form action="index.jsp">
			<input type="submit" class="btn btn-danger" value="MAIN PAGE" />
		</form>


		<!--    Code for radio button on/off with relevant text box-->
		<div class="col-md-4 mt-2">
			<label for="title">Title:</label> <input type="radio"
				checked onchange="hideBookId(this)" id="title" name="bookOption">
			<div id="bookTitleTextInput">
				<br> <input type="text" id="bookTitleTextBox">
			</div>

			<label for="id">Book ID:</label> <input type="radio"
				onchange="hideBookTitle(this)" id="id" name="bookOption">
			<div id="bookIdTextInput">
				<br> <input disabled type="number" id="bookIdTextBox">
			</div>
		</div>

		<div class="col-md-12 mt-2">
			<select class="btn btn-success dropdown-toggle" name="format"
				id="format">
				<option value="json">JSON</option>
				<option value="xml">XML</option>
				<option value="string">STRING</option>
			</select>
		</div>

		<BR>
		<div class="col-md-12 mt-2">
			<input class="btn btn-primary" id="submitBtn" type="button"
				value="SUBMIT"></input>
		</div>

		<div id="loading" class="mt-2 col-md-12">
			<h3>Loading .....</h3>
		</div>

	</div>

	<div class="m-3" id="json-xml-div"></div>

</body>
</html>
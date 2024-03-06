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
<title>Update Book</title>
<script>
	$(document).ready(function() {
		loadAllBooksOnUpdatePage();
	})
</script>
</head>
<body style="background-color: ivory">
	<div align="center">
		<h1 class="mt-2">Update Book</h1>

		<form action="index.jsp">
			<input type="submit" class="btn btn-danger" value="MAIN PAGE" />
		</form>


		<div class="col-md-4 mt-2">
			<label for="id">Book Id:</label> <input type="number"
				class="form-control" id="id" required> <label for="title">Title:</label>
			<input type="text" class="form-control" id="title" required>
			<label for="author">Author:</label> <input type="text"
				class="form-control" id="author" required>
		</div>

		<div class="col-md-4 mt-2">
			<label for="date">Date:</label> <input type="text"
				class="form-control" id="date" required> <label for="genres">Genres:</label>
			<input type="text" class="form-control" id="genres" required>
		</div>

		<div class="col-md-4 mt-2">
			<label for="characters">Characters:</label> <input type="text"
				class="form-control" id="characters" required><label
				for="synopsis">Synopsis:</label> <input type="text"
				class="form-control" id="synopsis" required>
		</div>

		<div class="col-md-12 mt-2">
			<br> <select class="btn btn-success dropdown-toggle"
				name="format" id="format">
				<option value="json">JSON</option>
				<option value="xml">XML</option>
				<option value="string">STRING</option>
			</select>
		</div>

		<div class="col-md-12 mt-2">
			<br> <input class="btn btn-primary" id="submitUpdateBtn"
				type="button" value="SUBMIT" />
		</div>

		<div id="loading" class="mt-2 col-md-12">
			<h3>Loading .....</h3>
		</div>

	</div>

	<div class="m-3" id="json-xml-div"></div>

</body>
</html>
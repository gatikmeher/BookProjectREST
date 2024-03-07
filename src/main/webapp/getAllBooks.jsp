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
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="script.js"></script>
<title>All Books</title>
<script>
	$(document).ready(function() {
		loadAllBooksPage();
	})
</script>
</head>

<body style="background-color: ivory">
	<div align="center">
		<h1 class="mt-2">Display All Book</h1>
		<br>
		<div class="container text-center">
			<div class="row align-items-start">
				<div class="col">
					<form action="index.jsp">
						<input type="submit" class="btn btn-danger" value="MAIN PAGE" />
					</form>
				</div>
				<div class="col">
					<select class="btn btn-success dropdown-toggle" name="format"
						id="format">
						<option value="json">JSON</option>
						<option value="xml">XML</option>
						<option value="string">STRING</option>
					</select>
				</div>
				<div class="col">
					<input class="btn btn-primary" id="getBooksBtn" type="button"
						value="VIEW ALL BOOKS"></input>
				</div>
			</div>
		</div>
		<div id="loading" class="mt-2 col-md-12">
			<h3>Loading .....</h3>
		</div>

	</div>

	<div class="m-3" id="json-xml-div"></div>
</body>
</html>
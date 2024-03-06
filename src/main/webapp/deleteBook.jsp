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
<script>
	$(document).ready(function() {
		loadAllBooksOnDeletePage();
	})
</script>
<title>Delete Book</title>
</head>
<body style="background-color: ivory">
	<div align="center">
		<h1 class="mt-2">Delete Book</h1>

		<form action="index.jsp">
			<input type="submit" class="btn btn-danger" value="MAIN PAGE" />
		</form>

		<div id="loading" class="mt-2 col-md-12">
			<h3>Loading .....</h3>
		</div>

	</div>

	<div class="m-3" id="json-xml-div"></div>

	<div class="mt-2" id="html-div"></div>
</body>
</html>
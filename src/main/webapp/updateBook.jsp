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
		loadAllBooksOnUpdatePage(1);
		// Pagination click event
		$(document).on('click', '.page-link', function() {
			var page = $(this).data('page');
			loadAllBooksOnUpdatePage(page);
		});
	});
</script>
<style>
.pagination {
	display: flex;
	justify-content: center;
	list-style: none;
	padding: 0;
}

.pagination li {
	margin: 0 5px;
}

.pagination li.active a {
	background-color: #007bff;
	color: #fff;
	border-radius: 4px;
	padding: 8px 12px;
}

.pagination li a {
	text-decoration: none;
	color: #007bff;
	padding: 8px 12px;
	border: 1px solid #007bff;
	border-radius: 4px;
}

.pagination li a:hover {
	background-color: #f2f2f2;
}

.pagination .disabled a {
	pointer-events: none;
	opacity: 0.6;
}
</style>
</head>
<body>
	<div align="center">
		<h1 class="mt-2">Update Book</h1>
		<div class="container text-center">
			<div class="row">
				<div class="col align-self-start">
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

				<div class="col align-self-end">
					<input class="btn btn-primary" id="submitUpdateBtn" type="button"
						value="SUBMIT" />
				</div>
			</div>
		</div>


		<div class="container text-center">
			<div class="row align-items-start">
				<div class="col">
					<label for="id">Book Id:</label> <input type="number"
						class="form-control" id="id" required readonly="readonly">
				</div>
				<div class="col">
					<label for="title">Title:</label> <input type="text"
						class="form-control" id="title" required>
				</div>
				<div class="col">
					<label for="author">Author:</label> <input type="text"
						class="form-control" id="author" required>
				</div>
			</div>
		</div>

		<div class="container text-center">
			<div class="row align-items-start">
				<div class="col">
					<label>Date:</label> <input type="date" class="form-control"
						id="date" required>
				</div>
				<div class="col">
					<label for="genres">Genres:</label> <input type="text"
						class="form-control" id="genres" required>
				</div>
				<div class="col">
					<label for="characters">Characters:</label> <input type="text"
						class="form-control" id="characters" required>
				</div>
			</div>
		</div>
		<div class="container text-center">
			<div class="row align-items-start">
				<div class="col-md-12 mt-2">
					<label for="synopsis">Synopsis:</label> <input type="text"
						class="form-control" id="synopsis" required>
				</div>
			</div>
		</div>
		<div id="loading" class="mt-2 col-md-12">
			<h3>Loading .....</h3>
		</div>

	</div>
	<!-- Pagination -->
	<div class="row mt-3">
		<div class="col text-center">
			<ul class="pagination" id="pagination">
				<!-- Pagination links will be dynamically inserted here -->
			</ul>
		</div>
	</div>

	<div class="m-3" id="json-xml-div"></div>

</body>
</html>
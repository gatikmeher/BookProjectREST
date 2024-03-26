<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
	rel="stylesheet">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
<script src="script.js"></script>
<title>All Books</title>

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
	<div class="container mt-5">
		<h1 class="text-center">Display All Books</h1>
		<br>
		<div class="container text-center">
			<div class="row">
				<div class="col align-self-start">
					<form action="index.jsp">
						<input type="submit" class="btn btn-danger" value="MAIN PAGE" />
					</form>
				</div>
				<div class="col align-self-center">
					<select class="btn btn-success dropdown-toggle" name="format"
						id="format">
						<option value="json">JSON</option>
						<option value="xml">XML</option>
						<option value="string">STRING</option>
					</select>
				</div>
				<div class="col align-self-end">
					<input class="btn btn-primary" id="getBooksBtn" type="button"
						value="VIEW ALL BOOKS"></input>
				</div>
			</div>
		</div>
		<div class="row mt-3" id="loading">
			<h3>Loading ...</h3>
		</div>

		<!-- Pagination -->
		<div class="row mt-3">
			<div class="col text-center">
				<ul class="pagination" id="pagination">
					<!-- Pagination links will be dynamically inserted here -->
				</ul>
			</div>
		</div>
	</div>
	<!-- Book data will be displayed here -->
	<div class="m-3" id="json-xml-div"></div>

	<script>
		$(document).ready(function() {
			loadAllBooksPage(1,20);

			// Pagination click event
			$(document).on('click', '.page-link', function() {
				var page = $(this).data('page');
				loadAllBooksPage(page);
			});
		});
	</script>
</body>
</html>

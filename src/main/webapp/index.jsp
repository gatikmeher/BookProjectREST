<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
	crossorigin="anonymous">
<title>Book Management</title>
<style>
.btn-secondary:hover {
	background-color: #4CAF50;
	color: white;
}
</style>
</head>
<body>

	<div align="center">
		<h1 class="mt-2">Welcome to Book Management</h1>
		<p>Please Select</p>
		<div class="container text-center">
			<div class="row align-items-start">
				<div class="col">
					<form action="getAllBooks.jsp">
						<input type="submit" class="btn btn-secondary"
							value="DISPLAY ALL BOOKS" />
					</form>
				</div>
				<div class="col">
					<form action="searchBook.jsp">
						<input type="submit" class="btn btn-secondary" value="SEARCH BOOK" />
					</form>
				</div>
				<div class="col">
					<form action="addBook.html">
						<input type="submit" class="btn btn-secondary" value="ADD BOOK" />
					</form>
				</div>
				<div class="col">
					<form action="updateBook.jsp">
						<input type="submit" class="btn btn-secondary" value="UPDATE BOOK" />
					</form>
				</div>
				<div class="col">
					<form action="deleteBook.jsp">
						<input type="submit" class="btn btn-secondary" value="DELETE BOOK" />
					</form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
    <title>Book Management</title>
    <style>
        .btn-primary:hover {
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body style="background-color: ivory">
<div align="center">
    <h1 class="mt-2">Welcome to Book Management</h1>
    <p>Please choose from one of the following:</p>
    <div class="col-md-12 mt-2">
        <form action="getAllBooks.jsp">
            <input type="submit" class="btn btn-primary" value="DISPLAY ALL BOOKS"/>
        </form>
        <br>
        <form action="searchBook.jsp">
            <input type="submit" class="btn btn-primary" value="SEARCH BOOK"/>
        </form>
        <br>
        <form action="addBook.jsp">
            <input type="submit" class="btn btn-primary" value="ADD BOOK"/>
        </form>
        <br>
        <form action="updateBook.jsp">
            <input type="submit" class="btn btn-primary" value="UPDATE BOOK"/>
        </form>
        <br>
        <form action="deleteBook.jsp">
            <input type="submit" class="btn btn-primary" value="DELETE BOOK"/>
        </form>
    </div>

</div>
</body>
</html>

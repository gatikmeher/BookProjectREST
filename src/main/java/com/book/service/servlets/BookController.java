package com.book.service.servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;
import com.book.service.util.CommonUtil;
import com.book.service.validator.BookValidator;

@WebServlet("/BookController")
public class BookController extends HttpServlet {

	// DoPost as record is being inserted
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		BookValidator bookValidator = new BookValidator();
		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String date = request.getParameter("date");
		String genres = request.getParameter("genres");
		String characters = request.getParameter("characters");
		String synopsis = request.getParameter("synopsis");
		String errorMessage = bookValidator.checkInputValue(title, author, date, genres, characters, synopsis);
		if (errorMessage == null) {
			BookRepository.getInstance().insertBook(new Book(title, author, date, genres, characters, synopsis));
			response.getWriter().println("{\"response\":\"Successfully added book\"}");
		} else {
			response.getWriter().println("{\"response\":\"" + errorMessage + "\"}");
		}
		response.setContentType("application/json");
	}

	// DoPut as record is being updated
	@Override
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
		BookValidator bookValidator = new BookValidator();
		Long id = Long.valueOf(request.getParameter("id"));
		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String date = request.getParameter("date");
		String genres = request.getParameter("genres");
		String characters = request.getParameter("characters");
		String synopsis = request.getParameter("synopsis");
		String errorMessage = bookValidator.checkInputValue(title, author, date, genres, characters, synopsis);
		if (errorMessage == null) {
			BookRepository.getInstance().updateBook(new Book(id, title, author, date, genres, characters, synopsis));
			response.getWriter().println("{\"response\":\"Successfully updated book\"}");
		} else {
			response.getWriter().println("{\"response\":\"" + errorMessage + "\"}");
		}
		response.setContentType("application/json");
	}

	@Override
	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Long id = Long.valueOf(request.getParameter("id"));
		BookRepository.getInstance().deleteBook(id);
		List<Book> books = BookRepository.getInstance().getAllBooks();
		response.setContentType("application/json");
		response.getWriter().println(CommonUtil.convertListToJson(books));
	}

	@Override
	// DoGet as fetching the book records
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String title = request.getParameter("title");
		Long id = request.getParameter("id") != null ? Long.valueOf((request.getParameter("id"))) : null;
		List<Book> books = new ArrayList<Book>();
		if (title != null && !title.equals("")) {
			books = BookRepository.getInstance().getBookByTitle(title);
		} else if (null != id) {
			Book book = BookRepository.getInstance().getBookById(id);
			if (book != null) {
				books.add(book);
			}
		} else {
			books = BookRepository.getInstance().getAllBooks();
		}
		// bookList is just a name by which will access in html
		// f is the actual object whose value this bookList will keep
		request.setAttribute("bookList", books);
		String format = request.getParameter("format");
		response.setCharacterEncoding("UTF-8");
		if ("xml".equals(format)) {
			response.setContentType("text/xml");
			response.getWriter().println(CommonUtil.convertListToXml(books));
		} else if ("json".equals(format)) {
			response.setContentType("application/json");
			response.getWriter().println(CommonUtil.convertListToJson(books));
		} else {
			response.setContentType("text/string");
			response.getWriter().println(books.toString());
		}
	}
}

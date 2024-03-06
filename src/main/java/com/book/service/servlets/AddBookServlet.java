package com.book.service.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;

/**
 * Class for Insert Book Servlet
 */

@WebServlet("/book/add-book")
public class AddBookServlet extends HttpServlet {
	// DoPost as record is being inserted
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String date = request.getParameter("date");
		String genres = request.getParameter("genres");
		String characters = request.getParameter("characters");
		String synopsis = request.getParameter("synopsis");
		BookRepository.getInstance().insertBook(new Book(title, author, date, genres, characters, synopsis));

		String format = request.getParameter("format");

		response.setContentType("application/json");
		response.getWriter().println("{\"response\":\"Successfully inserted book\"}");
	}

}

package com.book.service.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;

/**
 * Class for Update Book Servlet
 */

@WebServlet("/book/update-book")
public class UpdateBookServlet extends HttpServlet {
	// DoPut as record is being updated
	@Override
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Long id = Long.valueOf(request.getParameter("id"));
		String title = request.getParameter("title");
		String author = request.getParameter("author");
		String date = request.getParameter("date");
		String genres = request.getParameter("genres");
		String characters = request.getParameter("characters");
		String synopsis = request.getParameter("synopsis");
		BookRepository.getInstance().updateBook(new Book(id, title, author, date, genres, characters, synopsis));

		String format = request.getParameter("format");
		if ("xml".equals(format)) {
			response.setContentType("text/xml");
			response.getWriter().println("<response> Successfully updated book </response>");
		} else if ("json".equals(format)) {
			response.setContentType("application/json");
			response.getWriter().println("{\"response\":\"Successfully updated book\"}");
		} else {
			response.setContentType("text/string");
			response.getWriter().println("Successfully inserted book");
		}
	}
}

package com.book.service.servlets;

import static com.book.service.util.CommonUtil.convertListToJson;

import java.io.IOException;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;

/**
 * Class for Delete Book Servlet
 */

@WebServlet("/book/delete-book")
public class DeleteBookServlet extends HttpServlet {

	@Override
	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Long id = Long.valueOf(request.getParameter("id"));
		BookRepository.getInstance().deleteBook(id);
		List<Book> books = BookRepository.getInstance().getAllBooks();

		response.setContentType("application/json");
		response.getWriter().println(convertListToJson(books));
	}
}

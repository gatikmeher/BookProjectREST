package com.book.service.servlets;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;
import com.book.service.util.CommonUtil;

/**
 * Class for Search Book Servlet
 */

@WebServlet("/book/get-book-search")
public class SearchBookServlet extends HttpServlet {
	// DoGet as still fetching a record
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String title = request.getParameter("title");
		Long id = request.getParameter("id") != null ? Long.valueOf((request.getParameter("id"))) : null;
		List<Book> books;
		if (title != null && !title.equals("")) {
			books = BookRepository.getInstance().getBookByTitle(title);
		} else {
			books = Collections.singletonList(BookRepository.getInstance().getBookById(id));
		}
		request.setAttribute("bookList", books);

		String format = request.getParameter("format");
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

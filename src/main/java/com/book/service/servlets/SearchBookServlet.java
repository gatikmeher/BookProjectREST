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
		List<Book> books = new ArrayList<Book>();
		if (title != null && !title.equals("")) {
			books = BookRepository.getInstance().getBookByTitle(title);
		} else {
			Book book = BookRepository.getInstance().getBookById(id);
			if(book != null) {
				books.add(book);
			}
		}
		request.setAttribute("bookList", books);
		response.setContentType("application/json");
		response.getWriter().println(CommonUtil.convertListToJson(books));
	}
}

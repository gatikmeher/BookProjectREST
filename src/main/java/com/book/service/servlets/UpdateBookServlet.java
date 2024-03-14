//package com.book.service.servlets;
//
//import java.io.IOException;
//
//import javax.servlet.annotation.WebServlet;
//import javax.servlet.http.HttpServlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import com.book.service.dao.BookRepository;
//import com.book.service.entity.Book;
//import com.book.service.validator.BookValidator;
//
///**
// * Class for Update Book Servlet
// */
//
//@WebServlet("/book/update-book")
//public class UpdateBookServlet extends HttpServlet {
//	// DoPut as record is being updated
//	@Override
//	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
//		BookValidator bookValidator = new BookValidator();
//		Long id = Long.valueOf(request.getParameter("id"));
//		String title = request.getParameter("title");
//		String author = request.getParameter("author");
//		String date = request.getParameter("date");
//		String genres = request.getParameter("genres");
//		String characters = request.getParameter("characters");
//		String synopsis = request.getParameter("synopsis");
//		String errorMessage = bookValidator.checkInputValue(title, author, date, genres, characters, synopsis);
//		if (errorMessage == null) {
//			BookRepository.getInstance().updateBook(new Book(id, title, author, date, genres, characters, synopsis));
//			response.getWriter().println("{\"response\":\"Successfully updated book\"}");
//		} else {
//			response.getWriter().println("{\"response\":\"" + errorMessage + "\"}");
//		}
//		response.setContentType("application/json");
//	}
//}

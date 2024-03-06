package com.book.service.servlets;

import java.io.IOException;
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
 * Class for Get All Books Servlet
 */

@WebServlet("/book/get-all-books")
public class GetAllBooksServlet extends HttpServlet {
    @Override
    //DoGet as fetching the book records
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        BookRepository bookDao = BookRepository.getInstance();
        List<Book> books = bookDao.getAllBooks();
        //bookList is just a name by which will access in html
        //f is the actual object whose value this bookList will keep
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

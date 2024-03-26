package com.book.service.servlets;

import java.io.IOException;
import java.io.StringReader;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

import com.book.service.dao.BookRepository;
import com.book.service.entity.Book;
import com.book.service.util.CommonUtil;
import com.book.service.validator.BookValidator;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@WebServlet("/BookController")
public class BookController extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Get the XML data from the request
		String dataFormat = request.getContentType();
		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		Book newBook = null;
		try {
			if ("application/json".equalsIgnoreCase(dataFormat)) {
				Gson gson = new Gson();
				newBook = gson.fromJson(data, Book.class);
			} else if ("application/xml".equalsIgnoreCase(dataFormat)) {
				JAXBContext jaxbContext = javax.xml.bind.JAXBContext.newInstance(Book.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				newBook = (Book) unmarshaller.unmarshal(new StringReader(data));
			} else if ("text/plain".equalsIgnoreCase(dataFormat)) {
				newBook = parsePlainTextToBook(data);
			} else {
				throw new IllegalArgumentException("Unsupported content type: " + dataFormat);
			}
			BookRepository.getInstance().insertBook(newBook);
			if ("application/xml".equalsIgnoreCase(dataFormat)) {
				response.setContentType("application/xml");
				response.getWriter()
						.println("<?xml version='1.0' encoding='UTF-8'?><response>Successfully added book</response>");
			} else if ("application/json".equalsIgnoreCase(dataFormat)) {
				response.setContentType("application/json");
				response.getWriter().println("{\"response\":\"Successfully added book\"}");
			} else {
				response.setContentType("text/string");
				response.getWriter().println("Successfully added book".replace("%20", " "));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Book parsePlainTextToBook(String data) {
	    String[] lines = data.split("--");

	    if (lines.length >= 6) {
	        // Extracting the id from the first line assuming it follows the format "id=1234"
	        String title = lines[0].split("=")[1].trim();
	        String date = lines[1].split("=")[1].trim();
	        String author = lines[2].split("=")[1].trim();
	        String genres = lines[3].split("=")[1].trim();
	        String characters = lines[4].split("=")[1].trim();
	        String synopsis = lines[5].split("=")[1].trim();

	        // Create a new Book object including the id
	        return new Book(title, author, date, genres, characters, synopsis);
	    } else {
	        // Handle incomplete data or invalid format
	        System.err.println("Invalid plain text data for adding a Book object.");
	        return null; // Or throw an exception
	    }
	}

	public Book parsePlainTextToBookForUpdate(String data) {
	    String[] lines = data.split("--");

	    if (lines.length >= 7) {
	        // Extracting the id from the first line assuming it follows the format "id=1234"
	        Long id = Long.parseLong(lines[0].split("=")[1].trim());
	        String title = lines[1].split("=")[1].trim();
	        String date = lines[2].split("=")[1].trim();
	        String author = lines[3].split("=")[1].trim();
	        String genres = lines[4].split("=")[1].trim();
	        String characters = lines[5].split("=")[1].trim();
	        String synopsis = lines[6].split("=")[1].trim();

	        // Create a new Book object including the id
	        return new Book(id, title, author, date, genres, characters, synopsis);
	    } else {
	        // Handle incomplete data or invalid format
	        System.err.println("Invalid plain text data for updating a Book object.");
	        return null; // Or throw an exception
	    }
	}

	// DoPut as record is being updated
	@Override
	public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String dataFormat = request.getContentType();
		String data = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
		Book newBook = null;
		try {
			if ("application/json".equalsIgnoreCase(dataFormat)) {
				Gson gson = new Gson();
				newBook = gson.fromJson(data, Book.class);
			} else if ("application/xml".equalsIgnoreCase(dataFormat)) {
				JAXBContext jaxbContext = javax.xml.bind.JAXBContext.newInstance(Book.class);
				Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
				newBook = (Book) unmarshaller.unmarshal(new StringReader(data));
			} else if ("text/plain".equalsIgnoreCase(dataFormat)) {
				newBook = parsePlainTextToBookForUpdate(data);
			} else {
				throw new IllegalArgumentException("Unsupported content type: " + dataFormat);
			}
			BookRepository.getInstance().updateBook(newBook);
			if ("application/xml".equalsIgnoreCase(dataFormat)) {
				response.setContentType("application/xml");
				response.getWriter().println(
						"<?xml version='1.0' encoding='UTF-8'?><response>Successfully updated book</response>");
			} else if ("application/json".equalsIgnoreCase(dataFormat)) {
				response.setContentType("application/json");
				response.getWriter().println("{\"response\":\"Successfully updated book\"}");
			} else {
				response.setContentType("text/string");
				response.getWriter().println("Successfully updated book");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
		Long id = Long.valueOf(request.getParameter("id"));
		BookRepository.getInstance().deleteBook(id);
		int page = Integer.parseInt(request.getParameter("page") == null ? "1" : request.getParameter("page"));
		int size = Integer.parseInt(request.getParameter("size") == null ? "20" : request.getParameter("size"));

		List<Book> books = BookRepository.getInstance().getAllBooks(page, size);
		response.setContentType("application/json");

//		response.getWriter().println(CommonUtil.convertListToJson(books));
		String format = request.getParameter("format");
		if ("xml".equals(format)) {
			response.setContentType("text/xml");
			response.getWriter()
					.println("<?xml version='1.0' encoding='UTF-8'?><response>Successfully deleted book</response>");
		} else if ("json".equals(format)) {
			response.setContentType("application/json");
			response.getWriter().println("{\"response\":\"Successfully deleted book\"}");
		} else {
			response.setContentType("text/string");
			response.getWriter().println("Successfully deleted book");
		}
	}

	@Override
	// DoGet as fetching the book records
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String title = request.getParameter("title");
		if (title != null && title.isEmpty()) { // Check if title is empty
			title = null; // Set title to null if it's empty
		}

		Long id = null; // Initialize id as null
		if (request.getParameter("id") != null && !request.getParameter("id").isEmpty()) {
			id = Long.valueOf(request.getParameter("id")); // Convert id to Long if not null or empty
		}
		List<Book> books = new ArrayList<Book>();

		int page = Integer.parseInt(request.getParameter("page") == null ? "1" : request.getParameter("page"));
		int size = Integer.parseInt(request.getParameter("size") == null ? "20" : request.getParameter("size"));

		if (title != null && !title.equals("")) {
			books = BookRepository.getInstance().getBookByTitle(title, page, size);
		} else if (null != id) {
			Book book = BookRepository.getInstance().getBookById(id);
			if (book != null) {
				books.add(book);
			}
		} else {
			books = BookRepository.getInstance().getAllBooks(page, size);
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

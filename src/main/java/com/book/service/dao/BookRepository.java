package com.book.service.dao;

import com.book.service.entity.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.book.service.util.Constants.*;

/**
 * Class for book repository
 */
public class BookRepository {

    //Private constructor for singleton
    private BookRepository() {
    }

    private final Logger logger = LoggerFactory.getLogger(BookRepository.class);

    //Object made of bookRepository
    private static BookRepository dao;

    Book onebook;

    // Used for creating a connection to SQL
    Connection conn;

    // For querying and retrieving info from dB
    Statement stmt;

    //Synchronized
    public static synchronized BookRepository getInstance() {
        if (dao == null) {
            dao = new BookRepository();
        }
        return dao;
    }


    //An arraylist of books
    public List<Book> getAllBooks(int page,int size) {

        List<Book> allbooks = new ArrayList<>();
        openConnection();

        try {
            //Select query for all books
            String selectSQL = "SELECT id, title, author, date, genres, characters, synopsis from books order by id desc";
            ResultSet rs1 = stmt.executeQuery(selectSQL);
            //Retrieve the results
            while (rs1.next()) {
                onebook = getNextbook(rs1);
                allbooks.add(onebook);
            }
        } catch (SQLException se) {
            logger.debug(se.getMessage());
        } finally {
            closeConnection();
        }
        // Adjust the page index
        int adjustedPage = Math.max(1, page); // Ensure page is at least 1
        int startIndex = (adjustedPage - 1) * size;
        int endIndex = Math.min(startIndex + size, allbooks.size());
        return allbooks.subList(startIndex, endIndex);
    }


    //Returning books by relevant bookID
    public Book getBookById(Long bookId) {
        openConnection();
        onebook = null;
        //Creating SQL statement
        try {
            //Select query where book id is specified
            String selectSQL = String.format("SELECT * from books WHERE id = %s", bookId);
            ResultSet rs = stmt.executeQuery(selectSQL);
            while (rs.next()) {
                onebook = getNextbook(rs);
            }
        } catch (SQLException se) {
            logger.debug(se.getMessage());
        } finally {
            closeConnection();
        }
        return onebook;
    }


    public List<Book> getBookByTitle(String bookTitle, int page, int size) {
        openConnection();
        onebook = null;

        List<Book> allbooks = new ArrayList<>();
        //Creating SQL statement
        try {
            //Select query where book id is specified
            String selectSQL = String.format("SELECT id, title, author, date, genres, characters, synopsis from books WHERE upper(title) like upper('%%%s%%')", bookTitle);
            ResultSet rs = stmt.executeQuery(selectSQL);
            while (rs.next()) {
                onebook = getNextbook(rs);
                allbooks.add(onebook);
            }
        } catch (SQLException se) {
            logger.debug(se.getMessage());
        } finally {
            closeConnection();
        }
        // Adjust the page index
        int adjustedPage = Math.max(1, page); // Ensure page is at least 1
        int startIndex = (adjustedPage - 1) * size;
        int endIndex = Math.min(startIndex + size, allbooks.size());
        if(allbooks.size()<20)
        {
        	return allbooks;
        }
        return allbooks.subList(startIndex, endIndex);
    }

    //Inserting books into database
    public int insertBook(Book book) {
        openConnection();
        //Query to insert books
        String query = "INSERT INTO books (title, author, date, genres, characters, synopsis) VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            //Setting each value using key pair
        	pstmt.setString(1, book.getTitle());
            pstmt.setString(2, book.getAuthor());
            pstmt.setString(3, book.getDate());
            pstmt.setString(4, book.getGenres());
            pstmt.setString(5, book.getCharacters());
            pstmt.setString(6, book.getSynopsis());          
            return pstmt.executeUpdate();
        } catch (SQLException se) {
            logger.debug(se.getMessage());
        } finally {
            closeConnection();
        }
        return 0;
    }

    //Updating book records
    public int updateBook(Book bookObj) {
        openConnection();
        //Query to update book
        String query = "UPDATE books SET title=?, author=?, date= ?, genres=?, characters=?, synopsis=? WHERE id = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            //Setting each value described in query
            pstmt.setString(1, bookObj.getTitle());
            pstmt.setString(2, bookObj.getAuthor());
            pstmt.setString(3, bookObj.getDate());
            pstmt.setString(4, bookObj.getGenres());
            pstmt.setString(5, bookObj.getCharacters());
            pstmt.setString(6, bookObj.getSynopsis());
            pstmt.setLong(7, bookObj.getId());
            return pstmt.executeUpdate();
        } catch (SQLException se) {
            logger.debug(se.getMessage());
        } finally {
            closeConnection();
        }
        return 0;
    }
    

    //Delete book
    public int deleteBook(Long bookId) {
        openConnection();
        //Delete query
        String query = "DELETE from books WHERE id = ?";

        try (PreparedStatement pstmt = conn.prepareStatement(query)) {
            //Setting each value using key pair
            pstmt.setLong(1, bookId);
            return pstmt.executeUpdate();
        } catch (SQLException throwables) {
            System.err.println(throwables.getMessage());
        } finally {
            closeConnection();
        }
        return 0;
    }

    // Creating connection to mySQL database
    private void openConnection() {
        try {
            //Register JDBC Driver - used to connect database with java application
            Class.forName("com.mysql.cj.jdbc.Driver");

            //Open a connection
            logger.debug("Connecting to a database..");
            conn = DriverManager.getConnection(DB_URL, USER, TOKEN);

            //Execute a query
            logger.debug("Creating database...");
            stmt = conn.createStatement();

        } catch (Exception se) {
            //Handle errors for JDBC
            logger.debug(se.getMessage());
        }//Handle errors for Class.forName

    }

    //Close connection
    private void closeConnection() {
        try {
            stmt.close();
            conn.close();
        } catch (SQLException se) {
            System.err.println(se.getMessage());
        }
    }

    //Getting next book and saving in thisbook
    private Book getNextbook(ResultSet rs) {
        Book thisbook = null;
        try {
            thisbook = new Book(
                    rs.getLong("id"),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("date"),
                    rs.getString("genres"),
                    rs.getString("characters"),
                    rs.getString("synopsis"));

            logger.debug("Get Next book printing: {}", thisbook);

        } catch (SQLException e) {
            logger.debug(e.getMessage());
        }
        return thisbook;
    }

    // Stops anyone from cloning the object and makes it bullet proof thread safe
    // To make it full proof singleton
    @Override
    protected Object clone() throws CloneNotSupportedException {
        throw new CloneNotSupportedException();
    }
}

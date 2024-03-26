package com.book.service.util;

public class Constants {
    /**
     * Class for Constants
     */

    private Constants() {
    }

    //User name in MySql database
    public static final String USER = "root";
    //Password in MySql database
    public static final String TOKEN = "Password1234";
    //MySql database name
    public static final String DB_NAME = "book_project";
    //MySql database details
    public static final String DB_URL = String.format("jdbc:mysql://localhost:3306/%s", DB_NAME);

}

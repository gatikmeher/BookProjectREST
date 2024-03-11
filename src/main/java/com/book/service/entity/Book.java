package com.book.service.entity;

/**
 * Class for Book
 */
public class Book {
	
    private Long id;
    private String title;
    private String date;
    private String author;
    private String genres;
    private String characters;
    private String synopsis;

    public Book(Long id, String title, String author, String date, String genres, String characters, String synopsis) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.author = author;
        this.genres = genres;
        this.characters = characters;
        this.synopsis = synopsis;

    }

    public Book(String title, String date, String author, String genres, String characters, String synopsis) {
        this.title = title;
        this.date = date;
        this.author = author;
        this.genres = genres;
        this.characters = characters;
        this.synopsis = synopsis;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getGenres() {
		return genres;
	}

	public void setGenres(String genres) {
		this.genres = genres;
	}

	public String getCharacters() {
		return characters;
	}

	public void setCharacters(String characters) {
		this.characters = characters;
	}

	public String getSynopsis() {
		return synopsis;
	}

	public void setSynopsis(String synopsis) {
		this.synopsis = synopsis;
	}

	@Override
	public String toString() {
		return "id=" + id + "-- title=" + title + "-- date=" + date + "-- author=" + author + "-- genres=" + genres
				+ "-- characters=" + characters + "-- synopsis=" + synopsis + "###";
	}
	
	

    
}

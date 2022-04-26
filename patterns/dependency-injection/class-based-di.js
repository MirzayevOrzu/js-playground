class BookService {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push({ id: this.books.length + 1, ...book });
    return this.books[this.books.length - 1];
  }

  getBooks() {
    return this.books;
  }

  getBook(id) {
    return this.books.find((book) => book.id === id);
  }
}

class BookController {
  constructor(bookService) {
    // service is injected
    this.bookService = bookService;
  }

  addBook(req, res) {
    const book = this.bookService.addBook(req.body);
    res.json(book);
  }

  getBooks(req, res) {
    const books = this.bookService.getBooks();
    res.json(books);
  }

  getBook(req) {
    const book = this.bookService.getBook(req.params.id);
    res.json(book);
  }
}

class Factory {
  // factory is making injections
  static createBookController() {
    const bookService = new BookService();
    return new BookController(bookService);
  }
}

const bookController = Factory.createBookController();

const mockRequest = {
  body: {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
  },
};

const mockResponse = {
  json(book) {
    console.log(book);
  },
};

bookController.addBook(mockRequest, mockResponse);

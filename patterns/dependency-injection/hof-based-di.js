const makeAddBook = (bookModel) => (book) => {
  const createdBook = bookModel.push({ id: bookModel.length + 1, ...book });
  return createdBook;
};

const makeGetBooks = (bookModel) => () => {
  return bookModel;
};

const makeGetBook = (bookModel) => (id) => {
  return bookModel.find((book) => book.id === id);
};

const makeBookService = () => {
  const bookModel = [];
  return {
    addBook: makeAddBook(bookModel),
    getBooks: makeGetBooks(bookModel),
    getBook: makeGetBook(bookModel),
  };
};

const bookService = makeBookService();

bookService.addBook({
  title: "The Lord of the Rings",
  author: "J.R.R. Tolkien",
  year: 1954,
});

const books = bookService.getBooks();

console.log(books);

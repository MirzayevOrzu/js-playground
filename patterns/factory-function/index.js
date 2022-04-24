function createBook(title, pages, category, author) {
  return {
    title,
    pages,
    category,
    author,
    getInfo() {
      console.log(`${this.title} by ${this.author}`);
    },
    getCategory() {
      console.log(`${this.title} is in ${this.category}`);
    },
    getPages() {
      console.log(`${this.title} has ${this.pages} pages`);
    },
  };
}

const book1 = createBook("Start With Why", 250, "Business", "Simon Sinek");
const book2 = createBook("Deep Work", 200, "Business", "Cal Newport");

book1.getInfo();
book1.getCategory();
book1.getPages();

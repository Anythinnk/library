let myLibrary = [];

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read!' : 'not read yet.'}`
}

function addBooksToLibrary() {
    for (let i = 0; i < arguments.length; i++) {
        let elem = arguments[i];
        myLibrary.push(elem);
    }
}
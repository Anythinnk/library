let myLibrary = [];

function Book(title, author, pages, read = false, inLibrary = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.inLibrary = inLibrary;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read!' : 'not read yet.'}`
}

Book.prototype.remove = function() {
    if (this.inLibrary) {
        myLibrary.splice(myLibrary.indexOf(this), 1);
        this.inLibrary = false;
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBooksToLibrary() {
    for (let i = 0; i < arguments.length; i++) {
        let elem = arguments[i];
        if (!elem.inLibrary) {
            myLibrary.push(elem);
            elem.inLibrary = true;
        }
    }
}
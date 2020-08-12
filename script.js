let myLibrary;

function populateFromStorage() {
    if (localStorage.getItem('library')) {
        let retrievedObj = JSON.parse(localStorage.getItem('library'));
        for (book of retrievedObj) {
            let {title, author, pages, read, inLibrary} = book;
            myLibrary.push(new Book(title, author, pages, read, inLibrary));
        }
    }
}

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
        updateStorage();
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
    updateStorage();
}

function addBooksToLibrary() {
    for (let i = 0; i < arguments.length; i++) {
        let elem = arguments[i];
        if (!elem.inLibrary) {
            myLibrary.push(elem);
            elem.inLibrary = true;
        }
    }
    updateStorage();
}

// check if localStorage is supported and available
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function start() {
    myLibrary = [];
    if (storageAvailable('localStorage')) {
        populateFromStorage();
    }
}

function updateStorage() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
}

start();
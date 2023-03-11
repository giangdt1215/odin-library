let myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

function checkValid() {
    if(!titleInput || titleInput.value.trim().length === 0){
        titleInput.reportValidity();
        return false;
    }

    if(!authorInput || authorInput.value.trim().length === 0){
        authorInput.reportValidity();
        return false;
    }

    if(!pagesInput || pagesInput.value.trim().length === 0){
        pagesInput.reportValidity();
        return false;
    }

    return true;
}

function addBookToLibrary(event) {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;

    if(!checkValid()) return;
    
    const book = new Book(myLibrary.length, title, author, pages, read);
    myLibrary.push(book);

    //render list
    render();

    //reset fields
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

const tbodySection = document.getElementById('tbody');

function renderList() {
    let list = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        list += `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>
                ${book.read ? 
                `<span class='mdi mdi-check' id='readBtn' onclick="toggleRead(${book.id})"></span>` : 
                `<span class='mdi mdi-window-close' id='readBtn' onclick="toggleRead(${book.id})"></span>`}
            </td>
            <td>
                <button id="delBtn" onclick="deleteBook(${book.id})"}>DELETE</button>
            </td>
        </tr>
        `
    }

    tbodySection.innerHTML = list;
}

function toggleRead(bookId) {
    const updatedLibrary = myLibrary.map(book => {
        if(bookId == book.id){
            return {
                ...book,
                read: !book.read
            }
        }
        return book;
    })

    myLibrary = updatedLibrary;
    render();
}

function deleteBook(bookId) {
    const newLibrary = myLibrary.filter(book => bookId != book.id);
    myLibrary = newLibrary;
    render();
}

const delAllBtn = document.getElementById('delAll');
delAllBtn.addEventListener('click', () => {
    myLibrary = [];
    render();
})

function render() {
    const tableDOM = document.querySelector('.lib-table');

    if(myLibrary.length === 0) {
        tableDOM.style.visibility = 'hidden';
    } else {
        renderList();
        tableDOM.style.visibility = 'visible';
    }

    let bookRead = document.getElementById('book-read');
    bookRead.innerText = myLibrary.filter((book) => book.read).length;

    let bookUnread = document.getElementById('book-unread');
    bookUnread.innerText = myLibrary.filter((book) => !book.read).length;

    let totalBooks = document.getElementById('total');
    totalBooks.innerText = myLibrary.length;
}

render();
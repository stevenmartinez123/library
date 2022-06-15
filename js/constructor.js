
/* dom variables */
const bookShelf = document.querySelector('.bookShelf'); //grabs bookshelf container div
const addBookBtn = document.querySelector("#addBook-btn"); //selects add book button at right corner of page
const popup = document.querySelector(".popup"); //selects pop up container for new book form pop up 
var index = 0; //takes index of new div number

/* event listener to open up new book form */
addBookBtn.addEventListener("click", function() {
    popup.style.display = "flex";
});

/* event listener on window to close pop up form */
window.onload = function() {
    document.onclick = function(e) {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    }
};

/*array to hold books in library */
let myLibrary = [];

/*constructor for book object */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    myLibrary.push(this); // adds to array
}

/*default books in library */
var bookOne = new Book("The Great Gatsby", "F. Scott Fitzgerald", 208, false);
var bookTwo =  new Book('Don Quixote', 'Miguel de Cervantes', 928, false);
var bookThree = new Book('The Odyssey', 'Homer', 296, false);
var bookFour = new Book('The Catcher in the Rye', 'J. D. Salinger', 288, false);

/* function to display every book in default array */

myLibrary.forEach(function(element) {
    createBookDiv(element);
});

/* event listener to delete book from library */
function closeButton() {
    for (var i = 0; i < myLibrary.length; i++) {
        var closeButtonIndex = this.id.toString().charAt(12); //gets id of close button 
        if (i == closeButtonIndex) { //gets div of close button and deletes from library
            let node = document.querySelector(`#newbook-${closeButtonIndex}`);
            node.parentNode.removeChild(node);
        }
    }
}

//event listener for toggle to mark as read
function switchReadStatus() {

        //gets array index of myLibrary
        let arrayIndex = this.id.toString().charAt(12); 
        //gets div that was toggles to read or unread
        var realNode = document.querySelector(`#newbook-${arrayIndex}`); 
        //gets title of book in div
        let title = realNode.childNodes[1].data.toString().replaceAll('/""/', "");
        //gets title of book in array
        let arrayTitle = '"' + myLibrary[arrayIndex].title + '"';
        //gets current style color
        let currentColor = window.getComputedStyle(realNode, null).getPropertyValue("color");           
        let unreadColor = 'rgb(0, 0, 0)'; // black
        let black = Boolean(currentColor == unreadColor); //verifies if text color black
        let closeBtn = document.querySelector(`#closeButton-${arrayIndex}`); //selector for close button
    
        //if text color black invert css else switch to default 
        //sets book field of element in array to read or unread
        if (black) {
            realNode.style.backgroundColor='black';
            realNode.style.color='green';
            closeBtn.style.color='green';
            closeBtn.style.backgroundColor='black';
            myLibrary[arrayIndex].read = true;

        } else { //revert to default css of div 
            realNode.style.backgroundColor='silver';
            realNode.style.color='black';
            closeBtn.style.color='black';
            closeBtn.style.backgroundColor='silver';
            myLibrary[arrayIndex].read = false;
        }
}

/*adds new book to book library from field form */
const formAddBookBtn = document.querySelector('#add-btn');

formAddBookBtn.addEventListener('click', function() {
    let form = document.getElementById('form');
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let isRead = document.getElementById('isRead').value;
    let read = (isRead == 'true'); //gets boolean value of isRead text field

    // if fields are empty when filling out form return false
    if (title == '' || author == '' || pages == '') { 
        return false;
    }
    var book = new Book(title, author, pages, read); 
    createBookDiv(book);
    event.preventDefault();
    form.reset(); //resets form 
});

/*creates book div, displays in webpage */
function createBookDiv(element) {
    //creates new book div 
    var newBook = document.createElement('div');
    newBook.className = 'book-div';
    newBook.id = `newbook-${index}`;

    //creates close button 
    var closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = 'X';
    closeBtn.title="REMOVE";
    closeBtn.id = `closeButton-${index}`;

    //appends close button to newBook div and adds book fields text to div
    newBook.appendChild(closeBtn);
    newBook.appendChild(document.createTextNode("\"" + element.title.trim() + "\""));
    newBook.appendChild(document.createElement('br'));
    newBook.appendChild(document.createTextNode("By: " + element.author.trim()));
    newBook.appendChild(document.createElement('br'));
    newBook.appendChild(document.createTextNode("Pages: " + element.pages));

    //adds div to bookShelf / library
    bookShelf.appendChild(newBook);

    //creates div and toggle to switch book from read or not read
    var switchDiv = document.createElement('div');
    switchDiv.className = 'switch-div';
    newBook.appendChild(switchDiv);
    var labelswitch = document.createElement('label');
    labelswitch.className='switch';
    var inputswitch = document.createElement('input');
    inputswitch.type='checkbox';
    inputswitch.id = `inputswitch-${index++}`;
    var spanswitch = document.createElement('span');
    spanswitch.className = 'slider round';
    switchDiv.appendChild(document.createTextNode('"NOT READ"')); 
    switchDiv.appendChild(labelswitch);
    labelswitch.appendChild(inputswitch);
    labelswitch.appendChild(spanswitch);
    switchDiv.appendChild(document.createTextNode('"READ"'));

    //if the book is marked as read css will be inverted to "read css"
    if (myLibrary[index - 1].read == true) {
        newBook.style.backgroundColor='black';
        newBook.style.color='green';
        closeBtn.style.color='green';
        closeBtn.style.backgroundColor='black';
        var checkbox = document.querySelector(`#inputswitch-${index - 1}`); 
        checkbox.checked = true;
    }

    /* event listener to delete book from library */
    closeBtn.addEventListener('click', closeButton);

    //event listener for toggle to mark as read
    inputswitch.addEventListener('click', switchReadStatus);

}
   
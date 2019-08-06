//Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


//UI Constructor
function UI() {}

//add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    //create cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href ='#' class ='delete'>X</a></td>
    `;

    list.appendChild(row);
}
UI.prototype.showAlert = function(message, className){
  //create div
  const div = document.createElement('div');
  //add class
  div.className = `alert ${className}`;
  //add text
  div.appendChild(document.createTextNode(message));
  //get a parent
  const container = document.querySelector('.container');
  //get form
  const form = document.querySelector('#book-form');
  //insert alert
  container.insertBefore(div, form);
  //set time out
  setTimeout(function(){
      document.querySelector('.alert').remove()
  }, 1000);
}
  //delete book
  UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }  
  } 

       //clear field function
UI.prototype.clearFields = function(){
         document.getElementById('title').value = '';
         document.getElementById('author').value = '';
         document.getElementById('isbn').value = '';
     
}

//EVENT LISTENERS
document.getElementById('book-form').addEventListener('submit', function(e){
             //grt form values
     const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
           isbn = document.getElementById('isbn').value;
     
               // instantiate a book
    const book = new Book(title, author, isbn);
     
    //instantiate a UI 
    const ui = new UI();

    //VALIDATE
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('please fill in all fields', 'error');
    }else{
        //add book to list
        ui.addBookToList(book);
        //show alert
        ui.showAlert('Book Added', 'success');

        //Clear fields
     ui.clearFields();
    }
    
   


    e.preventDefault();
})

//EventListener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    //instantiate UI
    const ui = new UI();
    //delete book
  ui.deleteBook(e.target);
   //show alert
  ui.showAlert('Book Removed', 'success');

    e.preventDefault();
})
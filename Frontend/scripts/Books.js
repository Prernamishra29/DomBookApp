const loginDataUser = JSON.parse(localStorage.getItem('loginData'));


const bookGridUser= document.getElementById('booksGrid');
document.getElementById('showAvailableBooks').addEventListener('click', async()=> {
    const response = await fetch('https://lowly-mercurial-ziconium.glitch.me/books/available');

const books= await response.json();
bookGridUser.innerHTML= books.map(book => `
<div class="book-card">
<img src="${book.imageUrl}" alt="${book.title}" />
<h3>${book.title}</h3>
<p>${book.author}</p>
<p>${book.category}</p>
<button onclick="borrowBook('${book._id}')">Borrow Book</button>
</div>`
)
.join('');
});

async function borrowBook(bookId){
    const days = prompt('Enter borrowing duration(Max 10 days):',10);
    if(days && days <=10){
        await fetch(`https://lowly-mercurial-ziconium.glitch.me/books/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({borrowedDays: days}),
        });
        alert("Book Borrowed Successfully.");
        document.getElementById('showAvailableBooks').click();
    }
    else {
        alert("Invalid Borrowing Duration."); 
    }
}
document.getElementById('showBorrowedBooks').addEventListener('click', async()=> {
    const response = await fetch('https://lowly-mercurial-ziconium.glitch.me/books/borrowed');
    const books= await response.json();
    
     bookGridUser.innerHTML= books.map(book => `
        <div class="book-card">
       <img src="${book.imageUrl}" alt="${book.title}" />
         <h3>${book.title}</h3>
         <p>${book.author}</p>
        <p>${book.category}</p>
        <p>Borrowed Days: ${book.borrowedDays}</p>
        <button onclick="returnBook('${book._id}')">Return Book</button>
       </div>
       `).join('');
     });
     async function returnBook(bookId){
            const confirmReturn= confirm("Are you sure you want to return ?");
            if(confirmReturn){
                await fetch(`https://lowly-mercurial-ziconium.glitch.me/books/${bookId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'},
                    body: JSON.stringify({borrowedDays: null}),
                });
                alert("Book Returned Successfully.");
                document.getElementById('showBorrowedBooks').click();
            }
        }
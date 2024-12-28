const loginData= JSON.parse(localStorage.getItem("loginData"));
if(!loginData || loginData.email !== "admin@empher.com"){
    alert("Admin Not Loged In.");
    window.location.href = "index.html";
}
const bookGrid= document.getElementById('booksGrid');
const addBookForm= document.getElementById('addBookForm');
addBookForm.addEventListener('submit', async function(e){
    e.preventDefault();

    const title= document.getElementById('title').value;
    const author= document.getElementById('author').value;
    const category= document.getElementById('category').value;

    await fetch('https://lowly-mercurial-ziconium.glitch.me/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            title,
            author,
            category,
            isAvailable: true,
            isVerified: false,
            borrowedDays: null,
            imageUrl: 'https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg',
        }),
    });
    alert("Book Added Successfully.");
    fetchBooks();
});
async function fetchBooks(){
    const response= await fetch('https://lowly-mercurial-ziconium.glitch.me/books');
    const books= await response.json();

    bookGrid.innerHTML= books.map(book => `
    <div class="book-card">
    <img src="${book.imageUrl}" alt="${book.title}" />
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>${book.category}</p>
    <button onclick="verifyBook(${book._id})" ${book.isVerified ? 'disabled' : ''}>Verify</button>
    <button onclick="deleteBook(${book._id})">Delete</button>
    </div>
    `).join('');
    }
    async function verifyBook(bookId){
    const confirmVerify= confirm("Are you sure you want to verify ?");
    if(confirmVerify){
        
        await fetch(`https://lowly-mercurial-ziconium.glitch.me/books/${bookId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({isVerified: true}),
        });
        alert("Book Verified Successfully.");
        fetchBooks();
    }
}
async function deleteBook(bookId){
    const confirmDelete= confirm("Are you sure you want to delete ?");
    if(confirmDelete){
        
        await fetch(`https://lowly-mercurial-ziconium.glitch.me/books/${bookId}`, {
            method: 'DELETE',
        });
        alert("Book Deleted Successfully.");
        fetchBooks();
    }
}
fetchBooks();

    
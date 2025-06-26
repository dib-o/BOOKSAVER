const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let users = [
  { id: 1, name: 'Mark', pass: '12345' },
  { id: 2, name: 'Shania', pass: 'qwert' }
];
let books = {
  "12345": [
    { id: 1, Title: "Book A", Author: "Author A", Status: "Finished", Chapter: "10" },
    { id: 2, Title: "Book B", Author: "Author B", Status: "On-Going", Chapter: "5" }
  ],
};

// Get all books
app.get('/users', (req, res) => {
  res.json(users);  
});

app.post('/users', (req, res) => {
  const { name, pass } = req.body;
  if (!name || !pass) return res.status(400).send("Missing fields");
  const newUser = {
    id: users.length + 1,
    name,
    pass
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/users/:pass', (req, res) => {
  const userPass = req.params.pass;
  users = users.filter(u => u.pass !== userPass);
  res.send('user deleted');
});

app.get('/users/:pass/books', (req, res) => {
  const userPass = req.params.pass;

  if (!books[userPass]) {
    return res.status(404).send("User not found or no books yet.");
  }

  res.json(books[userPass]);
});
app.get('/users/:pass/books/:Title', (req, res)=>{
  const userPass = req.params.pass;
  const bookTitle = req.params.Title.replace(/\s+/g, '').toLowerCase();

  if (!books[userPass]) {
    return res.status(404).send("User not found or no books yet.");
  }

  // Normalize both stored titles and the requested title
  const book = books[userPass].find(b => b.Title.replace(/\s+/g, '').toLowerCase() === bookTitle);

  if (!book) {
    return res.status(404).send("Book not found.");
  }

  res.json(book);
});
app.put('/users/:pass/books/:Title', (req, res) => {
  const userPass = req.params.pass;
  const bookTitle = req.params.Title.replace(/\s+/g, '').toLowerCase();

  if (!books[userPass]) {
    return res.status(404).send("User not found or no books yet.");
  }

  const bookIndex = books[userPass].findIndex(
    b => b.Title.replace(/\s+/g, '').toLowerCase() === bookTitle
  );

  if (bookIndex === -1) {
    return res.status(404).send("Book not found.");
  }

  // Update the fields
  const updatedFields = req.body;
  books[userPass][bookIndex] = {
    ...books[userPass][bookIndex], // keep existing fields
    ...updatedFields              // override with new ones
  };

  res.json({ message: "Book updated successfully.", book: books[userPass][bookIndex] });
});
app.post('/users/:pass/books', (req, res) => {
  const userPass = req.params.pass;
  const { Title, Author, Status, Chapter } = req.body;

  if (!Title || !Author || !Status || !Chapter) {
    return res.status(400).send("Missing fields");
  }

  const newBook = {
    id: books[userPass] ? books[userPass].length + 1 : 1,
    Title,
    Author,
    Status,
    Chapter
  };

  if (!books[userPass]) {
    books[userPass] = [];
  }

  books[userPass].push(newBook);
  res.status(201).json(newBook);
});


app.delete('/users/:pass/books/:Title', (req, res) => {
  const pass = req.params.pass;
  const booktitle = req.params.Title;

  // Check if books[pass] exists and is an array
  if (!Array.isArray(books[pass])) {
    console.error("❌ books[pass] is not an array!", books[pass]);
    return res.status(500).send('Internal server error: user books not found');
  }

  // Filter out the book to be deleted
  books[pass] = books[pass].filter(u => u.Title.toLowerCase() !== booktitle.toLowerCase());

  res.send('book deleted');
});



app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookstore API!');
});

// Make sure upload directory exists
const uploadPath = path.join(__dirname, 'BookCover');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Allowed image extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Multer storage configuration (temporary name, will be renamed after upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Save with original name temporarily, will rename later
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/BookCover', express.static(uploadPath));

// ✅ POST: Upload and rename image
app.post('/BookCover', upload.single('image'), (req, res) => {
  const { CurrentUser, CurrentUserPass, ContentID } = req.body;

  if (!req.file) return res.status(400).send('No file uploaded.');

  const oldPath = path.join(uploadPath, req.file.filename);
  const ext = path.extname(req.file.originalname);
  const newFilename = `${CurrentUser}-${CurrentUserPass}-${ContentID}${ext}`;
  const newPath = path.join(uploadPath, newFilename);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("❌ Error renaming file:", err);
      return res.status(500).send('Server error while renaming file.');
    }

    console.log("✅ Uploaded and renamed to:", newFilename);
    res.status(204).end(); // Success, no content
  });
});

// ✅ DELETE: Remove image by constructed name
app.delete('/BookCover/:CurrentUser/:CurrentUserPass/:ContentID', (req, res) => {
  const { CurrentUser, CurrentUserPass, ContentID } = req.params;
  const baseName = `${CurrentUser}-${CurrentUserPass}-${ContentID}`;

  console.log("🔥 DELETE route hit! Looking for:", baseName);

  for (const ext of allowedExtensions) {
    const filePath = path.join(uploadPath, `${baseName}${ext}`);
    console.log("🧪 Checking:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("✅ Deleted:", filePath);
      return res.send('Image deleted successfully.');
    }
  }

  console.warn("⚠️ Image not found.");
  return res.status(404).send('Image not found.');
});
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
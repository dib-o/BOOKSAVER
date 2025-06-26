let CurrentUser;
let CurrentUserPass;
let ContentID = 0;
window.onload = function () {
    setTimeout(ToHome, 1000);
};


function ToHome() {
    const opening = document.getElementById("opening");
    const home = document.getElementById("home");


    opening.style.opacity = "0";
    home.style.opacity = "1";
    home.style.pointerEvents = "auto"; 

    setTimeout(() => {
        opening.style.display = "none";
    }, 3000); 
}

function AddUser(){
    const homecontainer = document.getElementById("home-container");
    const adduser = document.getElementById("add-container");

    adduser.style.display = "block"; // ✅ ADD THIS LINE
    setTimeout(() => {
        adduser.style.opacity = "1";
        adduser.style.pointerEvents = "auto";
    }, 10); // slight delay to ensure display:block is applied

    homecontainer.style.opacity = "0";
    setTimeout(() => {
        homecontainer.style.display = "none";
    }, 1000); 
}

function ViewUsers(){
    const homecontainer = document.getElementById("home-container");
    const viewusers = document.getElementById("view-container");
    loadUsers();
    viewusers.style.display = "block"; // ✅ ADD THIS LINE
    setTimeout(() => {
        viewusers.style.opacity = "1";
        viewusers.style.pointerEvents = "auto";
    }, 10); // slight delay to ensure display:block is applied

    homecontainer.style.opacity = "0";
    setTimeout(() => {
        homecontainer.style.display = "none";
    }, 1000); 
}

function DeleteUser(){
    const homecontainer = document.getElementById("home-container");
    const deleteusers = document.getElementById("delete-container");
    deleteloadUsers();
    deleteusers.style.display = "block"; // ✅ ADD THIS LINE
    setTimeout(() => {
        deleteusers.style.opacity = "1";
        deleteusers.style.pointerEvents = "auto";
    }, 10); // slight delay to ensure display:block is applied

    homecontainer.style.opacity = "0";
    setTimeout(() => {
        homecontainer.style.display = "none";
    }, 1000); 
}

function AddtoHome(){
    const homecontainer = document.getElementById("home-container");
    const adduser = document.getElementById("add-container");
    const NameInput = document.getElementById("username-input");
    const PassInput = document.getElementById("password-input");

    homecontainer.style.display = "block";
    setTimeout(() => {
        homecontainer.style.opacity = "1";
    }, 10); // slight delay to allow display:block to apply before opacity transition

    adduser.style.opacity = "0";
    adduser.style.pointerEvents = "none";

    setTimeout(() => {
        adduser.style.display = "none";
        NameInput.value = "";
        PassInput.value = "";
    }, 1000); 
}


function ViewtoHome(){
    const homecontainer = document.getElementById("home-container");
    const viewuser = document.getElementById("view-container");
    const EnterPass = document.getElementById("enter-pass");

    homecontainer.style.display = "block";
    setTimeout(() => {
        homecontainer.style.opacity = "1";
    }, 10); // slight delay to allow display:block to apply before opacity transition

    viewuser.style.opacity = "0";
    viewuser.style.pointerEvents = "none";

    setTimeout(() => {  
        viewuser.style.display = "none";
        EnterPass.style.display = "none";
    }, 1000); 
}
function ViewtoUser(){
    const usercontainer = document.getElementById("user-container");
    const viewuser = document.getElementById("view-container");
    const EnterPass = document.getElementById("enter-pass");
    usercontainer.style.display = "block";
    setTimeout(() => {
        usercontainer.style.opacity = "1";
        usercontainer.style.pointerEvents = "all";
    }, 10); // slight delay to allow display:block to apply before opacity transition

    viewuser.style.opacity = "0";
    viewuser.style.pointerEvents = "none";

    setTimeout(() => {  
        viewuser.style.display = "none";
        EnterPass.style.display = "none";
    }, 1000); 
    UserInterface();
}
function Logout(){
    const usercontainer = document.getElementById("user-container");
    const homecontainer = document.getElementById("home-container");

    homecontainer.style.display = "block";
    setTimeout(() => {
        homecontainer.style.opacity = "1";
    }, 10);

    usercontainer.style.opacity = "0";
    usercontainer.style.pointerEvents = "none";

    setTimeout(() => {  
        usercontainer.style.display = "none";
    }, 1000); 
}
function AddContent(){
    const Additems = document.getElementById("additem-container");
    const Addbutton = document.getElementById("add-button");
    document.getElementById("upper-right-container").style.display = "block";
    Addbutton.style.pointerEvents = "none";
    Additems.style.display = "flex";
    ClearItemInputs();
}

function DeletetoHome(){
    const homecontainer = document.getElementById("home-container");
    const deleteuser = document.getElementById("delete-container");
    const AdminPass = document.getElementById("admin-pass");
    homecontainer.style.display = "block";
    setTimeout(() => {
        homecontainer.style.opacity = "1";
    }, 10); // slight delay to allow display:block to apply before opacity transition

    deleteuser.style.opacity = "0";
    deleteuser.style.pointerEvents = "none";

    setTimeout(() => {  
        deleteuser.style.display = "none";
        AdminPass.style.display = "none";
    }, 1000); 
}
function loadUsers() {
    const userlist = document.getElementById("user-list");
    fetch("/users")
    .then((res) => res.json())
    .then((data) => {
        userlist.innerHTML = "";
        data.forEach((user) => {
            const userdiv = document.createElement("div");
            userdiv.classList.add('User');
            userdiv.id = `${user.pass}`;
            userdiv.textContent = `${user.name}`;
            userlist.appendChild(userdiv);
        });

        const Users = document.querySelectorAll('.User');
        const EnterPass = document.getElementById("enter-pass");
        EnterPass.innerHTML = "";
        Users.forEach(User => {
            User.addEventListener('click', () => {
                Users.forEach(u => u.classList.remove('active'));
                User.classList.add('active'); 

                EnterPass.innerHTML = "";
                EnterPass.style.display = "flex";

                const Input = document.createElement("input");
                Input.type = "password";
                Input.id = "pass-checker";
                Input.placeholder = "Enter user password";

                const Login = document.createElement('div');
                Login.innerText = "Login";
                Login.id = "login-user";
                Login.style.pointerEvents = "none"; 

                Input.addEventListener('input', function(){
                    if(Input.value.length >= 5){
                        Login.style.pointerEvents = "all";
                    } else {
                        Login.style.pointerEvents = "none";
                    }
                });

                Login.onclick = function(){
                    if(Input.value === User.id){
                        CurrentUser = User.innerText;
                        CurrentUserPass = User.id;
                        Input.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)"
                        setTimeout(() => {
                            Input.style.background = ""
                            ViewtoUser();
                        }, 1500);
                    } else {
                        Input.value = "";
                        Input.style.background = "linear-gradient(to right, #f8d7da, #f1b0b7)";
                        Input.placeholder = "Entered wrong password!";
                        setTimeout(() => {
                            Input.style.background = ""
                            Input.placeholder = "Enter user password";
                        }, 1500);
                    }
                };

                EnterPass.appendChild(Input);
                EnterPass.appendChild(Login);
            });
        });
    });
}

function UserInterface(){
    const username = document.getElementById("user-name");
    username.innerText = CurrentUser;
    loadBooks()
}

function deleteloadUsers() {
    const droplist = document.getElementById("drop-list");
    fetch("/users")
    .then((res) => res.json())
    .then((data) => {
        droplist.innerHTML = "";
        data.forEach((user) => {
            const userdiv = document.createElement("div");
            userdiv.classList.add('DUser');
            userdiv.id = `${user.pass}`;
            userdiv.textContent = `${user.name}        Total: `;
            droplist.appendChild(userdiv);
        });

        const DUsers = document.querySelectorAll('.DUser');
        const AdminPass = document.getElementById("admin-pass");
        AdminPass.innerHTML = "";
        DUsers.forEach(DUser => {
            DUser.addEventListener('click', () => {
                DUsers.forEach(du => du.classList.remove('active'));
                DUser.classList.add('active'); 

                AdminPass.innerHTML = "";
                AdminPass.style.display = "flex";

                const Input = document.createElement("input");
                Input.type = "password";
                Input.id = "dpass-checker";
                Input.placeholder = "Enter user password";

                const Delete = document.createElement('div');
                Delete.innerText = "Delete";
                Delete.id = "delete-user";
                Delete.style.pointerEvents = "none"; 

                Input.addEventListener('input', function(){
                    if(Input.value.length >= 5){
                        Delete.style.pointerEvents = "all";
                    } else {
                        Delete.style.pointerEvents = "none";
                    }
                });

                Delete.onclick = function(){
                    if(Input.value === "admin"){
                        DUser.innerText = DUser.id;
                        fetch(`/users/${DUser.id}`, {
                            method: "DELETE",
                        }).then(res => {
                            if (!res.ok) throw new Error("Delete failed");
                            AdminPass.style.display = "none";
                            deleteloadUsers();
                        })
                        .catch(err => {
                            console.error("Error deleting user:", err);
                        });
                    } else {
                        Input.style.background = "linear-gradient(to right, #f8d7da, #f1b0b7)";
                        Delete.style.pointerEvents = "none";
                        setTimeout(() => {
                            Input.style.background = "";
                            Input.value = "";
                            Delete.style.pointerEvents = "all";
                        }, 3000);
                    }
                };

                AdminPass.appendChild(Input);
                AdminPass.appendChild(Delete);
            });
        });
    });
}
const createUser = document.getElementById("create-user");
const NameInput = document.getElementById("username-input");
const PassInput = document.getElementById("password-input");

createUser.addEventListener("click", (e) => {
    e.preventDefault();
    const user = {
        name: NameInput.value,
        pass: PassInput.value,
    };
    fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    }).then(() => {
        NameInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
        PassInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
        setTimeout(() => {
            NameInput.style.background = "";
            PassInput.style.background = "";
            NameInput.value = "";
            PassInput.value = "";
        }, 1500);
        loadUsers();
    });
});

function CheckAccInputs() {
    if (NameInput.value.length >= 5 && PassInput.value.length >= 5) {
        createUser.style.pointerEvents = "all";
    } else {
        createUser.style.pointerEvents = "none";
    }
}
NameInput.addEventListener('input', CheckAccInputs);
PassInput.addEventListener('input', CheckAccInputs);

const ImageInput = document.getElementById("image-input");
const ImagePreview = document.getElementById("image-preview");
const ImageText = document.getElementById("image-preview-text");

ImageInput.addEventListener('change', function () {
    const file = ImageInput.files[0];
    if (file) {
        ImageText.style.display = "none";
        ImagePreview.style.display = "block";
        ImagePreview.src = URL.createObjectURL(file);
    }
});

const TitleInput = document.getElementById("titlename-input");
const AuthorInput = document.getElementById("authorname-input");
const ChapterInput = document.getElementById("chapter-input");
const StatusInput = document.getElementById("status-input");
const SubmitButton = document.getElementById("item-submit");

function ClearItemInputs(){
    TitleInput.value = "";
    AuthorInput.value = "";
    ChapterInput.value = 0;
    StatusInput.value = "";
    ImageText.style.display = "flex";
    ImagePreview.style.display = "none";
}
function CheckItemInputs(){
    ChapterInput.value = ChapterInput.value.replace(/[^0-9]/g, '');

    if (TitleInput.value != "" && AuthorInput.value != "" && ChapterInput.value > 0 && StatusInput.value != "" && ImageText.style.display === "none"
    ){
        SubmitButton.style.pointerEvents = "all";
        document.getElementById("item-update").style.pointerEvents = "all";
    }
    else{
        SubmitButton.style.pointerEvents = "none";
        document.getElementById("item-update").style.pointerEvents = "none";
    }
}

TitleInput.addEventListener('input', CheckItemInputs);
AuthorInput.addEventListener('input', CheckItemInputs);
ChapterInput.addEventListener('input', CheckItemInputs);
StatusInput.addEventListener('input', CheckItemInputs);

SubmitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    // Increment ContentID and update the input field
    ContentID++;
    
    const imageInput = document.getElementById("image-input").files[0];
    const CU = document.getElementById("CurrentUser");
    CU.value = CurrentUser;
    const CUP = document.getElementById("CurrentUserPass");
    CUP.value = CurrentUserPass;
    const CID = document.getElementById("ContentID");
    CID.value = ContentID;

    if (!imageInput || !CU || !CUP || !CID) {
        alert("Please fill all fields and choose an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", imageInput);
    formData.append("CurrentUser", CU.value);
    formData.append("CurrentUserPass", CUP.value);
    formData.append("ContentID", CID.value);

    try {
        const imageRes = await fetch("http://localhost:3000/BookCover", {
            method: "POST",
            body: formData
        });

        if (!imageRes.ok) {
            console.error("❌ Image upload failed.");
            alert("Image upload failed.");
            return;
        }

        console.log("✅ Image uploaded.");

        const book = {
            Title: TitleInput.value,
            Author: AuthorInput.value,
            Status: StatusInput.value,
            Chapter: ChapterInput.value 
        };

        const bookRes = await fetch(`/users/${CurrentUserPass}/books`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });

        if (!bookRes.ok) {
            console.error("❌ Book upload failed.");
            alert("Book save failed.");
            return;
        }

        console.log("✅ Book data saved.");

        // Reset UI
        TitleInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
        AuthorInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
        StatusInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
        ChapterInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";

        setTimeout(() => {
            TitleInput.style.background = "";
            AuthorInput.style.background = "";
            StatusInput.style.background = "";
            ChapterInput.style.background = "";
        }, 1500);
        TitleInput.value = "";
        AuthorInput.value = "";
        StatusInput.value = "";
        ChapterInput.value = "";
        ImageText.style.display = "flex";
        ImagePreview.style.display = "none";
        ImagePreview.src = "";
        SubmitButton.style.pointerEvents = "none";
        document.getElementById("additem-container").style.display = "none";
        document.getElementById("add-button").style.pointerEvents = "all";
        loadBooks();

    } catch (err) {
        console.error("❌ Error during upload:", err);
        alert("An error occurred during upload.");
    }
});


function loadBooks(){
    const booklist = document.getElementById("book-list");
    fetch(`/users/${CurrentUserPass}/books`)
    .then((res) => res.json())
    .then((data) => {
        booklist.innerHTML = "";
        ContentID = 0;
        data.forEach((book) => {
            ContentID++;
            const bookdiv = document.createElement("div");
            const bookleftdiv = document.createElement("div");
            const bookrightdiv = document.createElement("div");
            const bookcover = document.createElement("img");
            const booktitle = document.createElement("div");
            const bookcontent = document.createElement("div");
            bookdiv.classList.add('Book');
            bookdiv.id = `${book.Title}`;

            bookcover.classList.add("book-cover");
            const extensions = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
            const fileBase = `/BookCover/${CurrentUser}-${CurrentUserPass}-${ContentID}`;
            const cacheBuster = `?t=${new Date().getTime()}`; // Add a timestamp to bust cache

            function findValidImage(i = 0) {
                if (i >= extensions.length) {
                    console.error("No valid image found.");
                    return;
                }

                const testSrc = `${fileBase}.${extensions[i]}${cacheBuster}`;
                const img = new Image();

                img.onload = function () {
                    bookcover.src = testSrc; // valid image found
                };

                img.onerror = function () {
                    findValidImage(i + 1); // try next extension
                };

                img.src = testSrc;
            }
            findValidImage();

            booktitle.classList.add("book-title");
            booktitle.textContent = `${book.Title}`;

            bookcontent.classList.add("book-content");
            bookcontent.textContent = `Status: ${book.Status}\nAuthor: ${book.Author}\nChapter: ${book.Chapter}`;
            
            bookleftdiv.appendChild(bookcover);
            bookrightdiv.appendChild(booktitle);
            bookrightdiv.appendChild(bookcontent);
            bookdiv.appendChild(bookleftdiv);
            bookdiv.appendChild(bookrightdiv);
            booklist.appendChild(bookdiv);

            const books = document.querySelectorAll('.Book');
            books.forEach(book => {
                book.addEventListener('click', () => {
                    books.forEach(bk => bk.classList.remove('active'));
                    book.classList.add('active'); 
                    document.getElementById("delete-button").style.pointerEvents = "all";
                    document.getElementById("update-button").style.pointerEvents = "all";
                });
            });
        });
    });
}

function UpdateContent(){
    document.getElementById("update-button").style.pointerEvents = "none";
    document.getElementById("add-button").style.pointerEvents = "none";
    if(document.getElementById("item-update")){
        document.getElementById("item-update").remove();    
    }
    const bookActive = document.querySelector('.Book.active')
    const Additems = document.getElementById("additem-container");
    const Additem3 = document.getElementById("additem-3");
    const currentbookid = bookActive.id;

    fetch(`/users/${CurrentUserPass}/books/${currentbookid}`)
    .then((res) => res.json())
    .then((data) => {
        Additems.style.display = "flex";
        TitleInput.value = data.Title;
        AuthorInput.value = data.Author;
        StatusInput.value = data.Status;
        ChapterInput.value = data.Chapter;
        ContentID = data.id;
        ImageText.style.display = "none";
        ImagePreview.style.display = "block";
        Imageloader();
        SubmitButton.style.display = "none";
        const SubmitButtonUpdate = document.createElement("div");
        SubmitButtonUpdate.id = "item-update";
        SubmitButtonUpdate.innerText = "Revise";
        Additem3.appendChild(SubmitButtonUpdate);
        SubmitButtonUpdate.addEventListener("click", async (e) => {
            e.preventDefault();
            fetch(`/BookCover/${CurrentUser}/${CurrentUserPass}/${ContentID}`, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok) {
                    console.log("🗑️ Image deleted successfully.");
                    document.getElementById("image-preview").style.display = "none";
                } else {
                    console.error("❌ Failed to delete image. Status:", res.status);
                    res.text().then(msg => console.error("Server response:", msg));
                }
            })
            .catch(err => {
                console.error("❌ Network or server error:", err);
            });
            fetch(`/users/${CurrentUserPass}/books/${currentbookid}`,{
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    Title: TitleInput.value,
                    Author: AuthorInput.value,
                    Status: StatusInput.value,
                    Chapter: ChapterInput.value,
                    id: ContentID
                })
            }).then(() => {
                TitleInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
                AuthorInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
                StatusInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";
                ChapterInput.style.background = "linear-gradient(to right, #d4edda, #a3cfbb)";

                setTimeout(() => {
                    TitleInput.style.background = "";
                    AuthorInput.style.background = "";
                    StatusInput.style.background = "";
                    ChapterInput.style.background = "";
                }, 1500); 
                TitleInput.value = "";
                AuthorInput.value = "";
                StatusInput.value = "";
                ChapterInput.value = "";
                ImageText.style.display = "flex";
                ImagePreview.style.display = "none";
                ImagePreview.src = "";
                SubmitButton.style.pointerEvents = "none";
                SubmitButton.style.display = "block";
                SubmitButtonUpdate.remove();
                document.getElementById("additem-container").style.display = "none";
                document.getElementById("add-button").style.pointerEvents = "all";
                document.getElementById("delete-button").style.pointerEvents = "none";
                loadBooks();
            });
            
            const imageInput = document.getElementById("image-input").files[0];
            const CU = document.getElementById("CurrentUser");
            CU.value = CurrentUser;
            const CUP = document.getElementById("CurrentUserPass");
            CUP.value = CurrentUserPass;
            const CID = document.getElementById("ContentID");
            CID.value = ContentID;

            if (!imageInput || !CU || !CUP || !CID) {
                alert("Please fill all fields and choose an image.");
                return;
            }

            const formData = new FormData();
            formData.append("image", imageInput);
            formData.append("CurrentUser", CU.value);
            formData.append("CurrentUserPass", CUP.value);
            formData.append("ContentID", CID.value);

            try {
                const imageRes = await fetch("http://localhost:3000/BookCover", {
                    method: "POST",
                    body: formData
                });

                if (!imageRes.ok) {
                    console.error("❌ Image upload failed.");
                    alert("Image upload failed.");
                    return;
                }
                console.log("✅ Image uploaded.");
                loadBooks();
            }
            catch (err) {
                console.error("❌ Error during upload:", err);
                alert("An error occurred during upload.");
            } 
        });
    });
}

async function DeleteContent() {
    // if (document.getElementById("item-update")) {
    //     document.getElementById("item-update").remove();    
    // }

    const bookActive = document.querySelector('.Book.active');
    const currentbookid = bookActive.id;
    document.getElementById("upper-right-container").style.display = "none";
    document.getElementById("add-button").style.pointerEvents = "all";
    try {
        // Get content ID first
        const res = await fetch(`/users/${CurrentUserPass}/books/${currentbookid}`);
        if (!res.ok) throw new Error("Failed to fetch book data");
        const data = await res.json();
        const ContentID = data.id;

        // Delete the book entry
        const delRes = await fetch(`/users/${CurrentUserPass}/books/${currentbookid}`, {
            method: 'DELETE'
        });

        if (delRes.ok) {
            console.log("🗑️ Book entry deleted successfully.");
            document.getElementById("image-preview").style.display = "none";
        } else {
            console.error("❌ Failed to delete book entry. Status:", delRes.status);
            const msg = await delRes.text();
            console.error("Server response:", msg);
        }

        // Delete the book cover image
        const coverDelRes = await fetch(`/BookCover/${CurrentUser}/${CurrentUserPass}/${ContentID}`, {
            method: 'DELETE'
        });

        if (coverDelRes.ok) {
            console.log("🗑️ Image deleted successfully.");
            document.getElementById("image-preview").style.display = "none";
        } else {
            console.error("❌ Failed to delete image. Status:", coverDelRes.status);
            const msg = await coverDelRes.text();
            console.error("Server response:", msg);
        }

    } catch (err) {
        console.error("❌ Error occurred:", err);
    }
    document.getElementById("delete-button").style.pointerEvents = "none";
    document.getElementById("update-button").style.pointerEvents = "none";
    loadBooks();
}


function Imageloader(){
    const extensions = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
    const fileBase = `/BookCover/${CurrentUser}-${CurrentUserPass}-${ContentID}`;
    const cacheBuster = `?t=${new Date().getTime()}`; // Add a timestamp to bust cache

    function findValidImage(i = 0) {
        if (i >= extensions.length) {
            console.error("No valid image found.");
            return;
        }

        const testSrc = `${fileBase}.${extensions[i]}${cacheBuster}`;
        const img = new Image();

        img.onload = function () {
            ImagePreview.src = testSrc;
        };

        img.onerror = function () {
            findValidImage(i + 1);
        };

        img.src = testSrc;
    }

    findValidImage();
}

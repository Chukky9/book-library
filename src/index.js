import 'font-awesome/css/font-awesome.min.css';
import "animate.css/animate.css";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function book(title, author, pages, read) {
    let obj = Object.create(book.prototype);
    obj.title = title;
    obj.author = author;
    obj.pages = pages;
    obj.read = read;
    return obj;
}

const MyApp = (function() {
    let myLibrary = [];
    let title = '';
    let author = '';
    let pages = '';
    let status = '';
    let obj = [];

    const bookCreate = function(arr, i) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("book-div");

        const nameOfBook = document.createElement("h3");
        $(nameOfBook).text(`Title: ${i.title}`).appendTo(newDiv);

        const authorOfBook = document.createElement("h3");
        $(authorOfBook).text(`Author: ${i.author}`).appendTo(newDiv);

        const pagesOfBook = document.createElement("h3");
        $(pagesOfBook).text(`Number of Pages: ${i.pages}`).appendTo(newDiv);

        const readStatus = document.createElement("h3");
        $(readStatus).text(`Read Status: ${i.read}`).appendTo(newDiv);

        const btnDiv = document.createElement("div");
        $(btnDiv).addClass('btnDiv').appendTo(newDiv);

        const updateBtn = document.createElement("button");
        $(updateBtn).addClass('extras').text(`Update Status`).appendTo(btnDiv);

        const delBtn = document.createElement("button");
        $(delBtn).addClass('extras').text(`Delete`).appendTo(btnDiv);

        $(newDiv).appendTo('#saved-books');

        updateBtn.addEventListener('click', () => {
            if(readStatus.innerHTML == `Read Status: Completed`) {
                $(readStatus).text(`Read Status: Not completed`);
                i.read = "Not completed";
            } else {
                $(readStatus).text(`Read Status: Completed`);
                i.read = "Completed";
            }
            //localStorage.setItem(0, JSON.stringify(arr));
        });

        delBtn.addEventListener('click', () => {
            $(newDiv).remove();
            let index = arr.indexOf(i);
            if(index>-1) {
                arr.splice(index, 1);
                arr.filter(Boolean);
                localStorage.setItem(0, JSON.stringify(arr));
            }
            
        })
}

    const save = function() {
        title = $('#name').val();
        author = $('#author').val();
        pages = $('#pages').val();
        status = $('#dropdown').val();
        
        if (title=='' || author=='' || pages=='' || status==null) {
            alert(`Please fill in all fields`);
        } else {
            if (localStorage.getItem(0)) {
                myLibrary = JSON.parse(localStorage.getItem(0));
            }
            let newBook = book(title, author, pages, status);
            myLibrary.push(newBook);
            $("#container").css('transform', 'scale(0)');
            $('#container').css('animation', 'backOutDown').css('animation-duration', '1.5s');
            $("#back-hang").css('opacity', 0);
            $('#add-btn').prop('disabled', false);
            $('#form').trigger('reset');
            localStorage.setItem(0, JSON.stringify(myLibrary));
            
            bookCreate(myLibrary, newBook);
        }
    }
    
    const savedBooks = function() {
        if (localStorage.length) {
            obj = JSON.parse(localStorage.getItem(0));
            for (let i=0; i<obj.length; i++) {
                bookCreate(obj, obj[i]);
            }
        }
    }

    const open = function() {
        $("#container").css('transform', 'scale(1)');
        $('#container').css('animation', 'fadeInDown').css('animation-duration', '0.5s');
        $("#back-hang").css('opacity', 0.4);
        $('#add-btn').prop('disabled', true);
    }

    const cancel = function() {
        $("#container").css('transform', 'scale(0)');
        $('#container').css('animation', 'backOutDown').css('animation-duration', '1.5s');
        $("#back-hang").css('opacity', 0);
        $('#add-btn').prop('disabled', false);
        $('#form').trigger('reset');
    }

    return { open, cancel, save, savedBooks };
})();

MyApp.savedBooks();
document.querySelector("#add-btn").addEventListener('click', MyApp.open);
document.querySelector("#cancelBtn").addEventListener('click', MyApp.cancel);
document.querySelector('#save').addEventListener('click', MyApp.save);
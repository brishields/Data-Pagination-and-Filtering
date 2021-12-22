var linklist = document.querySelector('ul.link-list');
const itemsPerPage = 9;
var list = data;
var searchBar = document.createElement('label');
var header = document.querySelector('header.header');
var searchResults = [];  

/******************* 
 `showPage` function
 *******************/
//This function will create and insert/append the elements needed to display a "page" of nine students
function showPage (list, page) {
   var startIndex = (page * itemsPerPage) - itemsPerPage;
   var endIndex = page * itemsPerPage;
   var studentList = document.querySelector('ul.student-list');
   //Clears any/all existing content
   studentList.innerHTML = '';
   //loops through array creating a new list item for each student
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         var studentItem = document.createElement('li');
         var studentName = `${list[i].name.first} ${list[i].name.last}`;
         var studentPic = `${list[i].picture.large}`;
         var studentEmail = `${list[i].email}`;
         var studentRegDate = `${list[i].registered.date}`;
         //Compiles innerHTML content
         var html = '';
            html += `<div class="student-details">`;
            html += `<img class="avatar" src="${studentPic}" alt="Profile Picture">`;
            html += `<h3>${studentName}</h3>`;
            html += `<span class="email">${studentEmail}</span>`;
            html += `</div>`;
            html += `<div class="joined-details">`;
            html += `<span class="date">${studentRegDate}</span>`;
            html += `</div>`;

         studentItem.classList.add('student-item', 'cf');
         studentItem.innerHTML = html;
         studentList.append(studentItem); 
         //studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
}


/************************
`addPagination` function
*************************/
//This function will create and insert/append the elements needed for the pagination buttons
function addPagination (list) {
   //Determines the number of pages needed to display all objects in the array.
   var numOfPages = Math.ceil(list.length / itemsPerPage);
   //Clears page number buttons.
   linklist.innerHTML = '';
   //loops creating page number buttons.
   for (let i = 1; i <= numOfPages; i++) {
      let button = document.createElement('li');
      let html = `<button type="button">${i}</button>`
      button.innerHTML = html;
       linklist.append(button);
   }
   document.querySelector('button').className = 'active';
}

/***************************
 'pageClick' Event Listener
 **************************/
//Places an click event listener on the page number buttons.
linklist.addEventListener('click', function (e) {
      
   let clickedBtn = e.target;
      //Checks if element is a button.
      if (clickedBtn.tagName === 'BUTTON') {
         //Removes active class from current page.
         document.querySelector('.active').className = '';
         //Adds active class to selected button
         clickedBtn.className = 'active';
         let pageNumber = clickedBtn.textContent;
         //Passes selected page number into `showPage` function and calls it.
         showPage(list, pageNumber)
      }
});

/****************************
 *`createSearchBar` function
 ****************************/
function createSearchBar () {
   searchBar.classList.add('student-search');
   searchBar.htmlFor = 'search';
   let html = `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button id="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>`;
   searchBar.innerHTML = html;
   return header.append(searchBar);
}

/***************************
 * `searchStudents` function
 **************************/
//Searches the `list` array for a match
function searchStudents (searchRegex) {
   var searchFor = document.getElementById('search');
   var searchRegex = new RegExp(searchFor.value, 'i','g');
   var searchResults = [];  
   //Searches `list` array for match and adds it to a new array for pagination
   for (let i = 0; i < list.length; i++) {
      if (list[i].name.last.match(searchRegex) || list[i].name.first.match(searchRegex) ) {
         searchResults.push(list[i]);
      }
   }
   //Loads new array of search results to pagination function
   showPage(searchResults, 1);
   addPagination(searchResults);
}

// Onload functions
createSearchBar();
showPage(list,1);
addPagination(list);
var searchFor = document.getElementById('search');
var searchButton = document.getElementById('search-button');

/****** Search Button Event Listener *******/
   searchButton.addEventListener('click', searchStudents);


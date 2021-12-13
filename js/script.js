/*
Treehouse Techdegree: Data Pagination and Filtering
*/
var linklist = document.querySelector('ul.link-list');
const itemsPerPage = 9;

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
   // console.log(list.length);
   // console.log(page);
   // console.log(startIndex);
   // console.log(endIndex);
   // console.log(`${studentName}`);
   // console.log(studentEmail);
   // console.log(studentRegDate);
   // console.log(studentItem);
}


/************************
`addPagination` function
*************************/
//This function will create and insert/append the elements needed for the pagination buttons
function addPagination (list) {
   var numOfPages = Math.ceil(list.length / itemsPerPage);
   
   linklist.innerHTML = '';

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
//Places an click event listener to the page buttons.
linklist.addEventListener('click', function (e) {
      
   let clickedBtn = e.target;
      if (clickedBtn.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         clickedBtn.className = 'active';
         let pageNumber = clickedBtn.textContent;
         showPage(data, pageNumber)
      }
});










// Call functions
showPage(data,1);
addPagination(data);
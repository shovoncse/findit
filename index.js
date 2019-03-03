const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', submitFunc);

function submitFunc(e){
    const searchTerm = searchInput.value;
    const sortby = document.querySelector('input[name="sortby"]:checked').value;
    const searchlimit = document.querySelector('#limit').value;
    if(searchTerm == ""){
        showMessage('Please add a Search Term', 'alert-danger');
    }

    e.preventDefault();
    console.log(searchTerm);
    console.log(sortby);
}


//Show Messages
function showMessage(Messages, className){
    //Create Div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(Messages));
    const searchContainer = document.querySelector('#search-container');
    const search = document.querySelector('#search');
    searchContainer.insertBefore(div, search);
    setTimeout(()=> document.querySelector('.alert').remove(), 3000);
}



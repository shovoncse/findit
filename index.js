import reddit from './redditapi'


// Form
const searchForm = document.querySelector('#search-form');
// Search Term
const searchInput = document.querySelector('#search-input');

// Form Submit
searchForm.addEventListener('submit', submitFunc);

// Custom Submit Function
function submitFunc(e){
    
    // get search term
    const searchTerm = searchInput.value;
    // get Sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get Limit
    const searchLimit = document.querySelector('#limit').value;
    
    // Check Input
    if(searchTerm == ""){
        // Show Message
        showMessage('Please add a Search Term', 'alert-danger');
    
    }

    // Clear Input
    searchInput.value = "";

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        //console.log(results);

        let output = `<div class="card-columns">`;
        // Loop Through Posts
        results.forEach(post => {
            //Check for image
            const image = post.preview ? post.preview.images[0].source.url : 'https://assets3.thrillist.com/v1/image/1507847/size/tmg-article_default_mobile.jpg' ;
            
            output += `
            <div class="card">

                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                    <hr>
                    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                    <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
            </div>
            `;
        });

        output += '</div>';

        document.getElementById('results').innerHTML = output;
    });

    // Default Prevension
    e.preventDefault();
}


//Show Messages
function showMessage(Messages, className){
    

    //Create Div
    const div = document.createElement('div');
    
    // Add Class
    div.className = `alert ${className}`;
    
    // Add Text
    div.appendChild(document.createTextNode(Messages));
    
    // Get Parrent
    const searchContainer = document.querySelector('#search-container');
    
    // Get Search
    const search = document.querySelector('#search');
    
    // Insert Message Div
    searchContainer.insertBefore(div, search);

    // Insert Message
    setTimeout(()=> document.querySelector('.alert').remove(),3000);


}


// Truncate Texts
function truncateText(text, limit){
    //search for ' ' (Space)
    const shortended = text.indexOf(' ', limit);
    // If Space not found
    if(shortended == -1) return text;
    
    return text.substring(0, shortended);
}


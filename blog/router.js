const containerDiv = document.querySelector(".container");
const contentDiv = document.getElementById('content');
const blogPostSectionDiv = document.querySelector(".blog-post-section");
const blogPostLinks = document.querySelector(".blog-post-links");

function resizeBlogNav(x) {
    const smallBtn = document.querySelector(".small-btn");
    const closeBtn = document.querySelector(".close-btn");
    const expandBtn = document.querySelector(".expand-btn");
    if (x === 1) {
        // three tenth viewport
        containerDiv.style.gridTemplateColumns = "30% 70%";

        contentDiv.style.display = "block";

        blogPostLinks.style.display = "block"

        smallBtn.style.display = "none"

        closeBtn.style.display = "block";

        expandBtn.style.display = "block";
    } else if (x === 2) {
        // one tenth viewport
        containerDiv.style.gridTemplateColumns = "50px auto";

        contentDiv.style.display = "block";

        contentDiv.style.margin = "auto";

        blogPostLinks.style.display = "none";

        smallBtn.style.display = "block"

        closeBtn.style.display = "none";

        expandBtn.style.display = "block";

    } else {
        // full viewport
        containerDiv.style.gridTemplateColumns = "100% 0";

        contentDiv.style.display = "none";

        contentDiv.style.display = "block";

        blogPostLinks.style.display = "block"

        smallBtn.style.display = "block"

        closeBtn.style.display = "block";

        expandBtn.style.display = "none";
    }
};

// Function to fetch and display a blog post
const displayPost = async (postId) => {
    try {
        const response = await fetch(`/blog/posts/${postId}.html`);
        if (!response.ok) throw new Error('Post not found');
        const htmlContent = await response.text();
        contentDiv.innerHTML = htmlContent;
        contentDiv.style.display = "block";
        containerDiv.style.gridTemplateColumns = "50px auto";
        blogPostLinks.style.display = "none"
        hljs.highlightAll(); // initialise code syntax highlighting after innerhtml replacement
    } catch (error) {
        contentDiv.innerHTML = 'Post not found';
    }
};

// navigate to a new url and update the view
const navigateTo = (url) => {
    history.pushState(null, null, url);
    updateView();
};

// update the view based on the current url or post parameter
const updateView = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post = urlParams.get('post');
    const path = window.location.pathname;

    if (post) {
        displayPost(post);
    } else {
        contentDiv.innerHTML = routes[path] || '404 Page Not Found';
    }
};

// event listener to handle link clicks and override default browser behavior
document.addEventListener('click', (event) => {
    if (event.target.matches('[blog-link]')) {
        event.preventDefault();
        navigateTo(event.target.href);
    }
});

// handle browser back and forward buttons
window.addEventListener('popstate', updateView);

// initial view update
document.addEventListener('DOMContentLoaded', updateView);

// to copy the code snippets inside the code element
function copyCode(button) {
    const codeElement = button.closest('.code-box').querySelector('code');

    if (codeElement) {
        navigator.clipboard.writeText(codeElement.textContent)
            .then(() => {
                button.innerHTML = 'copied';
                button.style.backgroundColor = 'lightgreen';

                setTimeout(() => {
                    button.innerHTML = 'copy';
                    button.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        console.error('Code element not found');
    }
}


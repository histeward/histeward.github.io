const contentDiv = document.getElementById('content');
const containerDiv = document.querySelector(".container");
const blogPostSectionDiv = document.querySelector(".blog-post-section");
const blogPostLinks = document.querySelector(".blog-post-links-wrapper");
const sectionedBtn = document.querySelector(".sectioned-btn");
const sectionedRevealBtn = document.querySelector(".sectioned-reveal-btn");
const minimiseBtn = document.querySelector(".minimise-btn");
const maximiseBtn = document.querySelector(".maximise-btn");

function resizeSideBar(x) {
    if (x === 1) {
        // sectioned shrink
        containerDiv.classList.add("sectioned")
        containerDiv.classList.remove("maximised")
        containerDiv.classList.remove("minimised")

        sectionedBtn.classList.remove("visible")
        sectionedRevealBtn.classList.remove("visible")
        minimiseBtn.classList.add("visible")
        maximiseBtn.classList.add("visible")

        blogPostLinks.classList.add("visible")
    } else if (x === 2) {
        // sectioned reveal
        containerDiv.classList.add("sectioned")
        containerDiv.classList.remove("maximised")
        containerDiv.classList.remove("minimised")

        sectionedBtn.classList.remove("visible")
        sectionedRevealBtn.classList.remove("visible")
        minimiseBtn.classList.add("visible")
        maximiseBtn.classList.add("visible")

        blogPostLinks.classList.add("visible")
    } else if (x === 3) {
        // close
        containerDiv.classList.remove("sectioned")
        containerDiv.classList.remove("maximised")
        containerDiv.classList.add("minimised")

        sectionedBtn.classList.remove("visible")
        sectionedRevealBtn.classList.add("visible")
        minimiseBtn.classList.remove("visible")
        maximiseBtn.classList.add("visible")

        blogPostLinks.classList.remove("visible")
    } else {
        // maximise
        containerDiv.classList.remove("sectioned")
        containerDiv.classList.add("maximised")
        containerDiv.classList.remove("minimised")

        sectionedBtn.classList.add("visible")
        sectionedRevealBtn.classList.remove("visible")
        minimiseBtn.classList.add("visible")
        maximiseBtn.classList.remove("visible")

        blogPostLinks.classList.add("visible")
    }
};

// Function to fetch and display a blog post
//const displayPost = async (postId) => {
//    try {
//        const response = await fetch(`/blog/posts/${postId}.html`);
//        if (!response.ok) throw new Error('Post not found1'); // throw error if response not ok
//        if (contentDiv.classList.contains("hidden")) contentDiv.classList.add("visible");
//        const htmlContent = await response.text();
//        contentDiv.innerHTML = htmlContent;
//
//        containerDiv.classList.add("sectioned")
//        containerDiv.classList.remove("maximised")
//        containerDiv.classList.remove("minimised")
//
//        sectionedBtn.classList.remove("visible");
//        sectionedRevealBtn.classList.remove("visible");
//        minimiseBtn.classList.add("visible");
//        maximiseBtn.classList.add("visible");
//        hljs.highlightAll(); // initialise code syntax highlighting after innerhtml replacement
//    } catch (error) {
//        const response = await fetch(`/blog/posts/404.html`);
//        contentDiv.innerHTML = 'Post not found2';
//        if (contentDiv.classList.contains("hidden")) contentDiv.classList.add("visible");
//        const htmlContent = await response.text();
//        contentDiv.innerHTML = htmlContent;
//    }
//};
// Function to fetch and display a blog post from a local file
const displayPost = (postId) => {
    const filePath = `./posts/${postId}.html`; // Local file path
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Post not found'); // Throw error if response not ok
            return response.text();
        })
        .then(htmlContent => {
            contentDiv.innerHTML = htmlContent;
            hljs.highlightAll(); // Initialize syntax highlighting
        })
        .catch(() => {
            contentDiv.innerHTML = '<p>Post not found</p>'; // Error message for missing post
        });
};

// Update the view based on the current URL or post parameter

// navigate to a new url and update the view
const navigateTo = (url) => {
    history.pushState(null, null, url);
    updateView();
};

// update the view based on the current url or post parameter
const updateView = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post = urlParams.get('post');
    if (post) {
        displayPost(post);
    } else {
        contentDiv.innerHTML = '<p>Select a post to read</p>';
    }
};

// event listener to handle link clicks and override default browser behavior
document.addEventListener('click', (event) => {
    if (event.target.matches('[link]')) {
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
                button.style.color = '#212121';

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


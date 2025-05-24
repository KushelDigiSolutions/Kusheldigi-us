const baseUrl = "https://backblog.kusheldigi.com";
const domainToFilter = "kusheldigi.us";

function getBlogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
}

async function fetchBlogDetails() {
    const blogId = getBlogIdFromURL();
    if (!blogId) {
        document.querySelector(".article-container").innerHTML = "<p>Blog not found.</p>";
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/SingleBlogBySlug/${blogId}`);
        const data = await response.json();

        // console.log("Fetched Blog Data:", data.data[0]);
        const blogData = data.data[0];
        if (response.ok && data) {

            document.getElementById("currentBlogTitle").innerHTML = blogData.title || "No Title";

            const blogDateElement = document.getElementById("blogDate");
            if (blogDateElement) {
                blogDateElement.textContent = new Date(blogData.date).toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric"
                });
            }

            document.getElementById("currentBlogImage").src = blogData.banner?.[0] || "default-image.jpg";

            const blogDescriptionElement = document.getElementById("blogDescription");
            if (blogDescriptionElement) {
                blogDescriptionElement.textContent = blogData.subdescription || "No Description Available";
            }

            document.getElementById('currentBlogPara').innerHTML = blogData?.description || "No Content Available";
            document.getElementById('blogAuthor').innerHTML = blogData?.author
            document.getElementById('designation').innerHTML = blogData?.designation;
            document.getElementById('time').innerHTML = blogData?.time || "N/A";
            document.getElementById('blogAuthor1').innerHTML = blogData?.author
            document.getElementById('designation1').innerHTML = blogData?.designation;

            setTimeout(() => {
                const accordionHeaders = document.querySelectorAll('.accordion-header');

                accordionHeaders.forEach(header => {
                    header.addEventListener('click', () => {
                        const content = header.nextElementSibling;
                        const isVisible = content.style.display === 'block';

                        content.style.display = isVisible ? 'none' : 'block';
                        header.classList.toggle('active', !isVisible);
                    });
                });
            }, 0);

        } else {
            document.querySelector(".article-container").innerHTML = "<p>Blog not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        document.querySelector(".article-container").innerHTML = "<p>Error loading blog.</p>";
    }
}

document.addEventListener("DOMContentLoaded", fetchBlogDetails);


// async function fetchRecentBlogs() {
//     try {
//         const response = await fetch(`${baseUrl}/api/v1/auth/getRecentBlog`);
//         const data = await response.json();

//         if (response.ok) {
//             console.log("Fetched Recent Blogs:", data.blogs);
//             renderBlogs(data.blogs);
//         } else {
//             console.error("Failed to fetch blogs:", data?.message);
//             document.getElementById("cardMainBlogSec").innerHTML = "<p>Failed to load blogs.</p>";
//         }
//     } catch (error) {
//         console.error("Error fetching blogs:", error);
//         document.getElementById("cardMainBlogSec").innerHTML = "<p>Error loading blogs.</p>";
//     }
// }


async function fetchRecentBlogs() {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/getRecentBlog`);
        const data = await response.json();

        if (response.ok) { 
            const filteredBlogs = data.blogs
                .filter(blog =>
                    Array.isArray(blog.domain) && blog.domain.includes("kusheldigi.us")
                )
                .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                .slice(0, 6); 

            renderBlogs(filteredBlogs);
        } else {
            console.error("Failed to fetch blogs:", data?.message);
            document.getElementById("cardMainBlogSec").innerHTML = "<p>Failed to load blogs.</p>";
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
        document.getElementById("cardMainBlogSec").innerHTML = "<p>Error loading blogs.</p>";
    }
}


function renderBlogs(recentBlogs) {
    const blogContainer = document.getElementById("cardMainBlogSec");
    blogContainer.innerHTML = "";

    if (recentBlogs.length > 0) {
        recentBlogs.forEach(blog => {
            const blogHTML = `
                <a href="/blog.html?slug=${blog.slug}" class="cardBlogSt">
                    <div class="cardBlogStImg">
                        <img src="${blog.images?.[0] || 'default-image.jpg'}" alt="${blog.title}" />
                    </div>
                    <p class="cardBlogStpaa">
                        ${new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}
                    </p>
                    <div class="cardBlogStpaara1">
                        <p class="cardBlogStpaara">${blog.title}</p>
                    </div>
                    <p class="cardBlogStpaaragr">${blog.subdescription}</p>
                    <p class="cardBlogStpaarw">Read More</p>
                    
                </a>`;
            blogContainer.innerHTML += blogHTML;
        });
    } else {
        blogContainer.innerHTML = "<p>No recent blogs available.</p>";
    }
}



fetchRecentBlogs();
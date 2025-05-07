const baseUrl = "https://backblog.kusheldigi.com";

function getBlogIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

async function fetchBlogDetails() {
    const blogId = getBlogIdFromURL();
    if (!blogId) {
        document.querySelector(".article-container").innerHTML = "<p>Blog not found.</p>";
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/getBlog/${blogId}`);
        const data = await response.json();

        if (response.ok && data.blog) {
            console.log("Fetched Blog Data:", data);

            document.getElementById("currentBlogTitle").innerHTML = data.blog.title || "No Title";

            const blogDateElement = document.getElementById("blogDate");
            if (blogDateElement) {
                blogDateElement.textContent = new Date(data.blog.date).toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric"
                });
            }

            document.getElementById("currentBlogImage").src = data.blog.images?.[0] || "default-image.jpg";

            const blogDescriptionElement = document.getElementById("blogDescription");
            if (blogDescriptionElement) {
                blogDescriptionElement.textContent = data.blog.subdescription || "No Description Available";
            }

            document.getElementById('currentBlogPara').innerHTML = data?.blog?.description || "No Content Available";
            document.getElementById('blogAuthor').innerHTML = data?.blog?.author
        } else {
            document.querySelector(".article-container").innerHTML = "<p>Blog not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        document.querySelector(".article-container").innerHTML = "<p>Error loading blog.</p>";
    }
}

document.addEventListener("DOMContentLoaded", fetchBlogDetails);


async function fetchRecentBlogs() {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/getRecentBlog`);
        const data = await response.json();

        if (response.ok) {
            console.log("Fetched Recent Blogs:", data.blogs);
            renderBlogs(data.blogs);
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
                <a href="/blogDetails.html?id=${blog._id}" class="cardBlogSt">
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
                        <p class="cardBlogStpaara">${blog.title.slice(0, 27)}...</p>
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
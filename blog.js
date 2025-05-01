console.log("Loaded")


const baseUrl = "https://backblog.kusheldigi.com";
const categoryDiv = document.getElementById('categoryDiv');
const firstBlogImage = document.getElementById('firstBlogImage');
const firstBlogTitle = document.getElementById('firstBlogTitle');
const firstBlogDescription = document.getElementById('firstBlogDescription');
const firstBlodDate = document.getElementById('firstBlodDate');
const filterContainer = document.querySelector('.filterContainer');

let allBlogs;

const fetchAllBlog = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/getAllBlog`);
        const data = await response.json();
        if (response.ok) {
            allBlogs = data.blogs;
            console.log("Fetched Blogs:", allBlogs);
            showFirstBlog();
            filterBlogsByCategory();
            renderBlogs();
        } else {
            console.error("Failed to fetch blogs:", data?.message);
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};
fetchAllBlog();

const showFirstBlog = () => {
    if (allBlogs?.length > 0) {
        const firstImage = allBlogs[0]?.images?.[0] || allBlogs[0]?.image || 'default-image.jpg';
        firstBlogImage.src = firstImage;
        firstBlogTitle.innerText = allBlogs[0]?.title;
        firstBlogDescription.innerText = allBlogs[0]?.subdescription
        firstBlodDate.innerText = new Date(allBlogs[0]?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        filterContainer.removeAttribute('id');
    } else {
        console.warn("No blogs available to show");
    }
};

let allCategoryBlogs;

const fetchCatBlogs = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/allcatBlogs`);
        allCategoryBlogs = await response.json();

        if (response.ok) {
            console.log(allCategoryBlogs?.data);
            displayAllCategories(allCategoryBlogs?.data)
        } else {
            console.error("Failed to fetch categories:", allCategoryBlogs?.message);
        }
        return allCategoryBlogs
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

fetchCatBlogs()

let allfeatureBlogs;

const featureBlogs = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/featured`);
        allfeatureBlogs = await response.json();
        if (response.ok) {
            console.log(allfeatureBlogs?.blogs);
        } else {
            console.error("Failed to fetch categories:", allfeatureBlogs?.message);
        }
        return allfeatureBlogs
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

featureBlogs()

let allLatestBlog;
const latestBlogDiv = document.getElementById('latestBlogDiv');

const fetchLatestBlog = async () => {
    try {
        const response = await fetch(`${baseUrl}/api/v1/auth/recentBlogs`);
        const data = await response.json();

        if (response.ok) {
            allLatestBlog = data?.data;
            console.log("latest--> Blogs:", allLatestBlog);
            showLatestBlogs();
        } else {
            console.error("Failed to fetch categories:", allLatestBlog?.message);
        }
        return allLatestBlog
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

fetchLatestBlog();

const showLatestBlogs = () => {
    latestBlogDiv.innerHTML = '';
    if (allLatestBlog?.length > 0) {
        allLatestBlog.forEach((blog) => (
            latestBlogDiv.innerHTML += `<div class="news-item" onclick="navigateToBlog('${blog._id}')">
          <img src=${blog?.images[0]} alt="News 1" class="news-image" />
          <div class="news-content">
              <a href="#" class="news-title" ><h3 class="news-title" id="newBlogTil">${blog?.title}</h3></a>
              <p class="cardBlogStpaa">${new Date(blog?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</p>
          </div>
      </div>`
        ))
    } else {
        console.warn("No latest blogs available to show");
    }
}

let ecommerceBlog;
let seoBlogs;
let digitalMarketingBlogs;
let webdevBlogs;
let businessBlogs;

const filterBlogsByCategory = () => {
    if (!allBlogs || allBlogs.length === 0) {
        console.warn("No blogs available to filter");
        return;
    }
    filterContainer.setAttribute('id', 'filteredBlogContainer');

    ecommerceBlog = allBlogs.filter((blog) => blog.category?.title?.toLowerCase() === "e-commerce");
    seoBlogs = allBlogs.filter((blog) => blog.category?.title?.toLowerCase() === "seo");
    digitalMarketingBlogs = allBlogs.filter((blog) => blog.category?.title?.toLowerCase() === "digital marketing");
    webdevBlogs = allBlogs.filter((blog) => blog.category?.title?.toLowerCase() === "web development");
    businessBlogs = allBlogs.filter((blog) => blog.category?.title?.toLowerCase() === "business");

    console.log('digitak',digitalMarketingBlogs);
    displayEcommerceBlogs(ecommerceBlog);
    displaySeoBlogs(seoBlogs);
    displayDigitalMarketing(digitalMarketingBlogs);
    displayWebDevBlogs(webdevBlogs);
    displayBusinessBlogs(businessBlogs);
};

fetchAllBlog();

function displayAllCategories(cat) {
    categoryDiv.innerHTML = '';
    console.log("Categories fetched:", cat);
    cat.forEach(element => {
        categoryDiv.innerHTML += `<button class="button">${element.title}</button>`;
    });
}

const ecommerceBlogsDiv = document.getElementById('ecommerceBlogsDiv');

function displayEcommerceBlogs(blogs) {
    ecommerceBlogsDiv.innerHTML = '';
    blogs.forEach((item) => (
        ecommerceBlogsDiv.innerHTML += `<div class="cardBlogSt" onclick="navigateToBlog('${item._id}')">
        <div class="cardBlogStImg">
          <img src=${item?.images[0]} alt="">
        </div>

        <p class="cardBlogStpaa">${new Date(item?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</p>
        <div class="cardBlogStpaara1">
          <p class="cardBlogStpaara">${item?.title} </p>
        </div>
        <p class="cardBlogStpaaragr">${item?.subdescription}</p>
        <p class="cardBlogStpaarw">Read More</p>
      </div>`
    ))
}

const seoBlogsDiv = document.getElementById('seoBlogsDiv');

function displaySeoBlogs(blogs) {
    seoBlogsDiv.innerHTML = '';
    blogs.forEach((item) => (
        seoBlogsDiv.innerHTML += `
        <div class="event-card" onclick="navigateToBlog('${item._id}')">
            <div class="event-image">
              <img
                src=${item?.images[0]}
                alt="Event 1">

            </div>
            <div class="event-category">
              <h5>${new Date(item?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</h5>
            </div>
            <div class="event-title">
              <h5>
                <a href="#">
                  <p>${item?.title}</p>
                </a>
              </h5>
            </div>
            <p class="event-description">${item?.subdescription}</p>
            <div class="event-author">
              <p class="cardBlogStpaarw">Read More</p>
            </div>
          </div>
        `
    ))
}

const digitalMarketingDiv = document.getElementById('digitalMarketingDiv');

function displayDigitalMarketing(blogs) {
    digitalMarketingDiv.innerHTML = '';
    blogs.forEach((item) => (
        digitalMarketingDiv.innerHTML += `
        <div class="cardBlogSt" onclick="navigateToBlog('${item._id}')">
          <div class="cardBlogStImg">
            <img src=${item?.images[0]} alt="">
          </div>
          <p class="cardBlogStpaa">${new Date(item?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</p>
          <div class="cardBlogStpaara1">
            <p class="cardBlogStpaara">${item?.title}</p>
          </div>
          <p class="cardBlogStpaaragr">${item?.subdescription}</p>
          <p class="cardBlogStpaarw">Read More</p>
        </div>
        `
    ))
}

const webDevBlogsDiv = document.getElementById('webDevBlogsDiv');

function displayWebDevBlogs (blogs){
    webDevBlogsDiv.innerHTML = ''
    blogs.forEach((item)=>(
        webDevBlogsDiv.innerHTML += `<div class="blogSixMaiDivBlS" onclick="navigateToBlog('${item._id}')">
            <div class="blogSixMaiDivBImgS">
              <img src=${item.images[0]} alt="">
            </div>
            <p class="blogSixMaiDivBImpaa">${new Date(item?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            })}</p>
            <p class="blogSixMaiDivparaa">${item?.title.slice(0,22)}...</p>
            <p class="blogSixMaiDivpaA">Read More</p>
          </div> `
    ))
}

const businessBlogsDiv = document.getElementById('businessBlogsDiv');

function displayBusinessBlogs (blogs){
    businessBlogsDiv.innerHTML = '';
    blogs.forEach((item)=> (
        businessBlogsDiv.innerHTML += `
        <div class="cardBlogSt" onclick="navigateToBlog('${item._id}')">
          <div class="cardBlogStImg">
            <img src=${item?.images[0]} alt="">
          </div>
          <p class="cardBlogStpaa">${new Date(item?.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })}</p>
          <div class="cardBlogStpaara1">
            <p class="cardBlogStpaara">${item?.title}</p>
          </div>
          <p class="cardBlogStpaaragr">${item?.subdescription}</p>
          <p class="cardBlogStpaarw">Read More</p>
        </div>
        `
    ))
}

let currentPage = 1;
const tasksPerPage = 5;


function renderBlogs() {
    if (!allBlogs.length) {
        console.warn("No blogs available.");
        return;
    }

    const totalPages = Math.ceil(allBlogs.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const currentTasks = allBlogs.slice(startIndex, startIndex + tasksPerPage);

    const currentBelowBlog = document.getElementById("currentBelowBlog");
    const smallBlogContainer = document.getElementById("smallBlogContainer");
    const pageNumber = document.getElementById("pageNumber");

    currentBelowBlog.innerHTML = "";
    smallBlogContainer.innerHTML = "";
    pageNumber.textContent = currentPage;

    if (currentTasks.length > 0) {
        const firstBlog = currentTasks[0];
        currentBelowBlog.innerHTML = `
            <div class="bimagelogMain" onclick="navigateToBlog('${firstBlog._id}')">
                <div class="bimagelog">
                    <a href="/blogdetails/${firstBlog._id}">
                        <img src="${firstBlog.images?.[0] || 'default-image.jpg'}" alt="${firstBlog.title || 'No Title'}" />
                    </a>
                </div>
                <div class="bimageloDi">
                    <h2><a href="/blogdetails/${firstBlog._id}">${firstBlog.title || 'No Title'}</a></h2>
                    <p>${firstBlog.subdescription || 'No Description Available'}</p>
                </div>
            </div>`;
    }

    if (currentTasks.length > 1) {
        currentTasks.slice(1).forEach(blog => {
            smallBlogContainer.innerHTML += `
                <a href="/blogdetails/${blog._id}" class="smallBlogCard">
                    <img src="${blog.images?.[0] || 'default-image.jpg'}" alt="${blog.title || 'Blog Image'}" />
                </a>`;
        });
    } else {
        smallBlogContainer.innerHTML = '<p>No Other Blogs Available</p>';
    }

    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}


function handlePrev() {
    if (currentPage > 1) {
        currentPage--;
        renderBlogs();
    }
}

function handleNext() {
    const totalPages = Math.ceil(allBlogs.length / tasksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderBlogs();
    }
}

fetchAllBlog();

function navigateToBlog(blogId) {
    window.location.href = `blogdetails.html?id=${blogId}`;
}

function filterByCategory(category) {
    if (!allBlogs || allBlogs.length === 0) {
        console.warn("No blogs available to filter.");
        return;
    }

    const filteredBlogs = allBlogs.filter(blog => blog.category?.title?.toLowerCase() === category.toLowerCase());

    console.log(`Filtered Blogs for ${category}:`, filteredBlogs);
    displayFilteredBlogs(filteredBlogs);
}

function displayFilteredBlogs(blogs) {
    const filteredBlogContainer = document.getElementById("filteredBlogContainer");
    filteredBlogContainer.innerHTML = ""; 

    if (blogs.length === 0) {
        filteredBlogContainer.innerHTML = "<p>No blogs found for this category.</p>";
        return;
    }

    blogs.forEach((blog) => {
        const blogHTML = `
            <div class="cardBlogSt" onclick="navigateToBlog('${blog._id}')">
                <div class="cardBlogStImg">
                    <img src="${blog.images?.[0] || 'default-image.jpg'}" alt="${blog.title}">
                </div>
                <p class="cardBlogStpaa">${new Date(blog.date).toLocaleDateString("en-GB", {
                    day: "numeric", month: "long", year: "numeric"
                })}</p>
                <div class="cardBlogStpaara1">
                    <p class="cardBlogStpaara">${blog.title}</p>
                </div>
                <p class="cardBlogStpaaragr">${blog.subdescription}</p>
                <p class="cardBlogStpaarw">Read More</p>
            </div>`;
        
        filteredBlogContainer.innerHTML += blogHTML;
    });
}

categoryDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("button")) {
        const category = event.target.innerText.trim();
        
        document.querySelectorAll("#categoryDiv .button").forEach(btn => {
            btn.classList.remove("btnblo");
        });

        event.target.classList.add("btnblo");

        filterByCategory(category);
    }
});


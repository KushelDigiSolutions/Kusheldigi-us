const baseUrl = "https://backblog.kusheldigi.com";
const domainToFilter = "kusheldigi.us";
// const phoneNumber = "9045301702";

let getAllBlogs = [],
  allCatBlogs = [],
  recentBlog = [],
  selectedCategory = null,
  defaultCategories = [],
  filteredBlogs = [],
  currentPage = 1,
  tasksPerPage = 5,
  isCategorySelected = false;

async function fetchData() {
  try {
    const [allBlogRes, catBlogRes, latestRes] = await Promise.all([
      fetch(`${baseUrl}/api/v1/auth/getAllBlog`),
      fetch(`${baseUrl}/api/v1/auth/allcatBlogs`),
      fetch(`${baseUrl}/api/v1/auth/recentBlogs`),
    ]);

    const allBlogData = await allBlogRes.json();
    const catBlogData = await catBlogRes.json();
    const latestData = await latestRes.json();

    getAllBlogs = allBlogData.blogs.filter(blog => blog.domain?.includes(domainToFilter));
    allCatBlogs = catBlogData.data;
    recentBlog = latestData.data;
    defaultCategories = allCatBlogs.slice(0, 5);

    renderCategoryButtons();
    renderAllSections();
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

function renderCategoryButtons() {
  const container = document.getElementById("category-buttons");
  container.innerHTML = "";

  allCatBlogs.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "button category-button";
    btn.textContent = cat.title;
    btn.onclick = () => handleCategoryClick(cat.title);
    container.appendChild(btn);
  });

  const resetBtn = document.createElement("button");
  resetBtn.className = "button category-button";
  resetBtn.textContent = "Show All";
  resetBtn.onclick = () => {
    isCategorySelected = false;
    selectedCategory = null;
    defaultCategories = allCatBlogs.slice(0, 5);
    renderAllSections();
  };
  container.appendChild(resetBtn);
}

function renderFeaturedBlog() {
  if (!getAllBlogs.length) return;
  const blog = getAllBlogs[0];
  document.getElementById("featured-blog").innerHTML = `
    <div class="bimagelogMain">
      <div class="bimagelog">
        <a href="/blogDetails.html?id=${blog._id}"><img src="${blog.images}" alt="" /></a>
      </div>
      <div class="bimageloDi">
        <p class="bimageloDiPa">${new Date(blog.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div class="bimageloDiPara11">
          <a href="/blogDetails.html?id=${blog._id}">
            <div class="bimageloDiPARa12">
              <p class="bimageloDiPara">${blog.title}</p>
            </div>
          </a>
          <p class="bimageloDiParra">${blog.subdescription}</p>
          <div class="blogClockTime">
            <a href="/blogDetails.html?id=${blog._id}"><span class="bimageloDiPaara">Read More</span></a>
            <span class="bimageloDiPargaph"><img src="img/clock.svg" alt="clock" class="iconBlogClock"></img> ${blog.time}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function renderLatestArticles() {
  const container = document.getElementById("latest-articles");
  container.innerHTML = `
    <div class="newsroom-section">
      <div class="newsroom-header"><h5>Latest Articles</h5></div><hr /><br />
      <div class="news-grid">
        ${recentBlog.map(item => `
          <a href="/blogDetails.html?id=${item._id}" class="news-item">
            <img src="${item.images[0]}" alt="" class="news-image" />
            <div class="news-content">
              <h3 class="news-title">${item.title}</h3>
              <p class="cardBlogStpaa">${new Date(item.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </a>`).join("")}
      </div>
    </div>`;
}

function renderCategorySections() {
  const container = document.getElementById("category-sections");
  container.innerHTML = defaultCategories.map(cat => `
    <div class="category-blog-section">
      <div class="cardsectFive"><p>${cat.title}</p><hr /></div>
      <div class="cardMainBlogSec">
        ${cat.blogs.slice(0, 6).map(item => `
          <div class="cardBlogSt">
            <a class="cardBlogStaa" href="/blogDetails.html?id=${item._id}">
              <div class="cardBlogStImg"><img src="${item.images[0]}" alt="${item.title}" /></div>
              <p class="cardBlogStpaa">${new Date(item.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <div class="cardBlogStpaara1"><p class="cardBlogStpaara">${item.title}</p></div>
              <p class="cardBlogStpaaragr">${item.subdescription?.slice(0, 100)}...</p>
            </a>
            <div class="blogClockTime1">
              <a href="/blogDetails.html?id=${item._id}"><p class="cardBlogStpaarw">Read More</p></a>
              <span class="bimageloDiPargaph1"><img src="img/clock.svg" alt="clock" class="iconBlogClock"></img> ${item.time}</span>
            </div>
          </div>`).join("")}
      </div>
    </div>`).join("");
}

function renderPaginatedBlogs() {
  const start = (currentPage - 1) * tasksPerPage;
  const end = currentPage * tasksPerPage;
  const currentTasks = getAllBlogs.slice(start, end);

  const main = document.getElementById("paginated-main");
  main.innerHTML = currentTasks[0] ? `
    <div class="bimagelog">
      <a href="/blogDetails.html?id=${currentTasks[0]._id}"><img src="${currentTasks[0].images[0]}" alt="${currentTasks[0].title}" /></a>
    </div>
    <div class="bimageloDi">
      <a href="/blogDetails.html?id=${currentTasks[0]._id}"><h2 class="bimageloDiPara">${currentTasks[0].title}</h2></a>
      <p class="bimageloDiParra">${currentTasks[0].subdescription}</p>
    </div>` : "<p>No Blogs Available</p>";

  const small = document.getElementById("paginated-small");
  small.innerHTML = currentTasks.slice(1).map(item => `
      <a href="/blogDetails.html?id=${item._id}" class="smallBlogCard">
        <img src="${item.images?.[0] || 'fallback.jpg'}" alt="${item.title}" />
      </a>`).join("");

  const controls = document.getElementById("pagination-controls");
  const totalPages = Math.ceil(getAllBlogs.length / tasksPerPage);
  controls.innerHTML = `
    <button onclick="changePage(-1)" ${currentPage === 1 ? "disabled" : ""} class="prev-btn">Prev</button>
    <span id="pagenumber">${currentPage}</span>
    <button onclick="changePage(1)" ${currentPage === totalPages ? "disabled" : ""} class="next-btn">Next</button>`;
}

function renderAllBlogs() {
  document.getElementById("all-blog").innerHTML = `<p>All</p>
        <hr /><br />`
}

function changePage(step) {
  currentPage += step;
  renderPaginatedBlogs();
}

function handleCategoryClick(title) {
  selectedCategory = title;
  isCategorySelected = true;
  const cat = allCatBlogs.find(c => c.title === title);
  filteredBlogs = cat ? cat.blogs : [];
  defaultCategories = cat ? [cat] : [];
  renderAllSections();
}

function renderAllSections() {
  if (!isCategorySelected) {
    renderFeaturedBlog();
    renderLatestArticles();
    renderPaginatedBlogs();
    renderAllBlogs();
  } else {

    document.getElementById("featured-blog").innerHTML = "";
    document.getElementById("latest-articles").innerHTML = "";
    document.getElementById("paginated-main").innerHTML = "";
    document.getElementById("paginated-small").innerHTML = "";
    document.getElementById("pagination-controls").innerHTML = "";
    document.getElementById("all-blog").innerHTML = "";
  }

  renderCategorySections();

}

window.onload = fetchData;
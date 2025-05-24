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

// async function fetchData() {
//   try {
//     const allBlogRes = await fetch(`${baseUrl}/api/v1/auth/getAllBlog`);
//     const allBlogData = await allBlogRes.json();
//     getAllBlogs = allBlogData.blogs.filter(blog => blog.domain?.includes(domainToFilter));

//     const catBlogRes = await fetch(`${baseUrl}/api/v1/auth/allcatBlogs`);
//     const catBlogData = await catBlogRes.json();
//     allCatBlogs = catBlogData.data;
//     console.log("All Cat..", allCatBlogs);

//     const latestRes = await fetch(`${baseUrl}/api/v1/auth/recentBlogs`);
//     const latestData = await latestRes.json();
//     recentBlog = latestData.data;
//     console.log("All Rec..", recentBlog);

//     defaultCategories = allCatBlogs.slice(0, 5);

//     renderCategoryButtons();
//     renderAllSections();
//   } catch (err) {
//     console.error("Error fetching data:", err);
//   }
// }

async function fetchAllBlogs() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/getAllBlog`);
    const data = await res.json();
    getAllBlogs = data.blogs.filter(blog => blog.domain?.includes(domainToFilter)).reverse();
  } catch (err) {
    console.error("Error fetching all blogs:", err);
  }
}

async function fetchCategoryBlogs() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/allcatBlogs`);
    const data = await res.json();
    allCatBlogs = data.data;
    defaultCategories = allCatBlogs.reverse().slice(0, 5);
  } catch (err) {
    console.error("Error fetching category blogs:", err);
  }
}

async function fetchRecentBlogs() {
  try {
    const res = await fetch(`${baseUrl}/api/v1/auth/recentBlogs`);
    const data = await res.json();
    recentBlog = data.data;
  } catch (err) {
    console.error("Error fetching recent blogs:", err);
  }
}


async function fetchData() {
  await fetchAllBlogs();
  await fetchCategoryBlogs();
  await fetchRecentBlogs();

  renderCategoryButtons();
  renderAllSections();
}



function renderCategoryButtons() {
  const container = document.getElementById("category-buttons");
  container.innerHTML = "";
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

  allCatBlogs.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "button category-button";
    btn.textContent = cat.title;
    btn.onclick = () => handleCategoryClick(cat.title);
    container.appendChild(btn);
  });


}

function renderFeaturedBlog() {
  if (!getAllBlogs.length) return;
  const blog = getAllBlogs[0];
  document.getElementById("featured-blog").innerHTML = `
    <div class="bimagelogMain">
      <div class="bimagelog">
        <a href="/blog.html?slug=${blog.slug}"><img src="${blog.images}" alt="" /></a>
      </div>
      <div class="bimageloDi">
        <p class="bimageloDiPa">${new Date(blog.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <div class="bimageloDiPara11">
          <a href="/blog.html?slug=${blog.slug}">
            <div class="bimageloDiPARa12">
              <p class="bimageloDiPara">${blog.title}</p>
            </div>
          </a>
          <p class="bimageloDiParra">${blog.subdescription}</p>
          <div class="blogClockTime">
            <a href="/blog.html?slug=${blog.slug}"><span class="bimageloDiPaara">Read More</span></a>
            <span class="bimageloDiPargaph"><img src="img/clock.svg" alt="clock" class="iconBlogClock"></img> ${blog.time}Min</span>
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
        ${getAllBlogs.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6).map(item => `
          <a href="/blog.html?slug=${item.slug}" class="news-item">
            <img src="${item.images[0]}" alt="" class="news-image" />
            <div class="news-content">
            <p class="cardBlogStpaa">${new Date(item.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <h3 class="news-title">${item.title}</h3>
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
        ${cat.blogs.filter((item) => item.domain.includes("kusheldigi.us"))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6)
      .map(item => `
          <div class="cardBlogSt">
            <a class="cardBlogStaa" href="/blog.html?slug=${item.slug}">
              <div class="cardBlogStImg"><img src="${item.images[0]}" alt="${item.title}" /></div>
              <p class="cardBlogStpaa">${new Date(item.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <div class="cardBlogStpaara1"><p class="cardBlogStpaara">${item.title}</p></div>
              <p class="cardBlogStpaaragr">${item.subdescription?.slice(0, 100)}...</p>
            </a>
            <div class="blogClockTime1">
              <a href="/blog.html?slug=${item.slug}"><p class="cardBlogStpaarw">Read More</p></a>
              <span class="bimageloDiPargaph1"><img src="img/clock.svg" alt="clock" class="iconBlogClock"></img> ${item.time} Min</span>
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
      <a href="/blog.html?slug=${currentTasks[0].slug}"><img src="${currentTasks[0].images[0]}" alt="${currentTasks[0].title}" /></a>
    </div>
    <div class="bimageloDi">
      <a href="/blog.html?slug=${currentTasks[0].slug}"><h2 class="bimageloDiPara">${currentTasks[0].title}</h2></a>
      <p class="bimageloDiParra">${currentTasks[0].subdescription}</p>
    </div>` : "<p>No Blogs Available</p>";

  const small = document.getElementById("paginated-small");
  small.innerHTML = currentTasks.slice(1).map(item => `
      <a href="/blog.html?slug=${item.slug}" class="smallBlogCard">
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
const description = document.getElementById("description");

window.addEventListener("scroll", () => {
    const rect = description.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elementTop = rect.top + scrollTop;
    const elementHeight = rect.height;

    const start = elementTop - windowHeight;
    const end = elementTop + elementHeight;

    let ratio = (scrollTop - start) / (end - start);
    ratio = Math.max(0, Math.min(1, ratio));

    const r = Math.floor(0 + 128 * ratio);
    const g = Math.floor(0 + 128 * ratio);
    const b = Math.floor(0 + 128 * ratio);
    description.style.color = `rgb(${r}, ${g}, ${b})`;
});



const switchInput = document.getElementById("switch");
const phasesContainer = document.getElementById("phases");
const customTitle = document.querySelector(".first-copmpany");
const dynamicTitle = document.querySelector(".second-copmpany");

const customPhases = `
      <div id='phase1' class="process-button"></div>
      <div id='phase1Name'><span>01</span><span class='procBCom'>Planning</span></div>
      <div id='phase2' class="process-button"></div>
      <div id='phase2Name'><span>02</span><span class='procBCom'>UI/UX Design</span></div>
      <div id='phase3' class="process-button"></div>
      <div id='phase3Name'><span class='procBCom'>Brand</span></div>
      <div id='phase4' class="process-button"></div>
      <div id='phase4Name'><span class='procBCom'>Visual</span></div>
      <div id='phase5' class="process-button"></div>
      <div id='phase5Name'><span>03</span><span class='procBCom'>Development</span></div>
      <div id='phase6' class="process-button"></div>
      <div id='phase6Name'><span>04</span><span class='procBCom'>Improvements</span></div>
      <div id='phase7' class="process-button"></div>
      <div id='phase7Name'><span>05</span><span class='procBCom'>Testing</span></div>
      <div id='phase8' class="process-button"></div>
      <div id='phase8Name'><span class='procBCom'>Validation</span></div>
      <div id='phase9' class="process-button"></div>
      <div id='phase9Name'><span class='procBCom'>User Acceptance Testing</span></div>
      <div id='phase10' class="process-button"></div>
      <div id='phase10Name'><span>06</span><span class='procBCom'>Final Touches</span></div>
      <div id='phase11' class="process-button"></div>
      <div id='phase11Name'><span>07</span><span class='procBCom'>Deployment</span></div>
    `;

const dynamicPhases = `
      <div id='phase1' class="process-button"></div>
      <div id='phase1Name'><span>01</span><span class='procBCom'>Sprint Setup</span></div>
      <div id='phase2' class="process-button"></div>
      <div id='phase2Name'><span>02</span><span class='procBCom'>Wireframing</span></div>
      <div id='phase3' class="process-button"></div>
      <div id='phase3Name' class='agile3phase'><span class='procBCom'>Project Setup</span></div>
      <div id='phase4' class="process-button"></div>
      <div id='phase4Name'><span class='procBCom'>Initiation</span></div>
      <div id='phase5' class="process-button"></div>
      <div id='phase5Name'><span>03</span><span class='procBCom'>Development</span></div>
      <div id='phase6' class="process-button"></div>
      <div id='phase6Name'><span>04</span><span class='procBCom'>Regular Testing</span></div>
      <div id='phase7' class="process-button"></div>
      <div id='phase7Name' class='agile7phase'><span>05</span><span class='procBCom'>Feedback</span></div>
      <div id='phase8' class="process-button"></div>
      <div id='phase8Name' class='agile8phase'><span class='procBCom'>Sprint Completed</span></div>
      <div id='phase9' class="process-button"></div>
      <div id='phase9Name' class='agile9phase'><span class='procBCom'>Release</span></div>
      <div id='phase10' class="process-button"></div>
      <div id='phase10Name' class='agile10phase'><span>06</span><span class='procBCom'>Final Review</span></div>
      <div id='phase11' class="process-button"></div>
      <div id='phase11Name' class='agile11phase'><span>07</span><span class='procBCom'>Launch & Ongoing Support</span></div>
    `;

const updatePhases = () => {
    if (switchInput.checked) {
        phasesContainer.innerHTML = dynamicPhases;
        customTitle.classList.add("textOpacity");
        dynamicTitle.classList.remove("textOpacity");
    } else {
        phasesContainer.innerHTML = customPhases;
        customTitle.classList.remove("textOpacity");
        dynamicTitle.classList.add("textOpacity");
    }

    // Scroll back to start on toggle
    setTimeout(() => {
        phasesContainer.scrollLeft = 0;
    }, 50);
};

switchInput.addEventListener("change", updatePhases);

// Initial load
updatePhases();







 











const caseStudies = [
  { img: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744175098/home-banner-3_1_i2ugio.jpg', smHeading: 'Certified BigCommerce Agency', smallBtnText: "View Case Study", smallImg: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744175094/circle_vvibyg.png', heading: "Expert BigCommerce Development Solutions for Scalable Growth",bigCommerce : [
      {
          bigImg1 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/bigcommerce_iuneyd.png',
          bigImg2 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743340284/bcb2b-1_onvun7.png',
          bigImg3 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/certified-bifgcommerce_fmyqvz.png'
      }
  ] },
  { img: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829271/lovely-1_hhxfih.jpg', smHeading: 'Certified BigCommerce Agency', smallBtnText: "View Case Study", smallImg: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829269/lovely-1-2_by2dtq.jpg', heading: "Expert BigCommerce Development Solutions for Scalable Growth",bigCommerce : [
      {
          bigImg1 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/bigcommerce_iuneyd.png',
          bigImg2 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743340284/bcb2b-1_onvun7.png',
          bigImg3 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/certified-bifgcommerce_fmyqvz.png'
      }
  ]  },
  { img: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829270/lovely-3_fanqxf.jpg', smHeading: 'Certified BigCommerce Agency', smallBtnText: "View Case Study", smallImg: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829268/lovely-3-4_mi9o33.jpg', heading: "Expert BigCommerce Development Solutions for Scalable Growth",bigCommerce : [
      {
          bigImg1 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/bigcommerce_iuneyd.png',
          bigImg2 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743340284/bcb2b-1_onvun7.png',
          bigImg3 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/certified-bifgcommerce_fmyqvz.png'
      }
  ]  },
  { img: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829269/lovely-4_sgdj3e.jpg', smHeading: 'Certified BigCommerce Agency', smallBtnText: "View Case Study", smallImg: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829268/lovely-4-2_ffzapa.jpg', heading: "Expert BigCommerce Development Solutions for Scalable Growth",bigCommerce : [
      {
          bigImg1 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/bigcommerce_iuneyd.png',
          bigImg2 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743340284/bcb2b-1_onvun7.png',
          bigImg3 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/certified-bifgcommerce_fmyqvz.png'
      }
  ]  },
  { img: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829269/lovely-5_akjurr.jpg', smHeading: 'Certified BigCommerce Agency', smallBtnText: "View Case Study", smallImg: 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743829268/lovely-5-3_tykoz4.jpg', heading: "Expert BigCommerce Development Solutions for Scalable Growth",bigCommerce : [
      {
          bigImg1 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/bigcommerce_iuneyd.png',
          bigImg2 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1743340284/bcb2b-1_onvun7.png',
          bigImg3 : 'https://res.cloudinary.com/dd9tagtiw/image/upload/v1744104912/certified-bifgcommerce_fmyqvz.png'
      }
  ]  },
];

  let currentIndex = 0;

  const mainImage = document.getElementById('main-image');
  const mainHeading = document.getElementById('main-heading');
  const smHeading = document.getElementById('sm-heading');
  const titleHeading = document.getElementById('title-heading');
  const logoSectionTop = document.getElementById('logo-section-top');
  const logoSectionBottom = document.getElementById('logo-section-bottom');
  const thumbnails = document.getElementById('thumbnails');

  function renderCaseStudy(index) {
    const current = caseStudies[index];
    mainImage.src = current.img;
    mainHeading.textContent = current.heading;
    smHeading.textContent = current.smHeading;
    titleHeading.textContent = current.heading;

    logoSectionTop.innerHTML = `
    <img src="${current.bigCommerce[0].bigImg1}" alt="bigImg1" />
    <img src="${current.bigCommerce[0].bigImg3}" alt="bigImg3" />
  `;
    logoSectionBottom.innerHTML = logoSectionTop.innerHTML;

    thumbnails.innerHTML = caseStudies.map((item, idx) => `
    <div class="small-icons" onclick="renderCaseStudy(${idx})">
      ${idx === index ? `<span class='case-btnText'>${item.smallBtnText}</span>` : ''}
      <img class="bigcommercesmall-icon ${idx === index ? 'active' : ''}" src="${item.smallImg}" alt="small case"/>
    </div>
  `).join('');
  }

  renderCaseStudy(currentIndex);












 
const caseStudies2 = [
  {
    title: 'A to Z Stores: Multi-Store Platform for Wholesale Stores',
    description1: 'A to Z stores offer products like markerboards, projection screens & extinguishers.',
    description2: 'Find out how TBI\u2019s expertise in Migration to Magento & custom PDP designing enhanced customer footprint and online sales.',
    img: 'https://res.cloudinary.com/dbcmdtr3r/image/upload/v1744145937/a-to-z-new_cfxrxm.webp',
    reverse: false
  },
  {
    title: 'Xtreme 4×4 Sales Soar with Magento 2 Migration',
    description1: 'Xtreme 4×4 is a wholesale platform offering various vehicle recovery products.',
    description2: 'Learn how TBI\u2019s curated custom store sections & product comparison filters improved user engagement. Our custom search functionality improves user interaction and converts it into store sales.',
    img: 'https://res.cloudinary.com/dbcmdtr3r/image/upload/v1744145937/xtreme-4x4-new_zobf3w.webp',
    reverse: true
  },
  {
    title: 'Custom Multi-store Plugin Driving Cosmetic B2B Sales',
    description1: 'Custom multi-store plugin for a cosmetic website streamlining their business operations.',
    description2: 'Learn how TBI helped the client manage multiple vendors & monitor B2B sale operations with a centralized admin dashboard. Our multiple subscription plans for vendors fostered engagement and increased sales.',
    img: 'https://res.cloudinary.com/dbcmdtr3r/image/upload/v1744145938/multi-store-new_eorhy9.webp',
    reverse: false
  },
  {
    title: 'Ecommerce Solution for Store Display Equipment Platform',
    description1: 'Substral Inc. deals with store units like jewellery displays, Mannequins & display cases.',
    description2: 'Find out how TBI helped improve website sales with Magento 2 migration, custom cart & shipping class designs.',
    img: 'https://res.cloudinary.com/dbcmdtr3r/image/upload/v1744145937/substral-new_hhxcks.webp',
    reverse: true
  },
  {
    title: 'A Robsust B2B ecommerce Store Like Alibaba',
    description1: 'Built a Magento 2 wholesale store specializing in custom merchandise from the ground up.',
    description2: 'Learn how TBI\u2019s dedicated team helped streamline store operations & improved user interaction with custom shipping extension. Our UI enhancements improved customer footprint by 30%.',
    img: 'https://res.cloudinary.com/dbcmdtr3r/image/upload/v1744145937/wholesale-store-new_zkwpky.webp',
    reverse: false
  }
];

const container = document.getElementById('caseStudiesContainer');

caseStudies2.forEach(({ title, description1, description2, img, reverse }) => {
  const div = document.createElement('div');
  div.className = `case-study ${reverse ? 'reverse' : ''}`;
  div.innerHTML = `
    <div class="case-image">
      <img src="${img}" alt="${title}" />
    </div>
    <div class="case-content">
      <h2>${title}</h2>
      <p>${description1}</p>
      <p>${description2}</p>
      <button class="view-project-btn">
        View Project →
      </button>
    </div>
  `;
  container.appendChild(div);
});
 
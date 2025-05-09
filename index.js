const phoneInput = document.getElementById('phone')
const popUpPhone = document.getElementById('popMobile')

phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, "");
    if (phoneInput.value.length > 10) {
        phoneInput.value = phoneInput.value.slice(0, 10);
    }
});
popUpPhone.addEventListener("input", () => {
    popUpPhone.value = popUpPhone.value.replace(/[^0-9]/g, "");
    if (popUpPhone.value.length > 10) {
        popUpPhone.value = popUpPhone.value.slice(0, 10);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "us",
        geoIpLookup: function (callback) {
            fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => callback(data.country_code))
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const popInputField = document.querySelector("#popMobile");
    const popInput = window.intlTelInput(popInputField, {
        initialCountry: "us",
        geoIpLookup: function (callback) {
            fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => callback(data.country_code))
                .catch(() => callback("us"));
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
});

let popCorrectAnswer = 0;
let isPopCaptchaVerified = false;  
 
function popGenerateCaptcha() {
    const firstNo = Math.floor(Math.random() * 10);
    const secondNo = Math.floor(Math.random() * 10);
    popCorrectAnswer = firstNo + secondNo;
    document.getElementById("pop-captchaQuestion").innerText = `${firstNo} + ${secondNo} =`;
    document.getElementById("pop-captchaAnswer").value = "";
}
 
function popVerifyCaptcha() {
    const userAnswer = parseInt(document.getElementById("pop-captchaAnswer").value);
    if (userAnswer !== popCorrectAnswer) {
        alert("Wrong Captcha! Try again.");
        popGenerateCaptcha();
        return false;
    }
    alert('Captcha Verified!!');
    isPopCaptchaVerified = true;  
    return true;
}
 
const popCaptchaBtn = document.querySelector('.pop-captcha-btn');
popCaptchaBtn.addEventListener('click', () => {
    if (popVerifyCaptcha()) {
        popCaptchaBtn.disabled = true; 
    }
});

popCaptchaBtn.addEventListener('click', popVerifyCaptcha);

document.addEventListener("DOMContentLoaded", popGenerateCaptcha);

const popupModal = document.querySelector('.popup-modal');

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        popupModal.classList.add('showpopup');
    }, 10000)
})

document.querySelector('.cross-icon').addEventListener('click', function () {
    popupModal.classList.remove('showpopup');
})






document.addEventListener("DOMContentLoaded", popGenerateCaptcha);
 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".pop-contact-form");
    const submitButton = form.querySelector(".pop-contact-form-btn");

    form.addEventListener("submit", async (event) => { 
        if (!isPopCaptchaVerified) {
            event.preventDefault();
            alert("Please verify the captcha before submitting the form.");
            return;
        }

        event.preventDefault(); 
        submitButton.innerHTML = "Sending...";
        submitButton.disabled = true;

        const formData = {
            popFullname: document.getElementById("popName").value,
            popEmail: document.getElementById("popEmail").value,
            popMobile: document.getElementById("popMobile").value,
        };

        try {
            const response = await fetch("https://backend.kusheldigi.us/api/v1/sendPopupmaill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                form.reset(); 
                window.location.href = "thankyou.html"; 
            } else {
                alert(`Failed to send email: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error while sending email:", error);
            alert("An error occurred while sending the email. Please try again.");
        } finally {
            submitButton.innerHTML = "Submit";
            submitButton.disabled = false;
        }
    });
});



document.addEventListener("DOMContentLoaded", generateCaptcha);

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const submitButton = form.querySelector(".contact-form-btn");

    form.addEventListener("submit", async (event) => { 
        if (!isCaptchaVerified) {
            event.preventDefault();
            alert("Please verify the captcha before submitting the form.");
            return;
        }

        event.preventDefault(); 
        submitButton.disabled = true;
        submitButton.innerText = "Sending...";

        const formData = {
            popFullname: document.getElementById("name").value,
            popMobile: document.getElementById("phone").value,
            popEmail: document.getElementById("email").value,
            popMessage: document.getElementById("msg").value,
        };

        try {
            const response = await fetch("https://backend.kusheldigi.us/api/v1/sendPopupmaill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                form.reset(); 
                setTimeout(() => {
                  window.location.href = "thankyou.html";
                }, 300); 
            } else {
                alert(`Failed to send email: ${result.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error while sending email:", error);
            alert("An error occurred while sending the email. Please try again.");
        } finally {
            submitButton.disabled = false;
            submitButton.innerText = "Submit";
        }
    });

    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
});










document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".services-box-item-row").forEach((row) => {
        row.classList.remove("show");
    });

    document.querySelectorAll(".services-box-item").forEach((item) => {
        item.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            let targetRow = document.querySelector(
                `.services-box-item-row[data-index='${index}']`
            );
            let arrowBtn = this.querySelector(".services-box-down-icon svg");

            if (targetRow) {
                let isVisible = targetRow.classList.contains("show");

                document
                    .querySelectorAll(".services-box-item-row")
                    .forEach((row) => row.classList.remove("show"));
                document
                    .querySelectorAll(".services-box-item")
                    .forEach((box) => box.classList.remove("bg-white"));
                document
                    .querySelectorAll(".services-box-down-icon svg")
                    .forEach((icon) => (icon.style.transform = "rotate(0deg)"));

                if (!isVisible) {
                    targetRow.classList.add("show");
                    this.classList.add("bg-white");
                    arrowBtn.style.transform = "rotate(180deg)";
                }
            }
        });
    });
});






document.getElementById("talk-btn").addEventListener("click", function (event) {
    event.preventDefault();
    let formSection = document.getElementById("form-section");
    let offset = 100;

    window.scrollTo({
        top: formSection.offsetTop - offset,
        behavior: "smooth"
    });
});

document.getElementById("btn-light").addEventListener("click", function (event) {
    event.preventDefault();
    let formSection = document.getElementById("form-section");
    let offset = 100;

    window.scrollTo({
        top: formSection.offsetTop - offset,
        behavior: "smooth"
    });
});






var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});








$(document).ready(function () {
    $('#footer').load('footer.html', function (response, status, xhr) {
        if (status === "error") {
            console.error("Error loading footer:", xhr.status, xhr.statusText);
        }
    });
});


$(document).ready(function () {
    $('#header').load('header.html', function (response, status, xhr) {
        if (status === "error") {
            console.error("Error loading header:", xhr.status, xhr.statusText);
        }
    });
});

$(document).ready(function () {
    $('.hero-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1

    });
});


$(document).ready(function () {
    $('#slider-container').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        prevArrow: $('#prev'),
        nextArrow: $('#next'),
        dots: false,
        autoplay: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: true,
                },
            },
        ],
    });

    $('#slider-container').on('afterChange', function (event, slick, currentSlide) {
        const totalSlides = slick.slideCount;
        const current = currentSlide + 1;
        $('.pagination span:first-child').text(current.toString().padStart(2, '0'));
        $('.pagination span:last-child').text(totalSlides.toString().padStart(2, '0'));

        const progressPercentage = (current / totalSlides) * 100;
        $('.progress').css('width', `${progressPercentage}%`);
    });
});

$(document).ready(function () {
    $('.logo-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 11000,
        pauseOnFocus: false,
        pauseOnHover: false,
        rtl: true,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.logo-slider-1').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 11000,
        pauseOnFocus: false,
        pauseOnHover: false,
        ltr: true,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1

                }
            }
        ]
    });
});


$(document).ready(function () {
    $('.logo-slider-2').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1000,
        speed: 11000,
        pauseOnFocus: false,
        pauseOnHover: false,
        ltr: true,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1

                }
            }
        ]
    });
});






(
    function () {

        let sidebarToggle = document.getElementById("sidebar-toggle");
        const sidebarClose = document.getElementById("sidebar-close");
        const sidebar = document.createElement("div");

        sidebar.className = "sidebar";
        sidebar.innerHTML = `
  <a href="/">Home</a>
  <a href="about.html">About Us</a>
  <a href="service.html">Services</a>
  <a href="blog.html">Blog</a>
  <a href="portfolio.html">Portfolio</a>
  <a href="contact.html" class="nav_button descfonts_kkyu">Contact Us</a>
`;
        document.body.appendChild(sidebar);

        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.add("open");
            sidebarToggle.style.display = "none";
            sidebarClose.style.display = "block";
        });

        sidebarClose.addEventListener("click", () => {
            sidebar.classList.remove("open");
            sidebarToggle.style.display = "block";
            sidebarClose.style.display = "none";
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                sidebar.classList.remove("open");
                sidebarToggle.style.display = "none";
                sidebarClose.style.display = "none";
                document.querySelector(".navbar_conts nav").style.display = "flex";
            } else {
                document.querySelector(".navbar_conts nav").style.display = "none";
                if (sidebar.classList.contains("open")) {
                    sidebarToggle.style.display = "none";
                    sidebarClose.style.display = "block";
                } else {
                    sidebarToggle.style.display = "block";
                    sidebarClose.style.display = "none";
                }
            }
        });
    })();












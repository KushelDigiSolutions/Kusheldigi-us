$(document).ready(function () {
    $('.banner-slider').slick({
      dots: true,
      fade: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
      waitForAnimate: false
    });
  
    window.addEventListener("hashchange", () => {
      const section = document.getElementById("form-section");
      if (section) {
        setTimeout(() => {
          const offset = 150;
          const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: sectionPosition, behavior: "smooth" });
        }, 0);
      }
    });
  });
  
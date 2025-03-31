document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const button = item.querySelector(".toggle-btn");
      const answer = item.querySelector(".faq-answer");

       
      answer.style.maxHeight = null;
      item.classList.remove("expanded");
      button.textContent = "+";

      button.addEventListener("click", function () {
        const isExpanded = item.classList.contains("expanded");

         
        faqItems.forEach((faq) => {
          if (faq !== item) {
            faq.classList.remove("expanded");
            faq.querySelector(".faq-answer").style.maxHeight = null;
            faq.querySelector(".toggle-btn").textContent = "+";
          }
        });

        if (!isExpanded) {
          item.classList.add("expanded");
          answer.style.maxHeight = answer.scrollHeight + "px";  
          button.textContent = "-";  
        } else {
          item.classList.remove("expanded");
          answer.style.maxHeight = null;  
          button.textContent = "+";  
        }
      });
    });
  });
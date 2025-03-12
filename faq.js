document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const button = item.querySelector(".toggle-btn");
      const answer = item.querySelector(".faq-answer");

      // Ensure all answers are closed on load
      answer.style.maxHeight = null;
      item.classList.remove("expanded");
      button.textContent = "+";

      button.addEventListener("click", function () {
        const isExpanded = item.classList.contains("expanded");

        // Close all open FAQs before opening the clicked one
        faqItems.forEach((faq) => {
          if (faq !== item) {
            faq.classList.remove("expanded");
            faq.querySelector(".faq-answer").style.maxHeight = null;
            faq.querySelector(".toggle-btn").textContent = "+";
          }
        });

        if (!isExpanded) {
          item.classList.add("expanded");
          answer.style.maxHeight = answer.scrollHeight + "px"; // Smooth expand
          button.textContent = "-"; // Change button to minus
        } else {
          item.classList.remove("expanded");
          answer.style.maxHeight = null; // Smooth collapse
          button.textContent = "+"; // Change button back to plus
        }
      });
    });
  });
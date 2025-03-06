document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".getInForm")?.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const arrowSubmitText = document.querySelector(".arrowSubmitText");
    const loader = document.querySelector(".loader");

    arrowSubmitText.style.display = "none";
    loader.style.display = "inline-block";

    const formData = {
      firstName: document.getElementById("firstName2").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email2").value,
      service: document.getElementById("service2").value,
      message: document.getElementById("message2").value,
    };

    try {
      const response = await fetch("https://backend.kusheldigi.us/api/v1/sendMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const result = await response.json(); 

      if (response.ok) {
        // alert("Email sent successfully!");
        window.location.href = "thankyou.html";
      } else {
        alert(`Failed to send email: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error while sending email:", error);
      alert("An error occurred while sending your email. Please try again.");
    } finally {
      // Reset the form fields
      arrowSubmitText.style.display = "inline-block";
      loader.style.display = "none";

      document.getElementById("firstName2").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email2").value = "";
      document.getElementById("service2").value = "";
      document.getElementById("message2").value = "";
    }
  });
});



//   POP WALA SCRIPT 
  document.addEventListener("DOMContentLoaded", () => {
    const popupWrapper = document.querySelector(".popup_wala_Wrao");
    const form = document.getElementById("popupFormElement");
    const buttonText = document.getElementById("buttonText");
    const loader = document.getElementById("loader2");
  
    setTimeout(() => {
      popupWrapper.style.display = "flex"; 
    }, 40000);  // make 40 second  => 40000


  
    const closePopup = document.querySelector(".popcrosson");
    if (closePopup) {
      closePopup.addEventListener("click", () => {
        popupWrapper.style.display = "none"; 
      });
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); 

      loader.style.display = "inline-block";
      buttonText.style.display = "none";
  
      const formData = {
        popFullname: document.getElementById("popFullname").value,
        popEmail: document.getElementById("popEmail").value,
        popMobile: document.getElementById("popMobile").value,
        popMessage: document.getElementById("popMessage").value,
      };
  
      try {
        const response = await fetch("https://backend.kusheldigi.us/api/v1/sendPopupmaill", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        console.log("res",response);
  
        const result = await response.json();
  
        if (response.ok) {
          // alert(" email sent successfully!");
          window.location.href = "thankyou.html";
          form.reset();
          popupWrapper.style.display = "none"; 
        } else {
          alert(`Failed to send  email: ${result.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error while sending  email:", error);
        alert("An error occurred while sending the email. Please try again.");
      } finally {
        loader.style.display = "none";
        buttonText.style.display = "inline";
      }
    });
  });
  


  // for popup phone input 
  document.addEventListener("DOMContentLoaded", () => {
    const mobileInput = document.getElementById("popMobile");

    mobileInput.addEventListener("input", function() {
        const mobileNumber = mobileInput.value;  
        console.log("Length of mobile number:", mobileNumber.length);

        if (mobileNumber.length > 10) {
            mobileInput.setCustomValidity("Mobile number must be exactly 10 digits.");
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            mobileInput.setCustomValidity("Mobile number must only contain digits.");
        }  else {
            mobileInput.setCustomValidity(""); 
        }
    });

    mobileInput.addEventListener("keydown", function(event) {
        const mobileNumber = mobileInput.value;
        if (mobileNumber.length >= 10 && event.key !== "Backspace" && event.key !== "Delete") {
            event.preventDefault();  
        }
    });
});

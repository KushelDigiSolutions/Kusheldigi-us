    // Select elements
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const navbarNav = document.getElementById('navbarNav');
    
    // Function to show the navbar menu
    function openSidebar() {
      navbarNav.style.display = 'flex'; // Show the menu
      sidebarToggle.style.display = 'none'; // Hide the hamburger icon
      sidebarClose.style.display = 'flex'; // Show the close icon
    }
    
    // Function to hide the navbar menu
    function closeSidebar() {
      navbarNav.style.display = 'none'; // Hide the menu
      sidebarToggle.style.display = 'flex'; // Show the hamburger icon
      sidebarClose.style.display = 'none'; // Hide the close icon
    }
    
    // Add event listeners
    sidebarToggle.addEventListener('click', openSidebar);
    sidebarClose.addEventListener('click', closeSidebar);
    
    // Optional: To ensure proper layout on window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        navbarNav.style.display = 'flex'; // Default display for wider screens
        sidebarToggle.style.display = 'none';
        sidebarClose.style.display = 'none';
      } else {
        navbarNav.style.display = 'none'; // Hide menu on smaller screens by default
        sidebarToggle.style.display = 'flex';
        sidebarClose.style.display = 'none';
      }
    });
    
        const phoneInputField = document.querySelector("#phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    



        
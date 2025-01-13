document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement; // 找到當前的 sidebar-item
            const currentDropdown = parent.querySelector(".dropdown"); // 當前的 dropdown

            // 收合其他展開的 dropdown
            document.querySelectorAll(".dropdown").forEach((dropdown) => {
                if (dropdown !== currentDropdown) {
                    dropdown.style.display = "none"; // 收起其他 dropdown
                }
            });

            // 切換當前 dropdown 的展開/收合狀態
            if (currentDropdown) {
                currentDropdown.style.display =
                    currentDropdown.style.display === "block" ? "none" : "block";
            }
        });
    });


    // Handle horizontal-navbar menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".horizontal-navbar .sidebar");
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
      });
    }
    
    // Dropdown functionality for both navbars
    const allDropdownBtns = document.querySelectorAll(".dropdown-btn");
    
    allDropdownBtns.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        const currentDropdown = parent.querySelector(".dropdown");
        
        // Close other dropdowns in the same navbar
        const parentNavbar = this.closest('.navbar, .horizontal-navbar');
        if (parentNavbar) {
          const siblingDropdowns = parentNavbar.querySelectorAll(".dropdown");
          siblingDropdowns.forEach(dropdown => {
            if (dropdown !== currentDropdown) {
              dropdown.classList.remove("active");
            }
          });
        }
        
        // Toggle current dropdown
        if (currentDropdown) {
          currentDropdown.classList.toggle("active");
        }
      });
    });
    
    // Close menus when clicking outside
    document.addEventListener("click", function(e) {
      // Close mobile menu if clicking outside
      if (mobileMenu && !e.target.closest(".horizontal-navbar")) {
        mobileMenu.classList.remove("active");
      }
      
      // Close all dropdowns if clicking outside any navbar
      if (!e.target.closest('.navbar') && !e.target.closest('.horizontal-navbar')) {
        document.querySelectorAll(".dropdown").forEach(dropdown => {
          dropdown.classList.remove("active");
        });
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".horizontal-navbar .sidebar");

    // Function: Close all dropdowns
    const closeAllDropdowns = (exceptDropdown = null) => {
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
            if (dropdown !== exceptDropdown) {
                dropdown.classList.remove("active");
            }
        });
    };

    // Function: Toggle dropdowns for both navbars
    dropdownBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const parent = btn.parentElement;
            const currentDropdown = parent.querySelector(".dropdown");

            // Toggle only the clicked dropdown
            if (currentDropdown) {
                const parentNavbar = btn.closest(".navbar, .horizontal-navbar");
                const siblingDropdowns = parentNavbar.querySelectorAll(".dropdown");

                // Close other dropdowns
                siblingDropdowns.forEach((dropdown) => {
                    if (dropdown !== currentDropdown) {
                        dropdown.classList.remove("active");
                    }
                });

                // Toggle current dropdown
                currentDropdown.classList.toggle("active");
            }
        });
    });

    // Handle menu toggle for horizontal-navbar
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    // Close menus when clicking outside
    document.addEventListener("click", (e) => {
        // Close dropdowns if clicking outside of any navbar
        if (!e.target.closest(".navbar") && !e.target.closest(".horizontal-navbar")) {
            closeAllDropdowns();
        }

        // Close horizontal-navbar menu if clicking outside
        if (mobileMenu && !e.target.closest(".horizontal-navbar")) {
            mobileMenu.classList.remove("active");
        }
    });
});
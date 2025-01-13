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
    const menuToggle = document.querySelector(".menu-toggle"); // 漢堡菜單
    const sidebar = document.querySelector(".horizontal-navbar .sidebar"); // 水平導航的選單

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("hidden"); // 切換 hidden 狀態，顯示或隱藏選單
        });
    }

    // Handle dropdowns in horizontal-navbar
    const horizontalDropdownBtns = document.querySelectorAll(
        ".horizontal-navbar .dropdown-btn"
    );

    horizontalDropdownBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement; // 找到當前的 sidebar-item
            const currentDropdown = parent.querySelector(".dropdown"); // 當前的 dropdown

            // 收合其他展開的 dropdown
            document
                .querySelectorAll(".horizontal-navbar .dropdown")
                .forEach((dropdown) => {
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

});

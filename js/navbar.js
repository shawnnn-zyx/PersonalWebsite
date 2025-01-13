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
});



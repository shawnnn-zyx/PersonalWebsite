document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const dropdown = btn.nextElementSibling;

            // Check if the next sibling is the dropdown and toggle its display
            if (dropdown && dropdown.classList.contains("dropdown")) {
                dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }
        });
    });
});

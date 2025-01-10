document.addEventListener("DOMContentLoaded", () => {
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
          const dropdown = btn.nextElementSibling;

          // Toggle dropdown visibility
          if (dropdown.style.display === "block") {
              dropdown.style.display = "none";
          } else {
              dropdown.style.display = "block";
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    const horizontalNavbar = document.querySelector(".horizontal-navbar");
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".horizontal-navbar .sidebar");

    // 處理漢堡選單點擊事件
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");
        
        // 可選：添加動畫效果
        if (sidebar.classList.contains("show")) {
            sidebar.style.animation = "slideDown 0.3s ease-out forwards";
        } else {
            sidebar.style.animation = "slideUp 0.3s ease-out forwards";
        }
    });

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

    // 點擊其他地方時關閉菜單
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".horizontal-navbar") && sidebar.classList.contains("show")) {
            sidebar.classList.remove("show");
        }
    });

    // 處理視窗大小變化
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            horizontalNavbar.style.display = "none";
            navbar.style.display = "flex";
        } else {
            horizontalNavbar.style.display = "block";
            navbar.style.display = "none";
            // 重置菜單狀態
            sidebar.classList.remove("show");
        }
    });

    // 模拟设备宽度检测
    if (window.innerWidth > 768) {
        horizontalNavbar.style.display = "none"; // 隐藏水平导航栏
        navbar.style.display = "flex"; // 显示竖直导航栏
    }
});



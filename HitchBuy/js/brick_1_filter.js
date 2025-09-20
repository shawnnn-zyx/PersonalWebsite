// 硬編碼的任務資料
const allQuests = [
    {
        id: 1,
        itemName: "Japanese Limited Edition Sneakers",
        location: "Tokyo, Japan",
        potentialProfit: 150,
        deliveryDate: "2025-10-25",
        timestamp: "2025-10-01T10:00:00Z",
        imageUrl: "https://picsum.photos/300/200?random=1"
    },
    {
        id: 2,
        itemName: "Rare Ghibli Studio Figurine",
        location: "Tokyo, Japan",
        potentialProfit: 80,
        deliveryDate: "2025-10-20",
        timestamp: "2025-09-29T12:30:00Z",
        imageUrl: "https://picsum.photos/300/200?random=2"
    },
    {
        id: 3,
        itemName: "Japanese Whiskey",
        location: "Tokyo, Japan",
        potentialProfit: 200,
        deliveryDate: "2025-10-18",
        timestamp: "2025-09-28T15:00:00Z",
        imageUrl: "https://picsum.photos/300/200?random=3"
    },
    {
        id: 4,
        itemName: "Supreme Box Logo Hoodie",
        location: "New York, USA",
        potentialProfit: 250,
        deliveryDate: "2025-11-05",
        timestamp: "2025-09-27T08:45:00Z",
        imageUrl: "https://picsum.photos/300/200?random=4"
    },
    {
        id: 5,
        itemName: "Rare Vinyl Records",
        location: "New York, USA",
        potentialProfit: 90,
        deliveryDate: "2025-11-01",
        timestamp: "2025-09-26T18:00:00Z",
        imageUrl: "https://picsum.photos/300/200?random=5"
    },
    {
        id: 6,
        itemName: "Classic Literature First Edition",
        location: "New York, USA",
        potentialProfit: 120,
        deliveryDate: "2025-10-28",
        timestamp: "2025-09-25T20:10:00Z",
        imageUrl: "https://picsum.photos/300/200?random=6"
    }
];

// 獲取所有篩選器元素
const destinationInput = document.getElementById('destinationFilter');
const arrivalDateInput = document.getElementById('arrivalDate');
const departureDateInput = document.getElementById('departureDate');
const filterButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');
const questListContainer = document.getElementById('questList');

// 輔助函數：計算發布時間
function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) { return Math.floor(interval) + " years ago"; }
    interval = seconds / 2592000;
    if (interval > 1) { return Math.floor(interval) + " months ago"; }
    interval = seconds / 86400;
    if (interval > 1) { return Math.floor(interval) + " days ago"; }
    interval = seconds / 3600;
    if (interval > 1) { return Math.floor(interval) + " hours ago"; }
    interval = seconds / 60;
    if (interval > 1) { return Math.floor(interval) + " minutes ago"; }
    return "just now";
}

// 根據篩選條件篩選任務
function getFilteredQuests() {
    const destination = destinationInput.value.toLowerCase().trim();
    const arrivalDate = arrivalDateInput.value;
    const departureDate = departureDateInput.value;

    return allQuests.filter(quest => {
        const questLocation = quest.location.toLowerCase();
        const questDeliveryDate = new Date(quest.deliveryDate);
        let isLocationMatch = true;
        let isDateMatch = true;

        // 檢查目的地是否匹配
        if (destination && !questLocation.includes(destination)) {
            isLocationMatch = false;
        }

        // 檢查日期是否匹配
        if (arrivalDate && departureDate) {
            const arrivalTimestamp = new Date(arrivalDate);
            const departureTimestamp = new Date(departureDate);

            // 確保任務的交貨日期在用戶的旅行日期範圍內
            if (questDeliveryDate < arrivalTimestamp || questDeliveryDate > departureTimestamp) {
                isDateMatch = false;
            }
        }

        return isLocationMatch && isDateMatch;
    });
}

// 渲染任務列表
function renderQuestList(quests) {
    questListContainer.innerHTML = '';
    if (quests.length === 0) {
        questListContainer.innerHTML = '<p style="text-align: center; color: #777; margin-top: 50px;">No quests found for your filters.</p>';
        return;
    }

    quests.forEach(quest => {
        const questCard = document.createElement('div');
        questCard.className = 'quest-card';

        const deliveryDate = new Date(quest.deliveryDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        questCard.innerHTML = `
            <div class="quest-card-image" style="background-image: url('${quest.imageUrl}');">
                <span class="reward-tag">Earn $${quest.potentialProfit}</span>
                <span class="delivery-date">Deliver by ${deliveryDate}</span>
            </div>
            <div class="quest-card-content">
                <span class="quest-title">${quest.itemName}</span>
                <span class="posted-time">Posted ${timeSince(quest.timestamp)}</span>
            </div>
        `;
        questListContainer.appendChild(questCard);
    });
}

// 監聽篩選和重置按鈕
if (filterButton) {
    filterButton.addEventListener('click', () => {
        const filteredQuests = getFilteredQuests();
        renderQuestList(filteredQuests);
    });
}

if (resetButton) {
    resetButton.addEventListener('click', () => {
        destinationInput.value = '';
        arrivalDateInput.value = '';
        departureDateInput.value = '';
        renderQuestList(allQuests); // 顯示所有任務
    });
}

// 頁面載入時，預設顯示所有任務
document.addEventListener('DOMContentLoaded', () => {
    renderQuestList(allQuests);
});
// js/app.js

// --- Data Storage and Management ---
const WISHLIST_STORAGE_KEY = 'hitchbuyWishlists';

// Load all wishlists from localStorage
function loadWishlists() {
    const wishlistsString = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlistsString ? JSON.parse(wishlistsString) : [];
}

// Save all wishlists to localStorage
function saveWishlists(wishlists) {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlists));
}

// --- Form Submission Logic (for make-wish-step2.html, if it uses this structure) ---
// This part assumes make-wish-step2.html will have a form with similar IDs
// For now, we'll keep the logic from the previous list.js here, adapted for app.js
if (document.getElementById('wishlistForm')) {
    const wishlistForm = document.getElementById('wishlistForm');
    const unitPriceInput = document.getElementById('unitPrice');
    const quantityInput = document.getElementById('quantity');
    const totalPriceDisplay = document.getElementById('totalPriceDisplay');

    function calculateTotalPrice() {
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const quantity = parseInt(quantityInput.value) || 0;
        const total = (unitPrice * quantity).toFixed(2);
        totalPriceDisplay.textContent = total;
    }

    unitPriceInput.addEventListener('input', calculateTotalPrice);
    quantityInput.addEventListener('input', calculateTotalPrice);
    document.addEventListener('DOMContentLoaded', calculateTotalPrice); // Initialize on load

    wishlistForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const itemName = document.getElementById('itemName').value.trim();
        const unitPrice = parseFloat(document.getElementById('unitPrice').value);
        const quantity = parseInt(document.getElementById('quantity').value);
        const purchaseLink = document.getElementById('purchaseLink').value.trim();
        const location = document.getElementById('location').value.trim();
        const description = document.getElementById('description').value.trim();
        const totalPrice = (unitPrice * quantity).toFixed(2);

        if (!itemName || unitPrice <= 0 || quantity <= 0 || !purchaseLink || !location) {
            alert('Please fill in all required fields and ensure price and quantity are valid!');
            return;
        }

        const potentialProfit = (parseFloat(totalPrice) * 0.10).toFixed(2);

        const newWishlistItem = {
            id: Date.now(),
            itemName: itemName,
            unitPrice: unitPrice,
            quantity: quantity,
            totalPrice: totalPrice,
            purchaseLink: purchaseLink,
            location: location,
            description: description,
            potentialProfit: potentialProfit,
            coords: getRandomCoordsForLocation(location), // Simulate coordinates
            timestamp: new Date().toLocaleString()
        };

        let wishlists = loadWishlists();
        wishlists.push(newWishlistItem);
        saveWishlists(wishlists);

        alert(`Your wishlist "${itemName}" has been successfully posted!`);
        wishlistForm.reset();
        calculateTotalPrice();
    });
}


// --- Google Maps Integration ---
let map;
let markers = []; // To keep track of all markers

// Simulates returning coordinates for a given location
// In a real application, this would be an API call to Google Geocoding API or your backend
function getRandomCoordsForLocation(location) {
    const coordsMap = {
        'Taipei City': { lat: 25.0330, lng: 121.5654 },
        'New Taipei City Banqiao District': { lat: 25.0130, lng: 121.4654 },
        'New York Manhattan': { lat: 40.7831, lng: -73.9712 },
        'San Francisco': { lat: 37.7749, lng: -122.4194 },
        'Tokyo': { lat: 35.6895, lng: 139.6917 },
        'London': { lat: 51.5074, lng: -0.1278 },
        'Singapore': { lat: 1.3521, lng: 103.8198 },
        'Sydney': { lat: -33.8688, lng: 151.2093 },
        'Paris': { lat: 48.8566, lng: 2.3522 },
        'Berlin': { lat: 52.5200, lng: 13.4050 },
        'Seoul': { lat: 37.5665, lng: 126.9780 }
    };

    const base = coordsMap[location] || { lat: 30 + Math.random() * 20, lng: 100 + Math.random() * 50 };
    // Add a small random offset to prevent markers from stacking perfectly
    return {
        lat: base.lat + (Math.random() - 0.5) * 0.05,
        lng: base.lng + (Math.random() - 0.5) * 0.05
    };
}

// Google Maps API callback function, called automatically when API loads
function initMap() {
    // Check if the map container exists on the current page
    if (!document.getElementById('map')) {
        console.log("Map container not found on this page. Skipping map initialization.");
        return;
    }

    // Default center if geolocation fails or is denied
    const defaultCenter = { lat: 25.0330, lng: 121.5654 }; // Taipei City

    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultCenter, // Start with default center
        zoom: 8,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false
    });

    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(userLocation); // Set map center to user's location
                map.setZoom(12); // Adjust zoom level for a closer view of the user's area
                console.log("Map centered on user's location:", userLocation);

                // Optionally add a marker for the user's current location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: '#007bff',
                        fillOpacity: 0.8,
                        strokeWeight: 0
                    },
                    title: 'Your Location'
                });

                displayWishlistsOnMap(); // Display wishlists after centering
            },
            () => {
                // Geolocation failed or denied
                handleLocationError(true, map, defaultCenter);
                displayWishlistsOnMap(); // Still display wishlists even if geolocation fails
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map, defaultCenter);
        displayWishlistsOnMap(); // Still display wishlists
    }
}

function handleLocationError(browserHasGeolocation, map, pos) {
    console.warn(
        browserHasGeolocation
            ? 'Error: The Geolocation service failed, or you denied permission.'
            : 'Error: Your browser doesn\'t support geolocation.'
    );
    // Map remains centered at the default position (already set)
    // You can optionally add a message to the user here.
}


// Function to display wishlists as markers on the map
function displayWishlistsOnMap() {
    // Ensure map is initialized before trying to add markers
    if (!map) {
        console.log("Map not initialized yet. Retrying in 500ms.");
        setTimeout(displayWishlistsOnMap, 500); // Retry after a short delay
        return;
    }

    const wishlists = loadWishlists();

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    if (wishlists.length === 0) {
        console.log("No wishlists to display on map.");
        return;
    }

    wishlists.forEach(item => {
        if (item.coords && item.coords.lat && item.coords.lng) {
            const marker = new google.maps.Marker({
                position: { lat: item.coords.lat, lng: item.coords.lng },
                map: map,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0" y="0" width="60" height="30" rx="5" ry="5" fill="#4CAF50" stroke="#fff" stroke-width="2"/>
                            <text x="30" y="20" font-family="Arial, sans-serif" font-size="16" fill="#fff" text-anchor="middle" dominant-baseline="middle">$${item.potentialProfit}</text>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(60, 30),
                    anchor: new google.maps.Point(30, 15)
                },
                title: item.itemName + ' (Profit: $' + item.potentialProfit + ')'
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div>
                        <h3>${item.itemName}</h3>
                        <p>Location: ${item.location}</p>
                        <p>Estimated Profit: <strong>$${item.potentialProfit} USD</strong></p>
                        <button onclick="viewWishlistDetails(${item.id})">View Details / Express Interest</button>
                    </div>
                `
            });

            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
            markers.push(marker);
        }
    });
}

// Placeholder function for expressing interest (will be refined later)
function expressInterest(itemId) {
    const wishlists = loadWishlists();
    const selectedItem = wishlists.find(item => item.id === itemId);

    if (selectedItem) {
        alert(`You expressed interest in "${selectedItem.itemName}"!\n(This would lead to a chat with the wisher)`);
        console.log('HitchBuyer interested in:', selectedItem);
    }
}

// Placeholder function for viewing wishlist details (will be refined later)
function viewWishlistDetails(itemId) {
    alert(`Viewing details for Wishlist #${itemId}!`);
    // In a real app: window.location.href = `wishlist_detail.html?id=${itemId}`;
}

// Ensure map is initialized and wishlists are displayed when DOM is ready,
// but only if the 'map' element exists on the page.
document.addEventListener('DOMContentLoaded', () => {
    // initMap is called as a callback by the Google Maps API script directly,
    // so no explicit call here is needed if 'map' element exists.
});


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

// 渲染任務列表 (新版本)
function renderQuestList(quests) {
    const questListContainer = document.getElementById('questList');
    if (!questListContainer) return;

    questListContainer.innerHTML = '';
    if (quests.length === 0) {
        questListContainer.innerHTML = '<p style="text-align: center; color: #777; margin-top: 50px;">No quests found for your filters.</p>';
        return;
    }

    quests.forEach(quest => {
        const questCard = document.createElement('div');
        questCard.className = 'quest-card';

        // 隨機生成一個圖片來模擬
        const imageUrl = quest.imageUrl || `https://picsum.photos/300/200?random=${quest.id}`;
        
        // 確保你有 deliveryDate 屬性
        const deliveryDate = quest.deliveryDate || 'N/A';

        questCard.innerHTML = `
            <div class="quest-card-image" style="background-image: url('${imageUrl}');">
                <span class="reward-tag">Earn $${quest.potentialProfit}</span>
                <span class="delivery-date">Deliver by ${deliveryDate}</span>
            </div>
            <div class="quest-card-content">
                <span class="quest-title">${quest.itemName}</span>
                <span class="posted-time">Posted ${timeSince(quest.timestamp)}</span>
            </div>
        `;

        questCard.addEventListener('click', () => {
            if (map) {
                map.panTo(new google.maps.LatLng(quest.coords.lat, quest.coords.lng));
            }
        });
        questListContainer.appendChild(questCard);
    });
}
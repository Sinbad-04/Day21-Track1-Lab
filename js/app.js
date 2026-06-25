/* ========================================
   AI TRAVEL PLANNER — App Logic
   Day 18 Human-Centered AI Design
   ======================================== */

// ---- Screen Navigation ----
function goTo(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ---- Toggle Switches (Onboarding permissions) ----
function toggleSwitch(wrapper) {
  const toggle = wrapper.querySelector('.toggle-switch');
  toggle.classList.toggle('active');
}

// ---- Chip Selection ----
function selectChip(chip, groupId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  // Deselect all in group
  group.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  // Select clicked
  chip.classList.add('selected');
}

// ---- Hotel Criteria Sliders ----
function updateCriteria() {
  const labels = ['Thấp', 'Trung bình thấp', 'Trung bình', 'Ưu tiên cao', 'Rất ưu tiên'];
  const sliders = document.querySelectorAll('.criteria-slider input[type="range"]');
  const outputs = [
    document.getElementById('beach-val'),
    document.getElementById('rating-val'),
    document.getElementById('price-val'),
  ];

  sliders.forEach((slider, i) => {
    if (outputs[i]) {
      outputs[i].textContent = labels[parseInt(slider.value) - 1];
    }
  });

  // Reorder hotel cards based on criteria
  reorderHotels(
    parseInt(sliders[0]?.value || 3),
    parseInt(sliders[1]?.value || 3),
    parseInt(sliders[2]?.value || 3)
  );
}

function reorderHotels(beachWeight, ratingWeight, priceWeight) {
  const hotelList = document.getElementById('hotel-list');
  if (!hotelList) return;

  // Hotel data
  const hotels = [
    { id: 'hotel-b', beach: 5, rating: 4.8, price: 2, name: 'Seashore Resort' },   // 50m, 4.8, 2.1M
    { id: 'hotel-a', beach: 3, rating: 4.5, price: 4, name: 'Ocean View Hotel' },   // 200m, 4.5, 1.2M
    { id: 'hotel-c', beach: 1, rating: 4.2, price: 5, name: 'Downtown Homestay' },  // 1.5km, 4.2, 800K
  ];

  // Calculate scores
  hotels.forEach(h => {
    h.score = (h.beach * beachWeight) + (h.rating * ratingWeight) + (h.price * priceWeight);
  });

  // Sort by score descending
  hotels.sort((a, b) => b.score - a.score);

  // Reorder DOM
  hotels.forEach((h, i) => {
    const card = document.getElementById(h.id);
    if (card) {
      hotelList.appendChild(card);

      // Update recommended badge
      if (i === 0) {
        card.classList.add('recommended');
        const imgDiv = card.querySelector('.hotel-img');
        if (imgDiv && !imgDiv.querySelector('.hotel-recommend-badge')) {
          const badge = document.createElement('span');
          badge.className = 'hotel-recommend-badge';
          badge.textContent = '⭐ Đề xuất';
          imgDiv.appendChild(badge);
        }
      } else {
        card.classList.remove('recommended');
        const badge = card.querySelector('.hotel-recommend-badge');
        if (badge) badge.remove();
      }
    }
  });
}

// ---- Itinerary: Remove item ----
function removeItem(itemId) {
  const item = document.getElementById(itemId);
  if (item) {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.maxHeight = '0';
    item.style.overflow = 'hidden';
    item.style.padding = '0';
    item.style.margin = '0';
    setTimeout(() => {
      item.style.display = 'none';
    }, 300);
  }
}

// ---- Itinerary: Show Recovery ----
function showRecovery() {
  const feedbackSection = document.getElementById('feedback-section');
  const recoverySection = document.getElementById('recovery-section');
  const warningBanner = document.getElementById('itinerary-warning');

  if (feedbackSection) feedbackSection.style.display = 'none';
  if (recoverySection) recoverySection.classList.remove('hidden');

  // Change warning to success
  if (warningBanner) {
    warningBanner.className = 'status-success mt-lg';
    warningBanner.innerHTML = '<span>✅</span><span><strong>AI đã phân tích vấn đề</strong> — xem đề xuất điều chỉnh bên dưới</span>';
  }

  // Scroll to recovery
  setTimeout(() => {
    recoverySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  // Set first screen active
  const firstScreen = document.querySelector('.screen.active');
  if (!firstScreen) {
    const screens = document.querySelectorAll('.screen');
    if (screens.length > 0) {
      screens[0].classList.add('active');
    }
  }

  // Initialize criteria labels
  updateCriteria();
});

/* ========================================
   DAY 20 — New flow (prototype edit) logic
   ======================================== */

// Apply AI fix on the redesigned draft screen -> reveal evidence + enable save
function nfApplyFix() {
  const banner = document.getElementById('nf-banner');
  const ev = document.getElementById('nf-evidence');
  const save = document.getElementById('nf-save');

  if (banner) {
    banner.className = 'status-success mt-md';
    banner.innerHTML = '<span>✅</span><span><strong>Đã tinh chỉnh Ngày 1</strong> — rút còn 4 điểm, thêm 1 giờ nghỉ trưa.</span>';
  }
  if (ev) {
    ev.classList.remove('hidden');
    setTimeout(() => ev.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }
  if (save) {
    save.disabled = false;
    save.classList.remove('btn-secondary');
    save.classList.add('btn-success');
  }
}

// First core action — save itinerary -> activation -> go to in-trip companion
function nfSave() {
  const toast = document.getElementById('nf-saved-toast');
  if (toast) toast.classList.remove('hidden');
  setTimeout(() => goTo('screen-intrip'), 950);
}

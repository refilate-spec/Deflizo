// --- 1. GLOBAL STATE & THEME MANAGEMENT ---
const AppState = {
    wishlist: JSON.parse(localStorage.getItem('nexus_wishlist')) || [],
    theme: localStorage.getItem('nexus_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    
    toggleWishlist(id) {
        if (this.wishlist.includes(id)) {
            this.wishlist = this.wishlist.filter(item => item !== id);
        } else {
            this.wishlist.push(id);
            showToast("Added to Saved");
        }
        localStorage.setItem('nexus_wishlist', JSON.stringify(this.wishlist));
        updateWishlistUI();
    },

    initTheme() {
        if (this.theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        
        const themeBtn = document.getElementById('themeToggle');
        if(themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                this.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('nexus_theme', this.theme);
            });
        }
    }
};

// --- 2. UI UTILITIES & TOAST SYSTEM ---
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMsg');
    if(!toast) return;
    
    msg.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100', 'translate-y-0');
        toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
    }, 3000);
}

function updateWishlistUI() {
    const count = AppState.wishlist.length;
    const w1 = document.getElementById('wishlistCount');
    const w2 = document.getElementById('mobileWishlistCount');
    if(w1) w1.textContent = count;
    if(w2) w2.textContent = count;
}

// --- 3. DRAG TO SCROLL PHYSICS ENGINE ---
function initSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active:cursor-grabbing');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active:cursor-grabbing'); });
    slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active:cursor-grabbing'); });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        slider.scrollLeft = scrollLeft - walk;
    });
}

// --- 4. PAGE ROUTER & RENDERERS ---

// A. RENDER INDEX (HOME) PAGE
function renderHomePage() {
    if (!document.getElementById('productGrid')) return;

    // Render Categories
    const catSlider = document.getElementById('categorySlider');
    db.categories.forEach(cat => {
        catSlider.innerHTML += `
            <div class="snap-start shrink-0 bg-white dark:bg-darkcard border border-gray-200 dark:border-gray-800 rounded-full px-6 py-3 flex items-center gap-2 hover:border-primary cursor-pointer transition select-none">
                <i class="ph ${cat.icon} text-primary text-xl"></i>
                <span class="font-medium whitespace-nowrap">${cat.name}</span>
            </div>
        `;
    });

    // Render Products
    const grid = document.getElementById('productGrid');
    db.products.filter(p => p.featured).forEach(p => {
        const isSaved = AppState.wishlist.includes(p.id) ? 'text-red-500 ph-fill' : 'text-gray-400 ph';
        grid.innerHTML += `
            <div class="bg-white dark:bg-darkcard rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300 group relative flex flex-col">
                <div class="absolute top-3 right-3 z-10 p-2 rounded-full glass cursor-pointer shadow-sm hover:scale-110 transition-transform" onclick="AppState.toggleWishlist('${p.id}'); event.stopPropagation();">
                    <i class="${isSaved} ph-heart text-xl wishlist-icon-${p.id}"></i>
                </div>
                <a href="product.html?id=${p.id}" class="block aspect-square p-4 bg-white">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply">
                </a>
                <a href="product.html?id=${p.id}" class="p-4 flex flex-col flex-grow">
                    <span class="text-xs font-bold text-primary tracking-wider uppercase mb-1">${p.brand}</span>
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2 mb-2">${p.title}</h3>
                    <div class="mt-auto flex justify-between items-center">
                        <span class="text-lg font-extrabold">${db.config.currency}${p.price.toFixed(2)}</span>
                        <div class="flex items-center text-xs text-gray-500 gap-1"><i class="ph-fill ph-star text-yellow-400"></i> ${p.rating}</div>
                    </div>
                </a>
            </div>
        `;
    });

    initSlider('categorySlider');
}

// B. RENDER PRODUCT DETAIL PAGE
function renderProductPage() {
    if (!document.getElementById('productContainer')) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = db.products.find(p => p.id === productId);

    if (!product) {
        document.getElementById('productContainer').innerHTML = `<div class="col-span-2 text-center py-20"><h1 class="text-2xl font-bold">Product not found.</h1><a href="index.html" class="text-primary mt-4 inline-block">Return Home</a></div>`;
        document.getElementById('productContainer').classList.remove('opacity-0');
        return;
    }

    // Bind Data to DOM
    document.title = `${product.title} | ${db.config.storeName}`;
    document.getElementById('navTitle').textContent = product.brand;
    document.getElementById('pdImage').src = product.image;
    document.getElementById('pdBrand').textContent = product.brand;
    document.getElementById('pdTitle').textContent = product.title;
    document.getElementById('pdPrice').textContent = `${db.config.currency}${product.price.toFixed(2)}`;
    document.getElementById('pdDesc').textContent = product.desc;
    document.getElementById('pdBuyBtn').href = product.link;

    // Pros & Cons lists
    document.getElementById('pdPros').innerHTML = product.pros.map(p => `<li>${p}</li>`).join('');
    document.getElementById('pdCons').innerHTML = product.cons.map(c => `<li>${c}</li>`).join('');

    // Wishlist binding
    const wBtn = document.getElementById('pdWishlistBtn');
    const updateIcon = () => wBtn.firstElementChild.className = AppState.wishlist.includes(product.id) ? 'ph-fill ph-heart text-2xl text-red-500' : 'ph ph-heart text-2xl text-gray-400';
    updateIcon();
    
    wBtn.onclick = () => { AppState.toggleWishlist(product.id); updateIcon(); };

    // Share API Integration
    document.getElementById('shareBtn').onclick = async () => {
        const shareData = { title: product.title, text: product.desc, url: window.location.href };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log('Error sharing:', err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast("Link copied to clipboard!");
        }
    };

    // Fade In Content
    setTimeout(() => document.getElementById('productContainer').classList.remove('opacity-0'), 100);
}

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    AppState.initTheme();
    updateWishlistUI();
    renderHomePage();
    renderProductPage();
});

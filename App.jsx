// Laiba's Boutique - Full React App
const { useState, useEffect, useRef, useCallback } = React;

// ============ DATA ============
const PRODUCTS = [
  { id: 1, name: "Emerald Silk Kurta", price: "PKR 4,500", cat: "Kurtas", emoji: "👗", badge: "NEW", rating: 4.8 },
  { id: 2, name: "Royal Bridal Lehenga", price: "PKR 28,000", cat: "Bridal", emoji: "💃", badge: "BESTSELLER", rating: 5.0 },
  { id: 3, name: "Lawn Embroidered Suit", price: "PKR 3,200", cat: "Suits", emoji: "🌸", badge: null, rating: 4.6 },
  { id: 4, name: "Chiffon Party Dress", price: "PKR 7,800", cat: "Dresses", emoji: "✨", badge: "HOT", rating: 4.9 },
  { id: 5, name: "Velvet Abaya", price: "PKR 5,500", cat: "Abayas", emoji: "🌿", badge: null, rating: 4.7 },
  { id: 6, name: "Cotton Pret Suit", price: "PKR 2,800", cat: "Suits", emoji: "🌺", badge: "SALE", rating: 4.5 },
  { id: 7, name: "Organza Dupatta", price: "PKR 1,500", cat: "Accessories", emoji: "🧣", badge: null, rating: 4.4 },
  { id: 8, name: "Formal Sherwani", price: "PKR 15,000", cat: "Formal", emoji: "🥻", badge: "LUXURY", rating: 4.9 },
];

const CATEGORIES = ["All", "Kurtas", "Suits", "Dresses", "Bridal", "Abayas", "Formal", "Accessories"];

const HERO_SLIDES = [
  { title: "Summer", titleEm: "Collection", sub: "Style that defines you", tag: "NEW ARRIVALS 2025", btn: "Shop Now" },
  { title: "Bridal", titleEm: "Dreams", sub: "Crafted for your perfect day", tag: "EXCLUSIVE BRIDAL", btn: "Explore" },
  { title: "Luxury", titleEm: "Pret", sub: "Elegance in every thread", tag: "PREMIUM RANGE", btn: "Discover" },
];

const HERO_COLORS = [
  "linear-gradient(135deg, #1a4a2a 0%, #0d2518 100%)",
  "linear-gradient(135deg, #2a1a3a 0%, #180d25 100%)",
  "linear-gradient(135deg, #1a2a4a 0%, #0d1825 100%)",
];

// ============ TOAST ============
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, []);
  return React.createElement('div', { className: 'toast' }, message);
}

// ============ SPLASH SCREEN ============
function SplashScreen({ logoSrc }) {
  return React.createElement('div', { className: 'splash' },
    React.createElement('img', { className: 'splash-logo', src: logoSrc, alt: 'Laiba\'s Boutique' }),
    React.createElement('h1', null, "LAIBA'S"),
    React.createElement('p', null, '✦ BOUTIQUE ✦'),
    React.createElement('div', { className: 'splash-loader' },
      React.createElement('div', { className: 'splash-loader-bar' })
    )
  );
}

// ============ HEADER ============
function Header({ cartCount, onCartClick, logoSrc }) {
  return React.createElement('header', { className: 'header' },
    React.createElement('div', { className: 'header-logo-wrap' },
      React.createElement('img', { className: 'header-logo', src: logoSrc, alt: 'Logo' }),
      React.createElement('div', { className: 'header-brand' },
        "LAIBA'S",
        React.createElement('span', null, '✦ Style that defines you')
      )
    ),
    React.createElement('div', { className: 'header-actions' },
      React.createElement('button', { className: 'icon-btn', title: 'Notifications' }, '🔔'),
      React.createElement('button', { className: 'icon-btn cart-badge', onClick: onCartClick },
        '🛍️',
        cartCount > 0 && React.createElement('span', { className: 'badge' }, cartCount)
      )
    )
  );
}

// ============ TAB BAR ============
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'wishlist', icon: '❤️', label: 'Wishlist' },
    { id: 'cart', icon: '🛒', label: 'Cart' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];
  return React.createElement('nav', { className: 'tab-bar' },
    tabs.map(tab =>
      React.createElement('button', {
        key: tab.id,
        className: `tab-item ${active === tab.id ? 'active' : ''}`,
        onClick: () => onChange(tab.id)
      },
        React.createElement('span', { className: 'tab-icon' }, tab.icon),
        React.createElement('span', { className: 'tab-label' }, tab.label)
      )
    )
  );
}

// ============ PRODUCT CARD ============
function ProductCard({ product, onAddCart, onToggleFav, isFav, delay }) {
  const [added, setAdded] = useState(false);
  const handleAdd = (e) => {
    e.stopPropagation();
    onAddCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };
  return React.createElement('div', {
    className: 'product-card',
    style: { animationDelay: `${delay * 0.08}s` }
  },
    React.createElement('div', { className: 'product-img-wrap' },
      React.createElement('div', {
        className: 'hero-bg',
        style: { background: HERO_COLORS[product.id % 3], opacity: 0.6 }
      }),
      React.createElement('span', { className: 'product-emoji' }, product.emoji),
      product.badge && React.createElement('span', { className: 'product-badge' }, product.badge),
      React.createElement('button', {
        className: `product-fav ${isFav ? 'liked' : ''}`,
        onClick: (e) => { e.stopPropagation(); onToggleFav(product.id); }
      }, isFav ? '❤️' : '🤍')
    ),
    React.createElement('div', { className: 'product-info' },
      React.createElement('div', { className: 'product-name' }, product.name),
      React.createElement('div', { className: 'product-cat' }, product.cat + ' • ⭐ ' + product.rating),
      React.createElement('div', { className: 'product-footer' },
        React.createElement('span', { className: 'product-price' }, product.price),
        React.createElement('button', {
          className: 'add-btn',
          onClick: handleAdd,
          title: 'Add to cart'
        }, added ? '✓' : '+')
      )
    )
  );
}

// ============ HOME PAGE ============
function HomePage({ onAddCart, onToggleFav, favorites, showToast }) {
  const [slide, setSlide] = useState(0);
  const [activeCat, setActiveCat] = useState("All");
  const [apiData, setApiData] = useState(null);
  const [loadingApi, setLoadingApi] = useState(false);

  // Auto-slide hero
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Fetch fashion tip from Claude API
  const fetchStyleTip = useCallback(async () => {
    setLoadingApi(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 120,
          messages: [{
            role: "user",
            content: "Give me one luxury fashion styling tip for a boutique customer in 1-2 sentences. Make it elegant and inspiring. Start directly with the tip."
          }]
        })
      });
      const data = await res.json();
      const tip = data.content?.find(b => b.type === 'text')?.text || "Elevate your look with timeless elegance.";
      setApiData(tip);
    } catch (e) {
      setApiData("Style is a way to say who you are without having to speak. Let Laiba's Boutique define your story.");
    }
    setLoadingApi(false);
  }, []);

  useEffect(() => { fetchStyleTip(); }, []);

  const filtered = activeCat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  return React.createElement('div', { className: 'page-enter' },
    // Hero Banner
    React.createElement('div', { className: 'hero-banner' },
      HERO_SLIDES.map((s, i) =>
        React.createElement('div', { key: i, className: `hero-slide ${i === slide ? 'active' : ''}` },
          React.createElement('div', {
            className: 'hero-bg',
            style: { background: HERO_COLORS[i] }
          }),
          React.createElement('div', { className: 'hero-content' },
            React.createElement('span', { className: 'hero-tag' }, s.tag),
            React.createElement('h1', { className: 'hero-title' },
              s.title + ' ',
              React.createElement('em', null, s.titleEm)
            ),
            React.createElement('p', { className: 'hero-subtitle' }, s.sub),
            React.createElement('button', { className: 'hero-btn' }, s.btn + ' →')
          )
        )
      ),
      React.createElement('div', { className: 'hero-dots' },
        HERO_SLIDES.map((_, i) =>
          React.createElement('div', {
            key: i,
            className: `hero-dot ${i === slide ? 'active' : ''}`,
            onClick: () => setSlide(i)
          })
        )
      )
    ),

    // AI Style Tip
    React.createElement('div', { style: { padding: '1rem 1.2rem 0' } },
      React.createElement('div', {
        style: {
          background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(45,90,61,0.2) 100%)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '10px',
          padding: '0.8rem 1rem',
          cursor: 'pointer'
        },
        onClick: fetchStyleTip
      },
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' } },
          React.createElement('span', null, '✨'),
          React.createElement('span', {
            style: {
              fontFamily: 'Cinzel, serif',
              color: 'var(--gold)',
              fontSize: '0.65rem',
              letterSpacing: '2px'
            }
          }, 'AI STYLE TIP'),
          React.createElement('span', {
            style: { marginLeft: 'auto', color: 'var(--sage)', fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif' }
          }, 'Tap to refresh ↻')
        ),
        loadingApi
          ? React.createElement('div', { className: 'skeleton', style: { height: '32px', borderRadius: '4px' } })
          : React.createElement('p', {
              style: {
                fontFamily: 'Cormorant Garamond, serif',
                color: 'var(--cream)',
                fontSize: '0.88rem',
                fontStyle: 'italic',
                lineHeight: '1.5'
              }
            }, apiData)
      )
    ),

    // Promo Banner
    React.createElement('div', { className: 'section-header', style: { paddingBottom: '0.5rem' } },
      React.createElement('div', null,
        React.createElement('div', { className: 'section-title' }, 'Special Offer'),
        React.createElement('span', { className: 'section-sub' }, 'Limited time deal')
      )
    ),
    React.createElement('div', { className: 'promo-banner' },
      React.createElement('div', { className: 'promo-text' },
        React.createElement('h3', null, 'Eid Collection'),
        React.createElement('p', null, 'Use code: LAIBA20')
      ),
      React.createElement('div', { className: 'promo-percent' }, '20%\nOFF')
    ),

    // Categories
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', null,
        React.createElement('div', { className: 'section-title' }, 'Collections'),
        React.createElement('span', { className: 'section-sub' }, 'Curated for you')
      )
    ),
    React.createElement('div', { className: 'category-scroll' },
      CATEGORIES.map(cat =>
        React.createElement('button', {
          key: cat,
          className: `cat-chip ${activeCat === cat ? 'active' : ''}`,
          onClick: () => setActiveCat(cat)
        }, cat)
      )
    ),

    // Products Grid
    React.createElement('div', { className: 'product-grid' },
      filtered.map((product, i) =>
        React.createElement(ProductCard, {
          key: product.id,
          product,
          delay: i,
          onAddCart: (p) => { onAddCart(p); showToast('Added to cart! 🛍️'); },
          onToggleFav,
          isFav: favorites.includes(product.id)
        })
      )
    ),

    // Bottom padding
    React.createElement('div', { style: { height: '1rem' } })
  );
}

// ============ SEARCH PAGE ============
function SearchPage({ onAddCart, onToggleFav, favorites, showToast }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);

  const trends = ['Bridal', 'Eid Special', 'Lawn Suits', 'Party Wear', 'Kurta Sets', 'Velvet', 'Chiffon'];

  const doSearch = (q) => {
    const term = q.toLowerCase();
    const r = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.cat.toLowerCase().includes(term)
    );
    setResults(r);
  };

  const getAiSuggestions = async () => {
    if (!query.trim()) return;
    setSearching(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 150,
          messages: [{
            role: "user",
            content: `A customer is searching for "${query}" in a Pakistani boutique called Laiba's Boutique. Suggest 3 related clothing items they might like, each on a new line with a bullet •. Keep it concise.`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === 'text')?.text || '';
      setAiSuggestions(text.split('\n').filter(l => l.trim().startsWith('•')));
    } catch { setAiSuggestions([]); }
    setSearching(false);
  };

  return React.createElement('div', { className: 'page-enter' },
    // Search Bar
    React.createElement('div', { className: 'search-bar-wrap' },
      React.createElement('div', { className: 'search-input-wrap' },
        React.createElement('span', { className: 'search-icon' }, '🔍'),
        React.createElement('input', {
          className: 'search-input',
          type: 'text',
          placeholder: 'Search dresses, suits, bridal...',
          value: query,
          onChange: e => { setQuery(e.target.value); doSearch(e.target.value); },
          onKeyDown: e => e.key === 'Enter' && getAiSuggestions()
        })
      )
    ),

    // Trending Tags
    React.createElement('div', { style: { padding: '0.5rem 1.2rem 0.2rem' } },
      React.createElement('div', {
        style: { fontFamily: 'Cinzel, serif', color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.6rem' }
      }, '🔥 TRENDING'),
      React.createElement('div', { className: 'trend-tags' },
        trends.map(t =>
          React.createElement('button', {
            key: t,
            className: 'trend-tag',
            onClick: () => { setQuery(t); doSearch(t); }
          }, t)
        )
      )
    ),

    // AI Suggestions
    query.trim() && React.createElement('div', {
      style: { padding: '0.5rem 1.2rem' }
    },
      React.createElement('button', {
        onClick: getAiSuggestions,
        style: {
          background: 'linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(45,90,61,0.15) 100%)',
          border: '1px solid rgba(201,168,76,0.3)',
          color: 'var(--gold)',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.7rem',
          letterSpacing: '1px',
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.3s ease'
        }
      }, searching ? '✨ Finding suggestions...' : '✨ Get AI Style Suggestions'),
      aiSuggestions.length > 0 && React.createElement('div', {
        style: {
          marginTop: '0.6rem',
          background: 'rgba(45,90,61,0.2)',
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: '8px',
          padding: '0.8rem'
        }
      },
        aiSuggestions.map((s, i) =>
          React.createElement('p', {
            key: i,
            style: {
              fontFamily: 'Cormorant Garamond, serif',
              color: 'var(--cream)',
              fontSize: '0.88rem',
              fontStyle: 'italic',
              lineHeight: '1.6',
              marginBottom: i < aiSuggestions.length - 1 ? '0.4rem' : 0
            }
          }, s)
        )
      )
    ),

    // Results
    React.createElement('div', { style: { padding: '0.5rem 1.2rem 0.3rem' } },
      React.createElement('div', {
        style: { fontFamily: 'Cinzel, serif', color: 'var(--gold-light)', fontSize: '0.85rem', letterSpacing: '2px' }
      }, query ? `${results.length} Results for "${query}"` : '✦ ALL PRODUCTS')
    ),
    React.createElement('div', { className: 'product-grid' },
      (query ? results : PRODUCTS).map((product, i) =>
        React.createElement(ProductCard, {
          key: product.id,
          product,
          delay: i,
          onAddCart: (p) => { onAddCart(p); showToast('Added to cart! 🛍️'); },
          onToggleFav,
          isFav: favorites.includes(product.id)
        })
      )
    ),
    React.createElement('div', { style: { height: '1rem' } })
  );
}

// ============ WISHLIST PAGE ============
function WishlistPage({ favorites, onAddCart, onToggleFav, showToast }) {
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));
  if (favProducts.length === 0) {
    return React.createElement('div', { className: 'page-enter' },
      React.createElement('div', { className: 'wishlist-empty' },
        React.createElement('div', { className: 'wishlist-empty-icon' }, '💚'),
        React.createElement('h3', null, 'Your Wishlist is Empty'),
        React.createElement('p', null, 'Tap ❤️ on any item to save your favorites'),
        React.createElement('div', { style: { marginTop: '1rem', color: 'var(--sage)', fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '1px' } },
          '✦ LAIBA\'S BOUTIQUE ✦'
        )
      )
    );
  }
  return React.createElement('div', { className: 'page-enter' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        '❤️ My Wishlist',
        React.createElement('span', { className: 'section-sub' }, `${favProducts.length} items saved`)
      )
    ),
    React.createElement('div', { className: 'product-grid' },
      favProducts.map((product, i) =>
        React.createElement(ProductCard, {
          key: product.id,
          product,
          delay: i,
          onAddCart: (p) => { onAddCart(p); showToast('Added to cart! 🛍️'); },
          onToggleFav,
          isFav: true
        })
      )
    ),
    React.createElement('div', { style: { height: '1rem' } })
  );
}

// ============ CART PAGE ============
function CartPage({ cart, onUpdateQty, onRemove, showToast }) {
  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + price * item.qty;
  }, 0);

  if (cart.length === 0) {
    return React.createElement('div', { className: 'page-enter' },
      React.createElement('div', { className: 'wishlist-empty' },
        React.createElement('div', { className: 'wishlist-empty-icon' }, '🛒'),
        React.createElement('h3', null, 'Your Cart is Empty'),
        React.createElement('p', null, 'Add items from the shop to get started')
      )
    );
  }

  return React.createElement('div', { className: 'page-enter' },
    React.createElement('div', { className: 'section-header' },
      React.createElement('div', { className: 'section-title' },
        '🛒 My Cart',
        React.createElement('span', { className: 'section-sub' }, `${cart.length} items`)
      )
    ),
    cart.map(item =>
      React.createElement('div', { key: item.id, className: 'cart-item' },
        React.createElement('div', { className: 'cart-item-img' }, item.emoji),
        React.createElement('div', { className: 'cart-item-info' },
          React.createElement('div', { className: 'cart-item-name' }, item.name),
          React.createElement('div', { className: 'cart-item-price' }, item.price)
        ),
        React.createElement('div', { className: 'cart-qty' },
          React.createElement('button', { className: 'qty-btn', onClick: () => onUpdateQty(item.id, item.qty - 1) }, '−'),
          React.createElement('span', { className: 'qty-num' }, item.qty),
          React.createElement('button', { className: 'qty-btn', onClick: () => onUpdateQty(item.id, item.qty + 1) }, '+')
        )
      )
    ),
    React.createElement('div', { className: 'cart-summary' },
      React.createElement('div', { className: 'summary-row' },
        React.createElement('span', null, 'Subtotal'),
        React.createElement('span', null, `PKR ${total.toLocaleString()}`)
      ),
      React.createElement('div', { className: 'summary-row' },
        React.createElement('span', null, 'Delivery'),
        React.createElement('span', null, 'PKR 150')
      ),
      React.createElement('div', { className: 'summary-row total' },
        React.createElement('span', null, 'Total'),
        React.createElement('span', null, `PKR ${(total + 150).toLocaleString()}`)
      ),
      React.createElement('button', {
        className: 'checkout-btn',
        onClick: () => showToast('Order placed successfully! 🎉')
      }, 'CHECKOUT →')
    ),
    React.createElement('div', { style: { height: '1rem' } })
  );
}

// ============ PROFILE PAGE ============
function ProfilePage({ showToast }) {
  const [aiTip, setAiTip] = useState('');
  const [loadingTip, setLoadingTip] = useState(false);

  const getPersonalizedTip = async () => {
    setLoadingTip(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 100,
          messages: [{
            role: "user",
            content: "Give one personalized fashion advice message for a VIP boutique member. Make it warm, luxury-feeling, and specific to Pakistani fashion. Start with their name 'Dear Laiba Customer,'"
          }]
        })
      });
      const data = await res.json();
      setAiTip(data.content?.find(b => b.type === 'text')?.text || '');
    } catch { setAiTip('Your style is unique and beautiful. Let Laiba\'s Boutique help you shine every day!'); }
    setLoadingTip(false);
  };

  const menuItems = [
    { icon: '📦', label: 'My Orders', sub: '3 active orders' },
    { icon: '📍', label: 'Addresses', sub: 'Manage delivery addresses' },
    { icon: '💳', label: 'Payment Methods', sub: 'Cards & mobile wallets' },
    { icon: '🎁', label: 'Loyalty Points', sub: '1,240 points earned' },
    { icon: '🔔', label: 'Notifications', sub: 'Manage alerts' },
    { icon: '⭐', label: 'Rate Our App', sub: 'Tell us your experience' },
    { icon: '📞', label: 'Contact Support', sub: 'We\'re here to help' },
  ];

  return React.createElement('div', { className: 'page-enter' },
    React.createElement('div', { className: 'profile-hero' },
      React.createElement('div', { className: 'profile-avatar' }, '👑'),
      React.createElement('div', { className: 'profile-name' }, "LAIBA'S MEMBER"),
      React.createElement('div', { className: 'profile-email' }, 'member@laibasboutique.com'),
      React.createElement('div', { className: 'profile-stats' },
        React.createElement('div', { className: 'stat' },
          React.createElement('span', { className: 'stat-num' }, '12'),
          React.createElement('span', { className: 'stat-label' }, 'Orders')
        ),
        React.createElement('div', { className: 'stat' },
          React.createElement('span', { className: 'stat-num' }, '1.2k'),
          React.createElement('span', { className: 'stat-label' }, 'Points')
        ),
        React.createElement('div', { className: 'stat' },
          React.createElement('span', { className: 'stat-num' }, 'VIP'),
          React.createElement('span', { className: 'stat-label' }, 'Status')
        )
      )
    ),

    // AI Personal Stylist
    React.createElement('div', { style: { padding: '1rem 1rem 0' } },
      React.createElement('button', {
        onClick: getPersonalizedTip,
        style: {
          width: '100%',
          background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-shine) 100%)',
          border: 'none',
          borderRadius: '10px',
          padding: '0.8rem',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '2px',
          color: 'var(--dark)',
          cursor: 'pointer',
          marginBottom: '0.6rem'
        }
      }, '✨ GET AI STYLE ADVICE'),
      aiTip && React.createElement('div', {
        style: {
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '10px',
          padding: '0.8rem',
          marginBottom: '0.6rem'
        }
      },
        loadingTip
          ? React.createElement('div', { className: 'skeleton', style: { height: '40px' } })
          : React.createElement('p', {
              style: {
                fontFamily: 'Cormorant Garamond, serif',
                color: 'var(--cream)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                lineHeight: '1.5'
              }
            }, aiTip)
      )
    ),

    // Menu Items
    React.createElement('div', { className: 'profile-menu' },
      menuItems.map((item, i) =>
        React.createElement('div', {
          key: i,
          className: 'menu-item',
          onClick: () => showToast(`Opening ${item.label}...`),
          style: { animationDelay: `${i * 0.05}s` }
        },
          React.createElement('div', { className: 'menu-icon' }, item.icon),
          React.createElement('div', { className: 'menu-text' },
            React.createElement('span', { className: 'menu-label' }, item.label),
            React.createElement('span', { className: 'menu-sub' }, item.sub)
          ),
          React.createElement('span', { className: 'menu-arrow' }, '›')
        )
      ),
      React.createElement('div', {
        className: 'menu-item',
        style: { borderColor: 'rgba(231, 76, 60, 0.3)' },
        onClick: () => showToast('Logged out successfully')
      },
        React.createElement('div', { className: 'menu-icon', style: { fontSize: '1.2rem' } }, '🚪'),
        React.createElement('div', { className: 'menu-text' },
          React.createElement('span', { className: 'menu-label', style: { color: '#e74c3c' } }, 'Log Out')
        )
      )
    ),

    // Footer
    React.createElement('div', {
      style: {
        textAlign: 'center',
        padding: '1rem',
        fontFamily: 'Cormorant Garamond, serif',
        color: 'var(--sage)',
        fontSize: '0.8rem',
        fontStyle: 'italic'
      }
    }, '✦ Laiba\'s Boutique © 2025 ✦', React.createElement('br'), 'Style that defines you'),
    React.createElement('div', { style: { height: '1rem' } })
  );
}

// ============ MAIN APP ============
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);
  const logoSrc = 'logo.png';

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 3800);
    return () => clearTimeout(t);
  }, []);

  const showToast = (msg) => {
    setToast(null);
    setTimeout(() => setToast(msg), 10);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { setCart(prev => prev.filter(i => i.id !== id)); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const toggleFav = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const renderPage = () => {
    const props = { onAddCart: addToCart, onToggleFav: toggleFav, favorites, showToast };
    switch (activeTab) {
      case 'home': return React.createElement(HomePage, props);
      case 'search': return React.createElement(SearchPage, props);
      case 'wishlist': return React.createElement(WishlistPage, { ...props, cart });
      case 'cart': return React.createElement(CartPage, { cart, onUpdateQty: updateQty, onRemove: id => setCart(prev => prev.filter(i => i.id !== id)), showToast });
      case 'profile': return React.createElement(ProfilePage, { showToast });
      default: return null;
    }
  };

  return React.createElement(React.Fragment, null,
    showSplash && React.createElement(SplashScreen, { logoSrc }),
    React.createElement('div', { className: 'app' },
      React.createElement(Header, {
        cartCount: cart.reduce((s, i) => s + i.qty, 0),
        onCartClick: () => setActiveTab('cart'),
        logoSrc
      }),
      React.createElement('div', { className: 'page-content' }, renderPage()),
      React.createElement(TabBar, { active: activeTab, onChange: setActiveTab })
    ),
    toast && React.createElement(Toast, { message: toast, onDone: () => setToast(null) })
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

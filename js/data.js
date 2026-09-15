// Central Mock Database matching robust schema
const db = {
    config: {
        currency: "$",
        storeName: "Nexus",
    },
    categories: [
        { id: "c1", name: "Tech & Gadgets", icon: "ph-desktop-tower" },
        { id: "c2", name: "Audio", icon: "ph-headphones" },
        { id: "c3", name: "Smart Home", icon: "ph-house-line" },
        { id: "c4", name: "Wearables", icon: "ph-watch" },
        { id: "c5", name: "Gaming", icon: "ph-game-controller" },
        { id: "c6", name: "Photography", icon: "ph-camera" },
    ],
    products: [
        {
            id: "p1",
            title: "Sony WH-1000XM5 Noise Canceling Headphones",
            brand: "Sony",
            category: "c2",
            price: 398.00,
            image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600",
            rating: 4.8,
            desc: "The industry-leading noise canceling headphones with Auto NC Optimizer, 30-hour battery life, and crystal clear hands-free calling.",
            pros: ["Best-in-class ANC", "Extremely comfortable", "Multipoint connection"],
            cons: ["Not foldable", "Expensive"],
            specs: { "Battery": "30 Hours", "Weight": "250g", "Bluetooth": "v5.2" },
            link: "https://amazon.com",
            featured: true
        },
        {
            id: "p2",
            title: "MacBook Air M2 (Midnight)",
            brand: "Apple",
            category: "c1",
            price: 1199.00,
            image: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?auto=format&fit=crop&q=80&w=600",
            rating: 4.9,
            desc: "Supercharged by M2. Strikingly thin design. All-day battery life. The ultimate portable productivity machine.",
            pros: ["Blazing fast M2 chip", "Gorgeous display", "Fanless/Silent"],
            cons: ["Base model storage is slow", "Notch design"],
            specs: { "RAM": "8GB Unified", "Storage": "256GB SSD", "Screen": "13.6-inch Liquid Retina" },
            link: "https://apple.com",
            featured: true
        },
        {
            id: "p3",
            title: "Oura Ring Gen3 Horizon",
            brand: "Oura",
            category: "c4",
            price: 349.00,
            image: "https://images.unsplash.com/photo-1599813296230-00d98471844b?auto=format&fit=crop&q=80&w=600",
            rating: 4.5,
            desc: "Revolutionary smart ring that tracks sleep, readiness, and activity in an elegant titanium design.",
            pros: ["Discreet tracking", "Excellent sleep data", "7-day battery"],
            cons: ["Requires monthly subscription", "Easily scratched"],
            specs: { "Material": "Titanium", "Water Res": "100m", "Sensors": "HR, Temp, SpO2" },
            link: "#",
            featured: true
        },
        {
            id: "p4",
            title: "Logitech MX Master 3S",
            brand: "Logitech",
            category: "c1",
            price: 99.99,
            image: "https://images.unsplash.com/photo-1615663245857-ac1e6be124db?auto=format&fit=crop&q=80&w=600",
            rating: 4.7,
            desc: "Iconic mouse, remastered. Features Quiet Clicks, 8K DPI any-surface tracking, and MagSpeed scrolling.",
            pros: ["Ergonomic design", "Quiet clicks", "Customizable buttons"],
            cons: ["Right-hand only", "Heavy"],
            specs: { "DPI": "8000", "Battery": "70 days", "Connectivity": "Bluetooth & USB" },
            link: "#",
            featured: true
        }
    ]
};

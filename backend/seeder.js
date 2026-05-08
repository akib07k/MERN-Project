import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: 'admin123',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: '123456',
  },
  {
    name: 'Jane Doe',
    email: 'jane@email.com',
    password: '123456',
  },
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await Promise.all(users.map(user => User.create(user)));
    const adminUser = createdUsers[0]._id;

    const sampleProducts = [
      // Mobiles (5 existing + 4 new = 9)
      {
        name: 'iPhone 15 Pro 512GB',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400',
        description: 'Titanium design, A17 Pro chip, 48MP camera system. The most powerful iPhone ever.',
        brand: 'Apple', category: 'Mobiles', price: 999.99, countInStock: 7, user: adminUser,
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
        description: '200MP camera, built-in S Pen, 6.8" Dynamic AMOLED 2X display, AI features.',
        brand: 'Samsung', category: 'Mobiles', price: 1199.99, countInStock: 5, user: adminUser,
      },
      {
        name: 'OnePlus 12 5G',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400',
        description: 'Snapdragon 8 Gen 3, 50MP triple camera, 100W SUPERVOOC charging.',
        brand: 'OnePlus', category: 'Mobiles', price: 699.99, countInStock: 10, user: adminUser,
      },
      {
        name: 'Google Pixel 8 Pro',
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400',
        description: 'The all-pro phone engineered by Google. Sharp, smooth, and more capable than ever.',
        brand: 'Google', category: 'Mobiles', price: 899.99, countInStock: 8, user: adminUser,
      },
      {
        name: 'Xiaomi 14 Ultra',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
        description: 'Leica Summilux optical lens, WQHD+ dynamic 1-120Hz AMOLED display.',
        brand: 'Xiaomi', category: 'Mobiles', price: 949.99, countInStock: 6, user: adminUser,
      },
      {
        name: 'Nothing Phone (2)',
        image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400',
        description: 'Unique glyph interface, Snapdragon 8+ Gen 1, 50MP dual camera.',
        brand: 'Nothing', category: 'Mobiles', price: 599.99, countInStock: 12, user: adminUser,
      },
      {
        name: 'Motorola Edge 50 Pro',
        image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400',
        description: 'World\'s first AI-powered pro-grade camera, 125W TurboPower charging.',
        brand: 'Motorola', category: 'Mobiles', price: 449.99, countInStock: 15, user: adminUser,
      },
      {
        name: 'Asus ROG Phone 8 Pro',
        image: '/uploads/asus_rog_phone_8_pro_1773679764972.png',
        description: 'Performance beyond geek. Gaming flagship with LTPO AMOLED display.',
        brand: 'Asus', category: 'Mobiles', price: 1099.99, countInStock: 4, user: adminUser,
      },
      {
        name: 'Sony Xperia 1 V',
        image: 'https://images.unsplash.com/photo-1520923179273-042d871908aa?w=400',
        description: '4K HDR OLED display, specialized Alpha camera tech for enthusiasts.',
        brand: 'Sony', category: 'Mobiles', price: 1299.99, countInStock: 3, user: adminUser,
      },
      // Electronics (6 existing + 2 new = 8)
      {
        name: 'Premium Wireless Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        description: 'High-fidelity audio with noise cancellation and long-lasting battery life.',
        brand: 'AudioTech', category: 'Electronics', price: 189.99, countInStock: 10, user: adminUser,
      },
      {
        name: 'Sony Playstation 5 Slim',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
        description: 'The PS5 console unleashes new gaming possibilities with ultra-high-speed SSD.',
        brand: 'Sony', category: 'Electronics', price: 449.99, countInStock: 5, user: adminUser,
      },
      {
        name: 'Advanced Smart Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
        description: 'Modern smartwatch with health monitoring, GPS, and 7-day battery life.',
        brand: 'TechGear', category: 'Electronics', price: 249.99, countInStock: 8, user: adminUser,
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400',
        description: 'Industry-leading noise cancelling with Auto NC Optimizer, 30-hour battery.',
        brand: 'Sony', category: 'Electronics', price: 349.99, countInStock: 6, user: adminUser,
      },
      {
        name: 'Dell 27" 4K Monitor',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
        description: '4K UHD IPS panel, 60Hz, USB-C, perfect for creative professionals.',
        brand: 'Dell', category: 'Electronics', price: 499.99, countInStock: 4, user: adminUser,
      },
      {
        name: 'MacBook Pro 14 M3',
        image: '/uploads/macbook_pro_14_m3_space_black_1773679911165.png',
        description: 'Mind-blowing performance, stunning Liquid Retina XDR display.',
        brand: 'Apple', category: 'Electronics', price: 1599.99, countInStock: 3, user: adminUser,
      },
      {
        name: 'Mechanical Gaming Keyboard',
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400',
        description: 'RGB mechanical keyboard with blue switches for precise gaming.',
        brand: 'GameMaster', category: 'Electronics', price: 89.99, countInStock: 15, user: adminUser,
      },
      {
        name: 'Wireless Gaming Mouse',
        image: '/uploads/wireless_gaming_mouse_rgb_1773679931553.png',
        description: 'Ergonomic wireless mouse with high precision sensor and custom buttons.',
        brand: 'LogiTech', category: 'Electronics', price: 69.99, countInStock: 20, user: adminUser,
      },
      // Fashion (4 existing + 4 new = 8)
      {
        name: 'Premium Cotton Hoodie',
        image: '/uploads/premium_cotton_hoodie_charcoal_1773679782557.png',
        description: 'Oversized cotton hoodie in charcoal grey, high-quality fabric, modern streetwear.',
        brand: 'UrbanStyle', category: 'Fashion', price: 59.99, countInStock: 15, user: adminUser,
      },
      {
        name: 'Men\'s Slim Fit Denim Jacket',
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
        description: 'Classic slim fit denim jacket with button closure. Perfect for casual wear.',
        brand: 'DenimCo', category: 'Fashion', price: 79.99, countInStock: 20, user: adminUser,
      },
      {
        name: 'Women\'s Floral Sundress',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
        description: 'Lightweight floral print sundress, perfect for summer outings.',
        brand: 'Florals', category: 'Fashion', price: 49.99, countInStock: 18, user: adminUser,
      },
      {
        name: 'Leather Weekend Bag',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400',
        description: 'Handcrafted leather travel bag with spacious compartments and premium finish.',
        brand: 'Heritage', category: 'Fashion', price: 149.99, countInStock: 10, user: adminUser,
      },
      {
        name: 'Classic White Sneakers',
        image: '/uploads/classic_white_sneakers_leather_1773679802395.png',
        description: 'Minimalist white leather sneakers, durable and comfortable for daily use.',
        brand: 'UrbanStep', category: 'Fashion', price: 65.99, countInStock: 25, user: adminUser,
      },
      {
        name: 'Silk Evening Gown',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
        description: 'Stunning silk gown for formal evening events, elegant and luxurious.',
        brand: 'LuxeFashion', category: 'Fashion', price: 299.99, countInStock: 5, user: adminUser,
      },
      {
        name: 'Wool Winter Coat',
        image: '/uploads/wool_winter_coat_navy_1773679819761.png',
        description: 'Warm wool blend coat, classic design for winter protection and style.',
        brand: 'Heritage', category: 'Fashion', price: 189.99, countInStock: 12, user: adminUser,
      },
      {
        name: 'Designer Sunglasses',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
        description: 'Premium polarized sunglasses with UV protection and designer frames.',
        brand: 'StyleView', category: 'Fashion', price: 120.00, countInStock: 30, user: adminUser,
      },
      // Beauty (3 existing + 5 new = 8)
      {
        name: 'Vitamin C Face Serum',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400',
        description: 'Brightening vitamin C serum with hyaluronic acid for glowing skin.',
        brand: 'GlowUp', category: 'Beauty', price: 34.99, countInStock: 30, user: adminUser,
      },
      {
        name: 'Luxury Perfume Set',
        image: '/uploads/luxury_perfume_bottle_1773679837145.png',
        description: 'Premium fragrance collection with 3 eau de parfum bottles, elegant gifting option.',
        brand: 'LuxeScent', category: 'Beauty', price: 89.99, countInStock: 12, user: adminUser,
      },
      {
        name: 'Professional Hair Dryer',
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400',
        description: '2000W ionic hair dryer with diffuser and concentrator attachments.',
        brand: 'StylePro', category: 'Beauty', price: 69.99, countInStock: 9, user: adminUser,
      },
      {
        name: 'Hydrating Clay Mask',
        image: '/uploads/hydrating_clay_mask_jar_1773679859165.png',
        description: 'Deep cleansing clay mask for refreshing and detoxifying your skin.',
        brand: 'PureSkin', category: 'Beauty', price: 24.99, countInStock: 40, user: adminUser,
      },
      {
        name: 'Red Matte Lipstick',
        image: '/uploads/red_matte_lipstick_open_1773679876794.png',
        description: 'Long-lasting matte lipstick in classic red, smudge-proof formula.',
        brand: 'GlamLook', category: 'Beauty', price: 19.99, countInStock: 50, user: adminUser,
      },
      {
        name: 'Organic Face Oil',
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400',
        description: '100% pure organic face oil for nocturnal repair and deep hydration.',
        brand: 'NaturePure', category: 'Beauty', price: 45.00, countInStock: 20, user: adminUser,
      },
      {
        name: 'Professional Makeup Brushes',
        image: '/uploads/professional_makeup_brushes_set_1773680091673.png',
        description: '12-piece synthetic makeup brush set with elegant carrying case.',
        brand: 'Artistry', category: 'Beauty', price: 39.99, countInStock: 15, user: adminUser,
      },
      {
        name: 'Charcoal Face Wash',
        image: '/uploads/charcoal_face_wash_pump_1773679893955.png',
        description: 'Oil-control face wash with activated charcoal for clear skin.',
        brand: 'GlowUp', category: 'Beauty', price: 15.99, countInStock: 60, user: adminUser,
      },
      // Toys (8 existing)
      {
        name: 'LEGO Technic Racing Car',
        image: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?w=400',
        description: 'Advanced 672-piece LEGO Technic set with working steering and gearbox.',
        brand: 'LEGO', category: 'Toys', price: 59.99, countInStock: 16, user: adminUser,
      },
      {
        name: 'Remote Control Monster Truck',
        image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400',
        description: '4WD off-road RC truck with 2.4GHz control, 30+ min battery life.',
        brand: 'ToyZone', category: 'Toys', price: 49.99, countInStock: 14, user: adminUser,
      },
      {
        name: 'Classic Teddy Bear',
        image: 'https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=400',
        description: 'Soft and huggable plush teddy bear, perfect for kids of all ages.',
        brand: 'SoftToys', category: 'Toys', price: 29.99, countInStock: 25, user: adminUser,
      },
      {
        name: 'Electric Train Set',
        image: 'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=400',
        description: 'Battery-operated train set with circular tracks and realistic locomotive sounds.',
        brand: 'ExpressTracks', category: 'Toys', price: 79.99, countInStock: 8, user: adminUser,
      },
      {
        name: 'STEM Science Lab Kit',
        image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=400',
        description: 'Educational science kit with 20+ experiments including slime and chemical reactions.',
        brand: 'SmartKids', category: 'Toys', price: 44.99, countInStock: 12, user: adminUser,
      },
      {
        name: 'Wooden Building Blocks',
        image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
        description: 'Eco-friendly wooden blocks set for creative construction and motor skills.',
        brand: 'EcoPlay', category: 'Toys', price: 34.99, countInStock: 20, user: adminUser,
      },
      {
        name: 'Kids Tabletop Easel',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400',
        description: 'Two-sided easel with chalkboard and whiteboard, perfect for little artists.',
        brand: 'ArtPlay', category: 'Toys', price: 39.99, countInStock: 15, user: adminUser,
      },
      {
        name: 'Dinosaur Figure Set',
        image: 'https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?w=400',
        description: 'Prehistoric adventure set with 12 realistic dinosaur figures and play map.',
        brand: 'DinoWorld', category: 'Toys', price: 19.99, countInStock: 30, user: adminUser,
      },
      // Books (3 existing + 5 new = 8)
      {
        name: 'The Silent Witness - Novel',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
        description: 'A bestseller dark mystery novel with stunning plot twists.',
        brand: 'FictionPress', category: 'Books', price: 19.99, countInStock: 50, user: adminUser,
      },
      {
        name: 'Atomic Habits - James Clear',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        description: 'An easy and proven way to build good habits and break bad ones.',
        brand: 'Penguin Random House', category: 'Books', price: 14.99, countInStock: 60, user: adminUser,
      },
      {
        name: 'The Psychology of Money',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
        description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel.',
        brand: 'Harriman House', category: 'Books', price: 16.99, countInStock: 40, user: adminUser,
      },
      {
        name: 'The Alchemist',
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
        description: 'A global phenomenon, Paulo Coelho\'s masterpiece about following your dreams.',
        brand: 'HarperCollins', category: 'Books', price: 12.99, countInStock: 100, user: adminUser,
      },
      {
        name: 'Thinking, Fast and Slow',
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400',
        description: 'Daniel Kahneman explains the two systems that drive the way we think.',
        brand: 'FSG', category: 'Books', price: 18.50, countInStock: 35, user: adminUser,
      },
      {
        name: 'Educated - Tara Westover',
        image: '/uploads/educated_tara_westover_book_cover_stylized_1773680109230.png',
        description: 'A classic memoir about a young woman who leaves her survivalist family for education.',
        brand: 'Random House', category: 'Books', price: 15.99, countInStock: 45, user: adminUser,
      },
      {
        name: 'Deep Work - Cal Newport',
        image: '/uploads/deep_work_cal_newport_book_cover_stylized_1773680129123.png',
        description: 'Rules for focused success in a distracted world.',
        brand: 'Grand Central', category: 'Books', price: 13.99, countInStock: 55, user: adminUser,
      },
      {
        name: 'Sapiens - Yuval Noah Harari',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
        description: 'A brief history of humankind, exploring how biology and history defined us.',
        brand: 'Harper', category: 'Books', price: 21.99, countInStock: 70, user: adminUser,
      },
      // Furniture (8 new)
      {
        name: 'Modern Velvet Sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        description: 'Elegant emerald green velvet sofa with gold legs, seating for three.',
        brand: 'HomeLuxe', category: 'Furniture', price: 899.00, countInStock: 5, user: adminUser,
      },
      {
        name: 'Mid-Century Armchair',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400',
        description: 'Iconic mid-century design with walnut frame and grey fabric upholstery.',
        brand: 'RetroGrain', category: 'Furniture', price: 349.99, countInStock: 10, user: adminUser,
      },
      {
        name: 'Minimalist Dining Table',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400',
        description: 'Solid oak dining table with a minimalist aesthetic, fits 6 people.',
        brand: 'NordicWood', category: 'Furniture', price: 599.00, countInStock: 4, user: adminUser,
      },
      {
        name: 'Industrial Bookshelf',
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400',
        description: 'Tall bookshelf with metal frame and rustic wood shelves, 5-tier storage.',
        brand: 'ForgeHome', category: 'Furniture', price: 229.99, countInStock: 12, user: adminUser,
      },
      {
        name: 'Tufted Wingback Bed',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400',
        description: 'King size tufted headboard bed in linen beige, luxurious sleep setup.',
        brand: 'ComfortSleep', category: 'Furniture', price: 1199.00, countInStock: 3, user: adminUser,
      },
      {
        name: 'Marble Coffee Table',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400',
        description: 'Round coffee table with genuine white marble top and brass base.',
        brand: 'Steller', category: 'Furniture', price: 449.00, countInStock: 8, user: adminUser,
      },
      {
        name: 'Office Swivel Chair',
        image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
        description: 'Ergonomic office chair with breathable mesh and lumbar support.',
        brand: 'WorkPro', category: 'Furniture', price: 199.99, countInStock: 20, user: adminUser,
      },
      {
        name: 'Outdoor Patio Set',
        image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
        description: 'Weather-resistant rattan patio set including two chairs and a side table.',
        brand: 'GardenJoy', category: 'Furniture', price: 399.00, countInStock: 6, user: adminUser,
      }
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

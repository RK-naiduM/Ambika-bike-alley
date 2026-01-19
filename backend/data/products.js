const products = [
  // --- MENS BIKES ---
  {
    name: 'Roadster 500',
    image: '/images/roadster.jpg',
    description: 'A high-speed road bike for professionals.',
    brand: 'SpeedCo',
    category: 'Bicycles',
    subCategory: 'Road',
    targetAudience: 'Men',
    specs: { frame: 'Carbon Fiber', weight: '8kg', gear: '18-Speed' },
    price: 899.99,
    countInStock: 10,
  },
  // --- WOMENS BIKES ---
  {
    name: 'Lady Glide X',
    image: '/images/ladyglide.jpg',
    description: 'Ergonomic design specifically for women.',
    brand: 'TrailMaster',
    category: 'Bicycles',
    subCategory: 'Mountain',
    targetAudience: 'Women',
    specs: { frame: 'Aluminum', weight: '12kg', gear: '21-Speed' },
    price: 599.99,
    countInStock: 7,
  },
  // --- KIDS BIKES ---
  {
    name: 'Tiny Racer',
    image: '/images/tiny.jpg',
    description: 'Perfect first bike with training wheels included.',
    brand: 'LittleRiders',
    category: 'Bicycles',
    subCategory: 'Kids',
    targetAudience: 'Kids',
    specs: { frame: 'Steel', weight: '5kg', gear: 'Single Speed' },
    price: 150.00,
    countInStock: 15,
  },
  // --- E-BIKES (Future Proofing) ---
  {
    name: 'Volt E-Cruiser',
    image: '/images/volt.jpg',
    description: 'Electric assist for effortless city commuting.',
    brand: 'VoltAge',
    category: 'Bicycles',
    subCategory: 'E-Bike',
    targetAudience: 'Unisex',
    specs: { frame: 'Aluminum', weight: '20kg', gear: 'Electric 250W' },
    price: 1200.00,
    countInStock: 4,
  },
  // --- ACCESSORIES (Future Proofing) ---
  {
    name: 'Safety Helmet Pro',
    image: '/images/helmet.jpg',
    description: 'Impact resistant helmet.',
    brand: 'SafeHead',
    category: 'Accessories',
    subCategory: 'Helmets',
    targetAudience: 'Unisex',
    price: 45.00,
    countInStock: 50,
  },
];

module.exports = products;
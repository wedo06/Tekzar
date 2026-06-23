import brushCutter from '../assets/images/brush_cutter.png';
import powerWeeder from '../assets/images/power_weeder.png';
import chainsaw from '../assets/images/chainsaw.png';
import batterySprayer from '../assets/images/battery_sprayer.png';
import chaffCutter from '../assets/images/chaff_cutter.png';

export const categories = [
  {
    id: 'brush-cutters',
    name: 'Brush Cutters',
    icon: '⚡',
    image: brushCutter,
    description: 'High-performance brush cutters for every terrain',
    subCategories: ['2 Stroke', '4 Stroke', 'Backpack', 'Professional', 'Spare Parts'],
    color: '#FF6B00',
    count: 24,
  },
  {
    id: 'power-weeders',
    name: 'Power Weeders',
    icon: '🌾',
    image: powerWeeder,
    description: 'Efficient power weeders for precision farming',
    subCategories: ['Mini Weeders', 'Petrol', 'Diesel', 'Intercultivators'],
    color: '#E53E3E',
    count: 18,
  },
  {
    id: 'chainsaws',
    name: 'Chainsaws',
    icon: '🪚',
    image: chainsaw,
    description: 'Professional grade chainsaws for all applications',
    subCategories: ['Domestic', 'Professional', 'Tree Cutting', 'Spare Parts'],
    color: '#D97706',
    count: 15,
  },
  {
    id: 'battery-sprayers',
    name: 'Battery Sprayers',
    icon: '💧',
    image: batterySprayer,
    description: 'Lithium-powered sprayers for modern farming',
    subCategories: ['12L', '16L', 'Knapsack', 'Lithium Battery Sprayers'],
    color: '#2563EB',
    count: 20,
  },
  {
    id: 'chaff-cutters',
    name: 'Chaff Cutters',
    icon: '🌿',
    image: chaffCutter,
    description: 'Robust chaff cutters for efficient fodder preparation',
    subCategories: ['Electric', 'Diesel', 'Heavy Duty Chaff Cutters'],
    color: '#16A34A',
    count: 12,
  },
  {
    id: 'portable-generators',
    name: 'Portable Generators',
    icon: '⚡',
    image: null,
    description: 'Reliable portable generators for any power need',
    subCategories: ['Open Type', 'Silent', 'Inverter Generators'],
    color: '#7C3AED',
    count: 10,
  },
];

export const featuredProducts = [
  {
    id: 1,
    name: 'TEKZAR BC-550',
    category: 'Brush Cutters',
    image: brushCutter,
    tag: 'Best Seller',
    tagColor: 'orange',
    specs: ['52cc Engine', 'Anti-Vibration', '3.0 HP Power'],
    price: 'Get Quote',
  },
  {
    id: 2,
    name: 'TEKZAR PW-1000',
    category: 'Power Weeders',
    image: powerWeeder,
    tag: 'New',
    tagColor: 'green',
    specs: ['7HP Engine', '4-Speed Gear', 'Low Fuel Consumption'],
    price: 'Get Quote',
  },
  {
    id: 3,
    name: 'TEKZAR CS-5800',
    category: 'Chainsaws',
    image: chainsaw,
    tag: 'Professional',
    tagColor: 'orange',
    specs: ['58cc Engine', 'Anti-Kickback', '18" Guide Bar'],
    price: 'Get Quote',
  },
  {
    id: 4,
    name: 'TEKZAR BS-16L',
    category: 'Battery Sprayers',
    image: batterySprayer,
    tag: 'Eco Pick',
    tagColor: 'green',
    specs: ['16L Capacity', 'Lithium Battery', 'High Pressure'],
    price: 'Get Quote',
  },
  {
    id: 5,
    name: 'TEKZAR CC-400',
    category: 'Chaff Cutters',
    image: chaffCutter,
    tag: 'Heavy Duty',
    tagColor: 'orange',
    specs: ['3 Phase Motor', 'Heavy Duty Frame', 'High Output'],
    price: 'Get Quote',
  },
];

export const whyChoosePoints = [
  {
    icon: '💰',
    title: 'Affordable Pricing',
    desc: 'Best equipment at competitive prices for every budget.',
  },
  {
    icon: '🔩',
    title: 'Genuine Spare Parts',
    desc: 'Original parts for longer machine life.',
  },
  {
    icon: '🌍',
    title: 'Dealer Network Across India',
    desc: '100+ dealers for easy access & support.',
  },
  {
    icon: '🛠️',
    title: 'Fast Service Support',
    desc: 'Quick assistance wherever you need it.',
  },
  {
    icon: '💪',
    title: 'Heavy Duty Equipment',
    desc: 'Built for Indian farming conditions.',
  },
  {
    icon: '🛡️',
    title: 'Warranty Support',
    desc: 'Reliable warranty on all products.',
  },
];

export const stats = [
  { value: '5000+', label: 'Happy Customers', icon: '😊' },
  { value: '100+', label: 'Dealers Across India', icon: '🤝' },
  { value: '6', label: 'Product Categories', icon: '📦' },
  { value: 'Pan India', label: 'Distribution Network', icon: '🗺️' },
];

export const testimonials = [
  {
    name: 'Ramesh Kumar',
    location: 'Punjab',
    role: 'Wheat Farmer',
    text: 'TEKZAR brush cutters have transformed my farming. Excellent power and very fuel efficient. Highly recommend!',
    rating: 5,
    initials: 'RK',
  },
  {
    name: 'Suresh Patel',
    location: 'Gujarat',
    role: 'Agriculture Dealer',
    text: 'As a dealer, the support from TEKZAR is unmatched. Genuine spare parts and fast delivery every time.',
    rating: 5,
    initials: 'SP',
  },
  {
    name: 'Vijay Murthy',
    location: 'Tamil Nadu',
    role: 'Sugarcane Farmer',
    text: 'The power weeder saved me days of labor. Very durable and easy to maintain. Worth every rupee.',
    rating: 5,
    initials: 'VM',
  },
  {
    name: 'Anita Sharma',
    location: 'Haryana',
    role: 'Horticulture Farmer',
    text: 'Battery sprayer from TEKZAR is a game changer. Long battery life and even spray pattern. Love it!',
    rating: 5,
    initials: 'AS',
  },
];

import { ShieldCheck, Settings, Users, Truck, Zap, Award, Smile, CheckCircle, PackageSearch, MapPin } from 'lucide-react';
import brushCutter from '../assets/images/brush_cutter.png';
import powerWeeder from '../assets/images/power_weeder.png';
import chainsaw from '../assets/images/chainsaw.png';
import batterySprayer from '../assets/images/battery_sprayer.png';
import chaffCutter from '../assets/images/chaff_cutter.png';

export const categories = [
  {
    id: 'brush-cutters',
    name: 'Brush Cutters',
    icon: '',
    image: brushCutter,
    description: 'High-performance brush cutters for every terrain',
    subCategories: [
      { name: '2 Stroke', image: brushCutter },
      { name: '4 Stroke', image: brushCutter },
      { name: 'Backpack', image: brushCutter },
      { name: 'Professional', image: brushCutter },
      { name: 'Spare Parts', image: brushCutter },
    ],
    color: '#FF6B00',
  },
  {
    id: 'power-weeders',
    name: 'Power Weeders',
    icon: '',
    image: powerWeeder,
    description: 'Efficient power weeders for precision farming',
    subCategories: [
      { name: 'Mini Weeders', image: powerWeeder },
      { name: 'Petrol', image: powerWeeder },
      { name: 'Diesel', image: powerWeeder },
      { name: 'Intercultivators', image: powerWeeder },
    ],
    color: '#E53E3E',
  },
  {
    id: 'chainsaws',
    name: 'Chainsaws',
    icon: '',
    image: chainsaw,
    description: 'Professional grade chainsaws for all applications',
    subCategories: [
      { name: 'Domestic', image: chainsaw },
      { name: 'Professional', image: chainsaw },
      { name: 'Tree Cutting', image: chainsaw },
      { name: 'Spare Parts', image: chainsaw },
    ],
    color: '#D97706',
  },
  {
    id: 'battery-sprayers',
    name: 'Battery Sprayers',
    icon: '',
    image: batterySprayer,
    description: 'Lithium-powered sprayers for modern farming',
    subCategories: [
      { name: '12L', image: batterySprayer },
      { name: '16L', image: batterySprayer },
      { name: 'Knapsack', image: batterySprayer },
      { name: 'Lithium Battery Sprayers', image: batterySprayer },
    ],
    color: '#2563EB',
  },
  {
    id: 'chaff-cutters',
    name: 'Chaff Cutters',
    icon: '',
    image: chaffCutter,
    description: 'Robust chaff cutters for efficient fodder preparation',
    subCategories: [
      { name: 'Electric', image: chaffCutter },
      { name: 'Diesel', image: chaffCutter },
      { name: 'Heavy Duty Chaff Cutters', image: chaffCutter },
    ],
    color: '#16A34A',
  },
  {
    id: 'portable-generators',
    name: 'Portable Generators',
    icon: '',
    image: null,
    description: 'Reliable portable generators for any power need',
    subCategories: [
      { name: 'Open Type', image: null },
      { name: 'Silent', image: null },
      { name: 'Inverter Generators', image: null },
    ],
    color: '#7C3AED',
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
    icon: <Zap size={24} />,
    title: 'Affordable Pricing',
    desc: 'Best equipment at competitive prices for every budget.',
  },
  {
    icon: <Settings size={24} />,
    title: 'Genuine Spare Parts',
    desc: 'Original parts for longer machine life.',
  },
  {
    icon: <Users size={24} />,
    title: 'Dealer Network',
    desc: '200+ dealers for easy access & support.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Fast Service Support',
    desc: 'Quick assistance in Tamil Nadu and Kerala.',
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Heavy Duty Equipment',
    desc: 'Built for Indian farming conditions.',
  },
  {
    icon: <Award size={24} />,
    title: 'Warranty Support',
    desc: 'Reliable warranty on all products.',
  },
];

export const stats = [
  { value: '1L+', label: 'Happy Farmers', icon: <Smile size={28} /> },
  { value: '200+', label: 'Dealers', icon: <Users size={28} /> },
  { value: '6', label: 'Product Categories', icon: <PackageSearch size={28} /> },
  { value: 'TN & KL', label: 'Service Network', icon: <MapPin size={28} /> },
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

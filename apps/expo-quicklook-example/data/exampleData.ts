// Simple interface for example data
export interface ExampleItem {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  price?: number | string;
  rating?: number;
  reviews?: number;
  tags?: string[];
  metadata?: Record<string, any>;
  [key: string]: any;
}

export const ecommerceProducts: ExampleItem[] = [
  {
    id: 'prod_001',
    title: 'Wireless Bluetooth Headphones',
    subtitle: 'Premium Sound Quality',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop'
    ],
    price: 199.99,
    rating: 4.8,
    reviews: 1247,
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'premium'],
    metadata: {
      'Brand': 'AudioTech Pro',
      'Model': 'ATH-WB1000',
      'Battery Life': '30 hours',
      'Warranty': '2 years',
      'Color Options': 'Black, White, Blue',
      'Connectivity': 'Bluetooth 5.0'
    }
  },
  {
    id: 'prod_002',
    title: 'Smart Fitness Watch',
    subtitle: 'Track Your Health',
    description: 'Monitor your fitness goals with advanced health tracking, GPS navigation, and water resistance. Perfect for athletes and health enthusiasts.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop'
    ],
    price: 299.99,
    rating: 4.6,
    reviews: 892,
    tags: ['fitness', 'smartwatch', 'health', 'gps'],
    metadata: {
      'Brand': 'FitTech',
      'Model': 'FT-2000',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'GPS': 'Built-in',
      'Heart Rate Monitor': 'Yes'
    }
  },
  {
    id: 'prod_003',
    title: 'Organic Coffee Beans',
    subtitle: 'Single Origin',
    description: 'Premium organic coffee beans sourced from high-altitude farms. Rich flavor profile with notes of chocolate and caramel.',
    images: [
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop'
    ],
    price: 24.99,
    rating: 4.9,
    reviews: 567,
    tags: ['organic', 'coffee', 'single-origin', 'premium'],
    metadata: {
      'Origin': 'Colombia',
      'Altitude': '1,800m',
      'Process': 'Washed',
      'Roast Level': 'Medium',
      'Weight': '250g',
      'Certification': 'USDA Organic'
    }
  }
];

export const newsArticles: ExampleItem[] = [
  {
    id: 'article_001',
    title: 'The Future of Artificial Intelligence',
    subtitle: 'How AI is Transforming Industries',
    description: 'Artificial Intelligence is revolutionizing how we work, live, and interact with technology. From healthcare to transportation, AI is becoming an integral part of our daily lives.',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop'
    ],
    rating: 4.9,
    reviews: 89,
    tags: ['technology', 'ai', 'future', 'innovation'],
    metadata: {
      'Author': 'Dr. Sarah Johnson',
      'Published': 'March 15, 2024',
      'Read Time': '8 min read',
      'Category': 'Technology',
      'Word Count': '2,450',
      'Last Updated': 'March 16, 2024'
    }
  },
  {
    id: 'article_002',
    title: 'Sustainable Living: A Complete Guide',
    subtitle: 'Reduce Your Carbon Footprint',
    description: 'Learn practical tips and strategies for living a more sustainable lifestyle. From reducing waste to choosing eco-friendly products, discover how small changes can make a big impact.',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop'
    ],
    rating: 4.7,
    reviews: 156,
    tags: ['sustainability', 'environment', 'lifestyle', 'eco-friendly'],
    metadata: {
      'Author': 'Emma Rodriguez',
      'Published': 'March 10, 2024',
      'Read Time': '12 min read',
      'Category': 'Lifestyle',
      'Word Count': '3,200',
      'Last Updated': 'March 12, 2024'
    }
  },
  {
    id: 'article_003',
    title: 'The Art of Mindful Cooking',
    subtitle: 'Cooking as Meditation',
    description: 'Transform your kitchen into a sanctuary of mindfulness. Learn how the simple act of cooking can become a powerful meditation practice.',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop'
    ],
    rating: 4.8,
    reviews: 234,
    tags: ['cooking', 'mindfulness', 'meditation', 'wellness'],
    metadata: {
      'Author': 'Chef Michael Chen',
      'Published': 'March 8, 2024',
      'Read Time': '6 min read',
      'Category': 'Wellness',
      'Word Count': '1,800',
      'Last Updated': 'March 9, 2024'
    }
  }
];

export const travelDestinations: ExampleItem[] = [
  {
    id: 'dest_001',
    title: 'Bali, Indonesia',
    subtitle: 'Island of the Gods',
    description: 'Discover the perfect blend of culture, nature, and spirituality. From pristine beaches to ancient temples, Bali offers an unforgettable experience.',
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=400&fit=crop'
    ],
    price: 1299,
    rating: 4.9,
    reviews: 445,
    tags: ['beach', 'culture', 'tropical', 'adventure'],
    metadata: {
      'Best Time to Visit': 'April - October',
      'Duration': '7-14 days',
      'Language': 'Indonesian, English',
      'Currency': 'Indonesian Rupiah',
      'Climate': 'Tropical',
      'Highlights': 'Temples, Beaches, Rice Terraces'
    }
  },
  {
    id: 'dest_002',
    title: 'Kyoto, Japan',
    subtitle: 'Ancient Capital',
    description: 'Step back in time in Japan\'s cultural heart. Experience traditional tea ceremonies, stunning temples, and the beauty of cherry blossoms.',
    images: [
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=400&fit=crop'
    ],
    price: 1899,
    rating: 4.8,
    reviews: 312,
    tags: ['culture', 'temple', 'traditional', 'cherry-blossom'],
    metadata: {
      'Best Time to Visit': 'March - May, October - November',
      'Duration': '5-10 days',
      'Language': 'Japanese, English',
      'Currency': 'Japanese Yen',
      'Climate': 'Temperate',
      'Highlights': 'Temples, Gardens, Geisha District'
    }
  }
];

// All example data combined
export const allExampleData = {
  ecommerce: ecommerceProducts,
  articles: newsArticles,
  travel: travelDestinations,
};

export const getRandomItems = (category: keyof typeof allExampleData, count: number = 3): ExampleItem[] => {
  const items = allExampleData[category];
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getItemById = (id: string): ExampleItem | undefined => {   
  const allItems = [
    ...ecommerceProducts,
    ...newsArticles,
    ...travelDestinations,
  ];
  return allItems.find(item => item.id === id);
};

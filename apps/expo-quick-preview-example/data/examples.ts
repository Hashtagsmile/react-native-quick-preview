// Demo data + shared types for the examples screen

export type ItemKind =
  | 'post'
  | 'product'
  | 'article'
  | 'destination'
  | 'track'
  | 'profile';

export type Item = {
  id: string;
  kind: ItemKind;
  title: string;
  subtitle?: string;
  image?: string;
  description?: string;
  price?: number | string;
  tags?: string[];

  // social
  username?: string;
  avatar?: string;
  likes?: number;
  views?: number;

  // commerce
  rating?: number;
  reviews?: number;

  // music
  artist?: string;
  duration?: string;
};

export const posts: Item[] = [
  {
    id: 'post_1',
    kind: 'post',
    title: 'Sunset vibes',
    subtitle: 'Côte d’Azur',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80&auto=format&fit=crop',
    username: 'olivia',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 1280,
    views: 4721,
    description: 'That golden hour glow ✨',
    tags: ['sunset', 'travel', 'summer'],
  },
  {
    id: 'post_2',
    kind: 'post',
    title: 'City lights',
    subtitle: 'Shinjuku, Tokyo',
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=80&auto=format&fit=crop',
    username: 'mika',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 934,
    views: 3210,
    description: 'Neon dreams 💡',
    tags: ['tokyo', 'night', 'street'],
  },
  {
    id: 'post_3',
    kind: 'post',
    title: 'Surf check',
    subtitle: 'Bali',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80&auto=format&fit=crop',
    username: 'kai',
    likes: 207,
    views: 826,
    description: 'Dawn patrol was worth it 🌊',
    tags: ['surf', 'bali', 'ocean'],
  },
  {
    id: 'post_4',
    kind: 'post',
    title: 'Foggy morning',
    subtitle: 'San Francisco',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1400&q=80&auto=format&fit=crop',
    username: 'leo',
    likes: 610,
    views: 2194,
    description: 'The city under a blanket of fog.',
    tags: ['sanfrancisco', 'fog', 'morning'],
  },
  {
    id: 'post_5',
    kind: 'post',
    title: 'Alpine hike',
    subtitle: 'Zermatt',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80&auto=format&fit=crop',
    username: 'nora',
    likes: 451,
    views: 1832,
    description: 'Above the clouds, below the peaks.',
    tags: ['hiking', 'alps', 'zermatt'],
  },
  {
    id: 'post_6',
    kind: 'post',
    title: 'Pastel lane',
    subtitle: 'Chefchaouen',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80&auto=format&fit=crop',
    username: 'sara',
    likes: 742,
    views: 2981,
    description: 'Every wall a different shade of blue.',
    tags: ['morocco', 'chefchaouen', 'blue'],
  },
  {
    id: 'post_7',
    kind: 'post',
    title: 'Fresh pour',
    subtitle: 'Oslo',
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1400&q=80&auto=format&fit=crop',
    username: 'ida',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=774&q=80&auto=format&fit=crop',
    likes: 388,
    views: 1502,
    description: 'Slow mornings and good coffee ☕',
    tags: ['coffee', 'oslo', 'morning'],
  },
  {
    id: 'post_8',
    kind: 'post',
    title: 'Desert road',
    subtitle: 'Arizona',
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400&q=80&auto=format&fit=crop',
    username: 'theo',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=774&q=80&auto=format&fit=crop',
    likes: 1024,
    views: 4102,
    description: 'Nowhere to be, all day.',
    tags: ['roadtrip', 'desert', 'arizona'],
  },
  {
    id: 'post_9',
    kind: 'post',
    title: 'Market colors',
    subtitle: 'Marrakech',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop',
    username: 'amira',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=774&q=80&auto=format&fit=crop',
    likes: 866,
    views: 3320,
    description: 'Spices, silk and sunlight.',
    tags: ['market', 'marrakech', 'color'],
  },
  {
    id: 'post_10',
    kind: 'post',
    title: 'Cliff jump',
    subtitle: 'Amalfi',
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1400&q=80&auto=format&fit=crop',
    username: 'marco',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=774&q=80&auto=format&fit=crop',
    likes: 1543,
    views: 6210,
    description: 'Summer, on repeat.',
    tags: ['amalfi', 'summer', 'sea'],
  },
  {
    id: 'post_11',
    kind: 'post',
    title: 'Green hour',
    subtitle: 'Kyoto',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1400&q=80&auto=format&fit=crop',
    username: 'yuki',
    avatar:
      'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=774&q=80&auto=format&fit=crop',
    likes: 512,
    views: 1980,
    description: 'Bamboo and quiet.',
    tags: ['kyoto', 'bamboo', 'green'],
  },
  {
    id: 'post_12',
    kind: 'post',
    title: 'Night market',
    subtitle: 'Taipei',
    image:
      'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1400&q=80&auto=format&fit=crop',
    username: 'chen',
    avatar:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=774&q=80&auto=format&fit=crop',
    likes: 977,
    views: 3890,
    description: 'Neon and noodles.',
    tags: ['taipei', 'night', 'food'],
  },
];

export const products: Item[] = [
  {
    id: 'prod_1',
    kind: 'product',
    title: 'Wireless Headphones',
    subtitle: 'Noise cancelling • 30h battery',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400&q=80&auto=format&fit=crop',
    price: 129,
    rating: 4.8,
    reviews: 1240,
    description:
      'Studio-grade drivers with adaptive noise cancelling, 30 hours of battery, and plush memory-foam ear cups. Crisp highs, deep bass, and all-day comfort for work or travel.',
    tags: ['audio', 'wireless', 'best-seller'],
  },
  {
    id: 'prod_2',
    kind: 'product',
    title: 'Ergonomic Chair',
    subtitle: 'Mesh back • Lumbar support',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1400&q=80&auto=format&fit=crop',
    price: 299,
    rating: 4.6,
    reviews: 512,
    description: 'Breathable mesh back with adjustable lumbar support. Sit better, focus longer.',
    tags: ['work', 'comfort'],
  },
  {
    id: 'prod_3',
    kind: 'product',
    title: 'Smart Lamp',
    subtitle: 'Dimmable • App control',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1400&q=80&auto=format&fit=crop',
    price: 59,
    rating: 4.4,
    reviews: 208,
    description: 'Warm-to-cool white with app-controlled scenes and schedules.',
    tags: ['home', 'lighting'],
  },
  {
    id: 'prod_4',
    kind: 'product',
    title: 'Everyday Sneakers',
    subtitle: 'Knit upper • Cushioned sole',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80&auto=format&fit=crop',
    price: 89,
    rating: 4.7,
    reviews: 934,
    description: 'Lightweight knit upper and a responsive cushioned sole for all-day wear.',
    tags: ['shoes', 'everyday'],
  },
  {
    id: 'prod_5',
    kind: 'product',
    title: 'Analog Watch',
    subtitle: 'Sapphire glass • 5ATM',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1400&q=80&auto=format&fit=crop',
    price: 199,
    rating: 4.9,
    reviews: 356,
    description: 'Minimal dial, sapphire crystal, and a stainless case rated to 5ATM.',
    tags: ['accessories', 'watch'],
  },
  {
    id: 'prod_6',
    kind: 'product',
    title: 'Instant Camera',
    subtitle: 'Prints in 15s • Retro body',
    image:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1400&q=80&auto=format&fit=crop',
    price: 109,
    rating: 4.5,
    reviews: 421,
    description: 'Point, shoot, and print in seconds. Retro body, modern optics.',
    tags: ['camera', 'retro'],
  },
];

export const articles: Item[] = [
  {
    id: 'article_1',
    kind: 'article',
    title: 'Design Systems in 2025',
    subtitle: 'Patterns, tooling & collaboration',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80&auto=format&fit=crop',
    description:
      'A pragmatic look at component libraries, tokens, and cross-functional workflows.',
    tags: ['design', 'frontend', 'systems'],
  },
  {
    id: 'article_2',
    kind: 'article',
    title: 'Shipping Fast with RN',
    subtitle: 'What we learned in production',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1400&q=80&auto=format&fit=crop',
    description:
      'From architecture choices to over-the-air updates—our battle-tested playbook.',
    tags: ['react-native', 'mobile', 'devops'],
  },
];

export const destinations: Item[] = [
  {
    id: 'dest_1',
    kind: 'destination',
    title: 'Santorini, Greece',
    subtitle: 'Aegean gem',
    image:
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1400&q=80&auto=format&fit=crop',
    price: 'From $799',
    description: 'Whitewashed alleys, blue domes, and magnetic sunsets.',
    tags: ['islands', 'europe', 'romantic'],
  },
  {
    id: 'dest_2',
    kind: 'destination',
    title: 'Kyoto, Japan',
    subtitle: 'Temples & tea',
    image:
      'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1400&q=80&auto=format&fit=crop',
    price: 'From $999',
    description: 'Serene gardens and timeless streets.',
    tags: ['asia', 'culture', 'nature'],
  },
];

export const tracks: Item[] = [
    {
      id: 'track_1',
      kind: 'track',
      title: 'Midnight Drive',
      subtitle: 'Synthwave Essentials',
      image:
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1400&q=80&auto=format&fit=crop',
      artist: 'Night Runner',
      duration: '3:42',
      description: 'Retro vibes for late nights.',
    },
    {
      id: 'track_2',
      kind: 'track',
      title: 'Coffee & Loops',
      subtitle: 'Lofi Chill',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80&auto=format&fit=crop',
      artist: 'Cafe Beats',
      duration: '2:58',
      description: 'Relax & focus.',
    },
    {
      id: 'track_3',
      kind: 'track',
      title: 'Neon Boulevard',
      subtitle: 'Retro Wave',
      image:
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1400&q=80&auto=format&fit=crop',
      artist: 'Chrome Echoes',
      duration: '4:12',
      description: 'Driving arps and glittering pads for city nights.',
    },
    {
      id: 'track_4',
      kind: 'track',
      title: 'Rain On Glass',
      subtitle: 'Ambient Focus',
      image:
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1400&q=80&auto=format&fit=crop',
      artist: 'Hiro Aoki',
      duration: '5:18',
      description: 'Soft drones and field recordings to sink into flow.',
    },
    {
      id: 'track_5',
      kind: 'track',
      title: 'After Hours',
      subtitle: 'Deep House',
      image:
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1400&q=80&auto=format&fit=crop',
      artist: 'Velvet Lines',
      duration: '3:06',
      description: 'Late-night grooves with warm bass and airy chords.',
    },
  ];
  

export const profiles: Item[] = [
  {
    id: 'profile_1',
    kind: 'profile',
    title: 'Oliver Lindblad',
    subtitle: 'Mobile + UX',
    image:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=1200&q=80&auto=format&fit=crop',
    description:
      'Building delightful mobile experiences. React Native enthusiast.',
    tags: ['react-native', 'design', 'open-source'],
  },
  {
    id: 'profile_2',
    kind: 'profile',
    title: 'Mika Tanaka',
    subtitle: 'Product Design',
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&q=80&auto=format&fit=crop',
    description:
      'Token nerd. Accessibility advocate. Turning chaos into clarity.',
    tags: ['a11y', 'design-systems'],
  },
];


// Every item, flattened — used for the gallery and for id lookup.
export const allItems: Item[] = [
  ...posts,
  ...products,
  ...articles,
  ...destinations,
  ...tracks,
  ...profiles,
]

// One representative item per kind, for the "a preview can be any content" gallery.
export const gallery: Item[] = [
  posts[0],
  products[0],
  articles[0],
  destinations[0],
  tracks[0],
  profiles[0],
]

export const getItemById = (id: string): Item | null =>
  allItems.find((item) => item.id === id) ?? null

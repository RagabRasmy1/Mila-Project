import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'كريم أساس بإشراقة الورد',
    price: 42.00,
    image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'مكياج',
    brand: 'بيلا بيوتي',
    rating: 4.8,
    description: 'كريم أساس مضيء بتغطية متوسطة يمنح بشرتك إشراقة طبيعية ونضارة مع مكونات الورد المنعشة.',
    ingredients: ['ماء الورد', 'حمض الهيالورونيك', 'فيتامين E', 'عامل حماية 30'],
    images: [
      'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  },
  {
    id: '2',
    name: 'أحمر شفاه مطفي حريري',
    price: 28.00,
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'مكياج',
    brand: 'لوكس ليبس',
    rating: 4.6,
    description: 'أحمر شفاه مطفي طويل الأمد بتركيبة مريحة وغير مجففة بدرجات الورد الخلابة.',
    ingredients: ['فيتامين E', 'زيت الجوجوبا', 'حمض الهيالورونيك'],
    images: [
      'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  },
  {
    id: '3',
    name: 'سيروم الورد المرطب',
    price: 65.00,
    image: 'https://images.pexels.com/photos/5938433/pexels-photo-5938433.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'العناية بالبشرة',
    brand: 'بيور بوتانيكالز',
    rating: 4.9,
    description: 'سيروم مرطب مكثف بخلاصة الورد وحمض الهيالورونيك لبشرة ممتلئة ومشرقة.',
    ingredients: ['خلاصة الورد', 'حمض الهيالورونيك', 'فيتامين C', 'الببتيدات'],
    images: [
      'https://images.pexels.com/photos/5938433/pexels-photo-5938433.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  },
  {
    id: '4',
    name: 'باليت أحمر الخدود',
    price: 38.00,
    image: 'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'مكياج',
    brand: 'كولور دريمز',
    rating: 4.7,
    description: 'أربعة درجات متناسقة من أحمر الخدود بألوان المرجان والورد والخوخ للحصول على إطلالة طبيعية.',
    images: [
      'https://images.pexels.com/photos/1115128/pexels-photo-1115128.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  },
  {
    id: '5',
    name: 'زيت التنظيف اللطيف',
    price: 35.00,
    image: 'https://images.pexels.com/photos/6621388/pexels-photo-6621388.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'العناية بالبشرة',
    brand: 'بيور بوتانيكالز',
    rating: 4.5,
    description: 'زيت تنظيف فاخر يزيل المكياج والشوائب مع تغذية البشرة.',
    ingredients: ['زيت ثمر الورد', 'زيت الجوجوبا', 'فيتامين E'],
    images: [
      'https://images.pexels.com/photos/6621388/pexels-photo-6621388.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    discount: 20
  },
  {
    id: '6',
    name: 'باليت ظلال العيون - ذهبي وردي',
    price: 52.00,
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'مكياج',
    brand: 'جلامور ستوديو',
    rating: 4.8,
    description: '12 ظل عيون عالي التصبغ بدرجات الذهبي الوردي الدافئة والألوان المحايدة.',
    images: [
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  },
  {
    id: '7',
    name: 'قناع الوجه بثمر الورد',
    price: 24.00,
    image: 'https://images.pexels.com/photos/8142010/pexels-photo-8142010.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'العناية بالبشرة',
    brand: 'ناتشورال جلو',
    rating: 4.4,
    description: 'قناع وجه مغذي بزيت ثمر الورد والمستخلصات النباتية لبشرة مشرقة.',
    ingredients: ['زيت ثمر الورد', 'الألوة فيرا', 'العسل', 'الطين'],
    images: [
      'https://images.pexels.com/photos/8142010/pexels-photo-8142010.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    discount: 15
  },
  {
    id: '8',
    name: 'هايلايتر مضغوط',
    price: 32.00,
    image: 'https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'مكياج',
    brand: 'راديانت بيوتي',
    rating: 4.6,
    description: 'هايلايتر ناعم حريري يمنح إشراقة طبيعية ومضيئة لعظام الخدود والحاجبين.',
    images: [
      'https://images.pexels.com/photos/2533269/pexels-photo-2533269.jpeg?auto=compress&cs=tinysrgb&w=500'
    ]
  }
];

export const categories = [
  'الكل',
  'مكياج',
  'العناية بالبشرة',
  'العطور',
  'العناية بالشعر'
];

export const brands = [
  'الكل',
  'بيلا بيوتي',
  'لوكس ليبس',
  'بيور بوتانيكالز',
  'كولور دريمز',
  'جلامور ستوديو',
  'ناتشورال جلو',
  'راديانت بيوتي'
];

export const testimonials = [
  {
    id: 1,
    name: 'سارة أحمد',
    role: 'مؤثرة في مجال الجمال',
    content: 'لقد غيرت مستحضرات بيلا روتين العناية ببشرتي تماماً. سيروم الورد رائع حقاً!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5
  },
  {
    id: 2,
    name: 'إميلي محمد',
    role: 'خبيرة مكياج',
    content: 'جودة هذه المنتجات استثنائية. عملائي يسألون دائماً عن كريم الأساس الذي أستخدمه!',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5
  },
  {
    id: 3,
    name: 'جيسيكا علي',
    role: 'منشئة محتوى',
    content: 'أحب كيف تجعلني هذه المنتجات أشعر بالثقة والجمال. التغليف رائع أيضاً!',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5
  }
];
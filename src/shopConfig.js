export const shopConfig = {
  shopName: 'Laxmi Sarees',
  tagline: 'Handpicked sarees, woven with tradition',
  phoneNumber: '919876543210',
  displayPhoneNumber: '+91 98765 43210',
  whatsappNumber: '919876543210',
  whatsappDefaultMessage: "Hello! I'm interested in your sarees.",
  instagramHandle: 'laxmi_sarees',
  instagramUrl: 'https://instagram.com/laxmi_sarees',
  address: '123 Silk Market, MG Road, Bengaluru, Karnataka 560001',
  mapEmbedUrl: '',
  storeHours: 'Mon – Sat, 10:00 AM – 8:30 PM',
};

export const whatsappLink = (message = shopConfig.whatsappDefaultMessage) =>
  `https://wa.me/${shopConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const callLink = () => `tel:+${shopConfig.phoneNumber}`;

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);

export const categoryChips = [
  'Kanjivaram Silk',
  'Banarasi',
  'Chiffon & Georgette',
  'Cotton Handloom',
  'Bridal Collection',
  'Designer Sarees',
  'Party Wear',
  'Daily Wear',
];

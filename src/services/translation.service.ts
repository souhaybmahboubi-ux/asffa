
import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Lang = 'ar' | 'en';

const translations: Record<Lang, Record<string, string>> = {
  ar: {
    // General UI
    search: 'بحث',
    products: 'المنتجات',
    catalogDesc: 'تصفح مجموعتنا من ميداليات الكيبورد المضيئة. تصاميم فريدة بجودة عالية.',
    home: 'الرئيسية',
    about: 'عن Kypostore',
    contact: 'تواصل معنا',
    myAccount: 'حسابي',
    login: 'تسجيل الدخول',

    // Announcements
    ann1: 'شحن مجاني على جميع الطلبات ✈️',
    ann2: 'خصم 30% على 4 حبات 🎁',

    // Bottom Nav
    navHome: 'الرئيسية',
    navProducts: 'المنتجات',
    navCart: 'السلة',
    navAccount: 'حسابي',
    navSupport: 'دعمنا',
    navLanguage: 'اللغة',

    // Cart Drawer
    cart: 'سلة المشتريات',
    cartEmpty: 'سلتك فارغة حالياً',
    cartDiscover: 'اكتشف منتجاتنا',
    cartSubtotal: 'المجموع الفرعي',
    cartTax: 'شامل الضريبة والشحن سيحسب عند الدفع',
    cartCheckout: 'إتمام الطلب بأمان',
    cartTrustMsg: 'جميع مدفوعاتك مشفرة وآمنة تماماً. نشحن لك مباشرة من مستودعاتنا في السعودية.',
    shippingProtection: 'حماية الشحنة',
    shippingProtectionDesc: 'حماية ضد السرقة أو الضياع',

    // Product Page
    addToCart: 'أضف للسلة',
    added: 'تمت الإضافة',
    buyNow: '🔥 شراء الآن',
    chooseBundle: 'اختر العرض المناسب:',
    chooseColor: 'اختر اللون:',
    piece: 'حبة',
    twoPieces: 'حبتين',
    pieces: 'حبات',
    descFeatures: 'الوصف والمميزات',
    freeShipping: 'شحن مجاني 📦',
    freeShippingDesc: 'يصلك طلبك خلال 7 أيام عمل.',
    businessDays: 'أيام عمل',
    currentPrice: 'السعر الحالي',
    taxIncl: 'شامل الضريبة',
    saveLabel: 'وفر',
    bestSeller: 'الأكثر طلباً 🔥',
    chooseColorLabel: 'اختر اللون:',
    qualityGuarantee: 'جودة مضمونة',
    freeShippingBadge: 'شحن مجاني',
    securePay: 'دفع آمن',
    easyReturn: 'استرجاع سهل',
    reviewsCount: '127 تقييم موثق',
    happyCustomers: 'عملاء سعداء',
    pieceColor: 'لون القطعة',
    descP1: 'تبي ميدالية تلفت الانتباه وتعبر عن شخصيتك؟ 🎮⌨️',
    descP2: 'Kypolight™ هي ميدالية كيبورد ميكانيكي مصغر مع إضاءة LED مدمجة بألوان RGB متغيرة!',
    descP3: 'التصميم فيها دقيق — أزرار صغيرة فعلية تنضغط مثل الكيبورد الحقيقي. والإضاءة فيها تجنن، تتغير ألوان بشكل سلس وخيالي ✨',
    descP4: 'علقها على مفاتيحك، شنطتك، أو الباك باق — كل من يشوفها بيسألك عنها! 🔥',
    bundle1: 'حبة وحدة',
    bundle2: 'حبتين (وفر 5%)',
    bundle3: '4 حبات (وفر 30%)',
    colorBlack: 'أسود',
    colorClear: 'شفاف',

    // Home Page
    heroTag: '⌨️ أفضل ميدالية كيبورد LED في الخليج',
    heroTitle: 'ميداليتك تلمع! Kypolight™ ⌨️💡',
    heroSubtitle: 'ميدالية كيبورد ميكانيكي مصغر بـ 4 مفاتيح مع إضاءة RGB متغيرة. أفضل هدية للقيمرز ومحبي التقنية! 🎮🔥',
    heroCta: '⌨️ اطلب Kypolight™ الحين',
    heroCtaSub: 'شحن مجاني + توصيل سريع',
    bestPriceTag: 'أفضل سعر في الخليج',
    feat1: 'إضاءة LED بألوان RGB متغيرة — تلمع بشكل خيالي ✨',
    feat2: 'تصميم ميني كيبورد ميكانيكي بـ 4 أزرار حقيقية ⌨️',
    feat3: 'أفضل هدية للقيمرز ومحبي التقنية 🎮🎁',
    rgbLabel: 'إضاءة RGB',
    rgbDesc: 'ألوان متغيرة خيالية',
    bestSellerBadge: '🔥 الأكثر مبيعاً',
    ledBadge: '💡 إضاءة LED مدمجة',
    productDesc: 'ميدالية كيبورد ميكانيكي مصغر بـ 4 مفاتيح حقيقية مع إضاءة LED مدمجة بألوان RGB متغيرة. تصميم شفاف وعصري.',
    happyClient: 'عميل سعيد',
    tickerGift: 'هدية القيمرز',
    tickerShipping: 'شحن مجاني',
    featTitle: 'ليش Kypolight™ مختلفة؟ 🤔',
    featSubtitle: 'مب مجرد ميدالية عادية — هذي تحفة فنية تقنية!',
    featMecTitle: 'تصميم ميكانيكي',
    featMecDesc: 'أزرار صغيرة فعلية تنضغط مثل الكيبورد الحقيقي. تفاصيل دقيقة مبهرة!',
    featGiftTitle: 'هدية مثالية',
    featGiftDesc: 'أفضل هدية للقيمرز، المبرمجين، ومحبي التقنية. تعال عيد ميلاد أو مناسبة!',
    featQualTitle: 'جودة عالية',
    featQualDesc: 'مواد ممتازة ما تنكسر بسهولة. حلقة متينة سهلة التعليق على أي شي.',
    featRgbDesc: 'ألوان LED متغيرة تلمع بشكل خيالي. تشتغل بزر واحد والبطارية تعيش طويل.',
    bundleTitle: 'عروض الباكجات 🎉',
    bundleSubtitle: 'كل ما زادت الكمية، زاد التوفير! اختار الباك اللي يناسبك.',
    bestValue: 'الأفضل قيمة ⭐',
    orderNow: '🛒 اطلب الحين',
    usecaseTitle: 'لمين Kypolight™؟ 🎯',
    usecaseSubtitle: 'الميدالية المثالية لكل محب للتقنية والألعاب!',
    usecase1Title: 'للقيمرز',
    usecase1Desc: 'إذا تحب الألعاب والكيبوردات الميكانيكية، هالميدالية تمثلك 100%. علقها على شنطتك أو مفاتيحك وخلك ستايلش!',
    usecase2Title: 'للمبرمجين',
    usecase2Desc: 'كيبورد مصغر يعبر عن شغفك بالبرمجة! أفضل اكسسوري لشنطة اللابتوب ومكتبك.',
    usecase3Title: 'كهدية',
    usecase3Desc: 'تدور هدية مميزة لعيد ميلاد أو مناسبة؟ Kypolight™ هي الجواب! الكل بينبسط فيها.',
    fomoTag: '⚠️ الكمية محدودة — لا تفوتك!',
    fomoTitle: 'خلك مميز..<br/>ميداليتك تلمع! ⌨️💡',
    guarantee: 'ضمان استرجاع الأموال خلال 14 يوم',

    // Footer
    footerLinks: 'روابط سريعة',
    footerLegal: 'قانوني',
    footerSupport: 'الدعم',
    footerLinkHome: 'الرئيسية',
    footerLinkProducts: 'المنتجات',
    footerLinkAbout: 'عن Kypostore',
    footerLinkPrivacy: 'سياسة الخصوصية',
    footerLinkTerms: 'شروط الاستخدام',
    footerLinkShipping: 'سياسة الشحن',
    footerLinkContact: 'اتصل بنا',
    footerLinkTracking: 'تتبع طلبك',
    footerCopy: '© 2026 Kypostore. جميع الحقوق محفوظة.',

    // Language Drawer
    chooseLanguage: 'اختر اللغة',
    langAr: 'العربية',
    langEn: 'English',

    // Reviews
    reviewsTitle: 'التقييمات',
    outOf5: 'من 5',
    showImagesOnly: 'عرض التقييمات بالصور فقط',
    loadMoreReviews: 'عرض المزيد من التقييمات',
    translatedFromArabic: 'مترجم من العربية',
  },
  en: {
    // General UI
    search: 'Search',
    products: 'Products',
    catalogDesc: 'Browse our collection of illuminated keyboard keychains. Unique designs with high quality.',
    home: 'Home',
    about: 'About Us',
    contact: 'Contact',
    myAccount: 'My Account',
    login: 'Log In',

    // Announcements
    ann1: 'Free shipping on all orders ✈️',
    ann2: '30% off when you buy 4 pieces 🎁',

    // Bottom Nav
    navHome: 'Home',
    navProducts: 'Products',
    navCart: 'Cart',
    navAccount: 'Account',
    navSupport: 'Support',
    navLanguage: 'Language',

    // Cart Drawer
    cart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    cartDiscover: 'Discover our products',
    cartSubtotal: 'Subtotal',
    cartTax: 'Tax & shipping calculated at checkout',
    cartCheckout: 'Checkout Securely',
    cartTrustMsg: 'All payments are encrypted and secure. We ship directly from our warehouses.',
    shippingProtection: 'Shipping Protection',
    shippingProtectionDesc: 'Protection against theft or loss',

    // Product Page
    addToCart: 'Add to Cart',
    added: 'Added!',
    buyNow: '🔥 Buy Now',
    chooseBundle: 'Choose your bundle:',
    chooseColor: 'Choose color:',
    piece: 'piece',
    twoPieces: '2 pieces',
    pieces: 'pieces',
    descFeatures: 'Description & Features',
    freeShipping: 'Free Shipping 📦',
    freeShippingDesc: 'Your order arrives within 7 business days.',
    businessDays: 'business days',
    currentPrice: 'Current Price',
    taxIncl: 'Tax Included',
    saveLabel: 'Save',
    bestSeller: 'Most Popular 🔥',
    chooseColorLabel: 'Choose Color:',
    qualityGuarantee: 'Quality Guarantee',
    freeShippingBadge: 'Free Shipping',
    securePay: 'Secure Payment',
    easyReturn: 'Easy Returns',
    reviewsCount: '127 Verified Reviews',
    happyCustomers: 'Happy Customers',
    pieceColor: 'Piece Color',
    descP1: 'Want a keychain that catches the eye and expresses your personality? 🎮⌨️',
    descP2: 'Kypolight™ is a mini mechanical keyboard keychain with built-in RGB LED lighting!',
    descP3: 'The design is precise — real small buttons that click like a real keyboard. And the lighting is amazing, smoothly changing colors ✨',
    descP4: 'Hang it on your keys or backpack — everyone who sees it will ask you about it! 🔥',
    bundle1: '1 Piece',
    bundle2: '2 Pieces (Save 5%)',
    bundle3: '4 Pieces (Save 30%)',
    colorBlack: 'Black',
    colorClear: 'Clear',

    // Home Page
    heroTag: '⌨️ Best LED Keyboard Keychain in the Gulf',
    heroTitle: 'Your Keychain Glows! Kypolight™ ⌨️💡',
    heroSubtitle: 'A mini mechanical keyboard keychain with 4 real keys and RGB LED lighting. The perfect gift for gamers and tech lovers! 🎮🔥',
    heroCta: '⌨️ Order Kypolight™ Now',
    heroCtaSub: 'Free shipping + fast delivery',
    bestPriceTag: 'Best price in the Gulf',
    feat1: 'RGB LED lighting — glows with amazing colors ✨',
    feat2: 'Mini mechanical keyboard design with 4 real keys ⌨️',
    feat3: 'Perfect gift for gamers and tech lovers 🎮🎁',
    rgbLabel: 'RGB Lighting',
    rgbDesc: 'Amazing color-changing glow',
    bestSellerBadge: '🔥 Best Seller',
    ledBadge: '💡 Built-in LED',
    productDesc: 'A mini mechanical keyboard keychain with 4 real keys and built-in RGB LED lighting. Transparent and modern design.',
    happyClient: 'Happy Customer',
    tickerGift: 'Gamer Gift',
    tickerShipping: 'Free Shipping',
    featTitle: 'Why Kypolight™ is Different? 🤔',
    featSubtitle: 'Not just an ordinary keychain — it is a technical masterpiece!',
    featMecTitle: 'Mechanical Design',
    featMecDesc: 'Real small buttons that click like a real keyboard. Impressive accurate details!',
    featGiftTitle: 'Perfect Gift',
    featGiftDesc: 'The best gift for gamers, programmers, and tech lovers. Great for birthdays or any occasion!',
    featQualTitle: 'High Quality',
    featQualDesc: 'Premium materials that do not break easily. A sturdy ring easy to hang on anything.',
    featRgbDesc: 'Changing LED colors that glow amazingly. Works with one button and long battery life.',
    bundleTitle: 'Bundle Offers 🎉',
    bundleSubtitle: 'The more you buy, the more you save! Choose the bundle that suits you.',
    bestValue: 'Best Value ⭐',
    orderNow: '🛒 Order Now',
    usecaseTitle: 'Who is Kypolight™ for? 🎯',
    usecaseSubtitle: 'The perfect keychain for every tech and gaming lover!',
    usecase1Title: 'For Gamers',
    usecase1Desc: 'If you love games and mechanical keyboards, this keychain represents you 100%. Hang it on your bag or keys and stay stylish!',
    usecase2Title: 'For Programmers',
    usecase2Desc: 'A mini keyboard that expresses your passion for programming! The best accessory for your laptop bag and desk.',
    usecase3Title: 'As a Gift',
    usecase3Desc: 'Looking for a special gift for a birthday or occasion? Kypolight™ is the answer! Everyone will love it.',
    fomoTag: '⚠️ Limited Quantity — Do Not Miss Out!',
    fomoTitle: 'Stand out..<br/>Your keychain glows! ⌨️💡',
    guarantee: '14-Day Money Back Guarantee',

    // Footer
    footerLinks: 'Quick Links',
    footerLegal: 'Legal',
    footerSupport: 'Support',
    footerLinkHome: 'Home',
    footerLinkProducts: 'Products',
    footerLinkAbout: 'About Us',
    footerLinkPrivacy: 'Privacy Policy',
    footerLinkTerms: 'Terms of Use',
    footerLinkShipping: 'Shipping Policy',
    footerLinkContact: 'Contact Us',
    footerLinkTracking: 'Track Your Order',
    footerCopy: '© 2026 Kypostore. All rights reserved.',

    // Language Drawer
    chooseLanguage: 'Choose Language',
    langAr: 'Arabic',
    langEn: 'English',

    // Reviews
    reviewsTitle: 'Reviews',
    outOf5: 'out of 5',
    showImagesOnly: 'Show reviews with images only',
    loadMoreReviews: 'Load more reviews',
    translatedFromArabic: 'Translated from Arabic',
  }
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private doc = inject(DOCUMENT);

  language = signal<Lang>(this.getInitialLang());

  constructor() {
    effect(() => {
      const lang = this.language();
      this.applyDirection(lang);
      localStorage.setItem('site_language', lang);
    });
  }

  private getInitialLang(): Lang {
    const saved = localStorage.getItem('site_language');
    return (saved === 'en' || saved === 'ar') ? saved as Lang : 'ar';
  }

  private applyDirection(lang: Lang) {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.doc.documentElement.setAttribute('dir', dir);
    this.doc.documentElement.setAttribute('lang', lang);
  }

  setLanguage(lang: Lang) {
    this.language.set(lang);
  }

  t(key: string): string {
    return translations[this.language()][key] ?? key;
  }
}

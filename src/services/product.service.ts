
import { Injectable, inject } from '@angular/core';
import { TranslationService } from './translation.service';

export interface ProductVariant {
  name: string;
  colorCode: string; // Hex for UI
  image?: string; // Optional: Linked to specific gallery image
}

export interface ProductBundle {
  id: string;
  title: string;
  quantity: number;
  price: number; // Total price for the bundle
  savings: number; // Amount saved
  savePercent: number; // Percentage saved
  isBestValue?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
  description: string;
  features: string[];
  images: string[];
  variants: ProductVariant[];
  bundles?: ProductBundle[];
  badge?: string; // Optional badge text
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'kypolight™',
      title: 'Kypolight™ — ميدالية كيبورد LED',
      price: 46.79,
      compareAtPrice: 0,
      badge: '🔥 الأكثر مبيعاً',
      description: `ميدالية كيبورد LED من Kypostore! 🎮⌨️
تصميم ميني كيبورد ميكانيكي مع إضاءة RGB تتغير بألوان خيالية.
مصنوعة من مواد عالية الجودة، خفيفة وأنيقة.
أفضل هدية للقيمرز ومحبي التقنية والكيبوردات الميكانيكية!
تجي بلونين: أسود كلاسيكي وشفاف عصري. كل وحدة فيها إضاءة LED مدمجة تخلي الميدالية تلمع بشكل رهيب.
علقها على شنطتك، مفاتيحك، أو حتى على الباك باق حقك — شكلها يجنن ويلفت الانتباه! 🔥`,
      features: [
        '💡 إضاءة LED مدمجة: ألوان RGB متغيرة تلمع بشكل خيالي.',
        '⌨️ تصميم ميني كيبورد: شكل كيبورد ميكانيكي مصغر بتفاصيل دقيقة.',
        '🎁 هدية مثالية: للقيمرز، مهندسين البرمجة، ومحبي التقنية.',
        '🔗 حلقة متينة: سهلة التعليق على المفاتيح، الشنط، والباك باق.',
        '✨ جودة عالية: مواد ممتازة ما تنكسر بسهولة وتعيش معك.'
      ],
      images: [
        '/assets/products/kypolight_desk.png',
        '/assets/products/kypolight_hand.png',
        '/assets/products/kypolight_rgb.png',
        '/assets/products/kypolight_dark.png',
        '/assets/products/kypolight_lifestyle.png',
        'https://cdn.shopify.com/s/files/1/0606/5579/6288/files/S524c61777db149bf9fd52fdab09f3f64l.webp?v=1779028303',
        'https://cdn.shopify.com/s/files/1/0606/5579/6288/files/S700fb645b1924dd5a83788e608710b19l.webp?v=1779028303',
        'https://cdn.shopify.com/s/files/1/0606/5579/6288/files/S21d75830e7444d058ee535605e7834d6V.webp?v=1779028304',
        'https://cdn.shopify.com/s/files/1/0606/5579/6288/files/Se4ef8bb2d91b4bca9097ac93d18e7a5fp.webp?v=1779028304',
      ],
      variants: [
        {
          name: 'شفاف',
          colorCode: '#e0e7ff',
          image: '/assets/products/kypolight_desk.png'
        },
        {
          name: 'أسود',
          colorCode: '#1f2937',
          image: '/assets/products/kypolight_dark.png'
        }
      ],
      bundles: [
        { id: 'k1', title: 'حبة وحدة', quantity: 1, price: 46.79, savings: 0, savePercent: 0 },
        { id: 'k2', title: 'حبتين (وفر 5%)', quantity: 2, price: 88.90, savings: 4.68, savePercent: 5, isBestValue: true },
        { id: 'k3', title: '4 حبات (وفر 30%)', quantity: 4, price: 131.01, savings: 56.15, savePercent: 30 }
      ]
    }
  ];

  ts = inject(TranslationService);

  getProducts() {
    const isEn = this.ts.language() === 'en';
    return this.products.map(p => {
      if (p.id === 'kypolight™') {
        return {
          ...p,
          title: isEn ? 'Kypolight™ — LED Keyboard Keychain' : 'Kypolight™ — ميدالية كيبورد LED',
          badge: isEn ? '🔥 Best Seller' : '🔥 الأكثر مبيعاً',
          description: isEn ? 'A mini mechanical keyboard keychain with 4 real keys and built-in RGB LED lighting. Transparent and modern design.' : p.description
        };
      }
      return p;
    });
  }

  getProduct(id: string) {
    return this.getProducts().find(p => p.id === id);
  }

  getRelatedProducts(currentId: string) {
    return this.getProducts().filter(p => p.id !== currentId);
  }
}

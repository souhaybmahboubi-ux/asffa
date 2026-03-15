
import { Injectable, signal } from '@angular/core';

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
  savings: number; // Percentage or Amount saved label
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
  isAntiDetection?: boolean; // True if the product is metal and blocks detection devices
  badge?: string; // Optional badge text
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'stealth-vault-insulated-tumbler',
      title: 'ترمس ستيلث فولت™ — الذهب المعدني',
      price: 129.89,
      compareAtPrice: 249.00,
      isAntiDetection: true,
      badge: '🛡️ مضاد للكشف',
      description: `الحل الذهبي لمن يريد الأمان المطلق. ترمس ستيلث فولت™ مصنوع من الستانلس ستيل المعدني الفاخر، مما يجعله غير مرئي لأجهزة الكشف والمسح الأمني!
أجهزة الكشف بالمدارس؟ ماسحات المطار؟ كلها ما تقدر تشوف محتواه! الهيكل المعدني يحجب الإشارات ويمنع كشف ما بداخله.
المخبأ السري تحت قاعدة الترمس يسع جوالك، مفاتيحك، بطاقاتك، والفيب بكل سهولة.
عزل حراري من طبقتين يحافظ على مشروبك بارداً 24 ساعة أو ساخناً 12 ساعة. الأمان والفخامة في آنٍ واحد!`,
      features: [
        '🛡️ مضاد للكشف: الهيكل المعدني يحجب أجهزة الكشف والمسح الأمني 100%.',
        '❄️ عزل مزدوج: يحافظ على البرودة 24 ساعة والسخونة 12 ساعة.',
        '🔒 مخبأ سري عميق: يسع جوال، مفاتيح، بطاقات، وفيب بكل راحة.',
        '✨ ستانلس ستيل فاخر: لا صدأ، لا كسر، يعيش معك سنوات.',
        '🎭 تصميم بريء: يبدو ترمس عادي من الخارج، سر كامل من الداخل.'
      ],
      images: [
        '/assets/products/metal-bottle.png',
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/Gemini_Generated_Image_zbpzyfzbpzyfzbpz.png?v=1766527136',
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/image_6.png?v=1766527136',
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/wmremove-transformed_1.png?v=1766527136',
      ],
      variants: [
        { name: 'أسود ماتي', colorCode: '#1f2937' },
      ],
      bundles: [
        { id: 'mv1', title: 'حبة وحدة', quantity: 1, price: 129.89, savings: 0 },
        { id: 'mv2', title: 'عرض الاثنين', quantity: 2, price: 299.00, savings: 20.78, isBestValue: true },
        { id: 'mv3', title: 'عرض الشلة (3 حبات)', quantity: 3, price: 429.00, savings: 50.67 }
      ]
    },
    {
      id: 'stealthhydrate™-water-bottle-with-hidden-safe',
      title: 'مطارة نوريفا™',
      price: 86.99,
      compareAtPrice: 195.00,
      description: `تبي الفكة من قروشة التفتيش؟ وتبي أغراضك تكون معك طول الوقت؟
مطارة نوريفا™ هي الحل اللي تدوره. شكلها مطارة ماي كشخة وعادية، بس داخلها "علوم ثانية"! 😉
فيها مخبا سري تحت، وسيع وراهي! يشيل جوالك بالراحة (حتى لو معك آيفون 17 برو ماكس)، ويشيل سماعاتك، والفيب (Vape)، وحتى فلوسك.
والأهم من هذا كله؟ ما تخر ماي أبد! نظام العزل فيها بطل، يعني تطمن أغراضك ناشفة وأمان 100%.
شكلها بريء ما يلفت النظر، يعني تمشي أمورك فالمدرسة والطلعات وأنت مرتاح. خلك ذيب واضمن أغراضك معك!`,
      features: [
        'مخبا راهي: يشيل آيفون 17 برو ماكس، إيربودز، والفيب بالراحة.',
        'ما تخر أبد: عزل 100% بين الماي والأغراض، يعني أجهزتك بأمان.',
        'تمويه ولا غلطة: شكلها مطارة عادية، محد بيشك فيك.',
        'جودة توب: تتحمل الكرف والطيحات، تعيش معك.'
      ],
      // Images ordered exactly as per CSV input
      images: [
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/wmremove-transformed.png?v=1766527136',       // Position 1
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/wmremove-transformed_1.png?v=1766527136',     // Position 2
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/Gemini_Generated_Image_zbpzyfzbpzyfzbpz.png?v=1766527136', // Position 3
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/image_6.png?v=1766527136',                    // Position 4
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S5c5dfff128554bc88b28bfcea87a7d39T.webp?v=1766527136',      // Position 5 (2nd to Last)
        'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S46a2503ca66d4869b91e7678c28a8324z.webp?v=1766527136'       // Position 6 (Last)
      ],
      variants: [
        {
          name: 'أبيض لؤلؤي',
          colorCode: '#f9fafb',
          // Linked to the last image
          image: 'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S46a2503ca66d4869b91e7678c28a8324z.webp?v=1766527136'
        },
        {
          name: 'أحمر كلاسيك',
          colorCode: '#dc2626',
          // Linked to the one before the last (2nd to last)
          image: 'https://cdn.shopify.com/s/files/1/0649/3421/5739/files/S5c5dfff128554bc88b28bfcea87a7d39T.webp?v=1766527136'
        }
      ],
      bundles: [
        { id: 'b1', title: 'حبة وحدة', quantity: 1, price: 86.99, savings: 0 },
        { id: 'b2', title: 'عرض الربع (حبتين)', quantity: 2, price: 155.00, savings: 18.98, isBestValue: true },
        { id: 'b3', title: 'عرض الشلة (4 حبات)', quantity: 4, price: 290.00, savings: 57.96 }
      ]
    }
  ];

  getProducts() {
    return this.products;
  }

  getProduct(id: string) {
    return this.products.find(p => p.id === id);
  }

  getRelatedProducts(currentId: string) {
    return this.products.filter(p => p.id !== currentId);
  }
}

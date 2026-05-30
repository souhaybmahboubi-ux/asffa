import { Component, inject, signal, computed, effect, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { TranslationService } from '../../services/translation.service';
import { ReviewsComponent } from '../reviews/reviews.component';

interface UIProductVariant {
  id: string;
  name: string;
  colorCode: string;
  image?: string;
  price: number;
}

interface UIProductBundle {
  id: string;
  title: string;
  quantity: number;
  price: number;
  savings: number;
  savePercent: number;
  isBestValue?: boolean;
}

interface UIProduct {
  id: string;
  title: string;
  price: number;
  compareAtPrice: number;
  description: string;
  descriptionHtml?: string;
  features: string[];
  images: string[];
  variants: UIProductVariant[];
  bundles: UIProductBundle[];
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewsComponent],
  template: `
    <div class="bg-white min-h-screen pb-20">
      
      @if (loading()) {
        <div class="min-h-screen flex items-center justify-center pt-20">
           <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
        </div>
      }

      @if (error()) {
        <div class="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
           <h2 class="text-2xl font-bold text-red-500 mb-2">Error Loading Product</h2>
           <p class="text-gray-500 mb-6">{{ error() }}</p>
           <button routerLink="/products" class="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">Go Back to Catalog</button>
        </div>
      }

      @if (!loading() && !error() && product(); as currentProduct) {
          <div class="container mx-auto px-4 pt-28 md:pt-40 pb-8">
            
            <nav class="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 space-x-reverse md:space-x-3">
                <li><a routerLink="/" class="hover:text-black transition-colors">{{ ts.t('home') }}</a></li>
                <li>/</li>
                <li><a routerLink="/products" class="hover:text-black transition-colors">{{ ts.t('products') }}</a></li>
                <li>/</li>
                <li class="text-black font-medium" aria-current="page">{{ currentProduct.title }}</li>
              </ol>
            </nav>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                
                <!-- Product Info -->
                <div class="order-2 lg:order-last">
                  <h1 class="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">{{ currentProduct.title }}</h1>
                  
                  <div class="flex items-center gap-3 mb-6 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-full w-fit">
                    <span class="bg-black text-white px-2 py-0.5 rounded-md text-xs font-black">★ 4.9</span>
                    <span class="text-black font-black text-sm">{{ ts.t('reviewsCount') }}</span>
                    <span class="text-green-600 font-bold text-xs flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      {{ ts.t('happyCustomers') }}
                    </span>
                  </div>

                  <div class="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-black">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                       <h4 class="font-black text-black text-base mb-0.5">{{ ts.t('freeShipping') }}</h4>
                       <p class="text-gray-600 text-sm font-medium">{{ ts.t('freeShippingDesc') }}</p>
                    </div>
                  </div>

                  <div class="flex items-end gap-4 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-200 inline-flex w-full">
                    <div class="flex flex-col">
                        <span class="text-sm text-gray-500 mb-1">{{ ts.t('currentPrice') }}</span>
                        <span class="text-4xl font-black text-black">
                             {{ currencyService.formatPrice(product()!.price) }}
                        </span>
                    </div>
                    @if (product()!.compareAtPrice > product()!.price) {
                        <div class="flex flex-col mb-1.5 mr-4">
                             <span class="text-xs text-gray-500 line-through">
                                {{ currencyService.formatPrice(product()!.compareAtPrice) }}
                             </span>
                             <span class="text-xs text-gray-700 font-bold">{{ ts.t('taxIncl') }}</span>
                        </div>
                    }
                  </div>

                  @if (product()!.bundles && product()!.bundles.length > 0) {
                     <div class="mb-8">
                        <h3 class="text-sm font-bold text-black mb-4">{{ ts.t('chooseBundle') }}</h3>
                        <div class="space-y-3">
                           @for (bundle of product()!.bundles; track bundle.id) {
                              <div 
                                 class="relative flex flex-col p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                                 (click)="selectBundle(bundle)"
                                 [class.border-2]="selectedBundle()?.id === bundle.id"
                                 [class.border-black]="selectedBundle()?.id === bundle.id"
                                 [class.shadow-[0_8px_30px_rgb(0,0,0,0.04)]]="selectedBundle()?.id === bundle.id"
                                 [class.bg-gray-50/40]="selectedBundle()?.id === bundle.id"
                                 [class.border]="selectedBundle()?.id !== bundle.id"
                                 [class.border-gray-200]="selectedBundle()?.id !== bundle.id"
                                 [class.hover:border-gray-300]="selectedBundle()?.id !== bundle.id"
                              >
                                 <!-- Bundle Header Info -->
                                 <div class="flex items-center justify-between w-full">
                                   <div class="flex items-center gap-3">
                                      <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-200" 
                                           [class.border-black]="selectedBundle()?.id === bundle.id"
                                           [class.border-gray-300]="selectedBundle()?.id !== bundle.id"
                                      >
                                           @if (selectedBundle()?.id === bundle.id) {
                                              <div class="w-2.5 h-2.5 bg-black rounded-full animate-in zoom-in-50 duration-200"></div>
                                           }
                                      </div>
                                      
                                      <div class="flex flex-col gap-0.5">
                                         <div class="flex items-center gap-2 flex-wrap">
                                            <span class="font-bold text-gray-950 text-base md:text-lg leading-none">{{ bundle.title }}</span>
                                            @if (bundle.isBestValue) {
                                               <span class="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded-full leading-none shadow-sm">{{ ts.t('bestSeller') }}</span>
                                            }
                                            @if (bundle.savePercent > 0) {
                                               <span class="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">{{ ts.t('saveLabel') }} {{ bundle.savePercent }}%</span>
                                            }
                                         </div>
                                         <span class="text-xs text-gray-400 font-medium">
                                            {{ bundle.quantity }} {{ bundle.quantity === 1 ? ts.t('piece') : (bundle.quantity === 2 ? ts.t('twoPieces') : ts.t('pieces')) }}
                                         </span>
                                      </div>
                                   </div>

                                   <div class="text-left flex flex-col items-end">
                                      <div class="font-black text-lg md:text-xl text-black leading-none">{{ currencyService.formatPrice(bundle.price) }}</div>
                                      @if (bundle.savings > 0) {
                                        <div class="text-xs text-gray-400 line-through mt-1 font-medium">{{ currencyService.formatPrice(product()!.price * bundle.quantity) }}</div>
                                      }
                                   </div>
                                 </div>

                                 <!-- Embedded Variant Selectors (Multi-Piece) -->
                                 @if (selectedBundle()?.id === bundle.id) {
                                    <div class="mt-4 pt-4 border-t border-gray-150 w-full" (click)="$event.stopPropagation()">
                                      <div class="bg-white rounded-xl border border-gray-100 p-2 md:p-3 space-y-2">
                                         <!-- Loop for each item in bundle -->
                                         @for (idx of getSequence(bundle.quantity); track idx) {
                                            <div class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
                                               <span class="text-xs font-bold text-gray-500">
                                                  {{ bundle.quantity === 1 ? ts.t('chooseColorLabel') : (ts.t('pieceColor') + ' ' + (idx + 1) + ':') }}
                                               </span>
                                               <div class="flex gap-2">
                                                  @for (variant of product()!.variants; track variant.name) {
                                                     <button 
                                                        (click)="updateBundleVariant(idx, variant)"
                                                        class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
                                                        [class.border-black]="selectedBundleVariants()[idx]?.name === variant.name"
                                                        [class.bg-black]="selectedBundleVariants()[idx]?.name === variant.name"
                                                        [class.text-white]="selectedBundleVariants()[idx]?.name === variant.name"
                                                        [class.border-gray-200]="selectedBundleVariants()[idx]?.name !== variant.name"
                                                        [class.bg-white]="selectedBundleVariants()[idx]?.name !== variant.name"
                                                        [class.text-gray-700]="selectedBundleVariants()[idx]?.name !== variant.name"
                                                     >
                                                        <span class="w-3 h-3 rounded-full border border-gray-200 shadow-sm flex-shrink-0" [style.background-color]="variant.colorCode"></span>
                                                        {{ variant.name }}
                                                     </button>
                                                  }
                                               </div>
                                            </div>
                                         }
                                      </div>
                                    </div>
                                 }
                              </div>
                           }
                        </div>
                     </div>
                  } @else if (product()!.variants.length > 1) {
                    <div class="mb-8">
                      <h3 class="text-sm font-bold text-black mb-4">{{ ts.t('chooseColorLabel') }} <span class="text-gray-600">{{ selectedVariant()?.name }}</span></h3>
                      <div class="flex gap-3 flex-wrap">
                        @for (variant of product()!.variants; track variant.id) {
                          <button 
                            (click)="selectVariant(variant)"
                            class="px-5 py-2.5 rounded-xl border-2 transition-all focus:outline-none font-bold text-sm"
                            [class.border-black]="selectedVariant()?.id === variant.id"
                            [class.bg-gray-50]="selectedVariant()?.id === variant.id"
                            [class.text-black]="selectedVariant()?.id === variant.id"
                            [class.border-gray-200]="selectedVariant()?.id !== variant.id"
                            [class.text-gray-600]="selectedVariant()?.id !== variant.id"
                          >
                            {{ variant.name }}
                          </button>
                        }
                      </div>
                    </div>
                  }

                   <div class="flex flex-col gap-6 mb-8">
                       <div class="flex flex-col gap-4">
                         <div class="flex gap-4">
                           @if (!product()!.bundles || product()!.bundles.length === 0) {
                             <div class="flex items-center border border-gray-200 rounded-xl h-16 bg-white overflow-hidden">
                               <button (click)="decrementQty()" class="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors font-bold border-l border-gray-200">-</button>
                               <input type="text" [value]="quantity()" readonly class="w-12 h-full text-center font-black text-black bg-transparent border-none focus:ring-0 p-0 text-lg">
                               <button (click)="incrementQty()" class="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black transition-colors font-bold border-r border-gray-200">+</button>
                             </div>
                           }

                           <button 
                             (click)="addToCart()"
                             [disabled]="adding()"
                             class="flex-1 font-bold rounded-xl h-16 flex items-center justify-center gap-2 border border-black text-black hover:bg-gray-50 transition-all text-lg active:scale-95 disabled:opacity-50"
                           >
                             @if (addedToCart()) {
                               <span class="flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                                 {{ ts.t('added') }}
                               </span>
                             } @else {
                               <span class="flex items-center gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                 {{ ts.t('addToCart') }}
                               </span>
                             }
                           </button>
                         </div>

                         <button 
                           (click)="buyNow()"
                           [disabled]="adding()"
                           class="btn-attention w-full font-bold rounded-xl h-16 flex items-center justify-center gap-3 shadow-md transition-all text-xl overflow-hidden relative active:scale-95 bg-black hover:bg-gray-900 text-white disabled:opacity-50"
                         >
                           <div class="flex items-center gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span>
                                {{ ts.t('buyNow') }} - {{ currencyService.formatPrice(selectedBundle() ? selectedBundle()!.price : product()!.price * quantity()) }}
                              </span>
                           </div>
                         </button>
                       </div>
                   </div>

                   <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100">
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-500">{{ ts.t('qualityGuarantee') }}</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-500">{{ ts.t('freeShippingBadge') }}</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-500">{{ ts.t('securePay') }}</span>
                        </div>
                        <div class="flex flex-col items-center text-center gap-2">
                            <span class="text-xs font-bold text-gray-500">{{ ts.t('easyReturn') }}</span>
                        </div>
                   </div>

                  <div class="space-y-6 mt-8">
                    <div class="border rounded-2xl p-6 bg-white border-gray-200 shadow-sm transition-all duration-300">
                      <h3 class="font-bold text-xl mb-6 flex items-center justify-between text-black">
                        <span>{{ ts.t('descFeatures') }}</span>
                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-black">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                      </h3>
                      
                      <div class="space-y-4 text-gray-600 leading-relaxed text-base font-medium mb-8">
                        <p>{{ ts.t('descP1') }}</p>
                        <p>{{ ts.t('descP2') }}</p>
                        <p>{{ ts.t('descP3') }}</p>
                        <p>{{ ts.t('descP4') }}</p>
                      </div>

                      <ul class="space-y-3 pt-6 border-t border-gray-100">
                        <li class="flex items-start gap-3 text-gray-700">
                          <div class="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">{{ ts.t('rgbLabel') }}: <span class="font-medium text-gray-500">{{ ts.t('featRgbDesc') }}</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-700">
                          <div class="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">{{ ts.t('featMecTitle') }}: <span class="font-medium text-gray-500">{{ ts.t('featMecDesc') }}</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-700">
                          <div class="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">{{ ts.t('featGiftTitle') }}: <span class="font-medium text-gray-500">{{ ts.t('featGiftDesc') }}</span></span>
                        </li>
                        <li class="flex items-start gap-3 text-gray-700">
                          <div class="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                              </svg>
                          </div>
                          <span class="font-bold text-sm">{{ ts.t('featQualTitle') }}: <span class="font-medium text-gray-500">{{ ts.t('featQualDesc') }}</span></span>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>

                <!-- Image Gallery -->
                <div class="space-y-6 order-1 lg:order-first lg:sticky lg:top-32 h-fit">
                  <div class="relative group bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden">
                    <div 
                      #mainImageContainer
                      class="flex overflow-x-auto snap-x snap-mandatory no-scrollbar aspect-square scroll-smooth"
                      (scroll)="onMainScroll()"
                    >
                      @for (img of currentProduct.images; track img; let i = $index) {
                        <div class="min-w-full h-full snap-center flex items-center justify-center relative bg-gray-50">
                          <img 
                            [src]="img" 
                            class="object-cover w-full h-full rounded-2xl shadow-sm"
                            [alt]="currentProduct.title"
                          >
                        </div>
                      }
                    </div>
                    
                    @if (getDiscountPercentage() > 0) {
                        <span class="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                        {{ ts.t('saveLabel') }} {{ getDiscountPercentage() }}%
                        </span>
                    }
                    
                    <button (click)="scrollNext()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-sm transition-all z-20 active:scale-95 flex items-center justify-center text-gray-600 backdrop-blur-sm">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button (click)="scrollPrev()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-sm transition-all z-20 active:scale-95 flex items-center justify-center text-gray-600 backdrop-blur-sm">
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

            </div>

            <!-- Reviews Section -->
            <div class="mt-24 border-t border-gray-100 pt-20">
              <app-reviews></app-reviews>
            </div>
      </div>
      }
    </div>

  `,
  styles: [`
    @keyframes wiggle {
        0%, 90%, 100% { transform: rotate(0) scale(1); }
        91% { transform: rotate(-3deg) scale(1.02); }
        92% { transform: rotate(3deg) scale(1.02); }
        93% { transform: rotate(-3deg) scale(1.02); }
        94% { transform: rotate(3deg) scale(1.02); }
        95% { transform: rotate(-3deg) scale(1.02); }
    }
    .btn-attention {
        animation: wiggle 4s ease-in-out infinite;
        transform-origin: center;
    }
  `]
})
export class ProductPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);
  ts = inject(TranslationService);

  @ViewChild('mainImageContainer') mainImageContainer!: ElementRef<HTMLElement>;

  loading = signal(true);
  error = signal<string | null>(null);
  product = signal<UIProduct | null>(null);

  quantity = signal(1);
  selectedVariant = signal<UIProductVariant | null>(null);
  selectedBundle = signal<UIProductBundle | null>(null);
  selectedBundleVariants = signal<UIProductVariant[]>([]);

  adding = signal(false);
  addedToCart = signal(false);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const handle = params.get('handle');
        this.loading.set(true);
        this.error.set(null);
        this.product.set(null);

        if (handle) {
          return this.shopifyService.fetchProduct(handle).pipe(
            catchError(err => {
              console.error('API Error', err);
              this.error.set('Could not load product. Please check the URL.');
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe(data => {
      this.loading.set(false);
      if (data) {
        this.processShopifyProduct(data);
      }
    });
  }

  private processShopifyProduct(data: any) {
    const variants: UIProductVariant[] = data.variants.map((v: any) => {
      let name = v.title;
      let colorCode = '#000000';
      const titleLower = v.title.toLowerCase();
      if (titleLower.includes('black')) {
        name = this.ts.t('colorBlack');
        colorCode = '#1f2937';
      } else if (titleLower.includes('clear') || titleLower.includes('transparent')) {
        name = this.ts.t('colorClear');
        colorCode = '#e0e7ff';
      } else {
        // Cleanup remaining "(with light)" or "(مع إضاءة)" texts
        name = name.replace(/\(with light\)/gi, '')
                   .replace(/with light/gi, '')
                   .replace(/\(مع إضاءة\)/g, '')
                   .replace(/مع إضاءة/g, '')
                   .trim();
      }
      return {
        id: v.id,
        name: name,
        colorCode: colorCode,
        image: v.image?.src,
        price: parseFloat(v.price.amount)
      };
    });

    const basePrice = variants[0]?.price || 0;

    const product: UIProduct = {
      id: data.id,
      title: this.ts.language() === 'en' ? 'Kypolight™ — LED Keyboard Keychain' : data.title,
      description: data.description,
      descriptionHtml: data.descriptionHtml,
      images: data.images.map((img: any) => img.src),
      variants: variants,
      price: basePrice,
      compareAtPrice: 0,
      features: [],
      bundles: [
        { id: 'b1', title: this.ts.t('bundle1'), quantity: 1, price: basePrice, savings: 0, savePercent: 0 },
        { id: 'b2', title: this.ts.t('bundle2'), quantity: 2, price: 88.90, savings: basePrice * 2 - 88.90, savePercent: 5, isBestValue: true },
        { id: 'b3', title: this.ts.t('bundle3'), quantity: 4, price: 131.01, savings: basePrice * 4 - 131.01, savePercent: 30 }
      ]
    };

    if (data.variants[0]?.compareAtPrice) {
      product.compareAtPrice = parseFloat(data.variants[0].compareAtPrice.amount);
    }

    this.product.set(product);
    if (variants.length > 0) {
      this.selectVariant(variants[0]);
    }
    if (product.bundles.length > 0) {
      this.selectBundle(product.bundles[0]);
    }
  }

  selectVariant(variant: UIProductVariant) {
    this.selectedVariant.set(variant);
    
    // Find variant image index in product images and scroll to it
    if (variant.image) {
      const idx = this.product()?.images.findIndex(img => {
        const cleanImg = img.split('?')[0];
        const cleanVarImg = variant.image!.split('?')[0];
        return cleanImg === cleanVarImg || img.includes(cleanVarImg) || cleanVarImg.includes(img);
      });
      if (idx !== undefined && idx !== -1) {
        this.scrollToIndex(idx);
      }
    }
  }

  selectBundle(bundle: UIProductBundle) {
    this.selectedBundle.set(bundle);
    const p = this.product();
    if (p && p.variants.length > 0) {
      const arr = Array(bundle.quantity).fill(p.variants[0]);
      this.selectedBundleVariants.set(arr);
    }
  }

  updateBundleVariant(index: number, variant: UIProductVariant) {
    const arr = [...this.selectedBundleVariants()];
    arr[index] = variant;
    this.selectedBundleVariants.set(arr);

    // Find variant image index in product images and scroll to it
    if (variant.image) {
      const idx = this.product()?.images.findIndex(img => {
        const cleanImg = img.split('?')[0];
        const cleanVarImg = variant.image!.split('?')[0];
        return cleanImg === cleanVarImg || img.includes(cleanVarImg) || cleanVarImg.includes(img);
      });
      if (idx !== undefined && idx !== -1) {
        this.scrollToIndex(idx);
      }
    }
  }

  getSequence(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  incrementQty() {
    this.quantity.update(q => q + 1);
  }

  decrementQty() {
    this.quantity.update(q => q > 1 ? q - 1 : 1);
  }

  addToCart() {
    this.adding.set(true);
    const bundle = this.selectedBundle();
    
    if (bundle && bundle.quantity > 0) {
      const variants = this.selectedBundleVariants();
      const items = variants.map(v => ({ variantId: v.id, quantity: 1 }));
      
      // Combine identical items
      const combinedItems: { [id: string]: number } = {};
      items.forEach(item => {
        combinedItems[item.variantId] = (combinedItems[item.variantId] || 0) + item.quantity;
      });
      
      const finalItems = Object.keys(combinedItems).map(id => ({ variantId: id, quantity: combinedItems[id] }));

      // Store the bundle discount so the cart drawer shows discounted prices
      if (bundle.savePercent > 0) {
        this.shopifyService.bundleDiscount.set({ quantity: bundle.quantity, totalPrice: bundle.price });
      } else {
        this.shopifyService.bundleDiscount.set(null);
      }

      this.shopifyService.addItemsToCheckout(finalItems);
    } else {
      const variant = this.selectedVariant();
      if (!variant) return;
      this.shopifyService.bundleDiscount.set(null);
      this.shopifyService.addItemToCheckout(variant.id, this.quantity());
    }

    setTimeout(() => {
      this.adding.set(false);
      this.addedToCart.set(true);
      this.shopifyService.openCart();
      setTimeout(() => this.addedToCart.set(false), 2000);
    }, 1000);
  }

  buyNow() {
    this.adding.set(true);
    const bundle = this.selectedBundle();
    
    if (bundle && bundle.quantity > 0) {
      const variants = this.selectedBundleVariants();
      const items = variants.map(v => ({ variantId: v.id, quantity: 1 }));
      
      const combinedItems: { [id: string]: number } = {};
      items.forEach(item => {
        combinedItems[item.variantId] = (combinedItems[item.variantId] || 0) + item.quantity;
      });
      
      const finalItems = Object.keys(combinedItems).map(id => ({ variantId: id, quantity: combinedItems[id] }));
      this.shopifyService.addItemsToCheckout(finalItems);
    } else {
      const variant = this.selectedVariant();
      if (!variant) return;
      this.shopifyService.addItemToCheckout(variant.id, this.quantity());
    }

    setTimeout(() => {
      this.adding.set(false);
      this.shopifyService.redirectToCheckout();
    }, 1000);
  }

  getDiscountPercentage() {
    const p = this.product();
    if (!p || !p.compareAtPrice || p.compareAtPrice <= p.price) return 0;
    return Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100);
  }

  scrollToIndex(index: number) {
    if (this.mainImageContainer?.nativeElement) {
      const container = this.mainImageContainer.nativeElement;
      const child = container.children[index] as HTMLElement;
      if (child) {
        const scrollAmount = child.offsetLeft - container.offsetLeft;
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  scrollNext() { this.scrollDirection('next'); }
  scrollPrev() { this.scrollDirection('prev'); }

  private scrollDirection(direction: 'next' | 'prev') {
    if (!this.mainImageContainer?.nativeElement) return;
    const container = this.mainImageContainer.nativeElement;
    const currentIndex = Math.round(Math.abs(container.scrollLeft) / container.offsetWidth);
    const total = this.product()?.images.length || 0;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < total) {
      this.scrollToIndex(nextIndex);
    }
  }

  onMainScroll() { }
}

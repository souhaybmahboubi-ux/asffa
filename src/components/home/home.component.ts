
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { TranslationService } from '../../services/translation.service';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- HERO SECTION -->
    <section class="relative bg-gray-50 overflow-hidden min-h-[85vh] flex items-center pt-28 md:pt-36 pb-16">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center max-w-4xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-full mb-6 shadow-sm">
            <span class="text-xs font-bold">{{ ts.t('heroTag') }}</span>
          </div>
          <h1 class="text-4xl xs:text-5xl md:text-7xl font-black text-black leading-[1.1] mb-6 tracking-tight">
            ميداليتك <span class="text-gray-500">تلمع!</span><br/>
            Kypolight™ ⌨️💡
          </h1>
          <p class="text-lg md:text-xl text-gray-500 leading-loose max-w-2xl mx-auto font-medium">
            {{ ts.t('heroSubtitle') }}
          </p>
        </div>

        <!-- PRODUCT CARD -->
        <div class="max-w-2xl mx-auto relative">
          <div class="bg-white rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col border border-gray-100 shadow-xl">
            <div class="flex flex-wrap items-center gap-2 mb-6">
              <span class="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-black px-3 py-1.5 rounded-full">
                {{ ts.t('bestSellerBadge') }}
              </span>
              <span class="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-black px-3 py-1.5 rounded-full">
                {{ ts.t('ledBadge') }}
              </span>
            </div>

            <!-- Image -->
            <div class="relative flex items-center justify-center py-6 min-h-[280px] bg-gray-50 rounded-2xl mb-6 border border-gray-100 group">
              <img
                [src]="product.images[0]"
                width="300"
                height="300"
                alt="Kypolight Keyboard Keychain"
                class="object-contain max-h-[280px] drop-shadow-lg group-hover:scale-105 transition-transform duration-500 relative z-10"
              >
              <div class="absolute bottom-3 right-3 bg-white border border-gray-200 px-4 py-2 rounded-xl z-20 shadow-sm pointer-events-none">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">⌨️</span>
                  <div class="flex flex-col">
                    <span class="text-gray-900 text-xs font-black uppercase tracking-wider">{{ ts.t('rgbLabel') }}</span>
                    <span class="text-gray-500 text-[10px] font-medium">{{ ts.t('rgbDesc') }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="mt-2">
              <h2 class="text-3xl md:text-4xl font-black text-black mb-3">{{ product.title }}</h2>
              <p class="text-gray-600 text-[15px] leading-relaxed mb-6 font-medium">
                {{ ts.t('productDesc') }}
              </p>
              <div class="space-y-3 mb-8">
                <div class="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black shrink-0 font-bold shadow-sm">✓</div>
                <span class="font-bold">{{ ts.t('feat1') }}</span>
                </div>
                <div class="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black shrink-0 font-bold shadow-sm">✓</div>
                <span class="font-bold">{{ ts.t('feat2') }}</span>
                </div>
                <div class="flex items-center gap-3 text-gray-700 text-sm bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div class="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black shrink-0 font-bold shadow-sm">✓</div>
                <span class="font-bold">{{ ts.t('feat3') }}</span>
                </div>
              </div>
            </div>

            <!-- Price + CTA -->
            <div class="mt-auto pt-6 border-t border-gray-100">
              <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
                <div class="flex flex-col">
                  <span class="inline-flex text-[10px] text-gray-500 bg-gray-100 font-black px-2 py-0.5 rounded-sm w-fit mb-1 border border-gray-200">{{ ts.t('bestPriceTag') }}</span>
                  <div class="flex items-center gap-3">
                    <span class="text-4xl font-black text-black">{{ currencyService.formatPrice(product.price) }}</span>
                  </div>
                </div>
              </div>
               <a [routerLink]="['/product', product.id]"
                 class="flex flex-col items-center justify-center w-full bg-black text-white hover:bg-gray-900 font-black py-4 rounded-xl transition-all duration-300 relative overflow-hidden active:scale-95 shadow-md">
                <span class="text-lg relative z-10 flex items-center gap-2">{{ ts.t('heroCta') }}</span>
                <span class="text-[11px] font-bold opacity-80 mt-1 relative z-10">{{ ts.t('heroCtaSub') }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Social Proof -->
        <div class="mt-12 flex items-center justify-center gap-6 flex-wrap">
          <div class="flex -space-x-4 -space-x-reverse">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Ahmed" class="w-10 h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm" alt="Avatar">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Sara" class="w-10 h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm" alt="Avatar">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Fahad" class="w-10 h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm" alt="Avatar">
            <div class="w-10 h-10 rounded-full border-2 border-white bg-black text-white flex items-center justify-center text-xs font-bold shadow-sm">+2k</div>
          </div>
          <div class="text-right">
            <div class="flex text-black text-sm">★★★★★</div>
            <p class="text-xs font-bold text-gray-500">{{ ts.t('happyClient') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TICKER TAPE -->
    <div class="bg-black text-white overflow-hidden py-4 relative z-20">
      <div class="flex items-center gap-12 animate-marquee whitespace-nowrap">
        @for (item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; track item) {
          <span class="text-xl font-bold mx-8 flex items-center gap-6 opacity-90">
            <span>⌨️ Kypolight™</span>
            <span class="w-2 h-2 rounded-full bg-gray-600"></span>
            <span>{{ ts.t('rgbLabel') }}</span>
            <span class="w-2 h-2 rounded-full bg-gray-600"></span>
            <span>{{ ts.t('tickerGift') }}</span>
            <span class="w-2 h-2 rounded-full bg-gray-600"></span>
            <span>{{ ts.t('tickerShipping') }}</span>
            <span class="w-2 h-2 rounded-full bg-gray-600"></span>
          </span>
        }
      </div>
    </div>

    <!-- FEATURES SECTION -->
    <section class="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-black mb-4">{{ ts.t('featTitle') }}</h2>
          <p class="text-gray-500 text-lg">{{ ts.t('featSubtitle') }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          <div class="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="text-5xl mb-6 text-black opacity-90">💡</div>
            <h3 class="text-xl font-black text-black mb-3">{{ ts.t('rgbLabel') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed text-sm">{{ ts.t('featRgbDesc') }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="text-5xl mb-6 text-black opacity-90">⌨️</div>
            <h3 class="text-xl font-black text-black mb-3">{{ ts.t('featMecTitle') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed text-sm">{{ ts.t('featMecDesc') }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="text-5xl mb-6 text-black opacity-90">🎁</div>
            <h3 class="text-xl font-black text-black mb-3">{{ ts.t('featGiftTitle') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed text-sm">{{ ts.t('featGiftDesc') }}</p>
          </div>
          <div class="bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div class="text-5xl mb-6 text-black opacity-90">💪</div>
            <h3 class="text-xl font-black text-black mb-3">{{ ts.t('featQualTitle') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed text-sm">{{ ts.t('featQualDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BUNDLES SECTION -->
    <section class="py-24 bg-gray-50 relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-black mb-4">{{ ts.t('bundleTitle') }}</h2>
          <p class="text-gray-500 text-lg">{{ ts.t('bundleSubtitle') }}</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          @for (bundle of product.bundles; track bundle.id) {
            <div class="relative group">
              @if (bundle.isBestValue) {
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-[11px] font-black px-4 py-1 rounded-full z-10 shadow-md border border-gray-800">{{ ts.t('bestValue') }}</div>
              }
              <div class="bg-white rounded-2xl p-6 transition-all duration-300 h-full flex flex-col shadow-sm border"
                   [class.border-black]="bundle.isBestValue"
                   [class.shadow-md]="bundle.isBestValue"
                   [class.border-gray-200]="!bundle.isBestValue"
                   [class.hover:border-gray-300]="!bundle.isBestValue">
                <h3 class="text-lg font-black text-black mb-2">{{ bundle.title }}</h3>
                <p class="text-gray-500 text-sm mb-4">{{ bundle.quantity }} {{ bundle.quantity === 1 ? ts.t('piece') : ts.t('pieces') }}</p>
                <div class="mt-auto">
                  <div class="text-2xl font-black text-black mb-1">{{ currencyService.formatPrice(bundle.price) }}</div>
                  @if (bundle.savePercent > 0) {
                    <div class="text-xs font-bold text-gray-500">{{ ts.t('saveLabel') }} {{ bundle.savePercent }}% 🔥</div>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        <div class="text-center mt-10">
          <a [routerLink]="['/product', product.id]"
             class="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-800 font-black px-10 py-4 rounded-2xl transition-all duration-300 active:scale-95 shadow-md">
            {{ ts.t('orderNow') }}
          </a>
        </div>
      </div>
    </section>

    <!-- USE CASE SECTION -->
    <section class="py-24 bg-white relative border-t border-gray-100">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-black mb-6">{{ ts.t('usecaseTitle') }}</h2>
          <p class="text-xl text-gray-500">{{ ts.t('usecaseSubtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-3 gap-4 md:gap-6">
          <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <div class="text-6xl mb-6">🎮</div>
            <h3 class="text-2xl font-black text-black mb-3">{{ ts.t('usecase1Title') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              {{ ts.t('usecase1Desc') }}
            </p>
          </div>
          <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <div class="text-6xl mb-6">👨‍💻</div>
            <h3 class="text-2xl font-black text-black mb-3">{{ ts.t('usecase2Title') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              {{ ts.t('usecase2Desc') }}
            </p>
          </div>
          <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <div class="text-6xl mb-6">🎁</div>
            <h3 class="text-xl font-black text-black mb-3">{{ ts.t('usecase3Title') }}</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              {{ ts.t('usecase3Desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FOMO CTA -->
    <section class="py-20 bg-gray-50 relative overflow-hidden border-t border-gray-200">
      <div class="container mx-auto px-4 text-center relative z-10">
        <span class="inline-block bg-white text-gray-800 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-gray-200 shadow-sm">
          {{ ts.t('fomoTag') }}
        </span>
        <h2 class="text-4xl md:text-6xl font-black text-black mb-8 leading-tight" [innerHTML]="ts.t('fomoTitle')">
        </h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-xl mx-auto">
          <a [routerLink]="['/product', product.id]"
             class="flex-1 bg-black text-white text-xl font-black px-8 py-5 rounded-2xl shadow-md hover:bg-gray-800 transition-all duration-300 flex flex-col items-center justify-center gap-1">
            <span class="flex items-center gap-2">⌨️ اطلب Kypolight™</span>
            <span class="text-[11px] font-bold opacity-70 mt-1">شحن مجاني + توصيل سريع</span>
          </a>
        </div>
        <div class="mt-6 flex items-center justify-center gap-2 text-gray-500 font-medium text-sm">
          <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          {{ ts.t('guarantee') }}
        </div>
      </div>
    </section>
  `,
  styles: [`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      animation: marquee 15s linear infinite;
    }
  `]
})
export class HomeComponent {
  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  ts = inject(TranslationService);
  product = this.productService.getProduct('kypolight™')!;
}


import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { NgOptimizedImage, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, CommonModule],
  template: `
    <!-- ════════════════════════════════════════════════════════════
         HERO SECTION — Split showcase for both products
    ════════════════════════════════════════════════════════════ -->
    <section class="relative bg-white overflow-hidden min-h-[90vh] flex items-center pt-32 pb-16">
      <!-- Background -->
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-900/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div class="container mx-auto px-4">
        <!-- Hero heading -->
        <div class="text-center max-w-4xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full mb-6 shadow-lg">
            <span class="text-xs font-bold">🔥 الهبة رقم #1 في المدارس</span>
          </div>
          <h1 class="text-4xl xs:text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
            التفتيش <span class="text-red-500 underline decoration-4 decoration-yellow-400">مفاجئ؟</span><br/>
            جوالك <span class="text-primary-600">بأمان!</span> 😎
          </h1>
          <p class="text-lg md:text-xl text-gray-600 leading-loose max-w-2xl mx-auto font-medium">
            نوريڤا عندها نسختين من الكنز السري. اختار اللي يناسبك، أو خذ الاثنين! 🚀
          </p>
        </div>

        <!-- ─── DUAL PRODUCT CARDS ─── -->
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <!-- CARD 1 — Metal (Anti-Detection) — Premier -->
          <div class="relative group">
            <!-- Glow border -->
            <div class="absolute -inset-1 bg-gradient-to-br from-gray-800 via-gray-600 to-amber-500 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative bg-gray-950 rounded-3xl overflow-hidden p-8 h-full flex flex-col">

              <!-- Anti-Detection Badge -->
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black px-3 py-1.5 rounded-full">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                  مضاد للكشف — ستانلس ستيل
                </span>
                <span class="text-xs font-bold bg-red-500/20 border border-red-500/30 text-red-400 px-2 py-1 rounded-full">الأفضل</span>
              </div>

              <!-- Image -->
              <div class="relative flex-1 flex items-center justify-center py-4 min-h-[220px]">
                <div class="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-transparent rounded-2xl"></div>
                <img
                  [ngSrc]="metalProduct.images[0]"
                  width="300"
                  height="300"
                  priority
                  alt="Stealth Vault Tumbler"
                  class="object-contain max-h-[240px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500 relative z-10"
                >
                <!-- Detection blocked badge -->
                <div class="absolute bottom-2 right-2 bg-green-500/20 border border-green-500/30 backdrop-blur-sm px-3 py-1.5 rounded-xl z-20">
                  <div class="flex items-center gap-1.5">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span class="text-green-300 text-[10px] font-black">كاشفات الجوال ما تشوفه</span>
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div class="mt-6">
                <h2 class="text-2xl font-black text-white mb-2">{{ metalProduct.title }}</h2>
                <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  الهيكل المعدني يحجب أجهزة الكشف تمامًا. لا أحد يرى ما بداخله — لا في المدرسة، لا في المطار!
                </p>
                <!-- Key perks -->
                <div class="space-y-2 mb-6">
                  <div class="flex items-center gap-2 text-gray-300 text-xs">
                    <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    <span>جهاز الكشف؟ ما يشوف شيء — مضمون 100%</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-300 text-xs">
                    <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    <span>بارد 24 ساعة / ساخن 12 ساعة</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-300 text-xs">
                    <svg class="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    <span>ستانلس ستيل فاخر — لا يصدأ أبدًا</span>
                  </div>
                </div>
                <!-- Price + CTA -->
                <div class="flex items-end justify-between mb-4">
                  <div>
                    <span class="text-2xl font-black text-white">{{ currencyService.formatPrice(metalProduct.price) }}</span>
                    <span class="text-xs text-gray-500 line-through mr-2">{{ currencyService.formatPrice(metalProduct.compareAtPrice) }}</span>
                  </div>
                  <span class="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-lg">وفر {{ getSavings(metalProduct.price, metalProduct.compareAtPrice) }}%</span>
                </div>
                <a [routerLink]="['/product', metalProduct.id]"
                   class="block w-full text-center bg-gradient-to-r from-gray-700 to-amber-600 hover:from-gray-600 hover:to-amber-500 text-white font-black py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30 text-base">
                  🛡️ اطلب الترمس المعدني
                </a>
              </div>
            </div>
          </div>

          <!-- CARD 2 — Plastic (Standard) -->
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-br from-primary-400 via-primary-500 to-blue-500 rounded-3xl blur-sm opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div class="relative bg-white rounded-3xl overflow-hidden p-8 h-full flex flex-col border border-gray-100 shadow-xl">

              <!-- Badge -->
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center gap-1.5 bg-primary-100 border border-primary-200 text-primary-700 text-xs font-black px-3 py-1.5 rounded-full">
                  💧 مطارة بلاستيك خفيفة
                </span>
                <span class="text-xs font-bold bg-green-50 border border-green-200 text-green-600 px-2 py-1 rounded-full">الأرخص</span>
              </div>

              <!-- Image -->
              <div class="relative flex-1 flex items-center justify-center py-4 min-h-[220px]">
                <div class="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent rounded-2xl"></div>
                <img
                  [ngSrc]="plasticProduct.images[0]"
                  width="300"
                  height="300"
                  priority
                  alt="StealthHydrate Bottle"
                  class="object-contain max-h-[240px] drop-shadow-xl group-hover:scale-105 transition-transform duration-500 relative z-10"
                >
                <!-- Note badge -->
                <div class="absolute bottom-2 right-2 bg-orange-100 border border-orange-200 px-3 py-1.5 rounded-xl z-20">
                  <div class="flex items-center gap-1.5">
                    <span class="text-orange-500 text-[10px] font-black">⚠️ الكاشف قد يرى الجوال</span>
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div class="mt-6">
                <h2 class="text-2xl font-black text-gray-900 mb-2">{{ plasticProduct.title }}</h2>
                <p class="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  مطارة ذكية خفيفة بمخبأ سري تحت. مثالية للمدرسة، النادي، والسفر. لكن انتبه — البلاستيك قد يكشف محتوى الجوال!
                </p>
                <!-- Key perks -->
                <div class="space-y-2 mb-6">
                  <div class="flex items-center gap-2 text-gray-600 text-xs">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>يشيل آيفون 17 برو ماكس راحة</span>
                  </div>
                  <div class="flex items-center gap-2 text-gray-600 text-xs">
                    <svg class="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m8.66-10h-1M4.34 12h-1m15.07-6.07l-.71.71M6.34 17.66l-.71.71M17.66 17.66l-.71-.71M6.34 6.34l-.71-.71"/></svg>
                    <span>ألوان متعددة — خفيف وعصري</span>
                  </div>
                  <div class="flex items-center gap-2 text-orange-500 text-xs font-bold">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span>البلاستيك شفاف للكاشفات — للأماكن بدون تفتيش شديد</span>
                  </div>
                </div>
                <!-- Price + CTA -->
                <div class="flex items-end justify-between mb-4">
                  <div>
                    <span class="text-2xl font-black text-gray-900">{{ currencyService.formatPrice(plasticProduct.price) }}</span>
                    <span class="text-xs text-gray-400 line-through mr-2">{{ currencyService.formatPrice(plasticProduct.compareAtPrice) }}</span>
                  </div>
                  <span class="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-1 rounded-lg">وفر {{ getSavings(plasticProduct.price, plasticProduct.compareAtPrice) }}%</span>
                </div>
                <a [routerLink]="['/product', plasticProduct.id]"
                   class="block w-full text-center bg-gray-900 hover:bg-primary-600 text-white font-black py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-base">
                  💧 اطلب المطارة البلاستيك
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Social Proof Row -->
        <div class="mt-12 flex items-center justify-center gap-6 flex-wrap">
          <div class="flex -space-x-4 -space-x-reverse">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Ahmed" class="w-10 h-10 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Sara" class="w-10 h-10 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
            <img src="https://api.dicebear.com/9.x/micah/svg?seed=Fahad" class="w-10 h-10 rounded-full border-4 border-white bg-gray-100" alt="Avatar">
            <div class="w-10 h-10 rounded-full border-4 border-white bg-black text-white flex items-center justify-center text-xs font-bold">+5k</div>
          </div>
          <div class="text-right">
            <div class="flex text-yellow-500 text-sm">★★★★★</div>
            <p class="text-xs font-bold text-gray-500">طالب وطالبة يعتمدون عليها</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         TICKER TAPE
    ════════════════════════════════════════════════════════════ -->
    <div class="bg-gradient-to-r from-primary-800 to-primary-900 text-white overflow-hidden py-4 relative z-20 shadow-xl">
      <div class="flex items-center gap-12 animate-marquee whitespace-nowrap">
        @for (item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]; track item) {
          <span class="text-xl font-bold mx-8 flex items-center gap-6 opacity-90">
            <span>🛡️ مضاد للكشف</span>
            <span class="w-2 h-2 rounded-full bg-white/30"></span>
            <span>مخبأ سري</span>
            <span class="w-2 h-2 rounded-full bg-white/30"></span>
            <span>ستانلس ستيل</span>
            <span class="w-2 h-2 rounded-full bg-white/30"></span>
            <span>خصوصية تامة</span>
            <span class="w-2 h-2 rounded-full bg-white/30"></span>
          </span>
        }
      </div>
    </div>

    <!-- ════════════════════════════════════════════════════════════
         COMPARISON SECTION — Metal vs Plastic
    ════════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-gray-950 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-white mb-4">أيهما يناسبك؟ 🤔</h2>
          <p class="text-gray-400 text-lg">مقارنة مباشرة بين النسختين حتى تاخذ القرار الصح</p>
        </div>

        <div class="max-w-4xl mx-auto">
          <!-- Table Header -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="text-center text-gray-500 text-sm font-bold py-3"></div>
            <div class="text-center bg-gray-900 border border-amber-500/30 rounded-2xl py-4 px-3">
              <div class="text-amber-400 text-xl mb-1">🛡️</div>
              <div class="text-white font-black text-sm">ترمس ستيلث فولت</div>
              <div class="text-amber-400 text-xs font-bold">معدني فاخر</div>
            </div>
            <div class="text-center bg-gray-900 border border-primary-500/30 rounded-2xl py-4 px-3">
              <div class="text-primary-400 text-xl mb-1">💧</div>
              <div class="text-white font-black text-sm">مطارة نوريفا</div>
              <div class="text-primary-400 text-xs font-bold">بلاستيك عصري</div>
            </div>
          </div>

          <!-- Comparison Rows -->
          @for (row of comparisonRows; track row.feature) {
            <div class="grid grid-cols-3 gap-2 mb-2">
              <div class="text-gray-300 text-sm font-bold flex items-center px-3 py-3 bg-gray-900/50 rounded-xl">{{ row.feature }}</div>
              <div class="text-center flex items-center justify-center py-3 px-2 rounded-xl"
                   [class]="row.metalBetter ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-gray-900/50 border border-gray-800'">
                <span class="text-sm font-bold" [class]="row.metalBetter ? 'text-amber-300' : 'text-gray-400'">{{ row.metal }}</span>
              </div>
              <div class="text-center flex items-center justify-center py-3 px-2 rounded-xl"
                   [class]="!row.metalBetter ? 'bg-primary-500/10 border border-primary-500/30' : 'bg-gray-900/50 border border-gray-800'">
                <span class="text-sm font-bold" [class]="!row.metalBetter ? 'text-primary-300' : 'text-gray-400'">{{ row.plastic }}</span>
              </div>
            </div>
          }

          <!-- CTA Row -->
          <div class="grid grid-cols-3 gap-2 mt-6">
            <div></div>
            <a [routerLink]="['/product', metalProduct.id]"
               class="block text-center bg-gradient-to-r from-gray-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-black py-3 rounded-xl transition-all text-sm hover:scale-105">
              اطلبه الحين →
            </a>
            <a [routerLink]="['/product', plasticProduct.id]"
               class="block text-center bg-primary-600 hover:bg-primary-500 text-white font-black py-3 rounded-xl transition-all text-sm hover:scale-105">
              اطلبها الحين →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         ANTI-DETECTION SPOTLIGHT — Metal Bottle Feature
    ════════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-white relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-100 rounded-full blur-[120px] opacity-40"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <!-- Visual Side -->
          <div class="relative flex justify-center">
            <div class="relative">
              <!-- Animated rings -->
              <div class="absolute inset-0 rounded-full border-4 border-dashed border-red-400/30 animate-spin-slow scale-[1.4]"></div>
              <div class="absolute inset-0 rounded-full border-4 border-dashed border-red-400/20 animate-spin-slow-reverse scale-[1.7]"></div>
              <!-- Bottle -->
              <div class="w-52 h-52 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-2xl">
                <img
                  [ngSrc]="metalProduct.images[0]"
                  width="160"
                  height="160"
                  alt="Metal Anti-Detection Bottle"
                  class="object-contain drop-shadow-xl animate-float"
                >
              </div>
              <!-- X scan lines blocked -->
              <div class="absolute -top-4 -right-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full animate-bounce">🚫 كاشف مسدود</div>
              <div class="absolute top-6 -left-6 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full">✅ محتوى مخفي</div>
            </div>
          </div>

          <!-- Text Side -->
          <div>
            <div class="inline-block bg-amber-100 border border-amber-200 text-amber-700 text-xs font-black px-4 py-2 rounded-full mb-6">
              🛡️ التقنية المضادة للكشف
            </div>
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              الستانلس ستيل يحجب<br/>
              <span class="text-amber-500">إشارات الكاشفات</span> 🔕
            </h2>
            <p class="text-gray-600 leading-relaxed mb-8 text-base">
              المطارات البلاستيكية شفافة للأشعة السينية والكاشفات — يعني تشوف الجوال بداخلها.
              أما الترمس المعدني من ستيلث فولت، فالجدار المعدني يمتص ويحجب الإشارات، مما يجعل المحتوى غير مرئي تمامًا لأجهزة الكشف.
            </p>
            <!-- Feature Pills -->
            <div class="grid grid-cols-2 gap-3 mb-8">
              <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div class="text-2xl mb-2">📡</div>
                <div class="text-sm font-black text-gray-900">يحجب إشارات الأشعة</div>
                <div class="text-xs text-gray-500 mt-1">الجدار المعدني يمتص الإشارة</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div class="text-2xl mb-2">🏫</div>
                <div class="text-sm font-black text-gray-900">آمن في المدارس</div>
                <div class="text-xs text-gray-500 mt-1">لا أحد يشك فيك</div>
              </div>
              <div class="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <div class="text-2xl mb-2">✈️</div>
                <div class="text-sm font-black text-gray-900">في المطارات</div>
                <div class="text-xs text-gray-500 mt-1">خصوصية تامة في كل مكان</div>
              </div>
              <div class="bg-amber-50 border border-amber-100 rounded-xl p-4">
                <div class="text-2xl mb-2">🏆</div>
                <div class="text-sm font-black text-amber-900">الحل الأمثل</div>
                <div class="text-xs text-amber-700 mt-1">للي يريد أمان 100%</div>
              </div>
            </div>
            <a [routerLink]="['/product', metalProduct.id]"
               class="inline-flex items-center gap-2 bg-gray-900 hover:bg-amber-600 text-white font-black px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30">
              🛡️ اطلب الترمس المعدني
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         USE CASE SECTION
    ════════════════════════════════════════════════════════════ -->
    <section class="py-24 bg-gray-50 relative">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-6">وين تقدر تستخدمها؟ 🤔</h2>
          <p class="text-xl text-gray-600">نوريڤا مب بس مطارة، هي خزنتك الخاصة وين ما تروح.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div class="text-6xl mb-6">🏫</div>
            <h3 class="text-2xl font-black text-gray-900 mb-3">في المدرسة</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              جوالك، ايربودزك، وفلوس الفسحة. كلها داخل المطارة.
              <span class="block mt-2 text-green-600 font-bold">النتيجة: تمشي من عند الوكيل واثق!</span>
            </p>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <span class="text-xs font-bold text-amber-600">🛡️ الترمس المعدني = أمان مضاعف</span>
            </div>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div class="text-6xl mb-6">🏋️‍♂️</div>
            <h3 class="text-2xl font-black text-gray-900 mb-3">في النادي (GYM)</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              ما يحتاج تشيل هم مفاتيحك وجوالك وين تحطهم وأنت تتمرن.
              <span class="block mt-2 text-primary-600 font-bold">خلهم جنبك وأنت ترفع أوزان.</span>
            </p>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <span class="text-xs font-bold text-primary-600">💧 المطارة البلاستيك = خفيفة ومريحة</span>
            </div>
          </div>

          <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div class="text-6xl mb-6">✈️</div>
            <h3 class="text-2xl font-black text-gray-900 mb-3">في السفر والطلعات</h3>
            <p class="text-gray-600 font-medium leading-relaxed">
              رايح البحر؟ طالع مخيم؟ خبي فلوسك وأغراضك المهمة في مكان محد يتوقعه.
              <span class="block mt-2 text-blue-600 font-bold">أمان وحفظ للخصوصية.</span>
            </p>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <span class="text-xs font-bold text-amber-600">🛡️ الترمس المعدني = أمان في المطار</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════
         FOMO CTA
    ════════════════════════════════════════════════════════════ -->
    <section class="py-20 bg-primary-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
      <div class="container mx-auto px-4 text-center relative z-10">
        <span class="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-sm border border-white/30">
          ⚠️ تنبيه: الكمية تخلص بسرعة
        </span>
        <h2 class="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
          لا تضيع الفرصة..<br/>
          خلك كشخة وآمن!
        </h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a [routerLink]="['/product', metalProduct.id]"
             class="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black text-lg font-black px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
            🛡️ الترمس المعدني
          </a>
          <a [routerLink]="['/product', plasticProduct.id]"
             class="w-full sm:w-auto bg-gray-900 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-xl hover:scale-105 hover:bg-black transition-all duration-300 flex items-center justify-center gap-2">
            💧 المطارة البلاستيك
          </a>
        </div>
        <div class="mt-6 flex items-center justify-center gap-2 text-white/80 font-medium text-sm">
          <svg class="w-5 h-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          ضمان ذهبي لاسترجاع الأموال
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
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-16px); }
    }
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spin-slow-reverse {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
    .animate-spin-slow-reverse {
      animation: spin-slow-reverse 25s linear infinite;
    }
  `]
})
export class HomeComponent {
  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  metalProduct = this.productService.getProduct('stealth-vault-insulated-tumbler')!;
  plasticProduct = this.productService.getProduct('stealthhydrate™-water-bottle-with-hidden-safe')!;

  comparisonRows = [
    { feature: 'يحجب أجهزة الكشف', metal: '✅ نعم — 100%', plastic: '❌ لا', metalBetter: true },
    { feature: 'المادة', metal: '🔩 ستانلس ستيل', plastic: '💧 بلاستيك', metalBetter: true },
    { feature: 'العزل الحراري', metal: '❄️ 24 ساعة بارد', plastic: '🌡️ بدون', metalBetter: true },
    { feature: 'الوزن', metal: '⚖️ ثقيل نسبياً', plastic: '✅ خفيف', metalBetter: false },
    { feature: 'المخبأ السري', metal: '✅ موجود', plastic: '✅ موجود', metalBetter: false },
    { feature: 'يشيل الجوال', metal: '✅ نعم', plastic: '✅ نعم', metalBetter: false },
    { feature: 'السعر', metal: '159.89 ر.س', plastic: '87 ر.س', metalBetter: false },
  ];

  getSavings(price: number, compareAtPrice: number): number {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }
}

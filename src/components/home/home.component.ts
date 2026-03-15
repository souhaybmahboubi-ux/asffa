
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

        <!-- ─── DUAL PRODUCT CARDS (Redesigned for optimal conversion) ─── -->
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch mt-8 relative">
          
          <!-- VS Badge in middle of cards on desktop -->
          <div class="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full items-center justify-center font-black text-gray-400 shadow-xl border border-gray-100 z-20">
            VS
          </div>

          <!-- CARD 2 — Plastic (Standard) — Economic Alternative -->
          <div class="relative group order-2 lg:order-1 mt-0 lg:mt-6">
            <div class="relative bg-white rounded-3xl overflow-hidden p-8 h-full flex flex-col border-2 border-gray-100/80 shadow-md transition-all duration-300 hover:border-gray-200 hover:shadow-lg">
              
              <!-- Badge -->
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-700 text-xs font-black px-3 py-1.5 rounded-full">
                  💧 الخيار الاقتصادي (بلاستيك)
                </span>
              </div>

              <!-- Image -->
              <div class="relative flex-1 flex items-center justify-center py-4 min-h-[200px] bg-gray-50/50 rounded-2xl mb-6 border border-gray-50">
                <img
                  [src]="plasticProduct.images[0]"
                  width="250"
                  height="250"
                  alt="StealthHydrate Bottle"
                  class="object-contain max-h-[220px] drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                >
              </div>

              <!-- Info -->
              <div class="flex-1">
                <h2 class="text-2xl font-black text-gray-900 mb-2">{{ plasticProduct.title }}</h2>
                <p class="text-gray-500 text-sm leading-relaxed mb-4 font-medium">
                  مطارة ممتازة بمخبأ سري، خفيفة وعملية. تناسب الأماكن اللي مافيها تفتيش شديد للشنط.
                </p>
                <!-- Key perks -->
                <div class="space-y-3 mb-6">
                  <div class="flex items-center gap-3 text-gray-600 text-sm font-medium">
                    <span class="text-green-500 font-bold bg-green-50 px-1.5 py-0.5 rounded shrink-0">✓</span>
                    <span>يشيل آيفون 17 برو ماكس بـ راحة</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-600 text-sm font-medium">
                    <span class="text-green-500 font-bold bg-green-50 px-1.5 py-0.5 rounded shrink-0">✓</span>
                    <span>خفيف الوزن ومناسب للنادي والمشاوير</span>
                  </div>
                  <div class="flex items-start gap-3 text-orange-600 text-sm font-bold bg-orange-50 p-2.5 rounded-xl border border-orange-100/50">
                    <span class="mt-0.5 shrink-0">⚠️</span>
                    <span class="leading-relaxed">تنبيه: البلاستيك شفاف بجهاز كشف المعادن أو حقائب المدرسة، قد يظهر الجوال بداخله.</span>
                  </div>
                </div>
              </div>
              
              <!-- Price + CTA -->
              <div class="mt-auto pt-6 border-t border-gray-100">
                <div class="flex items-end justify-between mb-4">
                  <div class="flex flex-col">
                    <span class="text-xs text-gray-400 font-medium mb-1">السعر الأساسي</span>
                    <div class="flex items-center gap-2">
                       <span class="text-3xl font-black text-gray-900">{{ currencyService.formatPrice(plasticProduct.price) }}</span>
                    </div>
                  </div>
                </div>
                <a [routerLink]="['/product', plasticProduct.id]"
                   class="block w-full text-center bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 font-black py-3.5 rounded-2xl transition-all text-sm hover:bg-gray-50 active:scale-95">
                  عرض تفاصيل البلاستيك
                </a>
              </div>
            </div>
          </div>

          <!-- CARD 1 — Metal (Anti-Detection) — The Best Seller / Pro Option -->
          <div class="relative group order-1 lg:order-2 z-10 lg:-mt-4">
            <!-- Glow background emitting outwards -->
            <div class="absolute -inset-2 lg:-inset-3 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
            
            <div class="relative bg-gray-950 rounded-3xl overflow-hidden p-8 lg:p-10 h-full flex flex-col border border-gray-800 shadow-[0_0_50px_rgba(251,191,36,0.15)] lg:scale-[1.03]">
              <!-- Best Seller Ribbon -->
              <div class="absolute top-0 right-0 overflow-hidden w-32 h-32 rounded-tr-3xl pointer-events-none">
                <div class="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-[11px] px-12 py-1.5 translate-x-[25%] translate-y-[80%] rotate-45 shadow-lg w-[170px] text-center border-b border-white/20 tracking-wider">
                  الأكثر مبيعاً 🔥
                </div>
              </div>

              <!-- Anti-Detection Badge -->
              <div class="flex flex-wrap items-center gap-2 mb-6 pr-4 relative z-10">
                <span class="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black px-3 py-1.5 rounded-full">
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                  أمان مطلق — المعدن الصلب
                </span>
              </div>

              <!-- Image -->
              <div class="relative flex-1 flex items-center justify-center py-6 min-h-[240px] bg-gradient-to-b from-gray-800/40 to-transparent rounded-2xl mb-6 border border-gray-800/50 group-hover:border-amber-500/20 transition-colors">
                <img
                  [src]="metalProduct.images[0]"
                  width="300"
                  height="300"
                  alt="Stealth Vault Tumbler"
                  class="object-contain max-h-[260px] drop-shadow-[0_20px_40px_rgba(251,191,36,0.15)] group-hover:scale-110 transition-transform duration-500 relative z-10"
                >
                <!-- Detection blocked badge -->
                <div class="absolute bottom-3 right-3 bg-green-500/10 border border-green-500/30 backdrop-blur-md px-4 py-2 rounded-xl z-20 shadow-xl pointer-events-none">
                  <div class="flex items-center gap-2">
                    <span class="text-3xl drop-shadow-lg">🚫📡</span>
                    <div class="flex flex-col">
                      <span class="text-green-300 text-xs font-black uppercase tracking-wider">مضاد للكشف تماماً</span>
                      <span class="text-gray-300 text-[10px] font-medium">أجهزة المدارس ما تشوفه</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div class="flex-1 mt-2">
                <h2 class="text-3xl md:text-4xl font-black text-white mb-3">{{ metalProduct.title }}</h2>
                <div class="text-gray-400 text-[15px] leading-relaxed mb-6 font-medium">
                  ليش تاخذ البلاستيك وتخاف من التفتيش؟
                  <span class="text-amber-400 font-bold bg-amber-400/10 px-1.5 rounded mx-1">بزيادة {{ (metalProduct.price - plasticProduct.price) | number:'1.0-2' }} ريال فقط</span>
                  احصل على الخيار الاحترافي اللي يحجب أجهزة الكشف 100% ويحفظ البرودة ليوم كامل!
                </div>
                <!-- Key perks -->
                <div class="space-y-3 mb-8">
                  <div class="flex items-center gap-3 text-gray-200 text-sm bg-gray-900/50 p-3 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-colors">
                    <div class="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0 font-bold">✓</div>
                    <span class="font-bold">يحجب إشارات أجهزة التفتيش تماماً (مضمون 100%)</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-200 text-sm bg-gray-900/50 p-3 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-colors">
                    <div class="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold">✓</div>
                    <span class="font-bold">عزل حراري دبل: بارد 24 ساعة / حار 12 ساعة</span>
                  </div>
                  <div class="flex items-center gap-3 text-gray-200 text-sm bg-gray-900/50 p-3 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-colors">
                    <div class="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 font-bold">✓</div>
                    <span class="font-bold">جودة فاخرة (ستانلس ستيل 304) ضد الصدأ والصدمات</span>
                  </div>
                </div>
              </div>

              <!-- Price + CTA -->
              <div class="mt-auto pt-6 border-t border-gray-800">
                <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
                  <div class="flex flex-col">
                    <span class="inline-flex text-[10px] text-amber-900 bg-amber-400 font-black px-2 py-0.5 rounded-sm w-fit mb-1 border border-amber-300">أفضل قيمة مقابل السعر</span>
                    <div class="flex items-center gap-3">
                      <span class="text-4xl font-black text-white">{{ currencyService.formatPrice(metalProduct.price) }}</span>
                      <span class="text-sm text-gray-500 line-through">{{ currencyService.formatPrice(metalProduct.compareAtPrice) }}</span>
                    </div>
                  </div>
                   <span class="text-[11px] font-bold text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded-lg w-fit">
                    وفر {{ getSavings(metalProduct.price, metalProduct.compareAtPrice) }}%
                   </span>
                </div>
                <a [routerLink]="['/product', metalProduct.id]"
                   class="flex flex-col items-center justify-center w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black py-4 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] relative overflow-hidden group/btn active:scale-95">
                  <span class="text-lg relative z-10 flex items-center gap-2">🛡️ اطلب ترمس الستانلس ستيل</span>
                  <span class="text-[11px] font-bold opacity-80 mt-1 relative z-10">خيار الأغلبية (أكثر من 85% من العملاء اختاروه)</span>
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
                  [src]="metalProduct.images[0]"
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
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-2xl mx-auto">
          <a [routerLink]="['/product', metalProduct.id]"
             class="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-black text-xl font-black px-8 py-5 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.5)] transform hover:scale-110 transition-all duration-300 flex flex-col items-center justify-center gap-1 group">
            <span class="flex items-center gap-2 drop-shadow-sm">🛡️ اطلب ترمس ستيلث فولت</span>
            <span class="text-[11px] font-bold opacity-80">(أنقذ جوالك 100%)</span>
          </a>
          <a [routerLink]="['/product', plasticProduct.id]"
             class="sm:w-1/3 bg-gray-800 text-gray-300 text-sm font-bold px-6 py-5 rounded-2xl shadow-xl hover:scale-105 hover:bg-gray-900 transition-all duration-300 flex flex-col items-center justify-center gap-1 border border-gray-700">
            <span class="flex items-center gap-2">💧 البلاستيك العادي</span>
            <span class="text-[9px] text-gray-400">(اقتصادي)</span>
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
    { feature: 'نسبة الأمان للتفتيش', metal: '🛡️ أمان 100% (المعدن يحجب الأشعة)', plastic: '⚠️ ضعيف (البلاستيك شفاف للأشعة)', metalBetter: true },
    { feature: 'المادة والمتانة', metal: '🔩 ستانلس ستيل قوي (متطور)', plastic: '💧 بلاستيك (خفيف ועادي)', metalBetter: true },
    { feature: 'العزل الحراري', metal: '❄️ ممتاز (بارد 24 ساعة، مقفل بإحكام)', plastic: '❌ لا يوجد (يحر بسرعة)', metalBetter: true },
    { feature: 'حجم المخبأ السري', metal: '📱 يتسع لأكبر الجوالات والفيب وغيرها', plastic: '📱 يتسع لأكبر الجوالات بسهولة', metalBetter: false },
    { feature: 'تقييم القيمة مقابل السعر', metal: '129.89 ر.س (الأكثر توفيراً لجودته 🔥)', plastic: '86.99 ر.س (الخيار الاقتصادي)', metalBetter: false },
  ];

  getSavings(price: number, compareAtPrice: number): number {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  }
}

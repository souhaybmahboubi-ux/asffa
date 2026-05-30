import { Component, signal, computed, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { KYPOLIGHT_REVIEWS } from '../../app/data/kypolight-reviews';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-12">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="text-right flex-1">
          <h2 class="text-3xl font-black text-black mb-2 flex items-center gap-2">
            {{ ts.t('reviewsTitle') }} ({{ filteredReviews().length }})
          </h2>
          <div class="flex items-center gap-2">
             <div class="flex text-black text-xl">★★★★★</div>
             <span class="text-gray-500 font-bold">4.9 {{ ts.t('outOf5') }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
           <label class="flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors border border-gray-200">
             <input type="checkbox" class="w-4 h-4 rounded text-black focus:ring-black border-gray-300" 
                    [checked]="filterWithImagesOnly()"
                    (change)="toggleImageFilter()">
             <span class="text-sm font-bold text-gray-700">{{ ts.t('showImagesOnly') }}</span>
           </label>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        @for (review of displayedReviews(); track review.id) {
          <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col animate-in fade-in zoom-in duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                 <div [class]="'h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ' + review.avatarBg + ' ' + review.avatarText">
                  {{ review.initial }}
                </div>
                <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
                    <svg class="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-black">{{ review.name }}</h5>
                <div class="flex items-center gap-1">
                   <div class="flex text-black text-sm">
                     @for (star of [1,2,3,4,5]; track star) {
                       <span>{{ star <= review.rating ? '★' : '☆' }}</span>
                     }
                   </div>
                </div>
              </div>
            </div>
            <div class="mb-4 flex-grow">
               <p class="text-gray-600 text-sm leading-relaxed font-medium">{{ review.comment }}</p>
               
               @if (ts.language() === 'en') {
                 <div class="mt-2 inline-flex items-center gap-1 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded text-[10px] text-gray-400 font-bold">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>
                    {{ ts.t('translatedFromArabic') }}
                 </div>
               }

               <!-- User Uploaded Images -->
               @if (review.images && review.images.length > 0) {
                 <div class="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    @for (img of review.images; track img) {
                      <div class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                         <img [src]="img" class="w-full h-full object-cover">
                      </div>
                    }
                 </div>
               }
            </div>
            <div class="pt-4 border-t border-gray-100 mt-auto">
               <span class="text-xs text-gray-400 flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ review.location }}
              </span>
            </div>
          </div>
        }
      </div>

      @if (hasMoreReviews()) {
        <div class="text-center pt-8">
          <button (click)="loadMore()" class="bg-gray-50 border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 hover:text-black transition-all shadow-sm">
            {{ ts.t('loadMoreReviews') }}
          </button>
        </div>
      }
    </div>
  `
})
export class ReviewsComponent implements OnChanges {
  @Input() productId: string = '';
  ts = inject(TranslationService);

  reviews = signal<any[]>(KYPOLIGHT_REVIEWS);
  visibleCount = signal(9);
  filterWithImagesOnly = signal(false);

  filteredReviews = computed(() => {
    const all = this.reviews();
    if (this.filterWithImagesOnly()) {
      return all.filter(r => r.images && r.images.length > 0);
    }
    return all;
  });

  displayedReviews = computed(() => this.filteredReviews().slice(0, this.visibleCount()));

  private loadReviews() {
    this.reviews.set(KYPOLIGHT_REVIEWS);
    this.visibleCount.set(9);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && this.productId) {
      this.loadReviews();
    }
  }

  toggleImageFilter() {
    this.filterWithImagesOnly.update(v => !v);
    this.visibleCount.set(9);
  }

  hasMoreReviews() {
    return this.visibleCount() < this.filteredReviews().length;
  }

  loadMore() {
    this.visibleCount.update(c => Math.min(c + 12, this.filteredReviews().length));
  }
}

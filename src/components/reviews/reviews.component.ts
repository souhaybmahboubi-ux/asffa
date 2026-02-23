import { Component, signal, computed, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { METAL_REVIEWS } from '../../app/data/metal-reviews';
import { PLASTIC_REVIEWS } from '../../app/data/plastic-reviews';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="space-y-12">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="text-right">
          <h2 class="text-3xl font-black text-gray-900 mb-2">التقييمات ({{ reviews().length }})</h2>
          <div class="flex items-center gap-2">
             <div class="flex text-gold-500 text-xl">★★★★★</div>
             <span class="text-gray-500 font-bold">4.9 من 5</span>
          </div>
        </div>
      </div>

      <!-- Reviews Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (review of displayedReviews(); track review.id) {
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col animate-in fade-in zoom-in duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                 <div [class]="'h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ' + review.avatarBg + ' ' + review.avatarText">
                  {{ review.initial }}
                </div>
                <div class="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-gray-900">{{ review.name }}</h5>
                <div class="flex items-center gap-1">
                   <div class="flex text-gold-500 text-sm">
                     @for (star of [1,2,3,4,5]; track star) {
                       <span>{{ star <= review.rating ? '★' : '☆' }}</span>
                     }
                   </div>
                </div>
              </div>
            </div>
            <div class="mb-4 flex-grow">
               <p class="text-gray-600 text-sm leading-relaxed font-medium">"{{ review.comment }}"</p>
               
               <!-- User Uploaded Images -->
               @if (review.images && review.images.length > 0) {
                 <div class="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    @for (img of review.images; track img) {
                      <div class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                         <img [ngSrc]="img" width="100" height="100" class="w-full h-full object-cover">
                      </div>
                    }
                 </div>
               }
            </div>
            <div class="pt-4 border-t border-gray-50 mt-auto">
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
          <button (click)="loadMore()" class="bg-white border border-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
            عرض المزيد من التقييمات
          </button>
        </div>
      }
    </div>
  `
})
export class ReviewsComponent implements OnChanges {
  @Input() productId: string = '';

  reviews = signal<any[]>(METAL_REVIEWS);
  visibleCount = signal(9);
  displayedReviews = computed(() => this.reviews().slice(0, this.visibleCount()));

  private loadReviews() {
    if (this.productId === 'stealth-vault-insulated-tumbler') {
      this.reviews.set(METAL_REVIEWS);
    } else {
      this.reviews.set(PLASTIC_REVIEWS);
    }
    this.visibleCount.set(9);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && this.productId) {
      this.loadReviews();
    }
  }

  hasMoreReviews() {
    return this.visibleCount() < this.reviews().length;
  }

  loadMore() {
    this.visibleCount.update(c => Math.min(c + 12, this.reviews().length));
  }
}

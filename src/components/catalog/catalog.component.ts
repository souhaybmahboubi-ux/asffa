import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CurrencyService } from '../../services/currency.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen pt-40 pb-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-black text-black mb-4">{{ ts.t('products') }}</h1>
          <p class="text-gray-500 max-w-2xl mx-auto">
            {{ ts.t('catalogDesc') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of products(); track product.id) {
            <a [routerLink]="['/product', product.id]" class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
              <div class="aspect-[4/3] bg-gray-50 relative overflow-hidden">
                <img 
                  [src]="product.images[0]" 
                  class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                  [alt]="product.title"
                >
                @if (product.badge) {
                  <span class="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {{ product.badge }}
                  </span>
                }
              </div>
              <div class="p-6">
                <h2 class="text-xl font-bold text-black group-hover:text-gray-600 transition-colors mb-2">{{ product.title }}</h2>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="text-2xl font-black text-black">{{ currencyService.formatPrice(product.price) }}</span>
                  </div>
                  <div class="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `
})
export class CatalogComponent {
  productService = inject(ProductService);
  currencyService = inject(CurrencyService);
  ts = inject(TranslationService);
  products = computed(() => this.productService.getProducts());
}

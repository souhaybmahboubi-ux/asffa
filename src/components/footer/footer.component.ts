
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <footer class="bg-black text-gray-400 pt-14 pb-32 md:pb-14 border-t border-gray-900">
      <div class="container mx-auto px-6 max-w-5xl">

        <!-- Brand Row -->
        <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-10">

          <!-- Language Switch Button (One-Click Toggle) -->
          <div>
            <button
              (click)="toggleLanguage()"
              class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all w-fit text-sm font-bold text-gray-300 hover:text-white active:scale-95"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
              </svg>
              {{ ts.language() === 'ar' ? 'English' : 'العربية' }}
            </button>
          </div>

          <!-- Link Columns -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">

            <!-- Quick Links -->
            <div>
              <h4 class="text-white font-black mb-4 text-xs uppercase tracking-widest">{{ ts.t('footerLinks') }}</h4>
              <ul class="space-y-3">
                <li><a routerLink="/" class="hover:text-white transition-colors">{{ ts.t('footerLinkHome') }}</a></li>
                <li><a routerLink="/products" class="hover:text-white transition-colors">{{ ts.t('footerLinkProducts') }}</a></li>
                <li><a routerLink="/about" class="hover:text-white transition-colors">{{ ts.t('footerLinkAbout') }}</a></li>
              </ul>
            </div>

            <!-- Legal -->
            <div>
              <h4 class="text-white font-black mb-4 text-xs uppercase tracking-widest">{{ ts.t('footerLegal') }}</h4>
              <ul class="space-y-3">
                <li><a routerLink="/privacy" class="hover:text-white transition-colors">{{ ts.t('footerLinkPrivacy') }}</a></li>
                <li><a routerLink="/terms" class="hover:text-white transition-colors">{{ ts.t('footerLinkTerms') }}</a></li>
                <li><a routerLink="/shipping" class="hover:text-white transition-colors">{{ ts.t('footerLinkShipping') }}</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h4 class="text-white font-black mb-4 text-xs uppercase tracking-widest">{{ ts.t('footerSupport') }}</h4>
              <ul class="space-y-3">
                <li><a routerLink="/contact" class="hover:text-white transition-colors">{{ ts.t('footerLinkContact') }}</a></li>
                <li><a routerLink="/tracking" class="hover:text-white transition-colors">{{ ts.t('footerLinkTracking') }}</a></li>
              </ul>
            </div>

          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs text-gray-600 font-bold">{{ ts.t('footerCopy') }}</p>

        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  ts = inject(TranslationService);

  toggleLanguage() {
    this.ts.setLanguage(this.ts.language() === 'ar' ? 'en' : 'ar');
  }
}


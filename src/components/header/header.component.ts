
import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopifyService } from '../../services/shopify.service';
import { CurrencyService } from '../../services/currency.service';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- Main Header Container -->
    <div class="fixed top-0 left-0 right-0 z-50 flex flex-col items-center bg-white border-b border-gray-100 transition-all duration-300" 
         [class.shadow-sm]="scrolled()">
      
      <!-- Announcement Bar -->
      <div class="w-full bg-black text-white text-xs font-bold py-2 px-4 text-center">
         <div class="flex transition-transform duration-700 ease-out justify-center h-4 items-center overflow-hidden">
            <span class="animate-fade-in">{{ messages[activeSlide()] }}</span>
         </div>
      </div>

      <!-- Navbar -->
      <header class="w-full max-w-6xl">
        <div class="px-4 md:px-8 h-20 flex items-center justify-between">
          
          <!-- Mobile Menu Button -->
          <button (click)="toggleMenu()" class="md:hidden p-3 text-gray-900 hover:bg-gray-50 rounded-lg focus:outline-none transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              @if (isMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          <!-- Desktop Navigation (Right Side in RTL) -->
          <nav class="hidden md:flex items-center gap-8">
            <a routerLink="" routerLinkActive="text-black font-black" [routerLinkActiveOptions]="{exact: true}" class="text-base font-bold text-gray-500 hover:text-black transition-colors">{{ ts.t('home') }}</a>
            <a routerLink="/products" routerLinkActive="text-black font-black" class="text-base font-bold text-gray-500 hover:text-black transition-colors">{{ ts.t('products') }}</a>
            <a routerLink="/about" routerLinkActive="text-black font-black" class="text-base font-bold text-gray-500 hover:text-black transition-colors">{{ ts.t('about') }}</a>
          </nav>

          <!-- Logo (Center) -->
          <a routerLink="" class="flex items-center justify-center hover:opacity-80 transition-opacity absolute left-1/2 -translate-x-1/2">
            <img src="/assets/favicon.png" alt="Kypostore" class="h-16 md:h-16 object-contain">
          </a>

          <!-- Actions (Left Side in RTL) -->
          <div class="flex items-center gap-4">
             <a routerLink="/contact" class="hidden lg:inline-flex text-base font-bold text-gray-500 hover:text-black transition-colors px-2">
              {{ ts.t('contact') }}
            </a>

            <!-- Login / Profile -->
            <a [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" class="p-2 md:p-3 hover:bg-gray-50 rounded-full transition-colors relative text-gray-900" [title]="authService.isLoggedIn() ? 'حسابي' : 'تسجيل الدخول'">
               @if (authService.isLoggedIn()) {
                 <div class="w-9 h-9 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center text-base font-bold">
                    {{ authService.currentUser()?.firstName?.charAt(0) }}
                 </div>
               } @else {
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               }
            </a>
            
            <button (click)="shopifyService.toggleCart()" 
                    class="p-2 md:p-3 hover:bg-gray-50 rounded-full transition-colors relative text-gray-900 flex items-center justify-center" 
                    aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (totalShopifyItems(); as total) {
                @if (total > 0) {
                  <span class="absolute top-0 md:top-1 right-0 md:right-1 h-5 w-5 md:h-6 md:w-6 bg-black text-white rounded-full text-[11px] md:text-xs font-bold flex items-center justify-center">{{ total }}</span>
                }
              }
            </button>
          </div>
        </div>

        <!-- Mobile Menu Overlay -->
        @if (isMenuOpen()) {
          <div class="md:hidden border-t border-gray-100 bg-white absolute w-full left-0 animate-fade-in shadow-lg">
            <nav class="flex flex-col p-6 space-y-3">
              <a (click)="closeMenu()" routerLink="" routerLinkActive="bg-gray-50 font-black text-black" [routerLinkActiveOptions]="{exact: true}" class="px-5 py-4 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                {{ ts.t('home') }}
              </a>
              <a (click)="closeMenu()" routerLink="/products" routerLinkActive="bg-gray-50 font-black text-black" class="px-5 py-4 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                {{ ts.t('products') }}
              </a>
              <a (click)="closeMenu()" routerLink="/about" routerLinkActive="bg-gray-50 font-black text-black" class="px-5 py-4 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                {{ ts.t('about') }}
              </a>
              <a (click)="closeMenu()" [routerLink]="authService.isLoggedIn() ? '/account' : '/login'" class="px-5 py-4 rounded-xl text-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2">
                {{ authService.isLoggedIn() ? ts.t('myAccount') : ts.t('login') }}
              </a>
            </nav>
          </div>
        }
      </header>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  shopifyService = inject(ShopifyService);
  currencyService = inject(CurrencyService);
  authService = inject(AuthService);
  ts = inject(TranslationService);

  isMenuOpen = signal(false);

  totalShopifyItems = toSignal(
    this.shopifyService.cart$.pipe(
      map(cart => {
        if (!cart?.lineItems) return 0;
        return cart.lineItems
          .filter((item: any) => item.variant?.id !== this.shopifyService.getProtectionVariantId())
          .reduce((acc: number, item: any) => acc + item.quantity, 0);
      })
    ),
    { initialValue: 0 }
  );

  // Announcements — reactive to language
  get messages() {
    return [
      this.ts.t('ann1'),
      this.ts.t('ann2')
    ];
  }
  activeSlide = signal(0);
  intervalId: any;
  scrolled = signal(false);

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.activeSlide.update(v => (v + 1) % this.messages.length);
    }, 4000);

    window.addEventListener('scroll', this.onWindowScroll);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    this.scrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}

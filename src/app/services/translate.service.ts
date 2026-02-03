import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'sr';

const STORAGE_KEY = 'lost-and-found-lang';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private readonly translations = signal<Record<string, string>>({});
  readonly currentLang = signal<Lang>(this.detectLanguage());

  /** Incremented on every translation load so pipes can react */
  readonly version = computed(() => {
    this.translations();
    return this.currentLang();
  });

  constructor() {
    this.loadTranslations(this.currentLang());
  }

  async setLanguage(lang: Lang): Promise<void> {
    localStorage.setItem(STORAGE_KEY, lang);
    this.currentLang.set(lang);
    await this.loadTranslations(lang);
  }

  translate(key: string): string {
    return this.translations()[key] ?? key;
  }

  private async loadTranslations(lang: Lang): Promise<void> {
    try {
      const res = await fetch(`/i18n/${lang}.json`);
      const data = await res.json();
      this.translations.set(data);
    } catch {
      // Fetch fails in test environments with relative URLs
    }
  }

  private detectLanguage(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'sr') {
      return stored;
    }
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('sr')) {
      return 'sr';
    }
    return 'en';
  }
}

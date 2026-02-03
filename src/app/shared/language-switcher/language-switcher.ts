import { Component, inject } from '@angular/core';
import { TranslateService, Lang } from '../../services/translate.service';

@Component({
  selector: 'app-language-switcher',
  template: `
    <div class="lang-switcher">
      <button
        class="lang-btn"
        [class.active]="translateService.currentLang() === 'en'"
        (click)="setLang('en')"
      >EN</button>
      <button
        class="lang-btn"
        [class.active]="translateService.currentLang() === 'sr'"
        (click)="setLang('sr')"
      >SR</button>
    </div>
  `,
  styles: [`
    .lang-switcher {
      display: flex;
      gap: 2px;
      margin-left: var(--spacing-sm);
    }

    .lang-btn {
      background: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.7);
      border: none;
      padding: 4px 10px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.04em;
      transition: background 0.2s, color 0.2s;

      &:first-child {
        border-radius: 4px 0 0 4px;
      }

      &:last-child {
        border-radius: 0 4px 4px 0;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.25);
        color: #ffffff;
      }

      &.active {
        background: #ffffff;
        color: var(--color-primary);
      }
    }
  `]
})
export class LanguageSwitcher {
  protected translateService = inject(TranslateService);

  setLang(lang: Lang): void {
    this.translateService.setLanguage(lang);
  }
}

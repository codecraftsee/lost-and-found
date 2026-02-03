import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ItemService } from '../services/item.service';
import { ItemCard } from '../shared/item-card/item-card';
import { TranslatePipe } from '../shared/translate.pipe';
import { Category, Item } from '../models/item.model';

@Component({
  selector: 'app-item-list',
  imports: [ItemCard, RouterLink, TranslatePipe],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss'
})
export default class ItemList implements OnInit {
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute);

  searchQuery = signal('');
  typeFilter = signal<'all' | 'lost' | 'found'>('all');
  categoryFilter = signal<Category | ''>('');

  categories = Object.values(Category);

  filteredItems = computed<Item[]>(() => {
    const type = this.typeFilter() === 'all' ? undefined : this.typeFilter() as 'lost' | 'found';
    const category = this.categoryFilter() || undefined;
    return this.itemService.search(this.searchQuery(), { type, category });
  });

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    if (params['type'] === 'lost' || params['type'] === 'found') {
      this.typeFilter.set(params['type']);
    }
    if (params['category'] && Object.values(Category).includes(params['category'])) {
      this.categoryFilter.set(params['category']);
    }
  }

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  setTypeFilter(type: 'all' | 'lost' | 'found'): void {
    this.typeFilter.set(type);
  }

  onCategoryChange(event: Event): void {
    this.categoryFilter.set((event.target as HTMLSelectElement).value as Category | '');
  }
}

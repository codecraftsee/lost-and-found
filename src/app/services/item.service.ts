import { Injectable, signal } from '@angular/core';
import { Category, Item } from '../models/item.model';

const STORAGE_KEY = 'lost-and-found-items';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly items = signal<Item[]>(this.load());

  getAll(): Item[] {
    return this.items();
  }

  getById(id: string): Item | undefined {
    return this.items().find(item => item.id === id);
  }

  create(data: Omit<Item, 'id' | 'createdAt'>): Item {
    const item: Item = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...this.items()];
    this.items.set(updated);
    this.save(updated);
    return item;
  }

  delete(id: string): void {
    const updated = this.items().filter(item => item.id !== id);
    this.items.set(updated);
    this.save(updated);
  }

  search(query: string, filters: { type?: 'lost' | 'found'; category?: Category }): Item[] {
    let results = this.items();
    if (filters.type) {
      results = results.filter(item => item.type === filters.type);
    }
    if (filters.category) {
      results = results.filter(item => item.category === filters.category);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return results;
  }

  getRecent(type: 'lost' | 'found', count: number): Item[] {
    return this.items()
      .filter(item => item.type === type)
      .slice(0, count);
  }

  private load(): Item[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as Item[];
    }
    const seed = this.createSeedData();
    this.save(seed);
    return seed;
  }

  private save(items: Item[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private createSeedData(): Item[] {
    const now = Date.now();
    return [
      {
        id: crypto.randomUUID(),
        type: 'lost',
        title: 'Black Leather Wallet',
        description: 'Lost my black leather wallet near the central park fountain. Contains ID and credit cards.',
        category: Category.Wallet,
        location: 'Central Park, near the fountain',
        date: new Date(now - 2 * 86400000).toISOString().split('T')[0],
        contactName: 'Alex Johnson',
        contactEmail: 'alex.j@email.com',
        contactPhone: '555-0101',
        createdAt: new Date(now - 2 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'found',
        title: 'Silver House Keys',
        description: 'Found a set of silver keys with a blue keychain on a bench outside the library.',
        category: Category.Keys,
        location: 'City Library, main entrance',
        date: new Date(now - 1 * 86400000).toISOString().split('T')[0],
        contactName: 'Maria Garcia',
        contactEmail: 'maria.g@email.com',
        contactPhone: '555-0102',
        createdAt: new Date(now - 1 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'lost',
        title: 'iPhone 15 Pro',
        description: 'Lost my iPhone 15 Pro in a dark blue case somewhere between the gym and the parking lot.',
        category: Category.Electronics,
        location: 'Downtown Fitness Center',
        date: new Date(now - 3 * 86400000).toISOString().split('T')[0],
        contactName: 'Sam Lee',
        contactEmail: 'sam.lee@email.com',
        contactPhone: '555-0103',
        createdAt: new Date(now - 3 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'found',
        title: 'Red Backpack',
        description: 'Found a red backpack with books and a laptop charger inside at the bus stop on 5th Avenue.',
        category: Category.Bags,
        location: 'Bus Stop, 5th Avenue',
        date: new Date(now - 1 * 86400000).toISOString().split('T')[0],
        contactName: 'Jordan Taylor',
        contactEmail: 'jordan.t@email.com',
        contactPhone: '555-0104',
        createdAt: new Date(now - 1 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'lost',
        title: 'Gold Wedding Ring',
        description: 'Lost a gold wedding ring with an engraving inside. Extremely sentimental value.',
        category: Category.Jewelry,
        location: 'Riverside Restaurant',
        date: new Date(now - 5 * 86400000).toISOString().split('T')[0],
        contactName: 'Chris Baker',
        contactEmail: 'chris.b@email.com',
        contactPhone: '555-0105',
        createdAt: new Date(now - 5 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'found',
        title: 'Passport (US)',
        description: 'Found a US passport near the train station ticket counter. Name partially visible.',
        category: Category.Documents,
        location: 'Grand Central Station',
        date: new Date(now - 0.5 * 86400000).toISOString().split('T')[0],
        contactName: 'Pat Wilson',
        contactEmail: 'pat.w@email.com',
        contactPhone: '555-0106',
        createdAt: new Date(now - 0.5 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'lost',
        title: 'Gray Tabby Cat',
        description: 'My indoor gray tabby cat escaped through an open window. Responds to "Mochi". Very friendly.',
        category: Category.Pets,
        location: 'Oak Street neighborhood',
        date: new Date(now - 1 * 86400000).toISOString().split('T')[0],
        contactName: 'Dana Kim',
        contactEmail: 'dana.k@email.com',
        contactPhone: '555-0107',
        createdAt: new Date(now - 1 * 86400000).toISOString()
      },
      {
        id: crypto.randomUUID(),
        type: 'found',
        title: 'Denim Jacket',
        description: 'Found a denim jacket left behind at the outdoor concert venue. Has pins on the lapel.',
        category: Category.Clothing,
        location: 'Meadow Park Amphitheater',
        date: new Date(now - 4 * 86400000).toISOString().split('T')[0],
        contactName: 'Riley Morgan',
        contactEmail: 'riley.m@email.com',
        contactPhone: '555-0108',
        createdAt: new Date(now - 4 * 86400000).toISOString()
      }
    ];
  }
}

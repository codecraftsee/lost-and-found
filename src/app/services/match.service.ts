import { Injectable, inject } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemService } from './item.service';

export interface MatchResult {
  item: Item;
  score: number;
  label: 'strong' | 'possible';
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'is', 'was', 'it', 'my', 'i', 'me', 'we', 'our',
  'this', 'that', 'from', 'has', 'had', 'have', 'been', 'not', 'are',
  'were', 'be', 'can', 'do', 'did', 'will', 'very', 'just', 'near',
  'about', 'some', 'its', 'also'
]);

function tokenize(text: string): Set<string> {
  const tokens = text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
  return new Set(tokens);
}

function tokenOverlapRatio(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

@Injectable({ providedIn: 'root' })
export class MatchService {
  private itemService = inject(ItemService);

  findMatches(item: Item): MatchResult[] {
    const oppositeType = item.type === 'lost' ? 'found' : 'lost';
    const candidates = this.itemService.getAll()
      .filter(c => c.type === oppositeType && c.id !== item.id);

    const results: MatchResult[] = [];

    for (const candidate of candidates) {
      if (candidate.category !== item.category) continue;

      let score = 40;

      // Date proximity: up to 15 points
      const dayMs = 86400000;
      const daysDiff = Math.abs(
        new Date(item.date).getTime() - new Date(candidate.date).getTime()
      ) / dayMs;
      if (daysDiff <= 1) score += 15;
      else if (daysDiff <= 3) score += 10;
      else if (daysDiff <= 7) score += 5;

      // Location tokens: up to 20 points
      const locA = tokenize(item.location);
      const locB = tokenize(candidate.location);
      score += Math.round(tokenOverlapRatio(locA, locB) * 20);

      // Text tokens (title + description): up to 25 points
      const textA = tokenize(item.title + ' ' + item.description);
      const textB = tokenize(candidate.title + ' ' + candidate.description);
      score += Math.round(tokenOverlapRatio(textA, textB) * 25);

      results.push({
        item: candidate,
        score,
        label: score >= 70 ? 'strong' : 'possible'
      });
    }

    return results.sort((a, b) => b.score - a.score);
  }
}

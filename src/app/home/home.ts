import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ItemService } from '../services/item.service';
import { ItemCard } from '../shared/item-card/item-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ItemCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export default class Home {
  private itemService = inject(ItemService);

  recentLost = this.itemService.getRecent('lost', 3);
  recentFound = this.itemService.getRecent('found', 3);
}

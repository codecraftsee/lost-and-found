import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss'
})
export class ItemCard {
  item = input.required<Item>();
}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Item } from '../../models/item.model';
import { TranslatePipe } from '../translate.pipe';
import { LocalizedDatePipe } from '../localized-date.pipe';

@Component({
  selector: 'app-item-card',
  imports: [RouterLink, TranslatePipe, LocalizedDatePipe],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss'
})
export class ItemCard {
  item = input.required<Item>();
}

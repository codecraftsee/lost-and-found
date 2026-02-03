import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './item-detail.html',
  styleUrl: './item-detail.scss'
})
export default class ItemDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);

  item = signal<Item | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.item.set(this.itemService.getById(id));
    }
    if (!this.item()) {
      this.router.navigate(['/items']);
    }
  }

  deleteItem(): void {
    const current = this.item();
    if (current && confirm('Are you sure you want to delete this item?')) {
      this.itemService.delete(current.id);
      this.router.navigate(['/items']);
    }
  }
}

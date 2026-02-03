import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../services/item.service';
import { Category } from '../models/item.model';

@Component({
  selector: 'app-report-item',
  imports: [ReactiveFormsModule],
  templateUrl: './report-item.html',
  styleUrl: './report-item.scss'
})
export default class ReportItem implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private itemService = inject(ItemService);

  categories = Object.values(Category);
  form!: FormGroup;

  ngOnInit(): void {
    const type = this.route.snapshot.queryParams['type'] === 'found' ? 'found' : 'lost';

    this.form = this.fb.group({
      type: [type, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      location: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['']
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const item = this.itemService.create(this.form.value);
    this.router.navigate(['/items', item.id]);
  }
}

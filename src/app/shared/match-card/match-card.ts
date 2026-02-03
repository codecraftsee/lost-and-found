import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../translate.pipe';
import { LocalizedDatePipe } from '../localized-date.pipe';
import { MatchResult } from '../../services/match.service';

@Component({
  selector: 'app-match-card',
  imports: [RouterLink, TranslatePipe, LocalizedDatePipe],
  templateUrl: './match-card.html',
  styleUrl: './match-card.scss'
})
export class MatchCard {
  match = input.required<MatchResult>();
}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceItem } from '../../core/models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-card.component.html'
})
export class ServiceCardComponent {
  // Signal-based component input (Angular 17.1+) — the modern
  // replacement for the older @Input() decorator.
  item = input.required<ServiceItem>();
}

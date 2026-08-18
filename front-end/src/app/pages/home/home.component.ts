import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceCatalogService } from '../../core/service-catalog.service';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ServiceCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private catalog = inject(ServiceCatalogService);
  services = this.catalog.getAll();
}

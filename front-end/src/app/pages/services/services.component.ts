import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceCatalogService } from '../../core/service-catalog.service';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { GstCalculatorComponent } from './gst-calculator/gst-calculator.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { ServiceRequestComponent } from './service-request/service-request.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, ServiceCardComponent, GstCalculatorComponent, SalarySlipComponent, ServiceRequestComponent],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  private catalog = inject(ServiceCatalogService);
  private route = inject(ActivatedRoute);

  services = this.catalog.getAll();

  // Which single tool section to show — set by the 'tool' query param a
  // service card link carries (e.g. ?tool=gst-calculator-tool). null
  // means no card has been clicked yet, so only the grid shows.
  selectedTool = signal<string | null>(null);

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedTool.set(params.get('tool'));
    });
  }
}

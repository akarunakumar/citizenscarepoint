import { Component, inject } from '@angular/core';
import { ServiceCatalogService } from '../../core/service-catalog.service';
import { ServiceCardComponent } from '../../shared/service-card/service-card.component';
import { GstCalculatorComponent } from './gst-calculator/gst-calculator.component';
import { SalarySlipComponent } from './salary-slip/salary-slip.component';
import { ServiceRequestComponent } from './service-request/service-request.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardComponent, GstCalculatorComponent, SalarySlipComponent, ServiceRequestComponent],
  templateUrl: './services.component.html'
})
export class ServicesComponent {
  private catalog = inject(ServiceCatalogService);
  services = this.catalog.getAll();
}

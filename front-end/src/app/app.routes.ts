import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GstCalculatorComponent } from './pages/services/gst-calculator/gst-calculator.component';
import { SalarySlipComponent } from './pages/services/salary-slip/salary-slip.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  { path: 'services', component: ServicesComponent },

   { path: 'services/gst-calculator', component: GstCalculatorComponent },
  { path: 'services/salary-slip', component: SalarySlipComponent },
  // { path: 'services/housekeeping', component: HousekeepingComponent },
  // { path: 'services/certificate-services', component: CertificateServicesComponent },
  // { path: 'services/insurance-agents', component: InsuranceAgentsComponent },
  // { path: 'services/it-support', component: ItSupportComponent },
  // { path: 'services/future-services', component: FutureServicesComponent },
  
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

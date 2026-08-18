import { ServiceRequestType } from './service-request.model';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  seal: string;
  status: 'available' | 'coming-soon';
  /** Which tool section on the Services page this card scrolls to. */
  fragment: string;
  /** For the 4 services sharing the generalized request form — which
   *  option to pre-select when this card is clicked. */
  requestType?: ServiceRequestType;
}

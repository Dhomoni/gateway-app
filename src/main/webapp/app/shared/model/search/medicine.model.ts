import { IIndication } from 'app/shared/model/search/indication.model';

export const enum Formulation {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  SYRUP = 'SYRUP',
  INJECTION = 'INJECTION',
  INJECTION_IV = 'INJECTION_IV',
  SALINE = 'SALINE',
  ORAL_SALINE = 'ORAL_SALINE'
}

export interface IMedicine {
  id?: number;
  tradeName?: string;
  unitQuantity?: string;
  genericName?: string;
  chemicalName?: string;
  formulation?: Formulation;
  manufacturer?: string;
  mrp?: number;
  doseAndAdmin?: string;
  preparation?: string;
  productUrl?: string;
  active?: boolean;
  indications?: IIndication[];
}

export const defaultValue: Readonly<IMedicine> = {
  active: false
};

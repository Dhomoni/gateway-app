export const enum MedicineType {
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
  type?: MedicineType;
  manufacturer?: string;
  mrp?: number;
  indications?: string;
  doseAndAdmin?: string;
  preparation?: string;
  productUrl?: string;
  active?: boolean;
}

export const defaultValue: Readonly<IMedicine> = {
  active: false
};

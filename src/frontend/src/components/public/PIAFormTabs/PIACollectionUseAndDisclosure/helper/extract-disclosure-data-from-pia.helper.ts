import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';

export const exportCollectionUseAndDisclosureFromPia = (pia: IPiaForm) => {
  if (!pia) return {};

  const piaCollectionUseAndDisclosure = pia.collectionUseAndDisclosure;

  return piaCollectionUseAndDisclosure;
};

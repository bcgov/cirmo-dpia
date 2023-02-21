import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { ICollectionUseAndDisclosure } from '../CollectionUseAndDisclosure';

export const exportCollectionUseAndDisclosureFromPia = (
  pia: IPiaForm,
): ICollectionUseAndDisclosure => {
  if (!pia) return {};

  const piaCollectionUseAndDisclosure: ICollectionUseAndDisclosure | undefined =
    pia.collectionUseAndDisclosure;
  if (piaCollectionUseAndDisclosure === undefined) return {};
  return piaCollectionUseAndDisclosure;
};

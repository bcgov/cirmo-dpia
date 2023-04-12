import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { AccuracyCorrectionAndRetention } from '../../components/public/PIAFormTabs/accuracyRetention';
import PIAAdditionalRisks from '../../components/public/PIAFormTabs/additionalRisks';
import PIAAgreementsAndInformationBanks from '../../components/public/PIAFormTabs/agreementsAndInformationBanks';
import PIACollectionUseAndDisclosure from '../../components/public/PIAFormTabs/collectionUseAndDisclosure';
import { PIAFormIntake } from '../../components/public/PIAFormTabs/intake';
import { SecurityPersonalInformation } from '../../components/public/PIAFormTabs/securityPersonalInformation';
import StoringPersonalInformation from '../../components/public/PIAFormTabs/storingPersonalInformation';
import { API_ROUTES } from '../../constant/apiRoutes';
import { PiaFormContext } from '../../contexts/PiaFormContext';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { HttpRequest } from '../../utils/http-request.util';

export const PiaFormPrintPreview = () => {
  const { id } = useParams();

  const [pia, setPia] = useState<IPiaForm>();

  useEffect(() => {
    if (!id) return;
    // This key is to ignore and counter the double useEffect called in React Dev environment in the Strict mode
    let ignoreDuplicateFetch = false;

    HttpRequest.get<IPiaFormResponse>(
      API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
    ).then(({ data }) => {
      if (ignoreDuplicateFetch) return;

      setPia(data);

      // Allowing react to render the page before print preview begins
      window.setTimeout(() => window.print(), 0);
    });
    return () => {
      ignoreDuplicateFetch = true;
    };
  }, [id]);

  return (
    <>
      {(!id || !pia) && <Spinner />}

      {id && pia && (
        <PiaFormContext.Provider
          value={{
            pia: pia,
            isReadOnly: true,
            piaStateChangeHandler: () => null,
            validationMessage: {},
          }}
        >
          <PIAFormIntake />
          <PIACollectionUseAndDisclosure />
          <StoringPersonalInformation />
          <SecurityPersonalInformation />
          <AccuracyCorrectionAndRetention />
          <PIAAgreementsAndInformationBanks />
          <PIAAdditionalRisks />
        </PiaFormContext.Provider>
      )}
    </>
  );
};

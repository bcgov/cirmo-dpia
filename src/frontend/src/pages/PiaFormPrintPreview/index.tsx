/*
 * This function is for the print preview page.
 * @param pia - the PIA object
 * @returns - the print preview page
 * @example
 * <PiaFormPrintPreview pia={pia} />
 *
 * This page will automatically trigger the ctrl+p print dialog.
 * The html elment will be set to print-preview mode by adding
 * a class to the HTML tag.
 * The print-preview class will hide the header, footer, nav and fixed
 * elements.
 *
 * The styling for the print page can be found in the sass folder under
 * _printPreview.scss
 */
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
import PrintHeader from './PrintHeader';
import SignaturesFullPIA from './SignaturesFull';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { HttpRequest } from '../../utils/http-request.util';

export const PiaFormPrintPreview = () => {
  const { id } = useParams();

  const [pia, setPia] = useState<IPiaForm>();

  useEffect(() => {
    const htmlTag = document.getElementsByTagName('HTML')[0];
    htmlTag.classList.add('print-preview');
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
        <>
          <PrintHeader pia={pia} />
          <h1>{pia?.title}</h1>
          <PiaFormContext.Provider
            value={{
              pia: pia,
              isReadOnly: true,
              piaStateChangeHandler: () => null,
              validationMessage: {},
            }}
          >
            <PIAFormIntake />
            {pia?.hasAddedPiToDataElements && (
              <>
                <PIACollectionUseAndDisclosure />
                <StoringPersonalInformation />
                <SecurityPersonalInformation />
                <AccuracyCorrectionAndRetention />
                <PIAAgreementsAndInformationBanks />
                <PIAAdditionalRisks />
              </>
            )}
          </PiaFormContext.Provider>
          <SignaturesFullPIA />
        </>
      )}
    </>
  );
};

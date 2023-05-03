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
import { SecurityPersonalInformation } from '../../components/public/PIAFormTabs/securityPersonalInformation';
import StoringPersonalInformation from '../../components/public/PIAFormTabs/storingPersonalInformation';
import { API_ROUTES } from '../../constant/apiRoutes';
import { PiaFormContext } from '../../contexts/PiaFormContext';
import PrintHeader from './PrintHeader';
import SignaturesFullPIA from './SignaturesFull';
import IntakePrintPreview from '../../components/public/PIAFormTabs/intake/printPreview';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { HttpRequest } from '../../utils/http-request.util';
import PPQ from '../../components/public/PIAFormTabs/ppq';

export const PiaFormPrintPreview = () => {
  const { id } = useParams();

  const handlePrintTrigger = () => {
    // Allowing react to render the page before print preview begins
    window.setTimeout(() => window.print(), 100);
  };

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
    });
    return () => {
      ignoreDuplicateFetch = true;
      htmlTag.classList.remove('print-preview');
    };
  }, [id]);

  return (
    <>
      {(!id || !pia) && <Spinner />}

      {id && pia && (
        <>
          <PrintHeader pia={pia} onImageLoad={handlePrintTrigger} />
          <h1>{pia?.title}</h1>
          <PiaFormContext.Provider
            value={{
              pia: pia,
              isReadOnly: true,
              piaStateChangeHandler: () => null,
              validationMessage: {},
            }}
          >
            {pia?.hasAddedPiToDataElements !== false ? (
              <>
                <div className="print-ppq-section-focus">
                  <PPQ printPreview />
                </div>
                <div className="pageBreak">
                  <IntakePrintPreview {...pia} />
                </div>
              </>
            ) : (
              <IntakePrintPreview {...pia} />
            )}

            {pia?.hasAddedPiToDataElements !== false && (
              <>
                <div className="pageBreak">
                  <PIACollectionUseAndDisclosure />
                </div>
                <div className="pageBreak">
                  <StoringPersonalInformation />
                </div>
                <div className="pageBreak">
                  <SecurityPersonalInformation />
                </div>
                <div className="pageBreak">
                  <AccuracyCorrectionAndRetention />
                </div>
                <div className="pageBreak">
                  <PIAAgreementsAndInformationBanks />
                </div>
                <div className="pageBreak">
                  <PIAAdditionalRisks />
                </div>
              </>
            )}
          </PiaFormContext.Provider>
          <SignaturesFullPIA />
        </>
      )}
    </>
  );
};

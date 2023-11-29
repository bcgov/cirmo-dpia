import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { MinistryList, PIOptions } from '../../../../../constant/constant';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

const IntakeDetails = (pia: IPiaForm) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const piaMinistryFullName =
    MinistryList.find((item) => item.value === pia.ministry)?.label || '';
  return (
    <>
      <div>
        <h4>Ministry</h4>
        <p>{piaMinistryFullName}</p>
      </div>
      <div>
        <h4>Branch</h4>
        <p>{pia?.branch}</p>
      </div>
      <div>
        <h4>What is the initiative</h4>
        <p>
          <RichTextEditor
            content={pia?.initiativeDescription?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        </p>
      </div>
      <div>
        <h4>PIA Scope</h4>
        <p>
          <RichTextEditor
            content={pia?.initiativeScope?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        </p>
      </div>
      <div>
        <h4>Data or information elements invovled in the initiative</h4>
        <p>
          <RichTextEditor
            content={pia?.dataElementsInvolved?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        </p>
      </div>
      <div>
        <h4>Contains personal information?</h4>
        <p>
          {PIOptions.find(
            (item) => item.value === pia?.hasAddedPiToDataElements,
          )?.key || ''}
        </p>
      </div>
      <div>
        <h4>
          How will the risk of unintentionally collecting personal information
          be reduced
        </h4>
        <p>
          <RichTextEditor
            content={pia?.riskMitigation?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        </p>
      </div>
    </>
  );
};

export default IntakeDetails;

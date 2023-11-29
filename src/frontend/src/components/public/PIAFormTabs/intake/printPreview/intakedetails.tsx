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
        <h4>What is the initiative?</h4>
        {pia?.initiativeDescription?.content !== '' ? (
          <RichTextEditor
            content={pia?.initiativeDescription?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        ) : (
          <p>Not answered</p>
        )}
        <br />
      </div>
      <div>
        <h4>PIA Scope</h4>
        {pia?.initiativeScope?.content !== '' ? (
          <RichTextEditor
            content={pia?.initiativeScope?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        ) : (
          <p>Not answered</p>
        )}
        <br />
      </div>
      <div>
        <h4>Data or information elements invovled in the initiative</h4>
        {pia?.dataElementsInvolved?.content !== '' ? (
          <RichTextEditor
            content={pia?.dataElementsInvolved?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        ) : (
          <p>Not answered</p>
        )}
        <br />
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
          be reduced?
        </h4>
        {pia?.riskMitigation?.content !== '' ? (
          <RichTextEditor
            content={pia?.riskMitigation?.content ?? ''}
            readOnly={true}
            textOnlyReadOnly={true}
          />
        ) : (
          <p>Not answered</p>
        )}
        <br />
      </div>
    </>
  );
};

export default IntakeDetails;

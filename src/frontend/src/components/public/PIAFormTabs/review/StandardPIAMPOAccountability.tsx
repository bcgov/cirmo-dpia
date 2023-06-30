import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import messages from './messages';
import { Dispatch, SetStateAction } from 'react';
import Radio from '../../../../components/common/Radio';

interface IStandardPiaMpoAccountabilityProps {
  pia: IPiaForm;
  selectAccountabilityByMPO: Dispatch<SetStateAction<boolean | null>>;
}

const StandardPiaMpoAccountability = (
  props: IStandardPiaMpoAccountabilityProps,
) => {
  const { pia, selectAccountabilityByMPO } = props;
  const selectAccountability = [
    {
      index: 1,
      value:
        messages.PiaReviewHeader.MinistrySection.Input.AcceptAccountability.en,
      isDefault: false,
      groupName: 'selectAccountability',
      changeHandler: (e: any) => selectAccountabilityByMPO(e.target.value),
    },
    {
      index: 2,
      value:
        messages.PiaReviewHeader.MinistrySection.Input.DeclineAccountability.en,
      groupName: 'selectAccountability',
      isDefault: false,
      changeHandler: (e: any) => selectAccountabilityByMPO(e.target.value),
    },
  ];
  return (
    <>
      <div className="form-group">
        <h3>{messages.PiaReviewHeader.MinistrySection.Title.en}</h3>
        <p className="pb-4">
          {messages.PiaReviewHeader.MinistrySection.Description.en}
        </p>

        <div className="form-group row">
          {selectAccountability.map((radio, index) => (
            <Radio key={index} {...radio} />
          ))}
        </div>
      </div>
    </>
  );
};

export default StandardPiaMpoAccountability;

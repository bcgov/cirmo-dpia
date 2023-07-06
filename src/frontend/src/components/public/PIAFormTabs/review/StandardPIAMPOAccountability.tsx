import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import messages from './messages';
import { Dispatch, SetStateAction, useState } from 'react';
import Radio from '../../../../components/common/Radio';
import { IReview } from './interfaces';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';

interface IStandardPiaMpoAccountabilityProps {
  pia: IPiaForm;

  reviewForm: IReview;
  piaStateChangeHandler: PiaStateChangeHandlerType;
  setReviewForm: Dispatch<SetStateAction<IReview>>;
}

const StandardPiaMpoAccountability = (
  props: IStandardPiaMpoAccountabilityProps,
) => {
  const { pia, reviewForm, piaStateChangeHandler, setReviewForm } = props;

  const [
    standardPiaMpoAccountabilityOpinion,
    setStandardPiaMpoAccountabilityOpinion,
  ] = useState<boolean | null>(null);
  const selectAccountability = [
    {
      index: 1,
      value:
        messages.PiaReviewHeader.MinistrySection.Input.AcceptAccountability.en,
      isDefault: false,
      groupName: 'selectAccountability',
      changeHandler: (e: any) => setStandardPiaMpoAccountabilityOpinion(true),
    },
    {
      index: 2,
      value:
        messages.PiaReviewHeader.MinistrySection.Input.DeclineAccountability.en,
      groupName: 'selectAccountability',
      isDefault: false,
      changeHandler: (e: any) => setStandardPiaMpoAccountabilityOpinion(false),
    },
  ];
  return (
    <>
      <div className=" drop-shadow card p-4 p-md-5">
        <div className="data-table__container">
          <div className="form-group data-row">
            {selectAccountability.map((radio, index) => (
              <Radio key={index} {...radio} />
            ))}
          </div>
          <div className="d-flex">
            <button
              className="bcgovbtn bcgovbtn__secondary mt-3 me-3"
              onClick={() => {
                setReviewForm({
                  ...reviewForm,
                  mpo: {
                    ...reviewForm.mpo,
                  },
                });
                piaStateChangeHandler(
                  {
                    mpo: {
                      isAcknowledged: true,
                    },
                  },
                  'review',
                  true,
                );
              }}
            >
              Clear
            </button>
            <button
              className="bcgovbtn bcgovbtn__primary mt-3 ml-3"
              disabled={standardPiaMpoAccountabilityOpinion === null}
              onClick={() => {
                setReviewForm({
                  ...reviewForm,
                  mpo: {
                    ...reviewForm.mpo,
                  },
                });
                piaStateChangeHandler(
                  {
                    mpo: {
                      isAcknowledged: true,
                    },
                  },
                  'review',
                  true,
                );
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandardPiaMpoAccountability;

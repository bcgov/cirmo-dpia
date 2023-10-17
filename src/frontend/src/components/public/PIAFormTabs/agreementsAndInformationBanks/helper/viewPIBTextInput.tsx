import { ITextInputProps } from './IAgreementsInfo-interface';

const PIBInputText = ({ pia }: ITextInputProps) => {
  return (
    <div>
      <div className="container d-grid gap-3 mt-4">
        <div className="row">
          <div className="col col-md-3">
            <b>Main ministry or agency involved</b>
            <div>
              {pia.agreementsAndInformationBanks?.personalInformationBanks
                .mainMinistryOrAgencyInvolved &&
              pia.agreementsAndInformationBanks?.personalInformationBanks
                .mainMinistryOrAgencyInvolved !== '' ? (
                pia.agreementsAndInformationBanks?.personalInformationBanks
                  .mainMinistryOrAgencyInvolved
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
          <div className="col col-md-3">
            <b>
              Any other ministries, agencies, public bodies, or organizations
              involved
            </b>
            <div>
              {pia.agreementsAndInformationBanks?.personalInformationBanks
                .otherGroupsInvolved &&
              pia.agreementsAndInformationBanks?.personalInformationBanks
                .otherGroupsInvolved !== '' ? (
                pia.agreementsAndInformationBanks?.personalInformationBanks
                  .otherGroupsInvolved
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
          <div className="col col-md-3">
            <b>
              Business contact title of person responsible for maintaining the
              PIB
            </b>
            <div>
              {pia.agreementsAndInformationBanks?.personalInformationBanks
                .contactTitle &&
              pia.agreementsAndInformationBanks?.personalInformationBanks
                .contactTitle !== '' ? (
                pia.agreementsAndInformationBanks?.personalInformationBanks
                  .contactTitle
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
          <div className="col col-md-3">
            <b>
              Business contact phone number of person responsible for
              maintaining the PIB
            </b>
            <div>
              {pia.agreementsAndInformationBanks?.personalInformationBanks
                .contactPhone &&
              pia.agreementsAndInformationBanks?.personalInformationBanks
                .contactPhone !== '' ? (
                pia.agreementsAndInformationBanks?.personalInformationBanks
                  .contactPhone
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PIBInputText;

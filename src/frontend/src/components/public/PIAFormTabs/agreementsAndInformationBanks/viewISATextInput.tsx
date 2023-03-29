import { ITextInputProps } from './AgreementsAndInformationBanks';

const ISAInputText = ({ pia }: ITextInputProps) => {
  return (
    <div>
      <div className="container d-grid gap-3 mt-4">
        <div className="row">
          <div className="col col-md-3">
            <b>Main ministry or agency involved</b>
            <div>
              {' '}
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .mainMinistryOrAgencyInvolved &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .mainMinistryOrAgencyInvolved !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
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
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .otherGroupsInvolved &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .otherGroupsInvolved !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
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
              ISA
            </b>
            <div>
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .contactTitle &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .contactTitle !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
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
              Business contact title of person responsible for maintaining the
              ISA
            </b>
            <div>
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .contactPhone &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .contactPhone !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
                  .contactPhone
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col col-md-3">
            <b>ISA start date</b>
            <div>
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .startDate &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .startDate !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
                  .startDate
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
          <div className="col col-md-3">
            <strong>ISA end date</strong>
            <div>
              {pia.agreementsAndInformationBanks?.informationSharingAgreement
                .endDate &&
              pia.agreementsAndInformationBanks?.informationSharingAgreement
                .endDate !== '' ? (
                pia.agreementsAndInformationBanks?.informationSharingAgreement
                  .endDate
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

export default ISAInputText;

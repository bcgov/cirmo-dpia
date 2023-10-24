/*
 * This is used to determine the side nav styleing of each form attribute
 * enable is used to control if we want to dislay the form attribute in the side nav
 * till the complete feature is implemented we can control what is disaplayed in the side nav
 */

import { routes } from '../../../constant/routes';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../../utils/path';
import { INavbarItem } from '../../common/Navbar/interfaces';
import { getUserPrivileges } from '../../../utils/statusList/common';
import { Page } from '../../../utils/statusList/types';

export const PiaFormSideNavPages = (
  pia: IPiaForm,
  isEditMode = false,
  isNewForm = false,
): INavbarItem[] => {
  // This code determines whether to show post-intake tabs based on two conditions:
  // 1. hasAddedPiToDataElements is not false.
  // 2. Either isNextStepsSeenForNonDelegatedFlow is true
  const showPostIntakeTabs = (): boolean => {
    return (
      pia?.hasAddedPiToDataElements !== false &&
      (pia?.isNextStepsSeenForNonDelegatedFlow || false)
    );
  };

  const checkPIANonDelegateFlow = (): boolean => {
    return (
      pia?.isNextStepsSeenForNonDelegatedFlow === true &&
      (pia?.hasAddedPiToDataElements === true ||
        pia?.hasAddedPiToDataElements === null)
    );
  };

  const intakeLink = isNewForm
    ? routes.PIA_NEW
    : isEditMode
    ? routes.PIA_INTAKE_EDIT
    : routes.PIA_INTAKE_VIEW;

  const NextStepsDefaultPage = () => {
    if (checkPIANonDelegateFlow()) {
      return 'Collection, use and disclosure';
    }
  };

  // Does the user have access to the page.
  const accessControl = (page: Page): boolean => {
    const pagePrivileges = getUserPrivileges(pia)?.Pages?.[page];
    return pagePrivileges?.accessControl ?? true; // Default to have access.
  };

  const nextStepsNavigation = () => {
    /* if non delegated */
    if (
      pia?.hasAddedPiToDataElements == true ||
      pia?.hasAddedPiToDataElements == null
    ) {
      return true;
    }
    if (pia?.hasAddedPiToDataElements == false) {
      return accessControl('review');
    }
  };

  /* 
  if null the states are not used
  if string then the state needs to find the label string
  if it is ++ or -- operater navigate to the previous or next tab
  */

  return [
    {
      id: 1,
      label: 'PIA Intake',
      link: buildDynamicPath(intakeLink, { id: pia?.id }),
      enable: accessControl('intake'),
      state: {
        next: {
          condition: accessControl('review'),
          action: checkPIANonDelegateFlow() ? NextStepsDefaultPage() : 'Review',
        },
      },
    },
    {
      id: 2,
      label: 'Next steps',
      link: buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, { id: pia?.id }),
      enable: accessControl('nextSteps'),
      state: {
        next: {
          condition: nextStepsNavigation(),
          action:
            pia.hasAddedPiToDataElements == false
              ? 'Review'
              : accessControl('collectionUseAndDisclosure')
              ? 'Collection, use and disclosure'
              : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 3,
      label: 'FAQs',
      link: '',
      enable: false, // enable them in subsequent tickets
    },
    {
      id: 4,
      isDivider: true, // divider
      label: '',
      link: '',
      enable: accessControl('review'),
    },
    {
      id: 5,
      label: 'Collection, use and disclosure',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_DISCLOSURE_EDIT : routes.PIA_DISCLOSURE_VIEW,
        { id: pia?.id },
      ),
      enable:
        showPostIntakeTabs() && accessControl('collectionUseAndDisclosure'),
      state: {
        next: {
          condition: true,
          action: accessControl('storingPersonalInformation')
            ? +1
            : 'Next steps',
        },
        prev: {
          condition: true,
          action: 'PIA Intake',
        },
      },
    },
    {
      id: 6,
      label: 'Storing personal information',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_STORING_PERSONAL_INFORMATION_EDIT
          : routes.PIA_STORING_PERSONAL_INFORMATION_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable:
        showPostIntakeTabs() && accessControl('storingPersonalInformation'),
      state: {
        next: {
          condition: true,
          action: accessControl('securityOfPersonalInformation')
            ? +1
            : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 7,
      label: 'Security of personal information',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_SECURITY_OF_PERSONAL_INFORMATION_EDIT
          : routes.PIA_SECURITY_OF_PERSONAL_INFORMATION_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable:
        showPostIntakeTabs() && accessControl('securityOfPersonalInformation'),
      state: {
        next: {
          condition: true,
          action: accessControl('accuracyCorrectionAndRetention')
            ? +1
            : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 8,
      label: 'Accuracy, correction and retention',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_ACCURACY_CORRECTION_AND_RETENTION_EDIT
          : routes.PIA_ACCURACY_CORRECTION_AND_RETENTION_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable:
        showPostIntakeTabs() && accessControl('accuracyCorrectionAndRetention'),
      state: {
        next: {
          condition: true,
          action: accessControl('agreementsAndInformationBanks')
            ? +1
            : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 9,
      label: 'Agreements and information banks',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_AGREEMENTS_AND_INFORMATION_BANK_EDIT
          : routes.PIA_AGREEMENTS_AND_INFORMATION_BANK_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable:
        showPostIntakeTabs() && accessControl('agreementsAndInformationBanks'),
      state: {
        next: {
          condition: true,
          action: accessControl('additionalRisks') ? +1 : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 10,
      label: 'Additional risks',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_ADDITIONAL_RISKS_EDIT
          : routes.PIA_ADDITIONAL_RISKS_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable: showPostIntakeTabs() && accessControl('additionalRisks'),
      state: {
        next: {
          condition: true,
          action: accessControl('ppq')
            ? 'PIA Pathway Questionnaire'
            : 'Next steps',
        },
        prev: {
          condition: true,
          action: -1,
        },
      },
    },
    {
      id: 11,
      isDivider: true, // divider
      label: '',
      link: '',
      enable:
        (accessControl('ppq') || accessControl('review')) &&
        showPostIntakeTabs(),
    },
    {
      id: 12,
      label: 'PIA Pathway Questionnaire',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_PPQ_EDIT : routes.PIA_PPQ_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable: showPostIntakeTabs() && accessControl('ppq'),
      state: {
        prev: {
          condition: true,
          action: 'Additional risks',
        },
        next: {
          condition: true,
          action: accessControl('review') ? +1 : 'Next steps',
        },
      },
    },
    {
      id: 13,
      label: 'Review',
      link: buildDynamicPath(routes.PIA_REVIEW, {
        id: pia?.id,
      }),
      enable: accessControl('review'),
      state: {
        prev: {
          condition: true,
          action:
            pia?.hasAddedPiToDataElements === true ||
            pia?.hasAddedPiToDataElements === null
              ? -1
              : 'PIA Intake',
        },
      },
    },
  ];
};

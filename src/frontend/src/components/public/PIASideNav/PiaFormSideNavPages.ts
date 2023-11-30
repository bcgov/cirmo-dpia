/*
 * This is used to determine the side nav styleing of each form attribute
 * enable is used to control if we want to dislay the form attribute in the side nav
 * till the complete feature is implemented we can control what is disaplayed in the side nav
 */

import { routes } from '../../../constant/routes';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../../utils/path';
import { NavbarItem } from '../../common/Navbar/interfaces';
import { getUserPrivileges } from '../../../utils/statusList/common';
import { Page } from '../../../utils/statusList/types';

export const PiaFormSideNavPages = (
  pia: IPiaForm,
  isEditMode = false,
  isNewForm = false,
): NavbarItem[] => {
  // Post intake tabs are hidden before the user first submits in Drafting in Progress
  const showPostIntakeTabs = !pia?.newIntake;
  const isDelegated = !pia?.hasAddedPiToDataElements;

  // Does the user have access to the page.
  const accessControl = (page: Page): boolean => {
    const pagePrivileges = getUserPrivileges(pia)?.Pages?.[page];
    return pagePrivileges?.accessControl ?? true; // Default to have access.
  };

  const intakeLink = isNewForm
    ? routes.PIA_NEW
    : isEditMode
      ? routes.PIA_INTAKE_EDIT
      : routes.PIA_INTAKE_VIEW;

  const navItems = [
    {
      id: 'intake',
      label: 'PIA Intake',
      link: buildDynamicPath(intakeLink, { id: pia?.id }),
      enable: accessControl('intake'),
    },
    {
      id: 'nextSteps',
      label: 'Next steps',
      link: buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, { id: pia?.id }),
      enable: showPostIntakeTabs && accessControl('nextSteps'),
    },
    {
      id: 'divider1',
      isDivider: true, // DIVIDER
      enable: showPostIntakeTabs,
    },
    {
      id: 'collectionUseAndDisclosure',
      label: 'Collection, use and disclosure',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_DISCLOSURE_EDIT : routes.PIA_DISCLOSURE_VIEW,
        { id: pia?.id },
      ),
      enable:
        showPostIntakeTabs &&
        accessControl('collectionUseAndDisclosure') &&
        !isDelegated,
    },
    {
      id: 'storingPersonalInformation',
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
        showPostIntakeTabs &&
        accessControl('storingPersonalInformation') &&
        !isDelegated,
    },
    {
      id: 'securityOfPersonalInformation',
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
        showPostIntakeTabs &&
        accessControl('securityOfPersonalInformation') &&
        !isDelegated,
    },
    {
      id: 'accuracyCorrectionAndRetention',
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
        showPostIntakeTabs &&
        accessControl('accuracyCorrectionAndRetention') &&
        !isDelegated,
    },
    {
      id: 'agreementsAndInformationBanks',
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
        showPostIntakeTabs &&
        accessControl('agreementsAndInformationBanks') &&
        !isDelegated,
    },
    {
      id: 'additionalRisks',
      label: 'Additional risks',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_ADDITIONAL_RISKS_EDIT
          : routes.PIA_ADDITIONAL_RISKS_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable:
        showPostIntakeTabs && accessControl('additionalRisks') && !isDelegated,
    },
    {
      id: 'divider2',
      isDivider: true, // DIVIDER
      enable:
        (accessControl('ppq') || accessControl('review')) && showPostIntakeTabs,
    },
    {
      id: 'ppq',
      label: 'PIA Pathway Questionnaire',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_PPQ_EDIT : routes.PIA_PPQ_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable: showPostIntakeTabs && accessControl('ppq') && !isDelegated,
    },
    {
      id: 'review',
      label: 'Review',
      link: buildDynamicPath(routes.PIA_REVIEW, {
        id: pia?.id,
      }),
      enable: accessControl('review'),
    },
  ];

  // Filter out items that are not enabled.
  return navItems.filter((item) => item.enable);
};

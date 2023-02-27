/*
 * This is used to determine the side nav styleing of each form attribute
 * enable is used to control if we want to dislay the form attribute in the side nav
 * till the complete feature is implemented we can control what is disaplayed in the side nav
 */

import { routes } from '../../../constant/routes';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../../utils/path';
import { INavbarItem } from '../../common/Navbar/interfaces';

export const piaFormSideNavPages = (
  pia: IPiaForm,
  isEditMode = false,
  isNewForm = false,
): INavbarItem[] => {
  // This will change once Next Steps tab is implemented
  const showPostIntakeTabs =
    !!pia?.hasAddedPiToDataElements && !!pia?.submittedAt;

  const intakeLink = isNewForm
    ? routes.PIA_NEW
    : isEditMode
    ? routes.PIA_INTAKE_EDIT
    : routes.PIA_INTAKE_VIEW;

  return [
    {
      id: 1,
      label: 'PIA Intake',
      link: buildDynamicPath(intakeLink, { id: pia?.id }),
      enable: true, // always show
    },
    {
      id: 2,
      label: 'Next steps',
      link: '',
      enable: false, // enable them in subsequent tickets
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
      enable: showPostIntakeTabs,
    },
    {
      id: 5,
      label: 'Collection, use and disclosure',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_DISCLOSURE_EDIT : routes.PIA_DISCLOSURE_VIEW,
        { id: pia?.id },
      ),
      enable: showPostIntakeTabs,
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
      enable: showPostIntakeTabs,
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
      enable: showPostIntakeTabs,
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
      enable: showPostIntakeTabs,
    },
    {
      id: 9,
      label: 'Personal information banks',
      link: buildDynamicPath(
        isEditMode
          ? routes.PIA_PERSONAL_INFORMATION_BANK_EDIT
          : routes.PIA_PERSONAL_INFORMATION_BANK_VIEW,
        {
          id: pia?.id,
        },
      ),
      enable: showPostIntakeTabs,
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
      enable: showPostIntakeTabs,
    },
  ];
};

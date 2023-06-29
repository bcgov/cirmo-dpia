/*
 * This is used to determine the side nav styleing of each form attribute
 * enable is used to control if we want to dislay the form attribute in the side nav
 * till the complete feature is implemented we can control what is disaplayed in the side nav
 */

import { isMPORole } from '../../../utils/helper.util';
import { routes } from '../../../constant/routes';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../../utils/path';
import { INavbarItem } from '../../common/Navbar/interfaces';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { PiaStatuses } from '../../../constant/constant';

export const PiaFormSideNavPages = (
  pia: IPiaForm,
  isEditMode = false,
  isNewForm = false,
): INavbarItem[] => {
  const { pathname } = useLocation();

  // This will change once Next Steps tab is implemented
  const showPostIntakeTabs =
    (pia?.hasAddedPiToDataElements === true ||
      pia?.hasAddedPiToDataElements === null) &&
    pia?.isNextStepsSeenForNonDelegatedFlow === true;

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

  const enableReview = (): boolean => {
    if (
      pia?.hasAddedPiToDataElements === false &&
      pia?.isNextStepsSeenForDelegatedFlow === true &&
      pia?.status !== PiaStatuses.INCOMPLETE &&
      pia?.status !== PiaStatuses.EDIT_IN_PROGRESS
    ) {
      // This is for delegated review
      if (isMPORole()) {
        if (!isEditMode) {
          /* check if the status has review priviliges */
          return true;
        } else return false;
        /* only show in view mode */
      } else {
        /* not an MPO user */
        return false;
      }
    } else {
      // This is for full PIA
      return showPostIntakeTabs;
    }
  };

  const checkNextSteps = (): boolean => {
    if (
      pathname === buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, { id: pia?.id })
    ) {
      return true;
    } else {
      return false;
    }
  };

  const userIsMpo = useMemo(() => isMPORole(), []);

  /* 
* if null the states are not used
if string then the state needs to find the label string
if it is ++ or -- operater navigate to the previous or next tab
*/

  return [
    {
      id: 1,
      label: 'PIA Intake',
      link: buildDynamicPath(intakeLink, { id: pia?.id }),
      enable: true, // always show
      state: {
        next: {
          condition: enableReview(),
          action: checkPIANonDelegateFlow() ? NextStepsDefaultPage() : 'Review',
        },
      },
    },
    {
      id: 2,
      label: 'Next steps',
      link: buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, { id: pia?.id }),
      enable: checkNextSteps(), // enable them in subsequent tickets
      state: {
        next: {
          condition:
            pia?.hasAddedPiToDataElements == true ||
            pia?.hasAddedPiToDataElements == null,
          action: NextStepsDefaultPage(),
          actionFalse: 'Review',
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
      enable: enableReview(),
    },
    {
      id: 5,
      label: 'Collection, use and disclosure',
      link: buildDynamicPath(
        isEditMode ? routes.PIA_DISCLOSURE_EDIT : routes.PIA_DISCLOSURE_VIEW,
        { id: pia?.id },
      ),
      enable: showPostIntakeTabs,
      state: {
        next: {
          condition: true,
          action: +1,
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
      enable: showPostIntakeTabs,
      state: {
        next: {
          condition: true,
          action: +1,
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
      enable: showPostIntakeTabs,
      state: {
        next: {
          condition: true,
          action: +1,
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
      enable: showPostIntakeTabs,
      state: {
        next: {
          condition: true,
          action: +1,
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
      enable: showPostIntakeTabs,
      state: {
        next: {
          condition: true,
          action: +1,
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
      enable: showPostIntakeTabs,
      state: {
        ...(userIsMpo
          ? {
              next: {
                condition: true,
                action: 'PIA Pathway Questionnaire',
              },
            }
          : {}),
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
      enable: userIsMpo && showPostIntakeTabs,
    },
    ...(userIsMpo
      ? [
          {
            id: 12,
            label: 'PIA Pathway Questionnaire',
            link: buildDynamicPath(
              isEditMode ? routes.PIA_PPQ_EDIT : routes.PIA_PPQ_VIEW,
              {
                id: pia?.id,
              },
            ),
            enable: showPostIntakeTabs,
            state: {
              prev: {
                condition: true,
                action: 'Additional risks',
              },
              next: {
                condition: true,
                action: +1,
              },
            },
          },
        ]
      : []),
    {
      id: 13,
      label: 'Review',
      link: buildDynamicPath(routes.PIA_REVIEW, {
        id: pia?.id,
      }),
      enable: enableReview(),
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

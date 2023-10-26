import { PiaStatuses, SubmitButtonTextEnum } from '../../constant/constant';
import { useCallback, useEffect, useState } from 'react';
import Alert from '../../components/common/Alert';
import { HttpRequest } from '../../utils/http-request.util';
import { API_ROUTES } from '../../constant/apiRoutes';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../constant/routes';
import Modal from '../../components/common/Modal';
import PIASubHeader from '../../components/public/PIASubHeader';
import PIASideNav from '../../components/public/PIASideNav';
import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { buildDynamicPath } from '../../utils/path';
import Spinner from '../../components/common/Spinner';
import PIANavButton from '../../components/public/PIANavButton';
import { PiaFormSideNavPages } from '../../components/public/PIASideNav/pia-form-sideNav-pages';
import BannerStatus from './BannerStatus';
import Collapsible from '../../components/common/Collapsible';
import { PiaFormContext } from '../../contexts/PiaFormContext';
import { faBars, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import CommentSidebar from '../../components/public/CommentsSidebar';
import { PiaSections } from '../../types/enums/pia-sections.enum';
import { CommentCount } from '../../components/common/ViewComment/interfaces';
import { isCPORole } from '../../utils/user';
import { statusList } from '../../utils/statusList/statusList';
import useAutoSave from '../../utils/autosave';
import { validateForm } from './utils/validateForm';
import { highlightInvalidField, resetUI } from './utils/validationUI';
import { PiaValidationMessage } from './helpers/interfaces';
import { HandleValidationProps, PiaFormOpenMode } from './helpers/types';
import useSnowPlow from '../../utils/snowplow';
import useHandleModal from './utils/handleModal';

const PIAFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  // State related to PIA Form
  const [initialPiaStateFetched, setInitialPiaStateFetched] = useState(false);

  // State related to form status
  const [formReadOnly, setFormReadOnly] = useState(true);

  // State related to Comments
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [commentCount, setCommentCount] = useState<CommentCount>({});
  const [selectedSection, setSelectedSection] = useState<PiaSections>();
  const [bringCommentsSidebarToFocus, setBringCommentsSidebarToFocus] =
    useState(0);

  // State related to Intake and Validation
  const [validationMessages, setValidationMessages] =
    useState<PiaValidationMessage>({});
  const [submitButtonText, setSubmitButtonText] = useState(
    SubmitButtonTextEnum.INTAKE,
  );
  const [validationFailedMessage, setValidationFailedMessage] = useState('');

  // Call the useAutoSave hook
  const {
    setIsEagerSave,
    lastSaveAlertInfo,
    setStalePia,
    hasFormChanged,
    upsertAndUpdatePia,
    fetchAndUpdatePia,
    isValidationFailed,
    setIsValidationFailed,
    pia,
    setPia,
  } = useAutoSave();

  // Call the useHandleModal hook
  const {
    handleShowModal,
    handleModalClose,
    handleModalCancel,
    message,
    setMessage,
    piaModalConfirmLabel,
    showPiaModal,
    piaModalCancelLabel,
    piaModalTitleText,
    piaModalParagraph,
    piaModalButtonValue,
  } = useHandleModal({ pia, upsertAndUpdatePia });

  const mode: PiaFormOpenMode =
    pathname?.split('/').includes('view') ||
    pia.status === PiaStatuses.CPO_REVIEW
      ? 'view'
      : 'edit';

  // Call the useSnowPlow hook
  const { sendSnowplowStatusChangeCall } = useSnowPlow({
    pia,
  });

  // Send snowplow call when pia is first created with an id or when status is changed.
  useEffect(() => {
    if (pia.id) sendSnowplowStatusChangeCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pia?.id, pia?.status]);

  const piaStateChangeHandler = (
    value: any,
    key: keyof IPiaForm,
    isEager?: boolean,
  ) => {
    // DO NOT allow state changes in the view mode unless it is a review page
    if (mode === 'view' && !pathname?.split('/').includes('review')) return;

    if (isEager) {
      setIsEagerSave(true);
    }

    // Update backend state when status is changed using stateChangeHandler.
    // Fixes issue in Next Steps where only local state was updated.
    if (key === 'status')
      upsertAndUpdatePia({ status: value } as Partial<IPiaForm>);

    setPia((latest) => ({
      ...latest,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (mode !== 'edit') {
      setFormReadOnly(true);
    } else {
      setFormReadOnly(false);
    }
  }, [mode]);

  //Async callback for getting commentCount within a useEffect hook
  const getCommentCount = useCallback(async () => {
    const count: CommentCount = await HttpRequest.get(
      API_ROUTES.GET_COMMENTS_COUNT,
      {},
      {},
      true,
      {
        piaId: id,
      },
    );
    setCommentCount(count);
  }, [id]);

  useEffect(() => {
    setSelectedSection(undefined);
  }, [pathname]);

  useEffect(() => {
    document.title = `${
      mode === 'view' ? 'View PIA' : 'Edit PIA'
    } - Digital Privacy Impact Assessment (DPIA)`;
  }, [mode]); // Empty array ensures this runs once on mount and unmount

  //Update the comment count object to pass into the every tab
  useEffect(() => {
    try {
      getCommentCount();
    } catch (err) {
      console.error(err);
    }
  }, [getCommentCount]);

  const piaCollapsibleChangeHandler = (isOpen: boolean) => {
    setIsRightOpen(isOpen);
    if (isOpen === true && isLeftOpen === true) {
      setIsLeftOpen(false);
    }
    if (isOpen) {
      setBringCommentsSidebarToFocus((prev) => prev + 1);
    }
  };
  const piaCommentPathHandler = (path: PiaSections | undefined) => {
    setSelectedSection(path);
  };
  const commentChangeHandler = () => {
    getCommentCount();
  };

  useEffect(
    () =>
      setSubmitButtonText(
        statusList(pia)[pia?.status || 'incomplete'].buttonText ||
          SubmitButtonTextEnum.FORM,
      ),
    [pia, pia.status],
  );

  // DO NOT allow user to edit in the MPO review status.
  const accessControl = useCallback(() => {
    if (pia?.status === PiaStatuses.MPO_REVIEW && mode === 'edit') {
      navigate(buildDynamicPath(routes.PIA_VIEW, { id: pia?.id }));
    }
  }, [mode, navigate, pia?.id, pia?.status]);

  useEffect(() => {
    if (isValidationFailed)
      setValidationFailedMessage(
        'PIA cannot be submitted due to missing required fields on the PIA Intake page. Please enter a response to all required fields.',
      );
  }, [isValidationFailed]);

  //
  // Event Handlers
  //
  const handleEdit = () => {
    if (!pia?.id) {
      console.error('PIA id not found');
      return;
    }
    if (pia.status === PiaStatuses.MPO_REVIEW) {
      handleShowModal('edit');
    } else {
      navigate(
        buildDynamicPath(pathname.replace('/view', '/edit'), { id: pia.id }),
        {
          state: pia,
        },
      );
    }
  };

  const handleStatusChange = async (status: string) => {
    if (!pia?.id) {
      console.error('PIA id not found.');
      return;
    }
    // call backend patch endpoint to update the pia status
    const requestBody: Partial<IPiaForm> = {
      status: status,
      saveId: pia?.saveId,
    };
    try {
      await upsertAndUpdatePia(
        requestBody,
      ); /* PIA will be set after data is updated in backend */
      // Temp fix, as we do not know the future requirement yet
      // if a CPO move a PIA from CPO_Review to MPO_Review
      // it can not access the PIA anymore, current it throw a 403 error
      // this fix by move the page to pia list table instead of stay in pia view page.
      if (isCPORole()) navigate(routes.PIA_LIST, { replace: true });

      // For a delegate PIA, change from final review to incomplete/dit_in_progress status
      // will hide review tab so we need to redirect path to intake
      if (
        pathname?.split('/').includes('review') &&
        (status === PiaStatuses.EDIT_IN_PROGRESS ||
          status === PiaStatuses.INCOMPLETE)
      ) {
        navigate(pathname.replace('/review', '/intake'), { replace: true });
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  //
  // Form Submission Handler
  //
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await upsertAndUpdatePia();

    if (window.location.pathname.includes('new/intake') || !pia.status) {
      handleShowModal('submitPiaIntake');
    } else {
      handleShowModal(
        statusList?.(pia)?.[pia?.status]?.submitModalType ?? 'submitPiaForm',
      );
    }
  };

  /*
   * @Description - This function is used to validate the form
   * and display a red border around the invalid fields
   * and scroll to the first invalid field.
   *
   * @param submit event - the event that triggered the validation
   *
   * How it works: The function loops through the form fields and checks if they are valid.
   * If they are not valid, it adds the class 'is-invalid' to the field and scrolls to the first invalid field.
   * If the field is a rich text editor <MD-Editor>, it adds the class 'form-control' to the field.
   * This is because the rich text editor is a div and not an input field.
   * The class 'is-invalid' is used to display the red border.
   *
   */

  const handleValidation = ({ event, status }: HandleValidationProps) => {
    resetUI({
      setValidationMessages,
      setIsValidationFailed,
      setValidationFailedMessage,
      doc: document,
    });

    // Validate the form
    const { isValid, formId } = validateForm({ pia, setValidationMessages });

    // Update UI based on validation
    if (!isValid) {
      // If 'isValid' is false, display an error message to prompt the user to complete all required fields.
      setValidationFailedMessage(
        'PIA cannot be submitted due to missing required fields on the PIA Intake page. Please enter a response to all required fields.',
      );

      highlightInvalidField(formId, document);
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    } else if (status) {
      handleStatusChange(status);
    } else {
      handleSubmit(event);
    }
  };

  const alertUserLeave = useCallback(
    (e: any) => {
      // if no changes in the form recently, do not show warning leaving the page
      if (!hasFormChanged()) {
        return;
      }

      e.preventDefault();

      /*
      For cross-browser support
  
      This function uses e.returnValue, which has been deprecated for 9+ years.
      The reason for this usage is to support Chrome which only behaves as expected when using this value.
  
      Below are a couple of references on this topic.
  
      References:
      - https://developer.mozilla.org/en-US/docs/Web/API/Event/returnValue
      - https://contest-server.cs.uchicago.edu/ref/JavaScript/developer.mozilla.org/en-US/docs/Web/API/Event/returnValue.html
      */
      e.returnValue = true;
    },
    [hasFormChanged],
  );

  useEffect(() => {
    // No initial state to fetch OR already fetched
    // if not in edit mode (no id available) OR initial state already fetched
    if (!id || initialPiaStateFetched) return;

    fetchAndUpdatePia(id).then((updatedPia) => {
      setStalePia(updatedPia);
      setPia(updatedPia);

      setInitialPiaStateFetched(true); // no further fetch PIA unless requested
    });
  });

  const pages = PiaFormSideNavPages(pia, mode === 'edit' ? true : false, false);

  useEffect(() => {
    window.addEventListener('beforeunload', alertUserLeave);
    return () => {
      window.removeEventListener('beforeunload', alertUserLeave);
    };
  }, [alertUserLeave, hasFormChanged]);

  // Prevent URL manipulation to edit a PIA
  // if the PIA is not in INCOMPLETE or EDIT_IN_PROGRESS status
  useEffect(() => {
    if (
      pia?.status !== PiaStatuses.INCOMPLETE &&
      pia?.status !== PiaStatuses.EDIT_IN_PROGRESS &&
      pathname?.split('/').includes('edit')
    ) {
      // change edit to view
      pathname?.replace('/edit', '/view');
      setFormReadOnly(true);
    }
  }, [pia?.status, id, pathname]);

  return (
    <>
      <PIASubHeader
        pia={pia}
        lastSaveAlertInfo={lastSaveAlertInfo}
        primaryButtonText={submitButtonText}
        isValidationFailed={isValidationFailed}
        mode={mode}
        handleStatusChange={(status) => handleValidation({ status })}
        onEditClick={handleEdit}
        onSubmitClick={(event) => handleValidation({ event })}
      />
      <div className="bcgovPageContainer background background__form wrapper pe-0">
        {message && (
          <Alert
            type="danger"
            message={message}
            className="mt-0 mb-4"
            onClose={() => setMessage('')}
          />
        )}

        <div
          className={`component__container ${
            isRightOpen ? 'component__container--comments-open' : ''
          }`}
        >
          <Collapsible
            icon={faBars}
            alignment="left"
            isVisible={isLeftOpen}
            onOpenHandler={() => {
              setIsRightOpen(false);
            }}
            setIsVisible={setIsLeftOpen}
          >
            <section className="side-nav__container">
              <PIASideNav
                pia={pia}
                isNewForm={!id}
                isReadOnly={formReadOnly}
              ></PIASideNav>
            </section>
          </Collapsible>

          <section className="ms-md-3 ms-lg-4 ms-xl-5 content__container">
            {mode === 'view' && validationFailedMessage && (
              <Alert
                type="danger"
                message={validationFailedMessage}
                className="mt-0 mb-4"
                showCloseIcon={false}
                showInitialIcon={true}
              />
            )}
            {mode === 'view' && <BannerStatus pia={pia} />}
            {/* Only show the nested routes if it is a NEW Form (no ID) OR if existing form with PIA data is fetched */}
            {!id || initialPiaStateFetched ? (
              <PiaFormContext.Provider
                value={{
                  pia,
                  commentCount,
                  selectedSection,
                  piaCollapsibleChangeHandler,
                  piaCommentPathHandler,
                  piaStateChangeHandler,
                  isReadOnly: formReadOnly,
                  accessControl,
                  validationMessage: validationMessages,
                }}
              >
                <Outlet />
              </PiaFormContext.Provider>
            ) : (
              <div className="w-100">
                <div className="d-flex justify-content-center">
                  <Spinner />
                </div>
              </div>
            )}
            <PIANavButton pages={pages} />
          </section>
          <div
            className={`container__side--form bg-white ms-3 justify-self-start position-fixed overflow-y-scroll pe-4 ${
              !isRightOpen ? 'container__side--form--closed' : ''
            }`}
          >
            <Collapsible
              icon={faCommentDots}
              alignment="right"
              isVisible={isRightOpen}
              setIsVisible={setIsRightOpen}
              onOpenHandler={() => {
                setIsLeftOpen(false);
              }}
              fullHeight
              bringToFocus={bringCommentsSidebarToFocus}
            >
              <CommentSidebar
                pia={pia}
                path={selectedSection}
                piaId={pia.id}
                handleStatusChange={commentChangeHandler}
              />
            </Collapsible>
          </div>
        </div>

        <Modal
          confirmLabel={piaModalConfirmLabel}
          cancelLabel={piaModalCancelLabel}
          titleText={piaModalTitleText}
          show={showPiaModal}
          value={piaModalButtonValue}
          handleClose={(e) => handleModalClose(e)}
          handleCancel={handleModalCancel}
        >
          <p className="modal-text">{piaModalParagraph}</p>
        </Modal>
      </div>
    </>
  );
};

export default PIAFormPage;

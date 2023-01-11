import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogoutHandler, refreshAuthTokens } from '../../../utils/auth';
import Modal from '../Modal';
import { addEventListeners, removeEventListeners } from './events';

const AppActivityManager = (): React.ReactElement => {
  const navigate = useNavigate();

  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    // These configs can come from OpenShift in the future
    const config = {
      refreshInterval: 1 * 60, // refresh token every one minute
      inactivityTimeout: 14 * 60, // show warning modal at 14th minute
      warningModalTimeout: 1 * 60, // if not acted on warning modal, auto logout after one minute
    };

    /**
     * Refresh token Interval
     * Refresh the authentication tokens every "refreshInterval" seconds [initial value - every one minute]
     * Continue refreshing until user is logged out
     *
     * This interval is stopped when the user logs out of the application
     */
    const interval = setInterval(() => {
      refreshAuthTokens();
    }, config.refreshInterval * 1000);

    /**
     * Timeout of when to show the warning modal to the user [initial value = 14mins]
     * This gets resets by users' keyboard activities
     */
    const createTimeoutToShowWarningModal = () =>
      setTimeout(() => {
        setWarningModalOpen(true);
      }, config.inactivityTimeout * 1000);

    /**
     * Timeout and auto log the user out if user does not respond to the warning modal
     */
    const createTimeoutToAutoLogout = () =>
      setTimeout(() => {
        authLogoutHandler((urlPath: string) => {
          navigate(urlPath);
        });
      }, config.warningModalTimeout * 1000);

    /**
     * Every render cycle of react evaluates which timeout to trigger
     * If warning modal is not open [initial state], create a timeout of when to show warning model
     * while if the warning modal is already open, create a timeout of until how long to show if not acted
     */
    let timeout = isWarningModalOpen
      ? createTimeoutToAutoLogout()
      : createTimeoutToShowWarningModal();

    /**
     * The listener listens to all the user related events
     * On activity, if the warning modal isn't shown, it resets the timeout
     */
    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeoutToShowWarningModal();
      }
    };

    // Initialization
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isWarningModalOpen, navigate]);

  const onLogOffCall = () => {
    authLogoutHandler((urlPath: string) => {
      navigate(urlPath);
    });
  };

  return (
    <Modal
      confirmLabel="Yes, stay logged in"
      cancelLabel="No, log out"
      titleText="Your session is about to expire"
      show={isWarningModalOpen}
      reversed={true}
      handleClose={() => setWarningModalOpen(false)}
      handleCancel={onLogOffCall}
    >
      <p className="modal-text">
        Any unsaved changes will be lost. Would you like to stay logged in?
      </p>
    </Modal>
  );
};

export default AppActivityManager;

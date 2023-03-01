import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  authLogoutHandler,
  isAuthenticated,
  refreshAuthTokens,
  TokenStorageKeys,
} from '../../../utils/auth';
import { throttle } from '../../../utils/function';
import { AppStorage } from '../../../utils/storage';
import Modal from '../Modal';
import { addEventListeners, removeEventListeners } from './events';

const AppActivityManager = (): React.ReactElement => {
  const navigate = useNavigate();

  const [isWarningModalOpen, setWarningModalOpen] = useState<boolean>(false);

  const updateIsWarningModalOpen = (value: boolean) => {
    setWarningModalOpen(value);
    AppStorage.setItem(
      TokenStorageKeys.IS_AUTO_LOGOUT_WARNING_POPUP_OPEN,
      value,
    );
  };

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
     * If any of the opened application tabs has refreshed the token in last one minute [or "refreshInterval" time ago ]
     * then skip the refresh from the tab to avoid duplicate callings of refresh token
     *
     * This interval is stopped when the user logs out of the application
     */
    const interval = setInterval(() => {
      const tokensLastRefreshedAt = AppStorage.getItem<number>(
        TokenStorageKeys.TOKENS_LAST_REFRESHED_AT,
      );
      const now = +new Date();
      const refreshIntervalAgo = now - config.refreshInterval * 1000;

      // Error Handling: no action if tokensLastRefreshedAt is undefined/null
      // After login, tokensLastRefreshedAt would have set to logged in time, followed by at every refresh
      if (!tokensLastRefreshedAt) return;

      if (isAuthenticated() && tokensLastRefreshedAt < refreshIntervalAgo) {
        refreshAuthTokens();
      }
    }, config.refreshInterval * 1000);

    /**
     * Timeout of when to show the warning modal to the user [initial value = 14mins]
     * This gets resets by users' keyboard activities
     */
    const createTimeoutToShowWarningModal = () =>
      setTimeout(() => {
        updateIsWarningModalOpen(true);
      }, config.inactivityTimeout * 1000);

    const logMeOut = () => {
      authLogoutHandler((urlPath: string) => {
        navigate(urlPath);
      });
    };

    /**
     * Timeout and auto log the user out if user does not respond to the warning modal
     */
    const createTimeoutToAutoLogout = () =>
      setTimeout(() => {
        logMeOut();
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
    const updateTimeout = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeoutToShowWarningModal();
      }
    };

    const listener = () => {
      updateTimeout();

      // set last activity to storage - to track usage across multiple tabs
      AppStorage.setItem(TokenStorageKeys.LAST_ACTIVITY_AT, +new Date());
    };

    const storageListener = (e: StorageEvent) => {
      // Code reaches here if a local storage changed in other tabs

      if (!isAuthenticated()) {
        // if not authenticated, log the user out
        // added return: since no further processing is required
        return logMeOut();
      }

      // Observe Last activity of other tabs; and update document timeout
      if (e.key === TokenStorageKeys.LAST_ACTIVITY_AT) {
        const value = AppStorage.getItem<boolean>(
          TokenStorageKeys.LAST_ACTIVITY_AT,
        );

        if (!value) return;

        updateTimeout();
      }

      // Observe if warning popup is open on other tabs, sync it
      if (e.key === TokenStorageKeys.IS_AUTO_LOGOUT_WARNING_POPUP_OPEN) {
        const value = AppStorage.getItem<boolean>(
          TokenStorageKeys.IS_AUTO_LOGOUT_WARNING_POPUP_OPEN,
        );

        if (value === null || value === undefined) {
          // Error Handing: User should never arrive here;
          return;
        }

        updateIsWarningModalOpen(value);
      }
    };

    // throttle input to 1s
    const throttledListener = throttle(listener, 1000);

    // Initialization
    addEventListeners(throttledListener);

    // storage Listener
    AppStorage.addStorageListener(storageListener);

    // Cleanup
    return () => {
      AppStorage.removeStorageListener(storageListener);
      removeEventListeners(throttledListener);
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
      handleClose={() => updateIsWarningModalOpen(false)}
      handleCancel={onLogOffCall}
    >
      <p className="modal-text">
        Any unsaved changes will be lost. Would you like to stay logged in?
      </p>
    </Modal>
  );
};

export default AppActivityManager;

import { AppStorage } from '../../utils/storage';
import ListViewRender from '../../components/public/ListViewRender';
import { TokenStorageKeys } from '../../utils/auth';

const PIAActiveList = () => {
  const freshLoginState = AppStorage.getItem(
    TokenStorageKeys.FRESH_LOGIN_STATE,
  );
  const redirect = AppStorage.getItem(TokenStorageKeys.POST_LOGIN_REDIRECT_URL);
  if (freshLoginState && redirect) {
    AppStorage.setItem(TokenStorageKeys.FRESH_LOGIN_STATE, false);
    window.location.href = redirect;
  }

  return <ListViewRender showCompleted={false} title={`Active PIAs`} />;
};

export default PIAActiveList;

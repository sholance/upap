import { updateCurrentStep, updateFirstTimeUser } from './actions/auth';
import { useDispatch } from 'react-redux';
import { handleApiErrors } from './utils/handleApiErrors';
import { setAccessToken } from './utils/authFn';
import { updateUser } from './actions/user';
import UAuth from '@uauth/js';

const useUnstoppableDomains = () => {
    const ac = new AbortController();
    const { signal } = ac;
    const dispatch = useDispatch();

    const uauth = new UAuth({
        clientID: process.env.REACT_APP_CLIENT_ID!,
        redirectUri: process.env.REACT_APP_REDIRECT_URI!,
        scope: 'openid wallet profile',
    });

    const login = async () => {
        try {
            const authorization = await uauth.loginWithPopup();
            if (
                authorization &&
                authorization.idToken &&
                authorization.idToken.wallet_address
            ) {
                const response = await fetch(
                    `${process.env.REACT_APP_REDIRECT_URI!}/auth/verify-ud-signature`,
                    {
                        signal,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            walletId: authorization.idToken.wallet_address,
                            signature: authorization.idToken.eip4361_signature,
                            message: authorization.idToken.eip4361_message,
                            nonce: authorization.idToken.nonce,
                        }),
                    }
                );
                const json: any = await handleApiErrors(response);
                dispatch(updateUser(json.user));
                setAccessToken(json.accessToken);
                dispatch(updateFirstTimeUser(json.isFirstTimeUser));
                dispatch(updateCurrentStep(2));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await uauth.logout();
            console.log('Logged out with Unstoppable');
        } catch (error) {
            console.error(error);
        }
    };
    return { login, logout };
};

export { useUnstoppableDomains };
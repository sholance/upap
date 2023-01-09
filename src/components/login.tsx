import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { updateCurrentStep } from '../actions/auth';
import { useUnstoppableDomains } from '../hook';


const Login: FC = () => {
    const unstoppableDomains = useUnstoppableDomains();
    const loginWithUd = () => {
        unstoppableDomains.login();
    };
    const logOutFromUd = () => {
        unstoppableDomains.logout();
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate('/profile');
            dispatch(updateCurrentStep(1));
        }, 3 * 1000);

        if (user) {
            return () => {
                clearTimeout(timer);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <>
            {user ? (<button onClick={logOutFromUd}>Disconnect</button>
            ) : (<button onClick={loginWithUd}>Connect</button>
            )}
            <span className='connection-text'>
                You&apos;re connected with{' '}
                {`${user && user.walletId?.slice(0, 4)}...${user && user.walletId?.slice(38)
                    }`}
            </span>
            <p className='success-text'>
                Authentication is succesful, wait for a few seconds to automatically
                open dashboard.
            </p>
        </>
    )
}

export default Login
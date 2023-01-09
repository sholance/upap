import { IUser } from '../actions/user';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_DISCORD = 'UPDATE_USER_DISCORD'
const GET_WALLET_ADDRESS = 'GET_WALLET_ADDRESS';
const GET_WALLET_USDC_BALANCE = 'GET_WALLET_USDC_BALANCE';
const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

interface State {
    user: Partial<IUser> | undefined;
    wallet_address: string;
    wallet_usdc_balance: number;
    discordId: string;
}

type Action =
    | {
        type: typeof UPDATE_USER;
        user: Partial<IUser>;
    }
    | {
        type: typeof UPDATE_USER_NAME;
        name: string;
    }
    | {
        type: typeof GET_WALLET_ADDRESS;
        payload: string;
    }
    | {
        type: typeof GET_WALLET_USDC_BALANCE;
        payload: string;
    }
    | {
        type: typeof UPDATE_USER_DISCORD;
        discordId: string;
    } | {
        type: typeof UPDATE_USER_EMAIL;
        email: string;

    };

const initialState: State = {
    user: undefined,
    wallet_address: '',
    wallet_usdc_balance: 0,
    discordId: '',
};

const user = (state = initialState, action: Action): State => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.user,
            };
        case UPDATE_USER_NAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    name: action.name,
                },
            };
        case GET_WALLET_ADDRESS:
            return {
                ...state,
                wallet_address: action.payload,
            };
        case GET_WALLET_USDC_BALANCE:
            return {
                ...state,
                wallet_usdc_balance: Number(action.payload),
            };
        case UPDATE_USER_DISCORD:
            return {
                ...state,
                user: {
                    ...state.user,
                    discordId: action.discordId,
                },
            };
        case UPDATE_USER_EMAIL:
            if (state.user) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        email: action.email,
                    },
                };
            }
            return { ...state };
        default:
            return { ...state };
    }
};

export default user;
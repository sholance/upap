const UPDATE_USER = 'UPDATE_USER';
const UPDATE_USER_NAME = 'UPDATE_USER_NAME';
const UPDATE_USER_DISCORD = 'UPDATE_USER_DISCORD'
const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

export interface IUser {
    userId: number;
    name: string | null;
    walletId: string;
    email: string | null;
    discordId: string | null;
    isFounder: boolean;
    nonce: string;
}

export interface IUpdateUser {
    userId: number;
    discordId: string;
}

export const updateUser = (user: Partial<IUser>) => ({
    type: UPDATE_USER,
    user,
});

export const updateUserName = (name: string) => ({
    type: UPDATE_USER_NAME,
    name,
});

export const updateUserDiscord = (discordId: string) => ({
    type: UPDATE_USER_DISCORD,
    discordId,
});
export const updateUserEmail = (email: string) => ({
    type: UPDATE_USER_EMAIL,
    email,
});
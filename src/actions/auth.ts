const UPDATE_CURRENT_STEP = 'UPDATE_CURRENT_STEP';
const UPDATE_FIRST_TIME_USER = 'UPDATE_FIRST_TIME_USER';

export const updateCurrentStep = (currentStep: number) => ({
    type: UPDATE_CURRENT_STEP,
    currentStep,
});

export const updateFirstTimeUser = (isFirstTimeUser: boolean) => ({
    type: UPDATE_FIRST_TIME_USER,
    isFirstTimeUser,
});
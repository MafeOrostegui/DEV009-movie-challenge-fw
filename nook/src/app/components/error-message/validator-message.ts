
interface ErrorMessage {
    [key: string]: string;
}

const errorMessages: ErrorMessage = {
    required: 'This field is required.',
    pattern: 'Email must be valid.',
    minlength: 'This field must be at least 8 characters long.',
    passwordMismatch: 'Passwords do not match.'
};

export function validatorErrorMessage(validatorName: string): string {
    return errorMessages[validatorName] ?? '';
}
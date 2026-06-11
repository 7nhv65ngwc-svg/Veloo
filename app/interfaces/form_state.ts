type FormState<T> = {
    success: boolean;
    errors?: T,
    message?: string
}
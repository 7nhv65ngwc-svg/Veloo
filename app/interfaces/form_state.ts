type FormState<T, J = undefined> = {
  success: boolean;
  errors?: T;
  message?: string;
  data?: J;
};

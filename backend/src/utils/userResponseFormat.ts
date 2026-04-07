export const userResponseFormat = (user: any) => {
  return {
    firstName: user.firstName,
    lastname: user.lastName,
    email: user.email,
    role: user.role,
  };
};

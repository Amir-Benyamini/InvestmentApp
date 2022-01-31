import authAPI from "../services/authAPI";

export const login = async (email, password) => {
  const response = await authAPI.login(email, password);
  if (response.ok) {
    console.log("lOGIN SUCCESS!", response);
  }

  return response;
};

export const signup = async (name, email, password) => {
  const response = await authAPI.signup(name, email, password);

  if (response.ok) {
    console.log("SIGNUP SUCCESS!", response);
  }

  return response;
};

export const activateAccount = async (token) => {
  const response = await authAPI.accountActivation(token);

  if (response.ok) {
    console.log("lOGIN SUCCESS!", response);
  }

  return response;
};

export const updateProfile = async (name, password, token) => {
  const response = await authAPI.updateProfile(name, password, token);

  if (response.ok) {
    console.log("PROFILE UPDATE SUCCESS!", response);
  }

  return response;
};

export const forgotPassword = async (email) => {
  const response = await authAPI.forgotPassword(email);

  if (response.ok) {
    console.log("FORGOT PASSWORD SUCCESS!", response);
  }

  return response;
};

export const resetPassword = async (newPassword, token) => {
  const response = await authAPI.resetPassword(newPassword, token);

  if (response.ok) {
    console.log("FORGOT PASSWORD SUCCESS!", response);
  }

  return response;
};

export const googleLogin = async (token) => {
  const response = await authAPI.googleLogin(token);

  if (response.ok) {
    console.log("GOOGLE LOGIN SUCCESS!", response);
  }

  return response;
};

export const facebookLogin = async (userID, accessToken) => {
  const response = await authAPI.facebookLogin(userID, accessToken);

  if (response.ok) {
    console.log("FACEBOOK LOGIN SUCCESS!", response);
  }

  return response;
};

export const loadProfile = async (userId, token) => {
  let res = await authAPI.loadProfile(userId, token);
  return res;
};
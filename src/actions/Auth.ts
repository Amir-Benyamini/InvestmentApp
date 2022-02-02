import authAPI from "../services/authAPI";
import { authenticate } from "../services/authHelpers";
import { auth } from "../stores/index";
export const login = async (email: string, password: string) => {
  const response = await authAPI.loginCall(email, password);
  if (response) {
    const data = await response.text();
    if (response.ok) {
      authenticate(JSON.parse(data), () => {
        console.log("Authenticate is done!");
        auth.authenticate();
      });
      if (auth.isLoggedIn) {
        return { ok: true, data };
      } else {
        return { ok: false, data };
      }
    } else {
      return { ok: false, data };
    }
  }
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await authAPI.signupCall(name, email, password);
  if (response) {
    let data = await response.text();

    if (response.ok) {
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return {
      ok: false,
      data: "Signup request faild, please try again.",
    };
  }
};

export const activateAccount = async (token: string) => {
  const response = await authAPI.accountActivationCall(token);
  if (response) {
    const data = await response.text();
    if (response.ok) {
      console.log("Account activation success!", response);
      return { ok: true, data };
    } else {
      console.log("Account activation error!", response);
      return { ok: false, data };
    }
  }
};

export const updateProfile = async (
  name: string,
  password: string,
  token: string
) => {
  const response = await authAPI.updateProfile(name, password, token);

  if (response.ok) {
    console.log("PROFILE UPDATE SUCCESS!", response);
  }

  return response;
};

export const forgotPassword = async (email: string) => {
  const response = await authAPI.forgotPasswordCall(email);

  if (response) {
    let data = await response.text();

    if (response.ok) {
      return { ok: true, data };
    } else {
      return { ok: false, data };
    }
  } else {
    return {
      ok: false,
      data: "Reset password request faild, please try again.",
    };
  }
};

export const resetPassword = async (newPassword: string, token: string) => {
  const response = await authAPI.resetPasswordCall(newPassword, token);
  if (response) {
    console.log(response);
    const data = await response.text();
    if (response.ok) {
      console.log("Reset password success!", response);
      return { ok: true, data };
    } else {
      console.log("Reset password error!", response);
      return { ok: false, data };
    }
  }
};

export const googleLogin = async (token: string) => {
  const response = await authAPI.googleLoginCall(token);

  if (response) {
    const data = await response.text();
    if (response.ok) {
      authenticate(JSON.parse(data), () => {
        console.log("Authenticate is done!");
        auth.authenticate();
      });
      if (auth.isLoggedIn) {
        return { ok: true, data };
      } else {
        return { ok: false, data };
      }
    } else {
      return { ok: false, data };
    }
  }
};

export const facebookLogin = async (userID: string, accessToken: string) => {
  const response = await authAPI.facebookLogin(userID, accessToken);

  if (response.ok) {
    console.log("FACEBOOK LOGIN SUCCESS!", response);
  }

  return response;
};

export const loadProfile = async (userId: string, token: string) => {
  let res = await authAPI.loadProfile(userId, token);
  return res;
};

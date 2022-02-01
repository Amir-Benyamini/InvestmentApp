class authAPI {
  async signupCall(name: string, email: string, password: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    };
    const response = await fetch(`http://localhost:4000/auth/signup`, options);
    return response;
  }

  async loginCall(email: string, password: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(`http://localhost:4000/auth/login`, options);
    return response;
  }

  async accountActivation(token: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        token,
      }),
    };

    return await fetch(
      `http://localhost:4000/auth/account-activation`,
      options
    );
  }

  async loadProfile(id: string, token: string) {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    };

    return await fetch(`http://localhost:4000/user/${id}`, options);
  }

  async updateProfile(name: string, password: string, token: string) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        password,
      }),
    };

    return await fetch(`http://localhost:4000/user/update`, options);
  }

  async forgotPasswordCall(email: string) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        email,
      }),
    };
    const response = await fetch(
      `http://localhost:4000/auth/forgot-password`,
      options
    );
    return response;
  }

  async resetPassword(newPassword: string, token: string) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        resetPasswordLink: token,
        newPassword,
      }),
    };

    return await fetch(`http://localhost:4000/auth/reset-password`, options);
  }

  async googleLogin(token: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        idToken: token,
      }),
    };

    return await fetch(`http://localhost:4000/auth/google-login`, options);
  }

  async facebookLogin(userID: string, accessToken: string) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        userID,
        accessToken,
      }),
    };

    return await fetch(`http://localhost:4000/auth/facebook-login`, options);
  }
}

export default new authAPI();

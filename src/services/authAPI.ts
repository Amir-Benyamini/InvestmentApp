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

  async accountActivationCall(token: string) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Content-Length": "calculated when request is sent",
      Host: "calculated when request is sent",
    };
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        token,
      }),
      headers: headers,
    };

    const response = await fetch(
      `http://localhost:4000/auth/account-activation`,
      options
    );

    return response;
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

  async resetPasswordCall(newPassword: string, resetPasswordLink: string) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
      "Content-Length": "calculated when request is sent",
      Host: "calculated when request is sent",
    };
    const options: RequestInit = {
      method: "PUT",
      body: JSON.stringify({
        resetPasswordLink,
        newPassword,
      }),
      headers: headers,
    };

    const response = await fetch(
      `http://localhost:4000/auth/reset-password`,
      options
    );

    return response;
  }

  async googleLoginCall(token: string) {
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
    const response = await fetch(
      `http://localhost:4000/auth/google-login`,
      options
    );
    return response;
  }

  async facebookLoginCall(userID: string, accessToken: string) {
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

    const response = await fetch(
      `http://localhost:4000/auth/facebook-login`,
      options
    );
    return response;
  }
}

export default new authAPI();

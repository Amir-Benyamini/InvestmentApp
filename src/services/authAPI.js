class authAPI {
  async signup(name, email, password) {
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

    return await fetch(`http://localhost:4000/auth/signup`, options);
  }

  async login(email, password) {
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

    return await fetch(`http://localhost:4000/auth/login`, options);
  }

  async accountActivation(token) {
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

  async loadProfile(id, token) {
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

  async updateProfile(name, password, token) {
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

  async forgotPassword(email) {
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

    return await fetch(`http://localhost:4000/auth/forgot-password`, options);
  }

  async resetPassword(newPassword, token) {
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

  async googleLogin(token) {
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

  async facebookLogin(userID, accessToken) {
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

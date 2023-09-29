const createAccount =()=>{}

const logIn = async() => {
  setAlert(null);
  setSigInloading("Loading..");
  var res: AuthResponseType = await performFormDataHttp("POST", {
    endPoint: "/auth",
    data: {
      email: email,
      password: password,
    },
  });
  if (!res.error) {
    setAlert({
      message: `${res.message}`,
      variant: "success",
      closeable: true,
    });
    setToken(res.token);
    if (res.user) {
      setUser(res.user);
      routing(res.user?.roles[0], router);
    }
  } else {
    setAlert({
      message: `${res.message}`,
      variant: "error",
      closeable: true,
    });
  }
  setSigInloading("Sign in");
}
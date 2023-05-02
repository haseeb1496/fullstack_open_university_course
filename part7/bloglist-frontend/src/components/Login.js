const Login = ({ loginData, loginDataHandler, login }) => (
  <form onSubmit={login}>
    <div>
      username{" "}
      <input
        id="username"
        value={loginData.username}
        onChange={(evt) => loginDataHandler(evt.target.value, "username")}
      />
    </div>
    <div>
      password{" "}
      <input
        id="password"
        type="password"
        value={loginData.password}
        onChange={(evt) => loginDataHandler(evt.target.value, "password")}
      />
    </div>
    <button type="submit" id="loginBtn">
      login
    </button>
  </form>
);

export default Login;

import Footer from "./Footer";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button>Login</button>
      </form>
      <Footer />
    </>
  );
};

export default Login;

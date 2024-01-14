import Footer from "./Footer";

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <form>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="passwordConfirmation">Repeat Password</label>
        <input type="password" id="passwordConfirmation" />
        <p>Profile image</p>
        <input type="file" />
        <button type="submit">Register</button>
      </form>
      <Footer />
    </>
  );
};

export default Register;

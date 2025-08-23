import React from "react";

const Signup = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Full Name" /><br />
        <input type="email" placeholder="Email" /><br />
        <input type="password" placeholder="Password" /><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

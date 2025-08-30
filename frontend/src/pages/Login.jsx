import { useContext, useEffect } from "react";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendURL } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (currentState === "Sign Up") {
        res = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        res = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
        });
      }

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="email"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" ? (
          <p className="cursor-pointer">Forgot your Password?</p>
        ) : (
          ""
        )}
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer ml-auto"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer rounded ">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

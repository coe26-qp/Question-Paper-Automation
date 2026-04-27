import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ExternalLogin() {
  // const [tempUserId, setTempUserId] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("external");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await axios.post("/external-auth/login", {
  //       tempUserId,
  //       password,
  //     });

  //     // store token
  //     localStorage.setItem("externalToken", res.data.token);

  //     navigate("/dashboard");
  //   } catch (err) {
  //     setError(
  //       err.response?.data?.error || "Invalid credentials or expired access"
  //     );
  //   }
  // };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let res;

      if (loginType === "external") {
        res = await axios.post("/external-auth/login", {
          tempUserId: userId,
          password,
        });

        localStorage.setItem("externalToken", res.data.token);
        navigate("/dashboard");

      } else {
        res = await axios.post("/manual-faculty/login", {
          userId,
          password,
        });

        localStorage.setItem("manualFacultyToken", res.data.token);
        navigate("/faculty/dashboard");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          {loginType === "external"
            ? "External Faculty Login"
            : "Manual Faculty Login"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="flex justify-center mb-4 space-x-4">
          <button
            type="button"
            onClick={() => setLoginType("external")}
            className={`px-4 py-1 rounded ${loginType === "external"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
              }`}
          >
            External
          </button>

          <button
            type="button"
            onClick={() => setLoginType("manual")}
            className={`px-4 py-1 rounded ${loginType === "manual"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
              }`}
          >
            Manual
          </button>
        </div>

        <input
          type="text"
          // placeholder="Temporary User ID"
          placeholder={
            loginType === "external"
              ? "Temporary User ID"
              : "User ID"
          }
          className="border p-2 rounded w-full mb-3"
          value={userId}
          // onChange={(e) => setTempUserId(e.target.value)}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Temporary Password"
          className="border p-2 rounded w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

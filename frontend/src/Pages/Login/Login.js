import "./Login.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/AuthAPICalls";
import TokenService from "../../Services/AuthAPICalls";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // error for 3 seconds
  const handleSubmit = () => {
    login({ email, password }).then((response) => {
      if (response.status === 200) {
        TokenService.setToken(response.data.token);
        TokenService.setRole(response.data.role);
        response.data.role === "admin"
          ? navigate("/admin/products")
          : navigate("/");
      } else {
        setError(response);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="login">
      <Header />

      <div className="login-content">
        <div className="login-wrapper">
          <div className="login-title font-0">
            <h1>Login</h1>
          </div>

          <div className="login-inputs">
            <div className="login-email-wrapper">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="login-password-show-hide font-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>

            <div className="login-forgot-password-wrapper">
              Forgot your password?
            </div>

            {error && <div className="login-error">{error}</div>}
          </div>

          <div className="login-submit">
            <div
              className="button-wrapper login-button-wrapper"
              onClick={handleSubmit}
            >
              <div className="button-green">Log in</div>
            </div>
          </div>
        </div>

        <div
          className="login-create-acount"
          onClick={() => navigate("/profile/signup")}
        >
          Create account
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;

import "./Signup.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Services/AuthAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    verify_password: "",
  });
  const [infomessage, setInfoMessage] = useState();

  // error for 3 seconds
  const handleSubmit = () => {
    signup(user).then((response) => {
      if (response.status === 200) {
        setInfoMessage(response.data);
        setTimeout(() => {
          setInfoMessage("");
          navigate("/profile/login");
        }, 1000);
      } else {
        setError(response);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="signup">
      <Header />

      <div className="signup-content">
        {infomessage && <InfoMessage message={infomessage} type={"info"} />}

        <div className="signup-wrapper">
          <div className="signup-title font-0">
            <h1>Signup</h1>
          </div>

          <div className="signup-inputs">
            <div className="signup-name-wrapper">
              <div className="signup-first-name-wrapper signup-field-wrapper">
                <input
                  type="text"
                  placeholder="First Name"
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                />
              </div>
              <div className="signup-last-name-wrapper signup-field-wrapper">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="signup-email-wrapper signup-field-wrapper">
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="signup-phone-wrapper signup-field-wrapper">
              <input
                type="text"
                placeholder="Phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <div className="signup-password-wrapper signup-field-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              <div
                className="signup-password-show-hide font-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>

            <div className="signup-confirm-password-wrapper signup-field-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={user.verify_password}
                onChange={(e) =>
                  setUser({ ...user, verify_password: e.target.value })
                }
              />

              <div
                className="signup-password-show-hide font-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </div>
            </div>

            {error && <div className="signup-error">{error}</div>}
          </div>

          <div className="signup-submit">
            <div
              className="button-wrapper signup-button-wrapper"
              onClick={handleSubmit}
            >
              <div className="button-green">SignUp</div>
            </div>
          </div>
        </div>
        <div
          className="signup-have-acount"
          onClick={() => navigate("/profile/login")}
        >
          Already have an account? Log in
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;

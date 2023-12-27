import "./Signup.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  // error for 3 seconds
  const handleSubmit = () => {
    console.log(user, confirmPassword);
    setError("invalid email or password");
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <div className="signup">
      <Header />

      <div className="signup-content">
        <div className="signup-wrapper">
          <div className="signup-title font-0">
            <h1>Signup</h1>
          </div>

          <div className="signup-inputs">
            <div className="signup-name-wrapper">
              <div className="signup-first-name-wrapper signup-fieled-wrapper">
                <input
                  type="text"
                  placeholder="First Name"
                  value={user.firstName}
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div className="signup-last-name-wrapper signup-fieled-wrapper">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={user.lastName}
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="signup-email-wrapper signup-fieled-wrapper">
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="signup-phone-wrapper signup-fieled-wrapper">
              <input
                type="text"
                placeholder="Phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            {/* <div className="signup-address-wrapper">
              <div className="signup-address-country-governorate-city-wrapper">
                <div className="signup-address-country-wrapper  signup-fieled-wrapper">
                  <input type="text" placeholder="Country" />
                </div>

                <div className="signup-address-governorate-wrapper  signup-fieled-wrapper">
                  <input type="text" placeholder="Governorate" />
                </div>

                <div className="signup-address-city-wrapper  signup-fieled-wrapper">
                  <input type="text" placeholder="City" />
                </div>
              </div>

              <div className="signup-address-address-wrapper  signup-fieled-wrapper">
                <input type="text" placeholder="Street" />
              </div>
            </div> */}

            <div className="signup-password-wrapper signup-fieled-wrapper">
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

            <div className="signup-confirm-password-wrapper signup-fieled-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

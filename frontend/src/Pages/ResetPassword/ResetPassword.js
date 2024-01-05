import "./ResetPassword.css";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, resetPassword } from "../../Services/AuthAPICalls";
import InfoMessage from "../../components/Messages/InfoMessage";

function ResetPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timer, setTimer] = useState(300);

  const [otpSent, setOtpSent] = useState(false);

  const hsndleSendOtp = () => {
    setLoading(true);
    sendOtp(email).then((response) => {
      if (response.status === 200) {
        setOtpSent(true);
        startTimer();

        setInfoMessage(response.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      } else {
        setInfoMessage(response.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }

      setLoading(false);
    });
  };

  const handleResetPassword = () => {
    setLoading(true);
    resetPassword(otp, email, password, confirmPassword).then((response) => {
      if (response?.status === 200) {
        setInfoMessage(response.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);

        navigate("/profile/login");
      } else {
        setInfoMessage(response.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }

      setLoading(false);
    });
  };

  // Format seconds into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setOtpSent(false);
          console.log("otp expired");
          return prevTimer;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, 301000);
  };

  return (
    <div className="reset-password">
      <Header />

      <div className="reset-password-wrapper">
        {infomessage && (
          <InfoMessage
            message={infomessage}
            setMessage={setInfoMessage}
            type={infoMessageType}
          />
        )}
        {loading && (
          <div className="loader-wrapper">
            <div className="loader"></div>
          </div>
        )}

        <div className="reset-password-title font-0">
          <h1>Reset Password</h1>
          {otpSent && (
            <div className="reset-password-info">
              Otp sent to {email}, expires in {formatTime(timer)} seconds.
            </div>
          )}
        </div>

        {!otpSent && (
          <div className="reset-password-send-otp">
            <div className="reset-password-email-wrapper">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div
              className="button-wrapper reset-password-button-wrapper"
              onClick={hsndleSendOtp}
            >
              <div className="button-green">Send OTP</div>
            </div>
          </div>
        )}

        {otpSent && (
          <div className="reset-password-inputs">
            <div className="reset-password-otp-wrapper">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div className="reset-password-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="reset-password-show-hide font-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </div>
            </div>

            <div className="reset-password-password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div
                className="reset-password-show-hide font-5"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </div>
            </div>

            <div
              className="button-wrapper reset-password-button-wrapper"
              onClick={handleResetPassword}
            >
              <div className="button-green">Reset</div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ResetPassword;

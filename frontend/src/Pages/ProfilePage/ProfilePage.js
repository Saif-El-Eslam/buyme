import React, { useEffect, useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import "./ProfilePage.css";
import TokenService from "../../Services/AuthAPICalls";
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../Services/profileAPICalls";
import { useNavigate } from "react-router-dom";
import InfoMessage from "../../components/Messages/InfoMessage";

function ProfilePage() {
  const navigate = useNavigate();
  const [infomessage, setInfoMessage] = useState();
  const [infoMessageType, setInfoMessageType] = useState();
  const [loading, setLoading] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [tab, setTab] = useState(screenWidth > 850 ? "info" : "");
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: {},
    payment_method: {
      payment_type: "",
      card_details: {},
    },
  });

  useEffect(() => {
    setLoading(true);

    // redirect to login if not logged in
    if (!TokenService.getToken()) {
      navigate("/profile/login");
    }

    // get profile info
    getProfile().then((response) => {
      if (response?.status === 200) {
        setUser({
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          address: response.data.address || null,
          payment_method: {
            payment_type: response.data.payment_method?.payment_type || "",
            card_details: response.data.payment_method?.card_details || null,
          },
        });

        setLoading(false);
      } else {
        setInfoMessage(response?.data.message);
        setInfoMessageType("error");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateInfo = () => {
    setLoading(true);
    updateProfile(user).then((res) => {
      if (res.status === 200) {
        setInfoMessage(res.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      } else {
        setInfoMessage(res.data.message);
        setInfoMessageType("error");

        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  };

  const handleUpdatePassword = () => {
    setLoading(true);
    changePassword(updatePassword).then((res) => {
      if (res.status === 200) {
        setUpdatePassword({
          oldPassword: "",
          newPassword: "",
        }); // clear password fields
        setInfoMessage(res.data.message);
        setInfoMessageType("info");
        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      } else {
        setInfoMessage(res.data.message);
        setInfoMessageType("error");

        setTimeout(() => {
          setInfoMessage("");
          setInfoMessageType("");
        }, 3000);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    // handle screen size
    const handleResize = () => {
      setScreenWidth(window.innerWidth);

      if (window.innerWidth > 850) {
        setTab("info");
      } else {
        setTab("");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-content">
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

        <div className="profile-header font-0">
          <h1 className="profile-header-title">Profile</h1>
        </div>

        <div className="profile-info-wrapper font-5">
          {screenWidth > 850 && (
            <div className="profile-tabs">
              <div
                className={
                  "profile-tab" +
                  (tab === "info" ? " profile-tab-selected" : "")
                }
                onClick={() => setTab("info")}
              >
                Info
              </div>
              {TokenService.getRole() !== "admin" && (
                <div
                  className={
                    "profile-tab" +
                    (tab === "address" ? " profile-tab-selected" : "")
                  }
                  onClick={() => setTab("address")}
                >
                  Address
                </div>
              )}
              {TokenService.getRole() !== "admin" && (
                <div
                  className={
                    "profile-tab" +
                    (tab === "payment" ? " profile-tab-selected" : "")
                  }
                  onClick={() => setTab("payment")}
                >
                  Payment Info
                </div>
              )}
            </div>
          )}

          {(tab === "info" || screenWidth < 850) && (
            <div className="profile-info">
              <div className="profile-info-section">
                {screenWidth < 850 && (
                  <div
                    className="profile-section-header"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <div className="profile-section-header-title">Info</div>
                    <div className="profile-section-header-arrow">
                      <img src="/arrow-right-black.png" alt="arrow" />
                    </div>
                  </div>
                )}

                {(showInfo || tab === "info") && (
                  <div className="profile-info-section-content profile-tab-details">
                    <div className="profile-info-section-name">
                      <div className="profile-info-section-title font-3">
                        Name
                      </div>
                      <div className="profile-info-section-content-name-wrapper">
                        <div className="profile-info-section-content-name-first profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={user.first_name}
                            onChange={(e) =>
                              setUser({ ...user, first_name: e.target.value })
                            }
                          />
                        </div>
                        <div className="profile-info-section-content-name-last profile-field-wrapper">
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
                    </div>

                    <div className="profile-info-section-email">
                      <div className="profile-info-section-title">Email</div>
                      <div className="profile-info-section-content">
                        <div className="profile-info-section-content-email profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="Email"
                            value={user.email}
                            onChange={(e) =>
                              setUser({ ...user, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-section-phone">
                      <div className="profile-info-section-title">Phone</div>
                      <div className="profile-info-section-content-phone profile-field-wrapper">
                        <input
                          type="text"
                          placeholder="Phone"
                          value={user.phone}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="profile-info-section profile-info-update-info-button">
                      <div className="profile-info-section-button">
                        <div
                          className="button-wrapper"
                          onClick={handleUpdateInfo}
                        >
                          <div className="button-green">Update Info</div>
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-section-passwords">
                      <div
                        className={
                          "profile-info-section-title-password " +
                          (showUpdatePassword
                            ? "profile-info-section-title-password-clicked"
                            : "")
                        }
                        onClick={() =>
                          setShowUpdatePassword(!showUpdatePassword)
                        }
                      >
                        Update Password
                      </div>
                      {showUpdatePassword && (
                        <div className="profile-info-section-content">
                          <div className="profile-info-section-content-password">
                            <div className="profile-info-section-content-old-password profile-field-wrapper">
                              <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Old Password"
                                value={updatePassword.oldPassword}
                                onChange={(e) =>
                                  setUpdatePassword({
                                    ...updatePassword,
                                    oldPassword: e.target.value,
                                  })
                                }
                              />

                              <div className="profile-info-section-content-password-show">
                                <div
                                  className="profile-info-section-content-password-show-button"
                                  onClick={() =>
                                    setShowOldPassword(!showOldPassword)
                                  }
                                >
                                  {showOldPassword ? "Hide" : "Show"}
                                </div>
                              </div>
                            </div>

                            <div className="profile-info-section-content-new-password profile-field-wrapper">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={updatePassword.newPassword}
                                onChange={(e) =>
                                  setUpdatePassword({
                                    ...updatePassword,
                                    newPassword: e.target.value,
                                  })
                                }
                              />

                              <div className="profile-info-section-content-password-show">
                                <div
                                  className="profile-info-section-content-password-show-button"
                                  onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                >
                                  {showNewPassword ? "Hide" : "Show"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="profile-info-section-password-button">
                            <div
                              className="button-wrapper"
                              onClick={handleUpdatePassword}
                            >
                              <div className="button-green">
                                Update Password
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {screenWidth < 850 && <div className="line-separator"></div>}

          {(tab === "address" || screenWidth < 850) && (
            <div className="profile-address">
              {screenWidth < 850 && (
                <div
                  className="profile-section-header"
                  onClick={() => setShowAddress(!showAddress)}
                >
                  <div className="profile-section-header-title">Address</div>
                  <div className="profile-section-header-arrow">
                    <img src="/arrow-right-black.png" alt="arrow" />
                  </div>
                </div>
              )}

              {(showAddress || tab === "address") && (
                <div className="profile-address-section profile-tab-details">
                  {/* <div className="profile-address-section-title">Address</div> */}
                  <div className="profile-address-section-content">
                    <div className="profile-address-section-country-governorate-city">
                      <div className="profile-address-section-country">
                        <div className="profile-address-section-sub-title">
                          Country
                        </div>

                        <div className="profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="Country"
                            value={user.address?.country}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  country: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="profile-address-section-governorate">
                        <div className="profile-address-section-sub-title">
                          Governorate
                        </div>

                        <div className="profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="Governorate"
                            value={user.address?.governorate}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  governorate: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="profile-address-section-city">
                        <div className="profile-address-section-sub-title">
                          City
                        </div>

                        <div className="profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="City"
                            value={user.address?.city}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                address: {
                                  ...user.address,
                                  city: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="profile-address-section-street">
                      <div className="profile-address-section-sub-title">
                        Street
                      </div>

                      <div className="profile-field-wrapper">
                        <input
                          type="text"
                          placeholder="Street"
                          value={user.address?.street}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              address: {
                                ...user.address,
                                street: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="profile-address-section-notes">
                      <div className="profile-address-section-sub-title">
                        Notes
                      </div>

                      <div className="profile-field-wrapper">
                        <input
                          type="text"
                          placeholder="Notes"
                          value={user.address?.notes}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              address: {
                                ...user.address,
                                notes: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-address-section-button">
                    <div className="button-wrapper" onClick={handleUpdateInfo}>
                      <div className="button-green">Update Address</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {screenWidth < 850 && <div className="line-separator"></div>}

          {(tab === "payment" || screenWidth < 850) && (
            <div className="profile-payment">
              {screenWidth < 850 && (
                <div
                  className="profile-section-header"
                  onClick={() => setShowPayment(!showPayment)}
                >
                  <div className="profile-section-header-title">Payment</div>
                  <div className="profile-section-header-arrow">
                    <img src="/arrow-right-black.png" alt="arrow" />
                  </div>
                </div>
              )}

              {(showPayment || tab === "payment") && (
                <div className="profile-payment-section profile-tab-details">
                  {/* <div className="profile-payment-section-title">
                  Payment Information
                </div> */}
                  <div className="profile-payment-section-content">
                    <div className="profile-payment-section-payment-type">
                      <div className="profile-payment-section-sub-title">
                        Payment Type
                      </div>

                      <div className="profile-payment-field-wrapper">
                        <div className="profile-payment-section-payment-type-wrapper">
                          <div className="profile-payment-section-payment-type-cash">
                            <div className="selector-circle">
                              <div className="selector-circle-selected"></div>
                            </div>

                            <div className="profile-payment-section-payment-type-cash-text">
                              Cash
                            </div>
                          </div>
                        </div>

                        <div className="profile-payment-section-payment-type-wrapper">
                          <div className="profile-payment-section-payment-type-card">
                            <div className="selector-circle"></div>

                            <div className="profile-payment-section-payment-type-card-text">
                              Card{" "}
                              <span className="profile-payment-section-payment-type-card-text-sub">
                                (Coming Soon)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="profile-payment-section-card-number">
                      <div className="profile-payment-section-sub-title">
                        Card Number
                      </div>

                      <div className="profile-field-wrapper">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={user.payment_method?.card_number}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              payment_method: {
                                ...user.payment_method,
                                card_number: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="profile-payment-section-date-cvv">
                      <div className="profile-payment-section-expiry-date">
                        <div className="profile-payment-section-sub-title">
                          Expiry Date
                        </div>

                        <div className="profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="Expiry Date"
                            value={user.payment_method?.expiry_date}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                payment_method: {
                                  ...user.payment_method,
                                  expiry_date: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="profile-payment-section-cvv">
                        <div className="profile-payment-section-sub-title">
                          CVV
                        </div>

                        <div className="profile-field-wrapper">
                          <input
                            type="text"
                            placeholder="CVV"
                            value={user.payment_method?.cvv}
                            onChange={(e) =>
                              setUser({
                                ...user,
                                payment_method: {
                                  ...user.payment_method,
                                  cvv: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div> 

                    <div className="profile-payment-section-notes">
                      <div className="profile-payment-section-sub-title">
                        Notes
                      </div>

                      <div className="profile-field-wrapper">
                        <input
                          type="text"
                          placeholder="Notes"
                          value={user.payment_method?.notes}
                          onChange={(e) =>
                            setUser({
                              ...user,
                              payment_method: {
                                ...user.payment_method,
                                notes: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>*/}
                  </div>

                  {/* <div className="profile-payment-section-button">
                    <div className="button-wrapper" onClick={handleUpdateInfo}>
                      <div className="button-green">Update Payment</div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;

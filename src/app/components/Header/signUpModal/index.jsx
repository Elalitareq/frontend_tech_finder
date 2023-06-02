"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SignUpStyle from "./SignUp.module.css";
import { api } from "../../../lib/axios";
import { Toaster, toast } from "react-hot-toast";

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = useState("");

  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("user"); // Default role is "customer"
  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const errors = [];

    if (!passwordRegex.test(password)) {
      if (password.length > 1 && password.length < 8) {
        errors.push("minimum 8 characters");
      } else {
        if (!/\d/.test(password)) {
          errors.push("1 number");
        }

        if (!/(?=.*[a-z])/.test(password)) {
          errors.push("1 lowercase letter");
        }

        if (!/(?=.*[A-Z])/.test(password)) {
          errors.push("1 uppercase letter");
        }

        if (!/(?=.*[!@#$%^&*])/.test(password)) {
          errors.push("1 special character");
        }
      }

      setPasswordErrorMessage(`Password should have: ${errors.join(", ")}.`);
      return false;
    }
    setPasswordErrorMessage("");
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }
    if (
      confirmErrorMessage ||
      passwordErrorMessage ||
      emailErrorMessage ||
      firstNameErrorMessage ||
      lastNameErrorMessage
    ) {
      return;
    }
    try {
      const response = await api.post(`/user/register`, {
        email,
        password,
        firstName,
        lastName,
        role,
        dob,
      });

      if (response.status === 201) {
        toast.success("Successfully registered you can now login")
        handleCloseModal();

      } else {
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const emptyErrors = () => {
    setConfirmErrorMessage("");
    setPasswordErrorMessage("");
    setEmailErrorMessage("");
    setFirstNameErrorMessage("");
    setLastNameErrorMessage("");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains(SignUpStyle.modal)) {
        handleCloseModal();
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseModal = () => {
    emptyErrors();
    setShowSignUpModal(false);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const validateConfirmPassword = () => {
    if (password !== confirmedPassword) {
      return setConfirmErrorMessage("Password is different than confirmed");
    }
    setConfirmErrorMessage("");
    return true;
  };
  const validateLastName = () => {
    if (lastName.length < 3) {
      setLastNameErrorMessage("Last Name must be at least 3 characters long");
      return false;
    } else if (!lastName.trim()) {
      setLastNameErrorMessage("Last Name is required");
      return false;
    }
    setLastNameErrorMessage("");
    return true;
  };

  const validateEmail = () => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailErrorMessage("Invalid email format");
      return false;
    }
    setEmailErrorMessage("");
    return true;
  };

  return (
    <>
      <button
        className="bg-accent hover:bg-accent-light text-gray-100 px-4 py-2 rounded mr-3 text-xl transition-colors duration-300"
        onClick={handleSignUpClick}
      >
        Sign Up
      </button>
      {showSignUpModal && (
        <div className={SignUpStyle.modal}>
          <form onSubmit={handleSignUp} className={SignUpStyle.modalContent}>
            <span
              className={SignUpStyle.closeButton}
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <h2>Sign Up</h2>
            <div className={SignUpStyle.inputContainer}>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value.length < 3) {
                      setFirstNameErrorMessage(
                        "First Name must be at least 3 characters long"
                      );
                    } else if (!e.target.value.trim()) {
                      setFirstNameErrorMessage("First Name is required");
                    } else {
                      setFirstNameErrorMessage("");
                    }
                  }}
                />
                {firstNameErrorMessage && (
                  <span className={SignUpStyle.error}>
                    {firstNameErrorMessage}
                  </span>
                )}
              </div>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  onBlur={validateLastName}
                />
                {lastNameErrorMessage && (
                  <span className={SignUpStyle.error}>
                    {lastNameErrorMessage}
                  </span>
                )}
              </div>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="dob">Date Of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                {emailErrorMessage && (
                  <span className={SignUpStyle.error}>{emailErrorMessage}</span>
                )}
              </div>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="role">Role:</label>
                <div className={SignUpStyle.radioContainer}>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={handleRoleChange}
                    />
                    Customer
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="technician"
                      checked={role === "technician"}
                      onChange={handleRoleChange}
                    />
                    Technician
                  </label>
                </div>
              </div>
              <div className={SignUpStyle.formControl}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => validatePassword()}
                />
                {passwordErrorMessage && (
                  <span className={SignUpStyle.error}>
                    {passwordErrorMessage}
                  </span>
                )}
              </div>

              <div className={SignUpStyle.formControl}>
                <label htmlFor="passwordConfirmation">Confirm Password:</label>
                <input
                  type="password"
                  name="passwordConfirmation"
                  onChange={(e) => {
                    if (e.target.value === password) {
                      setConfirmErrorMessage("");
                    }
                    setConfirmedPassword(e.target.value);
                  }}
                  onBlur={(e) => validateConfirmPassword()}
                />
                {confirmErrorMessage && (
                  <span className={SignUpStyle.error}>
                    {confirmErrorMessage}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              name="signUp"
              className={SignUpStyle.submitButton}
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
      <Toaster/>
    </>
  );
};
export default SignUpModal;

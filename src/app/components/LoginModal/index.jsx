import { signIn } from "next-auth/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import loginModalStyle from "./loginModal.module.css";
import {toast,Toaster} from "react-hot-toast"

function LoginModalForm(props) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  

  return (
    <>
      <form
        onSubmit={(e) =>
          props.handleLogin(e, emailRef.current, passwordRef.current)
        }
        className={loginModalStyle.modalContent}
      >
        <span
          className={loginModalStyle.closeButton}
          onClick={props.handleCloseModal}
        >
          &times;
        </span>
        <h2>Login</h2>
        <div className={loginModalStyle.formControl}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => (emailRef.current = e.target.value)}
          />
        </div>
        <div className={loginModalStyle.formControl}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => (passwordRef.current = e.target.value)}
          />
        </div>
        <button
          type="submit"
          name="login"
          className={loginModalStyle.submitButton}
        >
          Login
        </button>
      </form>
    </>
  );
}

const LoginModal = ({ showLoginModal, handleCloseModal }) => {
  const router = useRouter()
  const handleLogin = async (e, email, password) => {
    e.preventDefault();

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then(({ok,error}) => {
       if(error){
         toast.error("Wrong Credentials")
       }else{
        handleCloseModal()
       }
    })
    } 
  
  const handleClickOutside = (event) => {
    if (event.target.closest(`.${loginModalStyle.modalContent}`)) {
      return;
    }
    if (showLoginModal) handleCloseModal();
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLoginModal]);
  return (
    <>
      {showLoginModal && (
        <div className={loginModalStyle.modal}>
          <LoginModalForm
            handleLogin={handleLogin}
            handleCloseModal={handleCloseModal}
          ></LoginModalForm>
          <Toaster/>
        </div>
      )}
    </>
  );
};


export default LoginModal;
export { LoginModalForm };
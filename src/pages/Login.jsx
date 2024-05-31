import React from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login.png";
import GoogleIcon from "../assets/images/googleIcon.png";
import Loadar from "../components/Loadar";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo,getAuth } from 'firebase/auth'
import {auth} from '../config/firebase'

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const provider = new GoogleAuthProvider()

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      alert("Email and password cannot be empty");
      return;
    } else {
      setLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        if (user.emailVerified) {
          localStorage.setItem('user', JSON.stringify(user))
          alert('Login successfull')
          setEmail('')
          setPassword('')
          window.location.href = '/'
        }
        else {
          alert('Please verify your email')
        }
      } catch (error) {
        console.log(error)
        alert('Error signing in')
      } finally {
        setLoading(false);
      }
    }
  };

  
  const handleGoogleAuth = async () => {
    const auth = getAuth()
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const {isNewUser} = getAdditionalUserInfo(result)
      if (isNewUser) {
        // await addDoc(usersRef, {
        //   name: user.displayName,
        //   email: user.email,
        //   uid: user.uid,
        //   createdAt: new Date().toISOString(),
        //   avatar: 0
        // })
      }
      localStorage.setItem('user', JSON.stringify(user))
      // toast.success('Login successfull')
      window.location.href = '/'
    } catch (error) {
      console.log(error)
      // toast.error('Error signing in')
    }
    finally {
      setLoading(false)
    }
    
  }

  return (
    <div className="p-4 sm:ml-64">

    <div className=" w-full mt-14 gap-4 col-span-2 h-full shadow-lg mr-5">
      <div
        className=" overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          height: "100vh",
          paddingBottom: "250px",
        }}
      >
        <div className="flex justify-center">
          <img
            src={loginImage}
            alt="confession"
            className="rounded-lg "
            width="auto"
            height="auto"
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* // signin form */}

          <input
            type="text"
            placeholder="Email"
            className={`w-full  p-4 border-2 border-gray-300 rounded-lg`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-4 border-2   border-gray-300 rounded-lg`}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="text-center">
            Don't have an account?
            <Link to="/signup" className="text-blue-500">
              {" "}
              Sign Up
            </Link>
          </p>

          {loading ? (
            <Loadar /> 
          ) : (
            <button
              className="p-2 bg-blue-500 text-white rounded-lg"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}

          <h3 className="text-center">Or</h3>
          <div className="flex justify-center gap-4">
            <img
              src={GoogleIcon}
              alt="google"
              onClick={handleGoogleAuth}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

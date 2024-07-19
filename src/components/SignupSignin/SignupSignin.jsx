import React from 'react'
import "./SignupSignin.css"
import Input from "../input/Input"
import Button from "../Button/Button"
import { useState } from 'react'
import {createUserWithEmailAndPassword , signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth , db , provider} from "../../firebase"
import { doc, setDoc , getDoc} from "firebase/firestore"; 
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
const SignupSignin = () => {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const [loginform , setLoginform] =useState(true)
    const navigate = useNavigate()

    const signupWithEmail =()=>{
      setLoading(true)
        console.log("name",name);
        console.log("email",email);
        console.log("password",password);
        console.log("nconfirmPassword",confirmPassword);

        //Authentication with email and password
        if(name!="" && email!="" && password!="" && confirmPassword!=""){
          if(password==confirmPassword){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed up 
              const user = userCredential.user;
              console.log("user>>>", user)
              toast.success("User Created")
              setLoading(false)
              setName("")
              setEmail("")
              setPassword("")
              setConfirmPassword("")
              createDoc(user)
              navigate("/dashboard")
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage)
              setLoading(false)
              // ..
            });
  
          }else{
            toast.error("Password and Confirm Password dosn't match")
            setLoading(false)
          }
          

          }else{
            toast.error("All fields are mandatory")
            setLoading(false)
          }
          

        

    }


    async function createDoc(user){
      // cfreate doc
        setLoading(true)
      if(!user) return;

      const useRef = doc(db, "users" , user.uid)
      const userData = await getDoc(useRef);

      if(!userData.exists()){
        try{
          await setDoc(doc(db, "users", user.uid), {name:user.displayName ? user.displayName : name ,
            email:user.email,
            photoUrl: user.photoUrl ? user.photoUrl:"",
            createdAt: new Date(),
          });
          toast.success("Doc created")
          setLoading(false)
        } catch (e){
          toast.error(e.message)
        }
        }else{
          toast.error("Doc Already exist")
          setLoading(false)
        }

      }



    function loginUsingEmail(){
          console.log(email,password);
          setLoading(true)
          if(email!="" && password!="" && confirmPassword!=""){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
           // Signed in 
           const user = userCredential.user;
          
           toast.success("User Logged In" , user)
           createDoc(user)
           console.log("user loged in", user);
           navigate("/dashboard")
           setLoading(false)
           // ...
         })
         .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           toast.error(errorMessage)
           setLoading(false)
         });
           }else{
            toast.error("All Fields are Mendatory")
            setLoading(false)
           }
   }
      


   function googleAuth(){
      setLoading(true)

      try{

        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>",user);
          createDoc(user)
          setLoading(false)
          navigate("/dashboard")
          toast.success("User Authenticated")
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
        });

      }catch(e){
        setLoading(false)
        toast.error(e.message)
        
      }
   }



  return (
    <>
    {loginform ? <>
      <div className='signup-wrapper'>
        <h2 className='title'>Login on <span style={{color:"var(--theme)"}}>Finance-Tracker</span></h2>

        <form>
            
            <Input label={"Email"} 
            state={email} 
            setState={setEmail} 
            type="email"
            placeholder={"JohnDoe@gmail.com"}
            />

            <Input label={"Password"}
            type="password" 
            state={password} 
            setState={setPassword} 
            placeholder={"Example@123"}
            />

            <Input label={"Confirm Password"} 
            type="password"
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder={"Example@123"}
            />

            <Button 
            disabled={loading}
            text={loading ? "Loading..." :"Login using Email and Password"}
              onclick={loginUsingEmail}
            />

            <p style={{margin:"0", textAlign:"center"}}>or</p>
            
            <Button text={loading ? "Loading...": "Login using Google"} blue={true}
              onclick={googleAuth}
            />

            <p className='p-login' onClick={()=>setLoginform(false)}>Or Don't Have An Account? Click Here</p>

        </form>

    </div>

    </> : <>
      <div className='signup-wrapper'>
        <h2 className='title'>Signup on <span style={{color:"var(--theme)"}}>Finance-Tracker</span></h2>

        <form>
            <Input label={"Full Name"} 
            state={name} 
            setState={setName} 
            placeholder={"John Doe"}               
            />
            
            <Input label={"Email"} 
            state={email} 
            setState={setEmail} 
            type="email"
            placeholder={"JohnDoe@gmail.com"}
            />

            <Input label={"Password"}
            type="password" 
            state={password} 
            setState={setPassword} 
            placeholder={"Example@123"}
            />

            <Input label={"Confirm Password"} 
            type="password"
            state={confirmPassword} 
            setState={setConfirmPassword} 
            placeholder={"Example@123"}
            />

            <Button 
            disabled={loading}
            text={loading ? "Loading..." :"Signup using Email and Password"}
              onclick={signupWithEmail}
            />

            <p style={{margin:"0", textAlign:"center"}}>or</p>
            
            <Button 
            onclick={googleAuth}
            text={loading ? "Loading...": "Signup using Google"} blue={true}/>

            <p className='p-login' onClick={()=>setLoginform(true)} >Or Have An Account Already? Click Here</p>

        </form>

    </div>

    </>
      
     }
    </>
  )
}

export default SignupSignin
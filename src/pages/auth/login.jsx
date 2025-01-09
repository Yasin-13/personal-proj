import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-amber-200 rounded-3xl  via-amber-100 to-yellow-200 animate-gradient-x">
      <div className="mx-auto w-full max-w-md space-y-8 bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border border-amber-300">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-amber-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-xl font-semibold text-amber-600 mb-6">
            Sign in to your account
          </p>
          <div className="relative">
            
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-amber-500">Or</span>
            </div>
          </div>
          <p className="mt-6 text-amber-700">
            Don't have an account?
            <Link
              className="font-bold ml-2 text-amber-500 hover:text-amber-700 hover:underline transition-colors duration-200"
              to="/auth/register"
            >
              Register Now
            </Link>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText="Sign In"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          className="space-y-6"
          inputClassName="w-full px-4 py-3 rounded-lg bg-amber-50 border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-900 placeholder-amber-400 transition-all duration-200"
          buttonClassName="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:-translate-y-1 hover:shadow-lg"
        />
      </div>
    </div>
  );
}

export default AuthLogin;


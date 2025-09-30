import React, { useState } from "react";
import WelcomeHeader from "../../components/WelcomeHeader";
import InputField from "../../components/InputField";
import SocialLoginButton from "../../components/SocialLoginButton";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { validateField } from "../../utils/validation";

interface LoginFormProps {
  onLogin: (token: string) => void;
}

const LoginForm = ({onLogin}: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    submit: "",
  });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev, submit: "" }));
    setLoading(true);

    const newErrors = {
      username: validateField("username", formData.username),
      email: formData.email ? validateField("email", formData.email) : "",
      password: validateField("password", formData.password),
    };

    if (newErrors.username || newErrors.email || newErrors.password) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    try {
      const data = await loginUser(formData);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          profilePic: data.image,
          gender: data.gender,
        })
      );
      onLogin(data.accessToken);
      navigate("/home");
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Something went wrong",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f4f4f4] flex flex-col lg:flex-row justify-center items-center lg:items-stretch lg:justify-between min-h-screen min-w-screen p-4 sm:p-8 lg:p-15 gap-8">
      <img
        src="/assets/illustration.webp"
        alt="Login illustration"
        width={500}
        height={500}
        loading="lazy"
        className="w-3xs sm:w-2xs lg:w-sm lg:h-sm 2xl:w-lg h-lg lg:my-auto"
      />
      <div className="flex flex-col gap-5 2xl:gap-7 p-8 2xl:p-10 w-full lg:w-[630px] 2xl:w-3xl bg-white border border-[#E2E2E2] rounded-3xl">
        <WelcomeHeader />
        <div className="space-y-4">
          <SocialLoginButton
            icon="/assets/google.svg"
            label="Login with Google"
          />
          <SocialLoginButton
            icon="/assets/facebook.svg"
            label="Login with Facebook"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#BFBFBF]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-10 bg-white ">OR</span>
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            label="User name"
            required
            icon="/assets/user-icon.svg"
            error={errors.username}
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            label="Email"
            icon="/assets/mail-icon.svg"
            error={errors.email}
          />
          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            label="Password"
            required
            icon="/assets/password-key-icon.svg"
            error={errors.password}
            rightIcon={
              <img
                src={showPassword ? "/assets/password-hide-icon.svg" : "/assets/password-show-icon.svg"}
                alt="toggle password"
                className="w-5 h-5"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            }
          />
          <div className="flex justify-between items-center py-3 2xl:py-4">
            <div>
              <input type="checkbox" id="remember" className="w-3 h-3 2xl:w-4 2xl:h-4 mr-2" />
              <label htmlFor="remember" className="text-sm 2xl:text-base">Remember me</label>
            </div>
            <div className="text-[#6358DC] cursor-pointer text-sm 2xl:text-base">
              Forgot Password?
            </div>
          </div>
          {errors.submit && (
            <p className="text-red-500 text-xs 2xl:text-sm mt-2">{errors.submit}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 2xl:py-6.5 bg-[#6358DC] font-bold text-white rounded-2xl text-sm 2xl:text-base transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#4f46e5] cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center text-sm 2xl:text-base">
          Don’t have an account?{" "}
          <span className="text-[#6358DC]">Register</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      if (response.status === 200) {
        const { token, user } = response.data;

        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`Login time with token: ${authToken}`);

          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (err) {
      setError("root.random", {
        type: "random",
        message: `User is not found with email ${formData.email}`,
      });
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required." })}
          className="auth-input"
          name="email"
          type="email"
          id="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", { required: "Password is required." })}
          className="auth-input"
          name="password"
          type="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random.message}</p>
      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;

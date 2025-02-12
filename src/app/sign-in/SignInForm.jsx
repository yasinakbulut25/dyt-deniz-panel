import { useState } from "react";
import SubmitButton from "@/components/form/SubmitButton";
import InputField from "@/components/form/InputField";
import { EyeIcon, EyeSlashIcon } from "@/icons";
import Chip from "@/components/chip";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "@/store/actionCreators";
import SELECTORS from "@/store/selectors";

function SignInForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });

  const isLoading = useSelector(SELECTORS.getUserLoading);
  const error = useSelector(SELECTORS.getUserError);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const [formErrors, setFormErrors] = useState({
    user: false,
    password: false,
  });

  const validateField = () => {
    const errors = {};

    errors.user = !formData.user.trim();
    errors.password = !formData.password.trim();

    setFormErrors(errors);

    return !Object.values(errors).some((error) => error);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
    setFormErrors({ ...formErrors, [input]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateField()) return;

    dispatch(signInRequest(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <InputField
          type="text"
          label="Admin"
          placeholder="Kullanıcı adınızı giriniz.."
          errorMessage="Lütfen geçerli değer giriniz!"
          onChange={handleChange("user")}
          value={formData.user}
          isInvalid={formErrors.user}
        />
        <InputField
          type={`${showPassword ? "text" : "password"}`}
          label="Şifre"
          placeholder="Şifrenizi giriniz.."
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleShowPassword}
              aria-label="toggle password visibility"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-4 h-auto cursor-pointer" />
              ) : (
                <EyeIcon className="w-4 h-auto cursor-pointer" />
              )}
            </button>
          }
          onChange={handleChange("password")}
          errorMessage="Lütfen geçerli değer giriniz!"
          value={formData.password}
          isInvalid={formErrors.password}
        />
      </div>

      {error && (
        <Chip
          className="p-2 min-w-full max-w-full"
          item={{ type: "error", value: error }}
        />
      )}

      <SubmitButton isLoading={isLoading}>Giriş Yap</SubmitButton>
    </form>
  );
}

export default SignInForm;

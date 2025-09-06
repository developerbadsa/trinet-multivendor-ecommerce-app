// import crypto from "crypto";
import { ValidationError } from "../../../../packages/error-handler";

export const validateRegistrationData = (
  data: any,
  userType: "user" | "seller"
) => {
  // const emailRegex ="/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

  const { name, email, password, phone_number, country } = data;

  if(!name || !email || !password || !phone_number || !country) {
    return new ValidationError("missing required fields");
};

return null;



}

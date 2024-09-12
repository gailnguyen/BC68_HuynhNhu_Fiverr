import React from "react";
import registerAnimation from "./../../assets/animation/registerAnimation.json";
import { useLottie } from "lottie-react";
import { Form } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  const options = {
    animationData: registerAnimation,

    loop: true,
  };
  const { View } = useLottie(options);

  return (
    <div className="container">
      <div className="grid grid-cols-2 items-center justify-between gap-5">
        <div>{View}</div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

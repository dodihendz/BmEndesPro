import AuthLayout from "@/components/layouts/AuthLayout";
import BButton from "@/components/uui/button";
import IInput from "@/components/uui/input";
import Radio from "@/components/uui/radio";
import authServices from "@/pages/routes/auth";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      name: form.user.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      gender: form.gender.value,
    };
    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        setError("email is already exists !");
      }
    } catch (err) {
      setIsLoading(false);
      setError("email is already exists !");
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div>
        <AuthLayout
          title="Sign Up"
          link="/auth/login"
          linktext="do you already have account sign in"
          error={error}
          callbackUrl={callbackUrl}
        >
          <form onSubmit={handleSignUp}>
            <IInput
              icon="bxs-user-circle"
              label="UserName"
              name="user"
              type="text"
              placeholder="what is your name?"
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
              required
            />
            <Radio icon="bx-male-female" label="Gender" name="gender">
              {/* <input
                name="gender"
                type="radio"
                value="male"
                id="male"
                className="p-[10px] outline-none rounded-[5px] cursor-pointer"
              />
              <label htmlFor="male" className="mt-[5px] mb-1 cursor-pointer">
                Man
              </label> */}
              <label
                htmlFor="male"
                className="flex items-center cursor-pointer"
              >
                <input
                  name="gender"
                  type="radio"
                  value="male"
                  id="male"
                  className="cursor-pointer"
                />
                <span className="ml-2">Man</span>
              </label>
              {/* <input
                name="gender"
                type="radio"
                value="female"
                id="female"
                className="p-[10px] outline-none rounded-[5px] cursor-pointer"
              />
              <label htmlFor="female" className="mt-[5px] mb-1 cursor-pointer">
                Woman
              </label> */}
              <label
                htmlFor="female"
                className="flex items-center cursor-pointer"
              >
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  id="female"
                  className="cursor-pointer"
                />
                <span className="ml-2">Woman</span>
              </label>
            </Radio>
            <IInput
              icon="bxs-user-circle"
              label="Email"
              name="email"
              type="email"
              placeholder="email@email.com"
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
              required
            />
            <IInput
              icon="bx-lock-alt"
              label="Password"
              name="password"
              type="password"
              placeholder="* * * * * * * * "
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
              required
            />
            <IInput
              icon="bx bxs-phone"
              label="Phone"
              name="phone"
              type="number"
              placeholder="your mobile number"
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
            />
            <BButton
              type="submit"
              className="w-full uppercase py-[15px] bg-slate-800 mt-5 text-white flex justify-center items-center rounded-[50px]  "
            >
              {isLoading ? "isLoading...!" : "Sign Up"}
            </BButton>
          </form>
        </AuthLayout>
      </div>
    </>
  );
};

export default RegisterView;

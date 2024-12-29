import AuthLayout from "@/components/layouts/AuthLayout";
import BButton from "@/components/uui/button";
import IInput from "@/components/uui/input";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    try {
      const credential = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!credential?.error) {
        // console.log(query.callbackUrl)
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setIsError("email or passwrod incorrect");
      }
    } catch (err) {
      setIsLoading(false);
      setIsError("email or passwrod incorrect");
    }
  };
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div>
        <AuthLayout
          title="Sign In"
          link="/auth/register"
          linktext="don't have an account sign up"
          error={isError}
          callbackUrl={callbackUrl}
        >
          <form onSubmit={handleSubmit}>
            <IInput
              icon="bxs-user-circle"
              label="Email"
              name="email"
              type="email"
              placeholder="email@email.com"
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
            />
            <IInput
              icon="bx-lock-alt"
              label="Password"
              name="password"
              type="password"
              placeholder="* * * * * * * * "
              className="mt-1"
              classNamei="bg-transparent border-b-2 border-slate-900"
            />
            <BButton
              type="submit"
              className="w-full uppercase py-[15px] bg-slate-800 mt-5 text-white flex justify-center items-center rounded-[50px]  "
            >
              {isLoading ? "isLoading ..!" : "sign In"}
            </BButton>
          </form>
        </AuthLayout>
      </div>
    </>
  );
};

export default LoginView;

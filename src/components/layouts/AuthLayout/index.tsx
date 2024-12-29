import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Proptypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linktext?: string;
  error?: string;
  callbackUrl?: any;
};
const AuthLayout = (props: Proptypes) => {
  const { push } = useRouter();
  const { title, children, link, linktext, error, callbackUrl } = props;

  const handlegoogle = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const result = await signIn("google", { callbackUrl, redirect: false });
    console.log(result);
    push(callbackUrl);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url('/bgres1.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="login-containt w-1/2 bg-slate-200/80 backdrop-blur-sm rounded-lg p-3 flex flex-col justify-center items-center shadow-[25px_30px_55px_rgba(85,85,85,0.46)]">
        <div className="title text-center text-3xl font-bold border-b-2 border-t-2 rounded-[5px] mt-2 border-black tracking-wide pt-2 pb-2 w-[20%]">
          <h2>{title}</h2>
        </div>
        <div className="social-container mt-3 mb-7 flex gap-2 justify-center items-center">
          <Link href="#" className="social" onClick={handlegoogle}>
            <i className="bx bxl-google-plus rounded-[50%] border border-gray-700 text-[25px] p-1 " />
          </Link>
          {/* <Link href="#" className="social ">
            <i className="bx bxl-google-plus rounded-[50%] border border-gray-700 text-[25px] p-1 " />
          </Link>
          <Link href="#" className="social ">
            <i className="bx bxl-google-plus rounded-[50%] border border-gray-700 text-[25px] p-1 " />
          </Link> */}
        </div>
        {error && <p className="text-red-900 font-medum">{error}</p>}
        <div className="w-1/2 p-5">{children}</div>
        <p className="w-1/2 p-5 flext justify-center items-center text-center mt-[-20px]">
          {linktext}
          <Link href={link} className="text-slate-500">
            {" "}
            Here !
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;

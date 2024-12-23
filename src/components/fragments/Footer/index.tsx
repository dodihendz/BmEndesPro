import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="p-[1rem] w-screen px-[4vw] bg-orange-400 shadow-txl text-white">
        <div className="flex justify-between">
          <div className="flex-col">
            <div className="w-1/2 flex">
              <Image src="/lopro.png" width={30} height={30} alt="abc" />
              <h3 className=" font-semibold">BmEndez</h3>
            </div>
            <h3 className="font-semibold text-blue-900 text-2xl mb-2 leading-relaxed">
              PT. Ultar Bahagia
            </h3>
            <div className="address">
              <p className="font-medium text-sm text-secondary leading-relaxed">
                Jl. Nirwarna indah selalu di hati kav 18720 no.80
              </p>
              <p className="font-medium text-sm text-secondary mb-2 leading-relaxed">
                North Planet bintang, Daerah khusus indah selalu
              </p>
              <p className="font-medium text-sm text-secondary leading-relaxed">
                Bumi, Planet pluto
              </p>
              <p className="font-medium text-sm text-secondary leading-relaxed">
                No : 0092212 - 923212
              </p>
              <p className="font-medium text-sm text-secondary leading-relaxed">
                Team@huruhara.com
              </p>
            </div>
            <div className="flex justify-start items-center gap-2">
              <Link
                href="#"
                className="mt-[2px] opacity-80 transition hover:text-slate-800 hover:opacity-100  text-2xl"
              >
                <i className="bx bxl-youtube" />
              </Link>
              <Link
                href="#"
                className=" text-lg opacity-80 transition hover:text-slate-800 hover:opacity-100  "
              >
                <i className="bx bxl-tiktok " />
              </Link>
              <Link
                href="#"
                className=" text-xl opacity-80 transition hover:text-slate-800 hover:opacity-100  "
              >
                <i className="bx bxl-instagram" />
              </Link>
              <Link
                href="#"
                className=" text-xl opacity-80 transition hover:text-slate-800 hover:opacity-100  "
              >
                <i className="bx bxl-facebook-circle" />
              </Link>
              <Link
                href="#"
                className=" text-xl opacity-80 transition hover:text-slate-800 hover:opacity-100  "
              >
                <i className="bx bxl-linkedin-square" />
              </Link>
            </div>
          </div>
          <div className="w-1/2 pt-10">
            <div className="w-20">
              <h3 className="font-semibold text-black text-2xl ">About</h3>
              <div className=" flex flex-col gap-2 ">
                <Link
                  href="#"
                  target="_blank"
                  className="font-normal opacity-50 text-sm hover:opacity-100 "
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="font-normal opacity-50 text-sm hover:opacity-100 "
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="font-normal opacity-50 text-sm hover:opacity-100"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  target="_blank"
                  className="font-normal opacity-50 text-sm hover:opacity-100"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-center items-center bg-slate-600 shadow-txl">
        <h3 className="font-lg text-xs text-slate-400">
          Copyright © 2024.Developed By Dodihendz{" "}
        </h3>
      </div>
    </>
  );
};

export default Footer;

import BButton from "@/components/uui/button";
import userService from "@/pages/routes/users";
import { Img } from "@/types/img.type";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavItems = [
  {
    title: "home",
    url: "/",
  },
  {
    title: "resto",
    url: "/resto",
  },
];
const Navbar = () => {
  const { data, status }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const [imagez, setImagez] = useState<Img[]>([]);
  // console.log(status);
  // console.log(data?.user?.id);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data } = await userService.getGallery();
        // console.log("Gallery data:", data);
        setImagez(data.data || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    if (status === "authenticated") {
      fetchGallery();
    } else {
      console.log("unauthenticated login");
    }
  }, [status]);
  const getImage = (id: string) => {
    const img = imagez.filter((picture: Img) => picture.user_id === id);
    if (img.length > 0) {
      const firstMatch = img[img.length - 1];
      // console.log("Image link:", firstMatch.link);
      return firstMatch.link;
    }
    return "";
  };

  return (
    <div className="flex fixed justify-between bg-slate-50 items-center w-screen h-[80px] py-[20px] px-[4vw] shadow-cxl">
      <div className="nav_left flex items-center justify-center gap-2">
        <Image src="/lopro.png" width={30} height={30} alt="abc" />
        <h3 className=" font-semibold">BmEndez</h3>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex gap-2 h-full mr-6">
          {NavItems.map((items) => (
            <Link
              key={`navB-${items.title}`}
              href={items.url}
              className={`flex items-center transition text-[16px] px-[20px] py-[2px] rounded-[50px] hover:shadow-[0_1px_3px_0_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90 hover:opacity-100 
                ${
                  pathname === items.url
                    ? "font-bold shadow-[0_1px_3px_0_rgb(0,0,0,0.6)] shadow-indigo-500/90  bg-orange-100"
                    : "font-medium"
                }`}
            >
              {items.title}
            </Link>
          ))}
          {data ? (
            <div className="nav_user flex items-center h-full">
              <div className="nav_profile relative">
                <Image
                  width={40}
                  height={40}
                  src={getImage(`${data?.user?.id}`)}
                  alt={data?.user?.name}
                  className="rounded-[50%] cursor-pointer object-cover object-center w-[40px] h-[40px]"
                  onClick={() => setDropDown(!dropDown)}
                />
                <div
                  className={`absolute flex-col right-0 rounded-[10px] bg-slate-100 top-[65px] shadow-[0_0_1px_rgba(0,0,0,0.5)]
                ${dropDown ? "flex z-5" : "hidden"}`}
                >
                  {/* <BButton
                type="button"
                className="w-full px-[20px] hover:shadow-[0_1px_3px_0_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90"
                onClick={() => (data ? signOut() : signIn())}
              >
                {status === "loading"
                  ? "Loading..."
                  : data
                  ? "Logout"
                  : "Login"}
              </BButton> */}
                  <BButton
                    type="button"
                    className="w-[150px] text-left bg-transparent py-[10px] px-[20px] hover:shadow-[0px_2px_3px_3px_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90
                  first:rounded-t-[8px] last:rounded-b-[8px]"
                    onClick={() => push("/member/profile")}
                  >
                    Profile
                  </BButton>
                  <BButton
                    type="button"
                    className="w-[150px] text-left bg-transparent py-[10px] px-[20px] hover:shadow-[0px_2px_3px_3px_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90
                  "
                    onClick={() => push("/member/profile")}
                  >
                    History comments
                  </BButton>
                  <BButton
                    type="button"
                    className="w-[150px] text-left bg-transparent py-[10px] px-[20px] hover:shadow-[0_2px_3px_3px_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90
                  first:rounded-t-[8px] last:rounded-b-[8px] "
                    onClick={() => signOut()}
                  >
                    Logout
                  </BButton>
                </div>
              </div>
            </div>
          ) : (
            <BButton
              type="button"
              className="flex items-center px-[15px] py-[2px] rounded-[50px] bg-slate-900 text-white hover:shadow-[0_1px_3px_0_rgb(0,0,0,0.6)] hover:shadow-indigo-500/90"
              onClick={() => signIn()}
            >
              Login
            </BButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Lato } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
// import Navbar from "../NavBar";
// import Footer from "../Footer";
// import { useRouter } from "next/router";

const poppins = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "member", "admin"];

type Proptype = {
  children: React.ReactNode;
};

const AppShell = (props: Proptype) => {
  const { children } = props;
  // const { pathname } = useRouter();
  return (
    <>
      {/* <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head> */}
      <div className={poppins.className}>
        {/* {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />} */}
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default AppShell;

// import Head from "next/head";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <main>
//         <h1>Hellos</h1>
//         <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} />
//       </main>
//     </>
//   );
// }

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
// console.log(process.env.NEXT_PUBLIC_URL);
export default function Home() {
  return (
    <main className={"pt-20"}>
      <div className="w-full flex justify-center items-center">
        <div className="px-[6rem]">
          <h1 className="text-[1.5rem] text-center font-semibold">
            Find The Best Restaurants For your Day
          </h1>
          <h2 className="text-[2rem] text-center font-semibold">
            And Test All Of Miscellaneous Foods
          </h2>
          <p className="mt-7 text-base text-slate-500 text-center leading-relaxed">
            you can participate to give rating and comments and get many
            advantage
          </p>
        </div>
        <div className="h-auto flex justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_PUB}otherbg.jpg`}
            alt="Promotional Image"
            width={700}
            height={300}
            className="rounded-s-xl"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="px-[6rem] flex justify-center">
        <hr className="bg-black w-full h-[3px] mt-10" />
      </div>
      <div className="px-[6rem] flex justify-center p-10">
        <div className="w-1/2 ">
          <p className="mt-7 text-2xl text-slate-600 leading-relaxed">
            Main overview
          </p>
        </div>
        <div className="w-1/2">
          <p className="mt-7 text-4xl text-slate-900 text-left leading-[3.4rem]">
            Every day millions of BmEndez users search and use the app to
            discover the menus and tastes of the best selected restaurants and
            deliver delicious dishes waiting for you!
          </p>
        </div>
      </div>
      <div className="px-[6rem] flex justify-center">
        <hr className="bg-black w-full h-[3px] mt-10" />
      </div>
      <div className="px-[6rem] p-2">
        <div className="w-1/2">
          <p className="mt-5 text-2xl text-slate-600 leading-relaxed">
            Why must use BmEndez app ?
          </p>
        </div>
      </div>
      <div className="px-[6rem] flex justify-center items-center p-10">
        <div className="w-[70px] ">
          <p className="mt-7 text-5xl text-slate-950 leading-relaxed">1</p>
        </div>
        <div className="w-1/2 ">
          <p className="mt-7 font-bold text-5xl text-slate-950 leading-normal">
            Find your favorite dishes
          </p>
        </div>
        <div className="w-1/2">
          <p className="mt-7 text-xl text-slate-600 text-left leading-[2.4rem]">
            Do you want to eat out that you can definitely trust in its
            deliciousness and even give you more confidence in the menu? BmEndez
            makes everything more practical.
          </p>
        </div>
      </div>
      <div className="px-[6rem] flex justify-center">
        <hr className="bg-slate-300 w-full h-[2px] " />
      </div>
      <div className="px-[6rem] flex justify-center items-center p-10">
        <div className="w-[70px] ">
          <p className="mt-7 text-5xl text-slate-950 leading-relaxed">2</p>
        </div>
        <div className="w-1/2 ">
          <p className="mt-7 font-bold text-5xl text-slate-950 leading-normal">
            All wishes will be fulfilled
          </p>
        </div>
        <div className="w-1/2">
          <p className="mt-7 text-xl text-slate-600 text-left leading-[2.4rem]">
            Eating with family or friends with different tastes? BmEndez has
            millions of choices, from street food to Michelin restaurants.
          </p>
        </div>
      </div>
      <div className="px-[6rem] flex justify-center">
        <hr className="bg-slate-300 w-full h-[2px] " />
      </div>
      <div className="px-[6rem] flex justify-center items-center p-10">
        <div className="w-[70px] ">
          <p className="mt-7 text-5xl text-slate-950 leading-relaxed">3</p>
        </div>
        <div className="w-1/2 ">
          <p className="mt-7 font-bold text-5xl text-slate-950 leading-normal">
            Affordable price, appetizing
          </p>
        </div>
        <div className="w-1/2">
          <p className="mt-7 text-xl text-slate-600 text-left leading-[2.4rem]">
            This is how we give trust to the menu that is reviewed and how we
            pamper you so that you can always taste the deliciousness of your
            favorites at an affordable price.
          </p>
        </div>
      </div>
      {/* <div className="px-[6rem] flex justify-center">
        <hr className="bg-slate-300 w-full h-[2px] " />
      </div> */}
      <div className="image-alone">
        <div className="h-auto flex justify-center p-20">
          <Image
            src={`${process.env.NEXT_PUBLIC_URL_PUB}otherbg.jpg`}
            alt="Promotional Image"
            // layout="responsive"
            width={1000}
            height={1000}
            className="h-[486px] w-[1164px]"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="p-[2rem] px-[6rem] flex bg-slate-500 text-white">
        <p className="font-bold text-xl">
          further information about our security
        </p>
      </div>
      <div className="px-[6rem] flex p-10">
        <div className="w-1/2 pl-10 py-10">
          <p className="text-l">FAQ</p>
          <p className="mt-7 font-bold text-3xl text-slate-950 leading-normal">
            Any Questions? <br />
            We Have The Answers
          </p>
          <br />
          <p>For further questions, please visit our Help Center.</p>
        </div>
        <div className="w-1/2 mt-7 ">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. Its animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}

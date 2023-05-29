import Link from "next/link";
import heroImage from "./assets/vector/hero image2.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] relative py-4">
      <div className="   md:flex md:flex-row md:justify-between md:items-center ">
        <div className="     w-full md:w-[50%] flex flex-col items-start">
          <h1 className=" text-[13vw] text-primary   md:text-6xl lg:text-8xl  font-extrabold">
            PC OR{" "}
            <span className="whitespace-nowrap">
              LAPTOP
            
            </span>
            <span className="text-accent"> ISSUES</span>?
          </h1>
          <p className="text-[5vw] md:w-3/4 md:text-4xl mb-8 col-span-3 text-text font-bold mt-6">
            Book a technician now to get your computer problems solved!
          </p>
          <Link href="/services" className="bg-accent text-white px-8 py-4 rounded-full text-2xl font-semibold block hover:bg-accent-light">
            Book Now
          </Link>
        </div>
          <Image
            placeholder="blur"
            src={heroImage}
            className="w-full  2xl:w-[40%]"
            blurDataURL="true"
            alt="hero"
          />
      </div>

    </div>
  );
}

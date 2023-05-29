import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-[540px] bg-gray-600 rounded-md overflow-hidden hover:-translate-y-[1%] hover:shadow-xl transition-all duration-300 py-6">
      <Image width={200} height={200} src={data.image} alt={data.alt} />
      <div className=" py-4 px-6">
        <h1 className="text-[1.5rem] font-medium text-text mb-2">
          {data.title}
        </h1>
        <p className="text-[1rem] tracking-widest text-text mb-2 max-h-[200px] overflow-hidden text-ellipsis ">
          {data.text}
        </p>
        <Link
          href={`/services/${data.path}`}
          className="group block w-full p-2 text-[1.5rem] text-center text-background bg-primary border-0 rounded-md transition-colors hover:bg-primary-light hover:scale-[1..1]"
        >
          Book Now{" "}
          <span className="group-hover:ml-8 transition-all duration-300">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;

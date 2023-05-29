
import laptopSVG from "../../assets/vector/laptop.svg";
import laptop from "../../assets/vector/disassembled/laptop.svg";
import tablet from "../../assets/vector/disassembled/tablet.svg";
import desktop from "../../assets/vector/disassembled/case.svg";
import screen from "../../assets/vector/disassembled/screen.svg";
import Card from "../servicesCard";
const ServiceCardListing = () => {
 
  const services = [
    {
      image: laptop,
      title: "Laptops",
      path:"laptops",
      text: "Do you have a laptop that is experiencing issues? Our team of skilled laptop technicians is here to help. We provide top-notch laptop fixing services. Find the closest laptop technician available and book them today.",
      alt:"laptops"
    },
    {
      image: tablet,
      title: "Tablets",
      path:"tablets",
      text: "Is your tablet giving you trouble? Don't worry, we've got you covered. Our experienced technicians specialize in tablet repairs and can diagnose and fix a wide range of issues. We'll have your tablet working like new again.",
      alt:"tablets"
    },
    {
      image: screen,
      title: "Screens",
      path:"screens",
      text: "Dealing with a broken or damaged screen? We understand the frustration. Our skilled technicians can replace screens on various devices, including laptops and tablets. Say goodbye to cracked screens.",
      alt:"screens"
    },
    {
      image: desktop,
      title: "Desktops",
      path:"desktops",
      text: "Is your desktop computer acting up? experts are here to provide reliable desktop repair services. From hardware upgrades to software troubleshooting.",
      alt:"desktop"
    },
  ];

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  content-center  gap-5 justify-items-center justify-center mx-auto mt-32">
        {services.map((data, index) => {
          return (
            <div key={index}>
              <Card data={data} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ServiceCardListing;

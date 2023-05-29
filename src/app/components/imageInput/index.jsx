"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// const ImageLabel = styled.label`
//   cursor: pointer;
//   height:300px;
//   width:300px;
//   min-width: 150px;
//   min-height: 150px;
//   overflow: hidden;
//   `;

//   const PreviewImage = styled.img`
//   width: 100%;
//   height: 50%;
//   object-fit: cover;
//   `;

const ImageInput2 = (props) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    if (file) {
      props.setImage(file);

      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {}, [image]);
  return (
        <label
          className=" rounded-full overflow-hidden border-2  flex bg-background items-center justify-center h-[200px] w-[200px] hover:cursor-pointer absolute"
          htmlFor="image"
        >
      <input
        type="file"
        required
        id="image"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleImageChange}
      />
        {image ? (
          <Image src={image} alt="Preview" width="300" height="300" />
        ) : (
          <span>Upload an image</span>
        )}
      </label>
  );
};

export default ImageInput2;

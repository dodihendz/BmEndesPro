import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  uploadedImage: File | null;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
  name: string;
};
const InputFile = (props: PropTypes) => {
  const { uploadedImage, setUploadedImage, name } = props;
  console.log(uploadedImage);
  console.log(setUploadedImage);
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mt-[20px] w-full bg-[#eee] flex flex-col item-center justify-center text-center p-[20px] cursor-pointer rounded-[10px] mb-[20px]"
      >
        {uploadedImage?.name ? (
          <p>{uploadedImage.name}</p>
        ) : (
          <>
            <p>upload a new image, big image will be resized automaticlly</p>
            <p>
              <b>max is 1MB</b>
            </p>
          </>
        )}
      </label>
      <input
        className="opacity-0 absolute z-[-2] mt-[10px]"
        type="file"
        name={name}
        id={name}
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </div>
  );
};

export default InputFile;

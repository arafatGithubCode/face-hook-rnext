import { useRef } from "react";
import { EditIcon } from "../../assets/icons";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";
const ImageUpload = () => {
  const { state } = useProfile();
  const fileUploadRef = useRef();

  const { api } = useAxios();

  const handleUploadImage = (e) => {
    e.preventDefault();

    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploadRef.current.files) {
        formData.append("avatar", file);
      }
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
          state?.user?.id
        }/avatar`,
        formData
      );
      console.log(response);
    } catch (error) {}
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img className="max-w-full" src={state?.user?.avatar} alt="image" />

      <form encType="multipart/form-data">
        <button
          onClick={handleUploadImage}
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
        <input type="file" id="file" ref={fileUploadRef} hidden />
      </form>
    </div>
  );
};

export default ImageUpload;

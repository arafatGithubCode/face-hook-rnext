import { useState } from "react";
import { actions } from "../../actions";
import { CheckIcon, EditIcon } from "../../assets/icons";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

const Bio = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(state?.user?.bio);

  const handleBioEdit = async () => {
    console.log("click");
    dispatch({ type: actions.profile.DATA_FETCHING });
    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
        { bio }
      );

      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_BIO_EDITED,
          data: response.data,
        });
      }
      setEditMode(false);
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="bg-gray-300 text-black border p-3 rounded"
            name="bio"
            id="bio"
            rows={5}
            cols={50}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        )}
      </div>
      {!editMode ? (
        <button
          onClick={() => setEditMode(true)}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={EditIcon} alt="Edit" />
        </button>
      ) : (
        <button
          onClick={handleBioEdit}
          className="flex-center h-7 w-7 rounded-full"
        >
          <img src={CheckIcon} alt="check" />
        </button>
      )}
    </div>
  );
};

export default Bio;

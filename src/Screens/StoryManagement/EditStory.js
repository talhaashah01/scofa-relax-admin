import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import axios from "axios";

import { DashboardLayout } from "../../Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { questionModal, successModal } from "../../Components/CustomModal";
import CustomLoader from "../../Components/CustomLoader";

import "./style.css";
import BASEURL from "../../Config/global";

const EditStory = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({});
  const [storyOptions, setStoryOptions] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [featuredState, setFeaturedState] = useState(false);
  const [story, setStory] = useState(null);
  const [storyError, setStoryError] = useState(false);

  const [storyImage, setStoryImage] = useState(null);
  const [storyThumbnail, setStoryThumbnail] = useState(null);

  const [error, setError] = useState({ error: false, text: "" });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/stories/${id}`);
        setData(response.data.data[0]);
        setFeaturedState(response.data.data.featured);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/stories/storiescategories`
        );
        setStoryOptions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStory();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleStoryChange = (event) => {
    setStory(event.target.files[0]);
    setStoryError(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file === null || file === "undefined") {
      setStoryImage(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setStoryImage(reader.result);
      };
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);

    if (file === null || file === "undefined") {
      setStoryThumbnail(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setStoryThumbnail(reader.result);
      };
    }
  };

  const updateStory = async () => {
    const formDataToSend = new FormData();
    if (data.title) {
      formDataToSend.append("title", data.title);
    }

    if (data.premium) {
      formDataToSend.append("premium", data.premium);
    }

    if (data.storiescategory) {
      formDataToSend.append("storiescategory", data.storiescategory);
    }

    if (selectedThumbnail) {
      formDataToSend.append("thumbnail", selectedThumbnail);
    }
    if (story) {
      formDataToSend.append("audio", story);
    }
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    setLoader(true);
    try {
      const response = await axios.patch(
        `${BASEURL}/api/stories/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.error === false) {
        successModal.fire({
          text: "Story Updated Successfully",
          confirmButtonText: "Continue",
        });
        setError({ error: false, text: "" });
        setLoader(false);
        navigate("/story-management");
      } else {
        setError({ error: true, text: response.data.message });
        setLoader(false);
      }
    } catch (error) {
      setError({
        error: true,
        text: "An error occurred. Please try again later.",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    questionModal
      .fire({
        title: "Do you want to Update this Story?",
        confirmButtonText: "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateStory();
        }
      });
  };

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Story
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {data && (
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-lg-6 mb-2">
                      <CustomInput
                        label="Title"
                        labelClass="mainLabel"
                        type="text"
                        name="title"
                        value={data.title || ""}
                        placeholder="Enter Title"
                        inputClass="mainInput"
                        // required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Type</p>
                      <label className="secondaryText me-3">
                        <input
                          type="radio"
                          name="premium"
                          value="false"
                          className="me-1"
                          checked={data.premium == "true" ? false : true}
                          onChange={handleChange}
                        />
                        Free
                      </label>
                      <label className="secondaryText">
                        <input
                          type="radio"
                          name="premium"
                          value="true"
                          checked={data.premium == "true" ? true : false}
                          className="me-1"
                          onChange={handleChange}
                        />
                        Premium
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Current Story</p>
                      {data.audio && (
                        <>
                          <audio className="audioPlayer" controls>
                            <source
                              src={`${BASEURL + data.audio}`}
                              type="audio/*"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </>
                      )}
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">New Story*</p>
                      <label>
                        <div className="audioInput">
                          <span>Select Audio File</span>
                        </div>
                        {story && (
                          <p className="audioInputName oneLine">{story.name}</p>
                        )}
                        {storyError && (
                          <p className="audioInputName">
                            Please select correct file format
                          </p>
                        )}
                        <input
                          type="file"
                          name="story"
                          accept="audio/*"
                          className="d-none"
                          onChange={handleStoryChange}
                        />
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Select Category*</p>
                      {storyOptions && (
                        <select
                          name="storiescategory"
                          id="category"
                          className="mainInput w-auto"
                          value={data.storiescategory}
                          onChange={handleChange}
                        >
                          {storyOptions.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="col-lg-6 mb-2">
                      <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        checked={featuredState ? true : false}
                        onChange={() => {
                          setFeaturedState(!featuredState);
                        }}
                      />
                      <label htmlFor="featured" className="mainLabel ms-1">
                        Featured
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Thumbnail*</p>
                      <label>
                        <div className="thumbnailInput">
                          {storyThumbnail ? (
                            <img src={storyThumbnail} alt="Thumbnail" />
                          ) : (
                            <img
                              src={`${BASEURL + data.thumbnail}`}
                              alt="Thumbnail"
                            />
                          )}
                        </div>
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          className="d-none"
                          // required
                          onChange={handleThumbnailChange}
                        />
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Image*</p>
                      <label>
                        <div className="imageInput">
                          {storyImage ? (
                            <img src={storyImage} alt="Main" />
                          ) : (
                            <img src={`${BASEURL + data.image}`} alt="Main" />
                          )}
                        </div>
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          className="d-none"
                          // required
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                  {error.error == true && (
                    <div className="row mb-3">
                      <div className="col-12">
                        <p className="secondaryText">{error.text}</p>
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div className="col-12">
                      <CustomButton
                        type="submit"
                        variant="primaryButton"
                        text="Update"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
      {loader && <CustomLoader />}
    </>
  );
};
export default EditStory;

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

const EditMeditation = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({});
  const [meditationOptions, setMeditationOptions] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [featuredState, setFeaturedState] = useState(false);
  const [meditation, setMeditation] = useState(null);
  const [meditationError, setMeditationError] = useState(false);

  const [meditationImage, setMeditationImage] = useState(null);
  const [meditationThumbnail, setMeditationThumbnail] = useState(null);

  const [error, setError] = useState({ error: false, text: "" });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/meditation/${id}`);
        setData(response.data.data);
        setFeaturedState(response.data.data.featured);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchMeditation() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/meditation/mediationcategories`
        );
        setMeditationOptions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMeditation();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleMeditationChange = (event) => {
    setMeditation(event.target.files[0]);
    setMeditationError(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file === null || file === "undefined") {
      setMeditationImage(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setMeditationImage(reader.result);
      };
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);

    if (file === null || file === "undefined") {
      setMeditationThumbnail(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setMeditationThumbnail(reader.result);
      };
    }
  };

  const updateMeditation = async () => {
    const formDataToSend = new FormData();

    if(data.title) {
      formDataToSend.append("title", data.title);
    }

    if(data.premium) {
      formDataToSend.append("premium", data.premium);
    }

    if(featuredState) {
      formDataToSend.append("featured", featuredState);
    }

    if (data.meditationcategory) {
      formDataToSend.append("meditationcategory", data.meditationcategory);
    }
    if (selectedThumbnail) {
      formDataToSend.append("thumbnail", selectedThumbnail);
    }
    if (meditation) {
      formDataToSend.append("audio", meditation);
    }
    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    setLoader(true);
    try {
      const response = await axios.patch(
        `${BASEURL}/api/meditation/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.error === false) {
        successModal.fire({
          text: "Meditation Updated Successfully",
          confirmButtonText: "Continue",
        });
        setError({ error: false, text: "" });
        setLoader(false);
        navigate("/meditation-management");
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
        title: "Do you want to Update this Meditation?",
        confirmButtonText: "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateMeditation();
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
                Edit Meditation
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
                      <p className="mainLabel">Current Meditation</p>
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
                      <p className="mainLabel">New Meditation*</p>
                      <label>
                        <div className="audioInput">
                          <span>Select Audio File</span>
                        </div>
                        {meditation && (
                          <p className="audioInputName oneLine">
                            {meditation.name}
                          </p>
                        )}
                        {meditationError && (
                          <p className="audioInputName">
                            Please select correct file format
                          </p>
                        )}
                        <input
                          type="file"
                          name="meditation"
                          accept="audio/*"
                          className="d-none"
                          onChange={handleMeditationChange}
                        />
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Select Category*</p>
                      {meditationOptions && (
                        <select
                          name="meditationcategory"
                          id="category"
                          className="mainInput w-auto"
                          // required
                          value={data.meditationcategory}
                          onChange={handleChange}
                        >
                          {meditationOptions.map((item, index) => (
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
                          {meditationThumbnail ? (
                            <img src={meditationThumbnail} alt="Thumbnail" />
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
                          {meditationImage ? (
                            <img src={meditationImage} alt="Main" />
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
export default EditMeditation;

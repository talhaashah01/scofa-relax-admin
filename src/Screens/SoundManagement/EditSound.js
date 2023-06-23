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

const EditSound = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({});
  const [soundOptions, setSoundOptions] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [featuredState, setFeaturedState] = useState(null);
  const [sound, setSound] = useState(null);
  const [soundError, setSoundError] = useState(false);

  const [soundImage, setSoundImage] = useState(null);
  const [soundThumbnail, setSoundThumbnail] = useState(null);

  const [error, setError] = useState({ error: false, text: "" });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/sounds/${id}`);
        setData(response.data.data[0]);
        setFeaturedState(data.featured);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSound() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/sounds/soundscategories`
        );
        setSoundOptions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSound();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSoundChange = (event) => {
    setSound(event.target.files[0]);
    setSoundError(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file === null || file === "undefined") {
      setSoundImage(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSoundImage(reader.result);
      };
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);

    if (file === null || file === "undefined") {
      setSoundThumbnail(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSoundThumbnail(reader.result);
      };
    }
  };

  const updateSound = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedImage);
    formDataToSend.append("thumbnail", selectedThumbnail);
    formDataToSend.append("audio", sound);
    formDataToSend.append("title", data.title);
    formDataToSend.append("premium", data.premium);
    formDataToSend.append("featured", featuredState);
    formDataToSend.append("soundcategory", data.soundcategory);

    setLoader(true);
    try {
      const response = await axios.patch(
        `${BASEURL}/api/sounds/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.error === false) {
        successModal.fire({
          text: "Sound Updated Successfully",
          confirmButtonText: "Continue",
        });
        setError({ error: false, text: "" });
        setLoader(false);
        navigate("/sound-management");
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

  console.log(data);

  const handleSubmit = (event) => {
    event.preventDefault();
    questionModal
      .fire({
        title: "Do you want to Update this Sound?",
        confirmButtonText: "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateSound();
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
                Edit Sound
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
                      <p className="mainLabel">Current Sound</p>
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
                      <p className="mainLabel">New Sound*</p>
                      <label>
                        <div className="audioInput">
                          <span>Select Audio File</span>
                        </div>
                        {sound && (
                          <p className="audioInputName oneLine">{sound.name}</p>
                        )}
                        {soundError && (
                          <p className="audioInputName">
                            Please select correct file format
                          </p>
                        )}
                        <input
                          type="file"
                          name="sound"
                          accept="audio/*"
                          className="d-none"
                          onChange={handleSoundChange}
                        />
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Select Category*</p>
                      {soundOptions && (
                        <select
                          name="soundcategory"
                          id="category"
                          className="mainInput w-auto"
                          value={data.soundcategory}
                          onChange={handleChange}
                        >
                          {soundOptions.map((item, index) => (
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
                          {soundThumbnail ? (
                            <img src={soundThumbnail} alt="Thumbnail" />
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
                          {soundImage ? (
                            <img src={soundImage} alt="Main" />
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
export default EditSound;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import { DashboardLayout } from "../../Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { questionModal, successModal } from "../../Components/CustomModal";
import CustomLoader from "../../Components/CustomLoader";
import { checkAudioFormat } from "../../Util/helpers";

import { placeholderImage } from "../../Assets/images";

import "./style.css";
import BASEURL from "../../Config/global";

const AddArticle = () => {
  const navigate = useNavigate();

  const [articleOptions, setArticleOptions] = useState([]);

  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState(false);


  const [articleImage, setArticleImage] = useState(null);
  const [articleThumbnail, setArticleThumbnail] = useState(null);

  const [loginError, setLoginError] = useState({ error: false, text: "" });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(`${BASEURL}/api/articles/articlecategories`);
        setArticleOptions(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticle();
  }, []);


  useEffect(() => {
    const firstCategory = articleOptions[0]?.id.toString();
    setFormData({ category: firstCategory });
  }, [articleOptions]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArticleChange = (event) => {
    const audioResult = checkAudioFormat(event)
    setArticle(audioResult.selectedFile)
    setArticleError(audioResult.error)
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file === null || file === "undefined") {
      setArticleImage(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setArticleImage(reader.result);
      };
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setSelectedThumbnail(file);

    if (file === null || file === "undefined") {
      setArticleThumbnail(null);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setArticleThumbnail(reader.result);
      };
    }
  };

  const postArticle = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedImage);
    formDataToSend.append("thumbnail", selectedThumbnail);
    formDataToSend.append("audio", article);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("premium", formData.premium);
    formDataToSend.append("articlecategory", formData.category);
    formDataToSend.append("naration", true);


    setLoader(true);
    try {
      const response = await axios.post(`${BASEURL}/api/articles/`, formDataToSend, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.error === false) {
        successModal.fire({
          text: "Article Added Successfully",
          confirmButtonText: "Continue",
        });
        setLoginError({ error: false, text: "" });
        setLoader(false);
        navigate("/article-management");
      } else {
        setLoginError({ error: true, text: response.data.message });
        setLoader(false);
      }
    } catch (error) {
      setLoginError({
        error: true,
        text: "An error occurred. Please try again later.",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    questionModal
      .fire({
        title: "Do you want to add this Article?",
        confirmButtonText: "Add",
      })
      .then((result) => {
        if (result.isConfirmed) {
          postArticle();
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
                Add Article
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-lg-6 mb-2">
                    <CustomInput
                      label="Title"
                      labelClass="mainLabel"
                      required
                      type="text"
                      name="title"
                      value={formData.title || ""}
                      placeholder="Enter Title"
                      inputClass="mainInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-6 mb-2">
                    <p className="mainLabel">Type</p>
                    <label className="secondaryText me-3">
                      <input
                        type="radio"
                        name="premium"
                        required
                        value={"false"}
                        className="me-1"
                        onChange={handleChange}
                      />
                      Free
                    </label>
                    <label className="secondaryText">
                      <input
                        type="radio"
                        name="premium"
                        required
                        value={"true"}
                        className="me-1"
                        onChange={handleChange}
                      />
                      Premium
                    </label>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <p className="mainLabel">Audio*</p>
                    <label>
                      <div className="audioInput">
                        <span>Select File(MP3/Wav)</span>
                      </div>
                      {article && (
                        <p className="audioInputName oneLine">{article.name}</p>
                      )}
                      {articleError && (
                        <p className="audioInputName">Please select MP3 or Wav file</p>
                      )}
                      <input
                        type="file"
                        name="article"
                        accept="audio/mp3, audio/wav"
                        className="d-none"
                        required
                        onChange={handleArticleChange}
                      />
                    </label>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <p className="mainLabel">Select Category*</p>
                    {articleOptions && (
                      <select
                        name="category"
                        id="category"
                        className="mainInput w-auto"
                        required
                        // value={formData.category || ""}
                        onChange={handleChange}
                      >
                        {articleOptions.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="col-lg-6 mb-2">
                    <p className="mainLabel">Thumbnail*</p>
                    <label>
                      <div className="thumbnailInput">
                        {articleThumbnail ? (
                          <img src={articleThumbnail} alt="Thumbnail" />
                        ) : (
                          <img src={placeholderImage} alt="Thumbnail" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="d-none"
                        required
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  </div>
                  <div className="col-lg-6 mb-2">
                    <p className="mainLabel">Image*</p>
                    <label>
                      <div className="imageInput">
                        {articleImage ? (
                          <img src={articleImage} alt="Main" />
                        ) : (
                          <img src={placeholderImage} alt="Main" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="d-none"
                        required
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
                {loginError.error == true && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <p className="secondaryText">{loginError.text}</p>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-12">
                    <CustomButton
                      type="submit"
                      variant="primaryButton"
                      text="Add"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashboardLayout>
      {loader && <CustomLoader />}
    </>
  );
};
export default AddArticle;

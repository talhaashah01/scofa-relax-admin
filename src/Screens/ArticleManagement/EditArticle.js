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

const EditArticle = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({});
  const [articleOptions, setArticleOptions] = useState([]);

  console.log(data)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/articles/${id}`);
        setData(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [article, setArticle] = useState(null);
  const [articleError, setArticleError] = useState(false);

  const [articleImage, setArticleImage] = useState(null);
  const [articleThumbnail, setArticleThumbnail] = useState(null);

  const [error, setError] = useState({ error: false, text: "" });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleArticleChange = (event) => {
      setArticle(event.target.files[0]);
      setArticleError(false);
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


  const updateArticle = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("image", selectedImage);
    formDataToSend.append("thumbnail", selectedThumbnail);
    formDataToSend.append("audio", article);
    formDataToSend.append("title", data.title);
    formDataToSend.append("premium", data.premium);
    formDataToSend.append("articlecategory", data.articlecategory);

    setLoader(true);
    try {
      const response = await axios.patch(`${BASEURL}/api/articles/${id}`, formDataToSend, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.error === false) {
        successModal.fire({
          text: "Article Updated Successfully",
          confirmButtonText: "Continue",
        });
        setError({ error: false, text: "" });
        setLoader(false);
        navigate("/article-management");
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
        title: "Do you want to Update this Article?",
        confirmButtonText: "Update",
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateArticle();
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
                Edit Article
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
                      <p className="mainLabel">Current Article</p>
                      {data.audio && (
                        <>
                          <audio className="audioPlayer" controls>
                            <source
                              src={`${BASEURL+data.audio}`}
                              type="audio/*"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </>
                      )}
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">New Article*</p>
                      <label>
                        <div className="audioInput">
                          <span>Select Audio File</span>
                        </div>
                        {article && (
                          <p className="audioInputName oneLine">{article.name}</p>
                        )}
                        {articleError && (
                          <p className="audioInputName">Please select correct file format</p>
                        )}
                        <input
                          type="file"
                          name="article"
                          accept="audio/*"
                          className="d-none"
                          onChange={handleArticleChange}
                        />
                      </label>
                    </div>
                    <div className="col-lg-6 mb-2">
                      <p className="mainLabel">Select Category*</p>
                      {articleOptions && (
                        <select
                          name="articlecategory"
                          id="category"
                          className="mainInput w-auto"
                          // required
                          value={data.articlecategory}
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
                            <img src={`${BASEURL+data.thumbnail}`} alt="Thumbnail" />
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
                          {articleImage ? (
                            <img src={articleImage} alt="Main" />
                          ) : (
                            <img src={`${BASEURL+data.image}`} alt="Main" />
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
export default EditArticle;

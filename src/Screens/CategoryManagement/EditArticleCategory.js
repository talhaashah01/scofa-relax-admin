import { useState } from "react";
import { useParams, useNavigate } from "react-router";

import axios from "axios";

import Swal from "sweetalert2";
import { questionModal, successModal } from "../../Components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomButton from "../../Components/CustomButton";

import "./style.css";
import BASEURL from "../../Config/global";
import { useEffect } from "react";

const EditArticleCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputValue, setinputValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/articles/articlecategories/${id}`
        );
        setinputValue(response.data.data[0].name);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setinputValue(event.target.value);
  };

  const postData = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", inputValue);
    try {
      const response = await axios.patch(
        `${BASEURL}/api/articles/articlecategories/${id}`,
        formDataToSend
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue != "") {
      questionModal
        .fire({
          title: "Do you want to update this category",
          confirmButtonText: "Update",
        })
        .then((result) => {
          if (result.isConfirmed) {
            postData();
            successModal.fire({
              text: "Categories Updated Successfully",
              confirmButtonText: "Continue",
            });
            navigate("/category-management");
          }
        });
    }
  };

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Edit Article Category
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-5">
                <div className="col-lg-6 mb-2">
                  <div className="inputWrapper">
                    <label className="mainLabel">Category</label>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter Category"
                        required=""
                        name="category"
                        className="mainInput"
                        value={inputValue || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <CustomButton
                    type="submit"
                    variant="primaryButton"
                    text="Update"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default EditArticleCategory;

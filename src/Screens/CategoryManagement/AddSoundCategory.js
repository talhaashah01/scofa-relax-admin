import { useState } from "react";
import { useNavigate } from "react-router";

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

const AddSoundCategory = () => {
  const navigate = useNavigate();

  const [inputValue, setinputValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleChange = (event) => {
    setinputValue(event.target.value);
  };

  const addList = (event) => {
    event.preventDefault();
    if (inputValue.length >= 1) {
      const duplicateArray = [...categoryList];
      duplicateArray.push(inputValue);
      setCategoryList(duplicateArray);
    }
    setinputValue("");
  };

  const deleteItem = (index) => {
    const duplicateArray = [...categoryList];
    duplicateArray.splice(index, 1);
    setCategoryList(duplicateArray);
  };

  const postData = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("categories", categoryList);
    try {
      const response = await axios.post(
        `${BASEURL}/api/sounds/soundscategories`,
        formDataToSend
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (categoryList.length >= 1) {
      questionModal
        .fire({
          title: "Do you want to add the categories?",
          confirmButtonText: "Add",
        })
        .then((result) => {
          if (result.isConfirmed) {
            postData();
            successModal.fire({
              text: 'Sound Categories Added Successfully',
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
                Add Sound Category
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-5">
                <div className="col-lg-6 mb-2">
                  <form onSubmit={addList}>
                    <div className="inputWrapper">
                      <label className="mainLabel">Category*</label>
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter Category"
                          required=""
                          name="category"
                          className="mainInput"
                          maxlength="15"
                          value={inputValue || ""}
                          onChange={handleChange}
                        />
                        <button type="submit" className="notButton text-white">
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-12">
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    {categoryList.map((item, index) => (
                      <div className="categoryItem" key={index}>
                        <p className="m-0">{item}</p>
                        <button
                          type="button"
                          className="notButton text-white"
                          onClick={() => {
                            deleteItem(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <CustomButton
                    type="submit"
                    variant="primaryButton"
                    text="Add"
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
export default AddSoundCategory;

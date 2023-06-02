import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisV,
  faEye,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Layout/DashboardLayout";

import CustomTable from "./../../Components/CustomTable";
import { placeholderImage } from "../../Assets/images";

import { questionModal, successModal } from "../../Components/CustomModal";
import CustomFilters from "../../Components/CustomFilters";
import CustomPagination from "../../Components/CustomPagination";
import CustomLoader from "../../Components/CustomLoader";

import { fetchData } from "../../Services/Sound";
import "./style.css";
import BASEURL from "../../Config/global";

const SoundManagement = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [enteries, setEnteries] = useState(10);
  const [offset, setOffset] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [updateData, setUpdateData] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    document.title = "Scofa Relax | Sound Management";
  }, []);

  useEffect(() => {

    (async function () {
      try {
        const response = await fetchData(
          enteries,
          offset,
          dateFrom,
          dateTo,
          filterSearchValue
        );
        setData(response.data.data);
        setTotalCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [enteries, filterSearchValue, dateTo, updateData]);

  const deleteSoundAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete ${name} Sound?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteSound(id, name);
        }
      });
  };

  const deleteSound = async (id, name) => {
    setLoader(true);
    try {
      const response = await axios.delete(`${BASEURL}/api/sounds/${id}`);
      console.log(response.data);
      if (response.data.error === false) {
        successModal.fire({
          text: `${name} Sound has been deleted`,
          confirmButtonText: "Continue",
        });
        setUpdateData(!updateData);
        setLoader(false);
      }
    } catch (error) {
      console.log("error =======>   ", error);
      setUpdateData(!updateData);
      setLoader(false);
    }
  };

  const soundHeader = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "type",
      title: "Type",
    },
    {
      key: "category",
      title: "Category",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-lg-8 mb-2">
              <h2 className="mainTitle">Sound Management</h2>
            </div>
            <div className="col-lg-4 text-end mb-2">
              <Link
                to={"/sound-management/add-sound"}
                className="customButton primaryButton"
              >
                Add Sound
              </Link>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <CustomFilters
                entriesFilter={true}
                setEnteries={setEnteries}
                filterSearch={true}
                filterSearchValue={filterSearchValue}
                setFilterSearchValue={setFilterSearchValue}
                dateFilter={true}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <CustomTable headers={soundHeader}>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="text-capitalize">
                          <img
                            src={
                              item.thumbnail
                                ? `${BASEURL + item.thumbnail}`
                                : // ? `${image_url+item.thumbnail}`
                                  placeholderImage
                            }
                            alt="thumbnail"
                            className="thumbnail"
                          />
                          {item.title}
                        </td>
                        <td>{item.premium ? "Premium" : "Free"}</td>
                        <td>{item.soundscategoriesname}</td>
                        <td>
                          <Dropdown className="tableDropdown">
                            <Dropdown.Toggle
                              variant="transparent"
                              className="notButton classicToggle"
                            >
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu
                              align="end"
                              className="tableDropdownMenu"
                            >
                              <Link
                                to={`/sound-management/sound-details/${item.id}`}
                                className="tableAction"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="tableActionIcon"
                                />
                                View
                              </Link>
                              <Link
                                to={`/sound-management/edit-sound/${item.id}`}
                                className="tableAction"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="tableActionIcon"
                                />
                                Edit
                              </Link>
                              <button
                                className="tableAction"
                                onClick={() => {
                                  deleteSoundAction(item.id, item.title);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className="tableActionIcon"
                                />
                                Delete
                              </button>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </CustomTable>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <CustomPagination
                enteries={data.length}
                totalCount={totalCount}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
      {loader && <CustomLoader />}
    </>
  );
};
export default SoundManagement;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

import "./style.css";
import { questionModal, successModal } from "../../Components/CustomModal";
import CustomFilters from "../../Components/CustomFilters";
import BASEURL from "../../Config/global";
import CustomPagination from "../../Components/CustomPagination";

const StoryManagement = () => {
  const [data, setData] = useState([]);

  const [enteries, setEnteries] = useState(10);
  const [offset, setOffset] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [sort, setSort] = useState("all");
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    document.title = "Relax Scofa | Story Management";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/stories/?limit=${enteries}&offset=${offset}&start_date=${dateFrom}&end_date=${dateTo}&search=${filterSearchValue}`
        );
        if (response.data.error != true) {
          setData(response.data.data);
          setTotalCount(response.data.count);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [enteries, filterSearchValue, dateTo]);

  const deleteStory = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}/api/stories/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStoryAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete ${name} Story?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteStory(id);
          successModal.fire({
            text: `${name} Story has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const storyHeader = [
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

  const sortingValues = [
    {
      value: "all",
      text: "All",
    },
    {
      value: "status",
      text: "Status",
    },
    {
      value: "registered",
      text: "Registered Date",
    },
  ];


  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-lg-8 mb-2">
              <h2 className="mainTitle">Story Management</h2>
            </div>
            <div className="col-lg-4 text-end mb-2">
              <Link
                to={"/story-management/add-story"}
                className="customButton primaryButton"
              >
                Add Story
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
              <CustomTable headers={storyHeader}>
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
                                : placeholderImage
                            }
                            alt="thumbnail"
                            className="thumbnail"
                          />
                          {item.title}
                        </td>
                        <td>{item.premium ? "Premium" : "Free"}</td>
                        <td>{item.storiescategoriesname}</td>
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
                                to={`/story-management/story-details/${item.id}`}
                                className="tableAction"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="tableActionIcon"
                                />
                                View
                              </Link>
                              <Link
                                to={`/story-management/edit-story/${item.id}`}
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
                                  deleteStoryAction(item.id, item.title);
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
    </>
  );
};
export default StoryManagement;

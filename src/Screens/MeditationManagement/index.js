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

const MeditationManagement = () => {
  const [data, setData] = useState([]);

  const [enteries, setEnteries] = useState(10);
  const [offset, setOffset] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterSearchValue, setFilterSearchValue] = useState("");
  const [sort, setSort] = useState("all");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    document.title = "Scofa Relax | Meditation Management";
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/meditation/?limit=${enteries}&offset=${offset}&start_date=${dateFrom}&end_date=${dateTo}&search=${filterSearchValue}`
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

  const deleteMeditation = async (id) => {
    try {
      const response = await axios.delete(`${BASEURL}/api/meditation/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMeditationAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete ${name} Meditation?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMeditation(id);
          successModal.fire({
            text: `${name} Meditation has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const meditationHeader = [
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
              <h2 className="mainTitle">Mediation Management</h2>
            </div>
            <div className="col-lg-4 text-end mb-2">
              <Link
                to={"/meditation-management/add-meditation"}
                className="customButton primaryButton"
              >
                Add Meditation
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
              <CustomTable headers={meditationHeader}>
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
                        <td>{item.meditationcategoriesname}</td>
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
                                to={`/meditation-management/meditation-details/${item.id}`}
                                className="tableAction"
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className="tableActionIcon"
                                />
                                View
                              </Link>
                              {/* <Link
                                to={`/meditation-management/edit-meditation/${item.id}`}
                                className="tableAction"
                              >
                                <FontAwesomeIcon
                                  icon={faEdit}
                                  className="tableActionIcon"
                                />
                                Edit
                              </Link> */}
                              <button
                                className="tableAction"
                                onClick={() => {
                                  deleteMeditationAction(item.id, item.title);
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
export default MeditationManagement;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Layout/DashboardLayout";

import CustomTable from "./../../Components/CustomTable";
import CustomButton from "../../Components/CustomButton";
import CustomFilters from "../../Components/CustomFilters";
import CustomPagination from "../../Components/CustomPagination";
import { questionModal, successModal } from "../../Components/CustomModal";

import "./style.css";
import BASEURL from "../../Config/global";

const CategoryManagement = () => {
  const [soundCategoryData, setSoundCategoryData] = useState([]);
  const [meditationCategoryData, setMeditationCategoryData] = useState([]);
  const [storyCategoryData, setStoryCategoryData] = useState([]);
  const [articleCategoryData, setArticleCategoryData] = useState([]);

  const [soundCount, setSoundcount] = useState(null);
  const [soundEnteries, setSoundEnteries] = useState(10);
  const [soundOffset, setSoundOffset] = useState(0);
  const [soundDateFrom, setSoundDateFrom] = useState("");
  const [soundDateTo, setSoundDateTo] = useState("");
  const [soundFilterSearchValue, setSoundFilterSearchValue] = useState("");

  const [meditationCount, setMeditationcount] = useState(null);
  const [meditationEnteries, setMeditationEnteries] = useState(10);
  const [meditationOffset, setMeditationOffset] = useState(0);
  const [meditationDateFrom, setMeditationDateFrom] = useState("");
  const [meditationDateTo, setMeditationDateTo] = useState("");
  const [meditationFilterSearchValue, setMeditationFilterSearchValue] =
    useState("");

  const [storyCount, setStorycount] = useState(null);
  const [storyEnteries, setStoryEnteries] = useState(10);
  const [storyOffset, setStoryOffset] = useState(0);
  const [storyDateFrom, setStoryDateFrom] = useState("");
  const [storyDateTo, setStoryDateTo] = useState("");
  const [storyFilterSearchValue, setStoryFilterSearchValue] = useState("");

  const [articleCount, setArticlecount] = useState(null);
  const [articleEnteries, setArticleEnteries] = useState(10);
  const [articleOffset, setArticleOffset] = useState(0);
  const [articleDateFrom, setArticleDateFrom] = useState("");
  const [articleDateTo, setArticleDateTo] = useState("");
  const [articleFilterSearchValue, setArticleFilterSearchValue] = useState("");

  useEffect(() => {
    document.title = "Scofa Relax | Category Management";
  }, []);

  useEffect(() => {
    async function fetchSound() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/sounds/soundscategories?limit=${soundEnteries}&offset=${soundOffset}&start_date=${soundDateFrom}&end_date=${soundDateTo}&search=${soundFilterSearchValue}`
        );

        setSoundCategoryData(response.data.data);
        setSoundcount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSound();
  }, [soundEnteries, soundFilterSearchValue, soundDateTo]);

  useEffect(() => {
    async function fetchMeditation() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/meditation/mediationcategories?limit=${meditationEnteries}&offset=${meditationOffset}&start_date=${meditationDateFrom}&end_date=${meditationDateTo}&search=${meditationFilterSearchValue}`
        );

        setMeditationCategoryData(response.data.data);
        setMeditationcount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMeditation();
  }, [meditationEnteries, meditationFilterSearchValue, meditationDateTo]);

  useEffect(() => {
    async function fetchStory() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/stories/storiescategories?limit=${storyEnteries}&offset=${storyOffset}&start_date=${storyDateFrom}&end_date=${storyDateTo}&search=${storyFilterSearchValue}`
        );

        setStoryCategoryData(response.data.data);
        setStorycount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStory();
  }, [storyEnteries, storyFilterSearchValue, storyDateTo]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(
          `${BASEURL}/api/articles/articlecategories?limit=${articleEnteries}&offset=${articleOffset}&start_date=${articleDateFrom}&end_date=${articleDateTo}&search=${articleFilterSearchValue}`
        );

        setArticleCategoryData(response.data.data);
        setArticlecount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticle();
  }, [articleEnteries, articleFilterSearchValue, articleDateTo]);

  const soundDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/api/sounds/soundscategories/${id}`
      );
      setSoundCategoryData(soundCategoryData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const soundDeleteCategoryAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete category ${name}?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          soundDeleteCategory(id);
          successModal.fire({
            text: `Category ${name} has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const meditationDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/api/meditation/meditationcategories/${id}`
      );
      setMeditationCategoryData(
        meditationCategoryData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const meditationDeleteCategoryAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete category ${name}?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          meditationDeleteCategory(id);
          successModal.fire({
            text: `Category ${name} has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const storyDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/api/stories/storycategories/${id}`
      );
      setStoryCategoryData(
        meditationCategoryData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const storyDeleteCategoryAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete category ${name}?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          storyDeleteCategory(id);
          successModal.fire({
            text: `Category ${name} has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const articleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/api/article/articlecategories/${id}`
      );
      setArticleCategoryData(
        meditationCategoryData.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const articleDeleteCategoryAction = (id, name) => {
    questionModal
      .fire({
        title: `Do you want to delete category ${name}?`,
        confirmButtonText: "Yes",
      })
      .then((result) => {
        if (result.isConfirmed) {
          articleDeleteCategory(id);
          successModal.fire({
            text: `Category ${name} has been deleted`,
            confirmButtonText: "Continue",
          });
        }
      });
  };

  const soundCategoryTitle = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "categories",
      title: "Categories",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const meditationCategoryTitle = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "genre",
      title: "Genre",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const storyCategoryTitle = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "genre",
      title: "Genre",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const articleCategoryTitle = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "genre",
      title: "Genre",
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
            <div className="col-12 mb-2">
              <h2 className="mainTitle">Category Management</h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <Tabs
                defaultActiveKey="sounds"
                id="uncontrolled-tab-example"
                className="customTabs mb-4"
              >
                <Tab eventKey="sounds" title="Sounds">
                  <div className="row mb-3">
                    <div className="col-12 text-end">
                      <Link
                        to={"add-sound-category"}
                        className="customButton primaryButton"
                      >
                        Add Sound Category
                      </Link>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomFilters
                        entriesFilter={true}
                        setEnteries={setSoundEnteries}
                        filterSearch={true}
                        filterSearchValue={soundFilterSearchValue}
                        setFilterSearchValue={setSoundFilterSearchValue}
                        dateFilter={true}
                        setDateFrom={setSoundDateFrom}
                        setDateTo={setSoundDateTo}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomTable headers={soundCategoryTitle}>
                        <tbody>
                          {soundCategoryData &&
                            soundCategoryData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize">{item.name}</td>
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
                                      <button
                                        type="button"
                                        className="tableAction"
                                        onClick={() => {
                                          soundDeleteCategoryAction(
                                            item.id,
                                            item.name
                                          );
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
                        enteries={soundCategoryData.length}
                        totalCount={soundCount}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="meditations" title="Meditations">
                  <div className="row mb-3">
                    <div className="col-12 text-end">
                      <Link
                        to={"add-meditation-category"}
                        className="customButton primaryButton"
                      >
                        Add Meditation Category
                      </Link>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomFilters
                        entriesFilter={true}
                        setEnteries={setMeditationEnteries}
                        filterSearch={true}
                        filterSearchValue={meditationFilterSearchValue}
                        setFilterSearchValue={setMeditationFilterSearchValue}
                        dateFilter={true}
                        setDateFrom={setMeditationDateFrom}
                        setDateTo={setMeditationDateTo}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomTable headers={meditationCategoryTitle}>
                        <tbody>
                          {meditationCategoryData &&
                            meditationCategoryData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize">{item.name}</td>
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
                                      <button
                                        type="button"
                                        className="tableAction"
                                        onClick={() => {
                                          meditationDeleteCategoryAction(
                                            item.id,
                                            item.name
                                          );
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
                      {" "}
                      <CustomPagination
                        enteries={meditationCategoryData.length}
                        totalCount={meditationCount}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="stories" title="Stories">
                  <div className="row mb-3">
                    <div className="col-12 text-end">
                      <Link
                        to={"add-story-category"}
                        className="customButton primaryButton"
                      >
                        Add Story Category
                      </Link>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomFilters
                        entriesFilter={true}
                        setEnteries={setStoryEnteries}
                        filterSearch={true}
                        filterSearchValue={storyFilterSearchValue}
                        setFilterSearchValue={setStoryFilterSearchValue}
                        dateFilter={true}
                        setDateFrom={setStoryDateFrom}
                        setDateTo={setStoryDateTo}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomTable headers={storyCategoryTitle}>
                        <tbody>
                          {storyCategoryData &&
                            storyCategoryData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize">{item.name}</td>
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
                                      <button
                                        type="button"
                                        className="tableAction"
                                        onClick={() => {
                                          storyDeleteCategoryAction(
                                            item.id,
                                            item.name
                                          );
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
                      {" "}
                      <CustomPagination
                        enteries={storyCategoryData.length}
                        totalCount={storyCount}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="articles" title="Articles">
                  <div className="row mb-3">
                    <div className="col-12 text-end">
                      <Link
                        to={"add-article-category"}
                        className="customButton primaryButton"
                      >
                        Add Article Category
                      </Link>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomFilters
                        entriesFilter={true}
                        setEnteries={setArticleEnteries}
                        filterSearch={true}
                        filterSearchValue={articleFilterSearchValue}
                        setFilterSearchValue={setArticleFilterSearchValue}
                        dateFilter={true}
                        setDateFrom={setArticleDateFrom}
                        setDateTo={setArticleDateTo}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12">
                      <CustomTable headers={articleCategoryTitle}>
                        <tbody>
                          {articleCategoryData &&
                            articleCategoryData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-capitalize">{item.name}</td>
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
                                      <button
                                        type="button"
                                        className="tableAction"
                                        onClick={() => {
                                          articleDeleteCategoryAction(
                                            item.id,
                                            item.name
                                          );
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
                      {" "}
                      <CustomPagination
                        enteries={articleCategoryData.length}
                        totalCount={articleCount}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default CategoryManagement;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import { DashboardLayout } from "../../Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";

import { placeholderImage } from "../../Assets/images";

import "./style.css";
import BASEURL from "../../Config/global";

const SoundDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [dateAdded, setDateAdded] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${BASEURL}/api/sounds/${id}`);
        setData(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const timestamp = data.created_datetime;
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    setDateAdded(formattedDate);
  }, [data]);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Sound Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3">
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Sound Title:</p>
                  <p>{data.title}</p>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Sound ID:</p>
                  <p>{data.id}</p>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Type:</p>
                  <p>{data.premium ? "Premium" : "Free"}</p>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Sound:</p>
                  {data.audio && (
                    <>
                      <audio className="audioPlayer" controls>
                        <source
                          src={`${BASEURL+data.audio}`}
                          type="audio/mp3"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </>
                  )}
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Category:</p>
                  <p>{data.soundscategoriesname}</p>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Date Added On:</p>
                  <p>{dateAdded}</p>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Thumbnail:</p>
                  <div className="thumbnailInput">
                    <img
                      src={`${BASEURL}/${data.thumbnail}`}
                      alt="Thumbnail"
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-2">
                  <p className="mainLabel">Image:</p>
                  <div className="imageInput">
                    <img
                      src={`${BASEURL}/${data.image}`}
                      alt="Main"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <Link to={`/sound-management/edit-sound/${data.id}`} className="cu  stomButton primaryButton">Edit</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};
export default SoundDetails;

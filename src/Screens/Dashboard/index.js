import { useState, useEffect } from "react";

import {DashboardLayout} from './../../Layout/DashboardLayout'
import StatCard from "../../Components/StatsCard/index.js";
import { stats } from "../../Config/Data";

import "./style.css";

export const Dashboard = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {

    document.title = 'Relax Scofa | Dashboard';

    setStatistics(stats)
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="row">
                {statistics.map((stats) => (
                  <div className="col-md-6 mb-3" key={stats.id}>
                    <StatCard item={stats} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

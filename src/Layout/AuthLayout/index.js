import { Link } from "react-router-dom";

import { logo } from "../../Assets/images";
import "./style.css";

const AuthLayout = (props) => {
  return (
    <>
      <section className="fullPageBg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="fullPage">
                  <div className="row text-center mb-4">
                    <div className="col-12">
                      <div className="logo mt-3">
                        <img src={logo} alt="Logo" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="authFormWrapper">
                        <div className="authHeader">
                          <p className="lightColor smallText fw-semibold text-uppercase m-0">
                            Admin Login
                          </p>
                          <h2 className="authTitle">Welcome</h2>
                        </div>
                        {props?.children}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { AuthLayout };

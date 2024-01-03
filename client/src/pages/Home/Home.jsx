import { ReportCard } from "../../components/ReportCard/reportCard";

export const Home = () => {
  return (
    <>
      <div id="banner">
        <div className="wrapper">
          <div className="bnr_con">
            <div className="bnr_info">
              <h1>Banner</h1>
            </div>
          </div>
        </div>
      </div>

      <div id="main_area">
        <div className="wrapper">
          <div className="main_con">
            <h1>Check it Now</h1>
            <form action=""></form>

            <ReportCard />
          </div>
        </div>
      </div>
    </>
  );
};

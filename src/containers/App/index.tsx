import React from "react";
import "./App.css";
import ContentWrapper from "../../routes/RoutersWrapper/index";
import Navbar from "./../../components/common/Navbar/index";

type Props = {};

const App: React.FC<Props> = (props: Props) => {
  return (
    <div>
      {/* TODO: <Header /> */}
      <Navbar />
      <ContentWrapper />
      {/* TODO: <Footer /> */}
    </div>
  );
};

export default App;

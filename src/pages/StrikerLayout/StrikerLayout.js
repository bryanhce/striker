import React, { useState } from "react";
import "./StrikerLayout.css";
import "antd/dist/antd.min.css";
import StrikerMenu from "../../components/StrikerMenu/StrikerMenu";

import { Layout, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const StrikerLayout = (props) => {
  const [isCollapse, setCollapse] = useState(false);

  const onCollapse = () => {
    setCollapse(!isCollapse);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "9vh",
        }}
      >
        <img
          src={require("../../images/striker-title.png")}
          className="striker-title"
          alt="striker title"
        />
      </Header>
      <Layout className="site-layout">
        <Sider
          collapsible
          collapsed={isCollapse}
          onCollapse={onCollapse}
          data-testid="slider"
        >
          <div className="logo" />
          <StrikerMenu />
        </Sider>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          ></Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
          <Footer
            style={{
              textAlign: "center",
            }}
            data-testid="footer"
          >
            Striker ©2022 Created by Head in the Clouds
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default StrikerLayout;

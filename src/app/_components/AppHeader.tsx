import React from "react";
import { Col, Layout, Row, Typography } from "antd";

const { Header } = Layout;
const { Title } = Typography;

interface AppHeaderProps {
  appTitle: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ appTitle }) => {
  return (
    <Header className="header">
      <Row>
        <Col>
          <Title level={3} className="app-title">
            {appTitle}
          </Title>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;

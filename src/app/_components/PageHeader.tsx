// PageHeader.tsx
import React from "react";
import { Row, Col, Button, Badge, Typography } from "antd";
import {
  DownloadOutlined,
  AlignLeftOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

interface PageHeaderProps {
  pageTitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageTitle }) => {
  return (
    <Row className="mb-1" gutter={[16, 10]}>
      <Col flex="none">
        <Title level={4} className="mb-0">
          {pageTitle}
        </Title>
      </Col>
      <Col flex={1}>
        <Row
          gutter={[16, 5]}
          justify={{
            xs: "start",
            md: "end",
          }}
        >
          <Col>
            <Button
              icon={<DownloadOutlined />}
              type="default"
              className="icon-right"
            >
              Export to PDF
            </Button>
          </Col>
          <Col>
            <Button
              icon={<AlignLeftOutlined />}
              type="default"
              className="icon-right"
            >
              <span>
                Notes
                <Text className="weak-text"> (3)</Text>
              </span>
            </Button>
          </Col>
          <Col>
            <Button
              icon={<FilterOutlined />}
              type="default"
              className="icon-right"
            >
              <Badge count={4} overflowCount={3} className="primary" />
              Filter
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default PageHeader;

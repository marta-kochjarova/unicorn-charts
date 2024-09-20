"use client";
import { Avatar, Badge, Button, Card, Col, Layout, Row, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "./globals.css";
import {
  AlignLeftOutlined,
  CommentOutlined,
  DownloadOutlined,
  FilterOutlined,
  HeartFilled,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function Home() {
  const { Paragraph, Title, Text } = Typography;

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={3} className="app-title">
          App Title
        </Title>
      </Header>

      <Content className="content">
        <Row className="mb-1" gutter={[16, 10]}>
          <Col flex="none">
            <Title level={4} className="mb-0">
              Page Title
            </Title>
          </Col>
          <Col flex={1}>
            <Row 
              gutter={[16, 5]}
              justify={{
                xs: 'start',
                md: 'end',
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

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card className="card">
              <Title level={5}>Chart Title</Title>
              <img
                src="https://via.placeholder.com/400"
                alt="Card 1"
                className="cardImage mb-1"
              />
              <Row gutter={[16, 10]}>
                <Col>
                  <Avatar size="small" icon={<UserOutlined />} />
                </Col>
                <Col flex={1}>
                  <Row justify="end" gutter={16}>
                    <Col>
                    3
                      <Button
                        icon={<CommentOutlined />}
                        type="text"
                        className="icon-right"
                      >
                      </Button>
                    </Col>
                    <Col>
                    12
                      <Button
                        icon={<HeartOutlined />}
                        type="text"
                        className="icon-right"
                      >
                      </Button>
                    </Col>
                    {/* <HeartFilled /> */}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="card">
              <Title level={5}>Chart Title</Title>
              <img
                src="https://via.placeholder.com/400"
                alt="Card 1"
                className="cardImage mb-1"
              />
              <Row gutter={[16, 10]}>
                <Col>
                  <Avatar size="small" icon={<UserOutlined />} />
                </Col>
                <Col flex={1}>
                  <Row justify="end" gutter={16}>
                    <Col>
                    3
                      <Button
                        icon={<CommentOutlined />}
                        type="text"
                        className="icon-right"
                      >
                      </Button>
                    </Col>
                    <Col>
                    12
                      <Button
                        icon={<HeartOutlined />}
                        type="text"
                        className="icon-right"
                      >
                      </Button>
                    </Col>
                    {/* <HeartFilled /> */}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

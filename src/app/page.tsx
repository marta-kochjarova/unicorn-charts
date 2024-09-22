"use client";
import { Avatar, Button, Card, Col, Empty, Layout, Row, Typography} from "antd";
import { Content } from "antd/es/layout/layout";
import "./globals.css";
import { CommentOutlined, HeartFilled, HeartOutlined, UserOutlined } from "@ant-design/icons";
import Chart from "./_components/Chart";
import getCovidDataByChartName from "./api/_fetch/covid-api";
import { trpc } from "./clients/trpcClient";
import { useEffect, useState } from "react";
import AppHeader from "./_components/AppHeader";
import { CovidData, CovidMetric } from "./_utils/covidDataTypes";
import PageHeader from "./_components/PageHeader";

interface FinalCharts{
  charts: FinalChart[]
}

interface FinalChart{
  id: number, 
  data: CovidMetric[],
  likes: number
}

export default function Home() {
  const { Title, Text } = Typography;

  // Fetch charts with likes using trpc
  const { data: chartsWithLikes, error, isLoading } = trpc.getChartsWithLikes.useQuery();

  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [finalCharts, setFinalCharts] = useState<FinalCharts[]>([]);

  // Fetch COVID data after charts are loaded
  useEffect(() => {
    if (chartsWithLikes) {
      const fetchCovidData = async () => {
        const allCovidData = await Promise.all(
          chartsWithLikes.map((chart) => getCovidDataByChartName(chart.title))
        );
        setCovidData(allCovidData);
      };
      fetchCovidData();
    }

  }, [chartsWithLikes]);




  return (
    <Layout className="layout">
      <AppHeader appTitle={'App Title'}/>
      <Content className="content">
        <PageHeader pageTitle={'Page Title'}/>

        <Row gutter={[16, 16]}>
          {isLoading ? (
            <Empty description={
              <Text>
                Loading charts...
              </Text>
            }/>
          ) : error ? (
            <p>Error fetching charts: {error.message}</p>
          ) : (
            covidData.map((chart, index) => {
              const chartTitle = chart.results[0].metric;
              const chartLikes =
                chartsWithLikes.find(
                  (chartWithLikes) => chartWithLikes.title === chartTitle
                );
              console.log(chartLikes)
              return (
                <Col xs={{ span: 24 }}  lg={{ span: 12 }} key={index}>
                  <Card className="card">
                    <Title level={5}>{chartTitle}</Title>
                    <Chart
                      data={chart.results.map((result) => ({
                        date: result.date,
                        value: result.metric_value,
                      }))}
                      type={"line"}
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
                            />
                          </Col>
                          <Col>
                          {typeof chartLikes === "number" ? chartLikes : 10}
                            <Button
                              icon={<HeartOutlined />}
                              type="text"
                              className="icon-right"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Content>
    </Layout>
  );
}

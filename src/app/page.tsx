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
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const { Title, Text } = Typography;
  const [covidData, setCovidData] = useState<CovidData[]>([]);

  // Fetch current user from local storage or create if user doesnt exist
  const CheckOrCreateUserInLS = (): string => {
    if (typeof localStorage !== 'undefined') {
      let userUUID = localStorage.getItem("userUUID"); 
      if (!userUUID) {
        userUUID = uuidv4();
        localStorage.setItem("userUUID", userUUID);
      }
      return userUUID;
    } 
    return '';
  }

  //Fetch user & chart data from DB
  const { data: userAndChartData, error, isLoading, refetch } = trpc.getUserAndChartData.useQuery(CheckOrCreateUserInLS());

  const { user: currentUser, charts: chartsWithLikes } = userAndChartData && 'user' in userAndChartData && 'charts' in userAndChartData 
  ? userAndChartData 
  : { user: undefined, charts: undefined };

  useEffect(() => {
    if (chartsWithLikes) {
      const fetchCovidData = async () => {
        const allCovidData = await Promise.all(
          chartsWithLikes.map(async (chart) => ({
            chartId: chart.id,
            chartData: await getCovidDataByChartName(chart.title),
            chartLikes: Number(chart.likesCount),
            isLikedByCurrentUser: chart.isLikedByUser
          }))
        );
        setCovidData(allCovidData);
        console.log(allCovidData)
      };
      fetchCovidData();
    }
  }, [chartsWithLikes]);

  //handling like feature
  const toggleLikeMutation = trpc.toggleLike.useMutation();

  interface ToggleLikeParams {
    userId: number | undefined;
    chartId: number | undefined;
  }

  const toggleLike = ({userId, chartId}: ToggleLikeParams) => {
    if(userId != undefined && chartId != undefined){
      toggleLikeMutation.mutate({userId, chartId});
      refetch();
      setCovidData(covidData.map((data) => { 
        return data.chartId == chartId ? {
        ...data,
        isLikedByCurrentUser: !data.isLikedByCurrentUser,
        chartLikes: data.isLikedByCurrentUser ? Number(data.chartLikes)-1 : Number(data.chartLikes)+1
        } : data}));
    }
  }

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
            covidData.map((covidDataItem, index) => (
              <Col xs={{ span: 24 }}  lg={{ span: 12 }} key={index}>
              <Card className="card">
                <Title level={5}>{covidDataItem.chartData.results[0].metric} - {covidDataItem.chartId}</Title>
                <Chart
                  data={covidDataItem.chartData.results.map((result) => ({
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
                        {covidDataItem.chartLikes}
                        <Button
                          icon={covidDataItem.isLikedByCurrentUser ? <HeartFilled />  :<HeartOutlined />}
                          type="text"
                          className="icon-right"
                          onClick={() => toggleLike({
                              userId: currentUser?.id,
                              chartId: covidDataItem?.chartId
                            })}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
            ))
          )}
        </Row>
      </Content>
    </Layout>
  );
}

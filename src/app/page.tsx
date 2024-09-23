"use client";
import { Col, Empty, Layout, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import "./globals.css";
import getCovidDataByChartName from "./api/_fetch/covid-api";
import { trpc } from "./clients/trpcClient";
import { useEffect, useState } from "react";
import AppHeader from "./_components/AppHeader";
import { CovidData } from "./_utils/covidDataTypes";
import PageHeader from "./_components/PageHeader";
import { v4 as uuidv4 } from "uuid";
import ChartCard from "./_components/ChartCard";

export default function Home() {
  const { Text } = Typography;
  const [covidData, setCovidData] = useState<CovidData[]>([]);

  // Fetch current user from local storage or create if user doesnt exist
  const CheckOrCreateUserInLS = (): string => {
    if (typeof localStorage !== "undefined") {
      let userUUID = localStorage.getItem("userUUID");
      if (!userUUID) {
        userUUID = uuidv4();
        localStorage.setItem("userUUID", userUUID);
      }
      return userUUID;
    }
    return "";
  };

  //Fetch user & chart data from DB
  const { data: userAndChartData, error, isLoading, refetch } = trpc.getUserAndChartData.useQuery(CheckOrCreateUserInLS());
  const { user: currentUser, charts: chartsWithLikes } =
    userAndChartData && "user" in userAndChartData && "charts" in userAndChartData
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
            isLikedByCurrentUser: chart.isLikedByUser,
          }))
        );
        setCovidData(allCovidData);
        console.log(allCovidData);
      };
      fetchCovidData();
    }
  }, [chartsWithLikes]);

  return (
    <Layout className="layout">
      <AppHeader appTitle={"App Title"} />
      <Content className="content">
        <PageHeader pageTitle={"Page Title"} />
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <Empty description={<Text> Loading charts... </Text>} />
          ) : error ? (
            <Text>Error fetching charts: {error.message}</Text>
          ) : (
            covidData.map((covidDataItem, index) => (
              <Col xs={{ span: 24 }} lg={{ span: 12 }} key={index}>
                <ChartCard
                  covidDataItem={covidDataItem}
                  refetch={refetch}
                  covidData={covidData}
                  setCovidData={setCovidData}
                  currentUser={currentUser}
                />
              </Col>
            ))
          )}
        </Row>
      </Content>
    </Layout>
  );
}

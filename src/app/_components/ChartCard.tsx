import { UserOutlined, CommentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Card, Row, Col, Avatar, Button, Typography } from "antd";
import React from "react";
import { CovidData } from "../_utils/covidDataTypes";
import Chart from "./Chart";
import { trpc } from "../clients/trpcClient";
import { ToggleLikeParams } from "../_utils/LikeTypes";
import { QueryObserverResult } from "@tanstack/react-query";

interface ChartCardProps {
  covidDataItem: CovidData;
  refetch: () => Promise<QueryObserverResult<any, any>>;
  covidData: CovidData[];
  setCovidData: React.Dispatch<React.SetStateAction<CovidData[]>>;
  currentUser?: { id: number };
}

const ChartCard: React.FC<ChartCardProps> = ({ covidDataItem, refetch, covidData, setCovidData, currentUser }) => {
  const { Title } = Typography;

  //handling the like feature
  const toggleLikeMutation = trpc.toggleLike.useMutation();

  const toggleLike = ({ userId, chartId }: ToggleLikeParams) => {
    if (userId != undefined && chartId != undefined) {
      toggleLikeMutation.mutate({ userId, chartId });
      refetch();
      setCovidData(
        covidData.map((data) => {
          return data.chartId == chartId
            ? {
                ...data,
                isLikedByCurrentUser: !data.isLikedByCurrentUser,
                chartLikes: data.isLikedByCurrentUser
                  ? Number(data.chartLikes) - 1
                  : Number(data.chartLikes) + 1,
              }
            : data;
        })
      );
    }
  };

  return (
    <Card className="card">
      <Title level={5}>
        {covidDataItem.chartData.results[0].metric}
      </Title>
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
              <Button  icon={<CommentOutlined />} type="text" className="icon-right" />
            </Col>
            <Col>
              {covidDataItem.chartLikes}
              <Button 
                icon={ covidDataItem.isLikedByCurrentUser ? ( <HeartFilled /> ) : ( <HeartOutlined /> )}
                type="text"
                className="icon-right"
                onClick={() =>
                  toggleLike({
                    userId: currentUser?.id,
                    chartId: covidDataItem?.chartId,
                  })
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default ChartCard;

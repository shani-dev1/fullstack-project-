import React, { useState } from "react";
import { Card, Rate, Tag, Typography } from "antd";
import { CompetitionItem } from "./competitionsTypes";

const { Meta } = Card;
const { Text } = Typography;

interface Props {
  competitionItem: CompetitionItem;
}

const CompetitionCard = ({ competitionItem }: Props) => {
  const [value, setValue] = useState<number | null>(null);

  const handleRatingChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card
      hoverable
      style={{
        width: 320,
        borderRadius: 16,
        overflow: "hidden",
        background: "#1f1f1f",
        border: "1px solid #ffc107",
        boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
      }}
      cover={
        <img
          alt="תמונה לתחרות"
          src={competitionItem.fileUrl}
          style={{
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
      }
    >
      <Meta
        title={
          <div style={{ color: "#ffc107", fontWeight: "bold", fontSize: "18px" }}>
            קטגוריה: {competitionItem.category}
          </div>
        }
        description={
          <div>
            <Text type="secondary" style={{ color: "#ccc", fontSize: "14px" }}>
              הועלה על ידי: {competitionItem.ownerEmail}
            </Text>
            <br />
            <Tag color="gold" style={{ marginTop: 8, fontSize: 14 }}>
              ציון: {competitionItem.score}
            </Tag>

            <div
              style={{
                marginTop: 12,
                backgroundColor: "#2a2a2a",
                padding: "8px 12px",
                borderRadius: "8px",
                display: "inline-block",
              }}
            >
              <Rate
                allowClear
                value={value ?? competitionItem.score ?? 0}
                onChange={handleRatingChange}
                style={{
                  color: "#ffca28",
                  fontSize: 24,
                }}
              />
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default CompetitionCard;

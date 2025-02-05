import { View, Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { LineChart, lineDataItem } from "react-native-gifted-charts";

// Define types for chart data and configuration
interface ChartDataPoint {
  value: number;
  label: string;
  timestamp?: number;
}

interface ChartConfig {
  thickness?: number;
  color?: string;
  maxValue?: number;
  noOfSections?: number;
  spacing?: number;
  initialSpacing?: number;
  yAxisOffset?: number;
  xAxisLabelTextStyle?: StyleProp<TextStyle>;
  yAxisTextStyle?: StyleProp<TextStyle>;
  rulesColor?: string;
  rulesType?: "solid" | "dashed";
  showReferenceLine1?: boolean;
  referenceLine1Config?: {
    color?: string;
    dashWidth?: number;
    dashGap?: number;
  };
}

interface ChartProps {
  chartData: ChartDataPoint[];
  chartConfig?: ChartConfig;
}

const DEFAULT_CONFIG: ChartConfig = {
  thickness: 3,
  color: "#41337a",
  maxValue: 600,
  noOfSections: 6,
  spacing: 48,
  initialSpacing: 26,
  yAxisOffset: 20,
  rulesColor: "#4a4a4a",
  rulesType: "solid",
  showReferenceLine1: true,
  referenceLine1Config: {
    color: "#8171c3",
    dashWidth: 2,
    dashGap: 4,
  },
  xAxisLabelTextStyle: {
    color: "gray",
    width: 80,
    marginLeft: 10,
  },
  yAxisTextStyle: {
    color: "gray",
  },
};

const CustomDataPoint = () => (
  <View
    style={{
      width: 12,
      height: 12,
      backgroundColor: "#ffffff",
      borderColor: "#8171c3",
      borderWidth: 3,
      borderRadius: 10,
    }}
  />
);

const CustomLabel = ({ label }: { label: string }) => (
  <View style={{ width: 70, marginLeft: 7 }}>
    <Text style={{ color: "white", fontWeight: "bold" }}>{label}</Text>
  </View>
);

const Chart = ({ chartData, chartConfig = {} }: ChartProps) => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...chartConfig };

  // Create NEW objects to avoid mutation issues
  const formattedData = chartData.map((item) => ({
    ...item, // Preserve original properties
    customDataPoint: <CustomDataPoint />,
    labelComponent: () => <CustomLabel label={item.label} />,
  }));

  return (
    <View className="w-full">
      <LineChart
        {...mergedConfig}
        data={formattedData}
        dataPointsComponent={CustomDataPoint}
        curved
        isAnimated
        animationDuration={400}
        hideRules={false}
        focusEnabled
        showStripOnFocus
        showTextOnFocus
        stripColor="#8171c3"
        stripWidth={2}
      />
    </View>
  );
};

export default Chart;
export type { ChartDataPoint, ChartConfig };
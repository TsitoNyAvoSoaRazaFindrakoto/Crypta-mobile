import { View, Text, StyleProp, TextStyle, ScrollView } from "react-native";
import React, { useState } from "react";
import { LineChart, lineDataItem, lineDataItemNullSafe } from "react-native-gifted-charts";

// Define types for chart data and configuration
interface ChartDataPoint {
  value: number;
  label: string;
  timestamp?: number;
}

interface ChartConfig {
  thickness?: number;
  height?: number;
  width?: number;
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
	yAxisOffset : 23,
  rulesColor: "#4a4a4a",
  rulesType: "solid",
  showReferenceLine1: true,
  referenceLine1Config: {
    color: "#8171c3",
    dashWidth: 2,
    dashGap: 4,
  },
  yAxisTextStyle: {
    color: "gray",
  },
};

const CustomDataPoint = () => (
  <View
    style={{
      width: 16,
      height: 16,
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

  return (
    <ScrollView className="w-full h-3/4 p-6">
      <LineChart
				{...mergedConfig}
        data={chartData}
        isAnimated
				showDataPointLabelOnFocus={true}
        animationDuration={400}
        hideRules={false}
        focusEnabled
        showTextOnFocus
      />
    </ScrollView>
  );
};

export default Chart;
export type { ChartDataPoint, ChartConfig };
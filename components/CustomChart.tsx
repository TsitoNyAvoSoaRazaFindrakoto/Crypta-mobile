import { View, Text, StyleProp, TextStyle, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { LineChart } from "react-native-gifted-charts";

interface ChartDataPoint {
  value: number;
  label: string;
  dataPointText?: string;
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

const Chart = ({ chartData, chartConfig = {} }: ChartProps) => {
  // Calculer dynamiquement maxValue et yAxisOffset
  const computedValues = useMemo(() => {
    if (!chartData.length) return { maxValue: 1000, yAxisOffset: 0, noOfSections: 5 };
    
    const values = chartData.map(point => point.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    
    // Ajouter et soustraire 200 pour les marges
    const adjustedMaxValue = maxValue + 200;
    const adjustedMinValue = Math.max(0, minValue - 200); // Éviter les valeurs négatives
    
    // yAxisOffset basé sur la valeur minimale ajustée
    const yAxisOffset = adjustedMinValue;
    
    return {
      maxValue: adjustedMaxValue,
      yAxisOffset,
      noOfSections: 5
    };
  }, [chartData]);

  const DEFAULT_CONFIG: ChartConfig = {
    thickness: 3,
    color: "#4f46e5",
    spacing: 50,
    initialSpacing: 20,
    rulesColor: "#94a3b8",
    rulesType: "dashed",
    showReferenceLine1: true,
    referenceLine1Config: {
      color: "#818cf8",
      dashWidth: 2,
      dashGap: 4,
    },
    yAxisTextStyle: {
      color: "#94a3b8",
      fontSize: 12,
    },
    height: 220,
    width: Dimensions.get('window').width - 80,
    ...computedValues
  };

  const mergedConfig = { ...DEFAULT_CONFIG, ...chartConfig };

  return (
    <View className="w-full items-center justify-center bg-white/5 rounded-xl p-4">
      <LineChart
        {...mergedConfig}
        data={chartData}
        isAnimated
        curved
        animationDuration={800}
        showDataPointOnTop
        hideDataPoints={false}
        showTextOnTop
        textShiftY={-20}
        textShiftX={0}
        textFontSize={12}
        dataPointsHeight={10}
        dataPointsWidth={10}
        dataPointsColor="#4f46e5"
        dataPointsRadius={5}
        startFillColor="rgba(79, 70, 229, 0.2)"
        endFillColor="rgba(79, 70, 229, 0.01)"
        xAxisColor="#94a3b8"
        yAxisColor="#94a3b8"
        xAxisLabelTextStyle={{ color: "#94a3b8", fontSize: 12 }}
        yAxisTextStyle={{ color: "#94a3b8", fontSize: 12 }}
        backgroundColor="transparent"
        rulesThickness={0.5}
        verticalLinesThickness={0.5}
        horizontalLinesThickness={0.5}
        adjustToWidth
        pressEnabled={false}
      />
    </View>
  );
};

export default Chart;
export type { ChartDataPoint, ChartConfig };
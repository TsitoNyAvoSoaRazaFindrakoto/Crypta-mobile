import {
  View,
  Text,
  StyleProp,
  TextStyle,
  Dimensions,
  ScrollView,
} from "react-native";
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
  hideRules?: boolean;
  hideYAxisText?: boolean;
  yAxisLabelWidth?: number;
  formatYLabel?: (label: number) => string;
}

interface ChartProps {
  chartData: ChartDataPoint[];
  chartConfig?: ChartConfig;
}

const Chart = ({ chartData, chartConfig = {} }: ChartProps) => {
  // Calculer dynamiquement maxValue et yAxisOffset
  const computedValues = useMemo(() => {
    if (!chartData.length)
      return { maxValue: 12000, yAxisOffset: 0, noOfSections: 6 };

    const values = chartData.map((point) => point.value);
    const maxValue = Math.max(...values);

    // Calculer les valeurs ajustées selon les nouvelles règles
    // Si data max = 9000 -> y max = 12000 (arrondi pour une meilleure lisibilité)
    const adjustedMaxValue = Math.ceil((maxValue + 3000) / 2000) * 2000;

    // Toujours commencer à 0 pour plus de cohérence
    const adjustedMinValue = Math.min(0, Math.min(...values)-2000);

    // Calculer le nombre de sections pour un écart de 2000
    const noOfSections = adjustedMaxValue / 2000;

    return {
      maxValue: adjustedMaxValue,
      yAxisOffset: adjustedMinValue,
      noOfSections,
    };
  }, [chartData]);

  const formatYLabel = (value: number) => {
    return `${(value / 1000).toFixed(1)}k`;
  };

  // Calculer la largeur du graphique en fonction du nombre de points
  const chartWidth = Math.max(
    Dimensions.get("window").width - 60,
    chartData.length * 60 // 60 pixels par point de données
  );

  const DEFAULT_CONFIG: ChartConfig = {
    thickness: 2.5,
    color: "#4f46e5",
    spacing: 60,
    initialSpacing: 30,
    rulesColor: "#94a3b8",
    rulesType: "dashed",
    showReferenceLine1: true,
    referenceLine1Config: {
      color: "#818cf8",
      dashWidth: 3,
      dashGap: 5,
    },
    yAxisTextStyle: {
      color: "#64748b",
      fontSize: 12,
      fontWeight: "600",
    },
    xAxisLabelTextStyle: {
      color: "#64748b",
      fontSize: 10,
      fontWeight: "600",
    },
    height: 250,
    width: chartWidth,
    yAxisLabelWidth: 50,
    formatYLabel,
  };

  const mergedConfig = { ...DEFAULT_CONFIG, ...chartConfig };

  return (
    <View className="items-center justify-center p-4 overflow-hidden">
      <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 1 }}>
        <LineChart
          {...mergedConfig}
          data={chartData}
          isAnimated
          curved
          animationDuration={1000}
          showDataPointOnTop
          showTextOnTop
          textShiftY={-10}
          textShiftX={0}
          textFontSize={10}
          dataPointsHeight={10}
          dataPointsWidth={10}
          dataPointsColor="#4f46e5"
          maxValue={computedValues.maxValue}
					yAxisOffset={computedValues.yAxisOffset}
					noOfSections={computedValues.noOfSections}
        />
      </ScrollView>
    </View>
  );
};

export default Chart;
export type { ChartDataPoint, ChartConfig };
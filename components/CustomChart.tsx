import { View, Text, StyleProp, TextStyle, Dimensions, ScrollView } from "react-native";
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
    if (!chartData.length) return { maxValue: 12000, yAxisOffset: 0, noOfSections: 6 };
    
    const values = chartData.map(point => point.value);
    const maxValue = Math.max(...values);
    
    // Calculer les valeurs ajustées selon les nouvelles règles
    // Si data max = 9000 -> y max = 12000 (arrondi pour une meilleure lisibilité)
    const adjustedMaxValue = Math.ceil((maxValue + 3000) / 2000) * 2000;
    
    // Toujours commencer à 0 pour plus de cohérence
    const adjustedMinValue = 0;
    
    // Calculer le nombre de sections pour un écart de 2000
    const noOfSections = adjustedMaxValue / 2000;
    
    return {
      maxValue: adjustedMaxValue,
      yAxisOffset: adjustedMinValue,
      noOfSections
    };
  }, [chartData]);

  const formatYLabel = (value: number) => {
    return `${(value / 1000).toFixed(1)}k`;
  };

  // Calculer la largeur du graphique en fonction du nombre de points
  const chartWidth = Math.max(
    Dimensions.get('window').width - 60,
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
    hideRules: false,
    yAxisLabelWidth: 50,
    formatYLabel,
    ...computedValues
  };

  const mergedConfig = { ...DEFAULT_CONFIG, ...chartConfig };

  return (
    <View className="w-full items-center justify-center bg-white/5 rounded-xl p-4">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <LineChart
          {...mergedConfig}
          data={chartData}
          isAnimated
          curved
          animationDuration={1000}
          showDataPointOnTop
          hideDataPoints={false}
          showTextOnTop
          textShiftY={-20}
          textShiftX={0}
          textFontSize={11}
          dataPointsHeight={8}
          dataPointsWidth={8}
          dataPointsColor="#4f46e5"
          pressEnabled
          onPress={(item: any) => {
            console.log('Point pressed:', item);
          }}
          focusEnabled
          showFocusPoint
          focusPointColor="#4f46e5"
          focusPointRadius={5}
          focusPointStrokeWidth={2}
          focusPointStrokeColor="#fff"
        />
      </ScrollView>
    </View>
  );
};

export default Chart;
export type { ChartDataPoint, ChartConfig };
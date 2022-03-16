import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

export function CovidChart(props){
    const { showErrors, chartConfig, isProvince } = props;
    return(
        <View>
        {!showErrors ?
          chartConfig?.datasets?.length ? 
          <LineChart
            data={{
              datasets: chartConfig.datasets,
              legend: isProvince ? ["Casi totali"] : ["Casi totali", "Infetti", "Guariti", "Deceduti" ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={Dimensions.get("window").width / 1.3}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0, 
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 5,
              },
            }}
            fromZero
            bezier
            style={{
              margin: 8,
              borderRadius: 5,
            }}
          />
        : <View style={styles.container}><Text>Caricamento...</Text></View>
        : <View style={styles.container}><Text>Si è verificato un errore</Text></View>
    }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      paddingVertical: 30,
      width: Dimensions.get("window").width
    },
  });
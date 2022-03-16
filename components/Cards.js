import { View, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-elements';

export function Cards(props) {
    const { data, isProvince } = props;
    return(
        <View>
            <Card containerStyle={{borderRadius: 5, padding: 0, margin: 8}}>
            <Card.Title>
                <View style={{paddingHorizontal: 15, paddingTop: 15, width: Dimensions.get("window").width - 16}}>
                    <Text style={{fontWeight: 'bold', textAlign: 'center', width: '100%', fontSize: 20}}>{data.data}</Text>
                </View>
            </Card.Title>
            <Card.Divider />
                <View style={{paddingHorizontal: 15, paddingBottom: isProvince ? 0 : 15, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: 15}}>
                    <Text style={{color: 'rgb(255, 99, 132)', fontWeight: 'bold'}}>Casi totali</Text>
                    <Text style={{fontSize: 20, textAlign: 'center', color: 'rgb(255, 99, 132)', fontWeight: 'bold'}}>{data.casiTotali}</Text>
                </View>
                {
                    !isProvince ?
                    <View>
                        <View style={{paddingHorizontal: 15, paddingBottom: 15, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: 15}}>
                            <Text style={{color: 'rgb(54, 162, 235)', fontWeight: 'bold'}}>Infetti</Text>
                            <Text style={{fontSize: 20, textAlign: 'center', color: 'rgb(54, 162, 235)', fontWeight: 'bold'}}>{data.infetti}</Text>
                        </View>

                        <View style={{paddingHorizontal: 15, paddingBottom: 15, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginBottom: 15}}>
                            <Text style={{color: 'rgb(255, 206, 86)', fontWeight: 'bold'}}>Guariti</Text>
                            <Text style={{fontSize: 20, textAlign: 'center', color: 'rgb(255, 206, 86)', fontWeight: 'bold'}}>{data.guariti}</Text>
                        </View>

                        <View style={{paddingHorizontal: 15, paddingBottom: 15, display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color: 'rgb(75, 192, 192)', fontWeight: 'bold'}}>Deceduti</Text>
                            <Text style={{fontSize: 20, textAlign: 'center', color: 'rgb(75, 192, 192)', fontWeight: 'bold'}}>{data.deceduti}</Text>
                        </View> 
                    </View>:
                    null
                }
          </Card>
        </View>
    )
}
import { FlatList, Text, View } from 'react-native';
import { Cards } from './Cards';

export function CardList(props){
    const { data, isProvince } = props;
    return (
        <View>
            {
                data.length ? 
                data.map((item, i) => <Cards data={item} isProvince={isProvince} key={i}/>) :
                null
            }
        </View>
    )
}
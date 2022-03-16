import { FlatList, Text } from 'react-native';
import { Cards } from './Cards';

export function CardList(props){
    const { data, isProvince } = props;
    return (
        <FlatList
        data={data}
        renderItem={item => <Cards data={item} isProvince={isProvince} />}
        keyExtractor={(item,i) => i}>
        </FlatList>
    )
}
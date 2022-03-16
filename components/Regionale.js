import { StyleSheet, Text, View, Dimensions, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { CovidChart } from './CovidChart';
import { datiAndamentoTotale, datiStampa} from '../utils/general';
import SelectDropdown from 'react-native-select-dropdown';
import { CardList } from './CardsList';

export function Regionale() {
    const [ selectedRegion, setSelectedRegion ] = useState(undefined);
    const [ regionArray, setRegionArray ] = useState([]);
    const [ showErrors, setShowErrors ] = useState(false);
    const [ regionalChartConfig, setRegionalChartConfig ] = useState({});
    const [ fetchedData, setFetchedData ] = useState(undefined);
    const [ filterNumber, setFilterNumber ] = useState(5);
    const [ datiStampaArray, setDatiStampaArray ] = useState(undefined);
    const [ isLoadingDatiStampa, setIsLoadingDatiStampa ] = useState(false);

    const getListOfRegion = (json) => {
      let lista = [];
      let i;
      for (i = 0; i < 35; i++) {
        if (lista.indexOf(json[i].denominazione_regione) < 0) {
          lista.push(json[i].denominazione_regione);
        }
      }
      return lista.sort();
    };

    const transformForGeneralFunction = (json, selectValue) => {
      let transformed = [];
      json.forEach((giorno) => {
        if (giorno.denominazione_regione === selectValue) {
          transformed.push(giorno);
        }
      });
      return transformed.reverse();
    };

    useEffect(() => {
      fetch(
        `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          json.reverse();
          setRegionArray(getListOfRegion(json));
          setFetchedData(json);
        })
        .catch(() => {
          setShowErrors(true);
        });
    }, [])

    useEffect(() => {
      if(fetchedData && selectedRegion){
        setRegionalChartConfig(datiAndamentoTotale(transformForGeneralFunction(fetchedData, selectedRegion)));
        setDatiStampaArray(datiStampa(fetchedData.filter(data => data.denominazione_regione === selectedRegion), filterNumber, false, false));
      }
    }, [selectedRegion, fetchedData])

    useEffect(() => {
      if(fetchedData && selectedRegion) {
        setDatiStampaArray(datiStampa(fetchedData.filter(data => data.denominazione_regione === selectedRegion), filterNumber, false, false));
        setIsLoadingDatiStampa(false);
      }
    }, [filterNumber])

    return (
      <ScrollView style={{paddingBottom: 30}}>
        <View>
        <View style={{display: 'flex', flex:1, justifyContent:'center', alignItems: 'center', paddingTop: 20, paddingBottom: 10}}>
        <SelectDropdown
          data={regionArray}
          onSelect={(selectedItem, index) => {
            setSelectedRegion(selectedItem); 
            setRegionalChartConfig({})
          }}
          defaultButtonText={"Seleziona una regione"}
          style={{ height: 50, width: Dimensions.get("window").width-15, borderRadius: 5, textAlign: 'center' }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          buttonStyle={{backgroundColor: '#ffffff', borderRadius: 5, width: Dimensions.get("window").width - 16}}
        />
        </View>
        { 
          selectedRegion 
          ? <CovidChart showErrors={showErrors} chartConfig={regionalChartConfig}/>
          : null 
        }
        { datiStampaArray ? 
          <View>
            <CardList data={datiStampaArray} isProvince={false} />
            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 30}}>
              { 
                isLoadingDatiStampa
                ? <Text>Caricamento...</Text>
                : <Button
                  onPress={() => {setFilterNumber(filterNumber + 5), setIsLoadingDatiStampa(true)}}
                  title="Mostra altri"
                  color="#007AFF"
                  accessibilityLabel="Mostra Altri"
                />
              }
            </View>
          </View> :
          null
        }
        </View>
      </ScrollView>
    );
  }
import { StyleSheet, Text, View, Dimensions, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { CovidChart } from './CovidChart';
import { datiAndamentoTotale, datiStampa } from '../utils/general';
import SelectDropdown from 'react-native-select-dropdown';
import { CardList } from './CardsList';

export function Provinciale() {
    const [ selectedProvince, setSelectedProvince ] = useState(undefined);
    const [ provinceArray, setProvinceArray ] = useState([]);
    const [ showErrors, setShowErrors ] = useState(false);
    const [ provincealChartConfig, setProvincealChartConfig ] = useState({});
    const [ fetchedData, setFetchedData ] = useState(undefined);
    const [ filterNumber, setFilterNumber ] = useState(5);
    const [ datiStampaArray, setDatiStampaArray ] = useState(undefined);
    const [ isLoadingDatiStampa, setIsLoadingDatiStampa ] = useState(false);

    const getListOfProvince = (json) => {
      let lista = [];
      let i;
      for (i = 0; i < 100; i++) {
        if (
          lista.indexOf(json[i].denominazione_provincia) < 0 &&
          json[i].denominazione_provincia !==
            "In fase di definizione/aggiornamento"
        ) {
          lista.push(json[i].denominazione_provincia);
        }
      }
      return lista.sort();
    };

    const transformForGeneralFunction = (json, selectValue) => {
      let transformed = [];
      json.forEach((giorno) => {
        if (giorno.denominazione_provincia === selectValue) {
          transformed.push(giorno);
        }
      });
      return transformed.reverse();
    };

    useEffect(() => {
      fetch(
        `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json`
      )
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          json.reverse();
          setProvinceArray(getListOfProvince(json));
          setFetchedData(json);
        })
        .catch(() => {
          setShowErrors(true);
        });
    }, [])

    useEffect(() => {
      if(fetchedData && selectedProvince){
        setProvincealChartConfig(datiAndamentoTotale(transformForGeneralFunction(fetchedData, selectedProvince), true));
        setDatiStampaArray(datiStampa(fetchedData.filter(data => data.denominazione_provincia === selectedProvince), filterNumber, false, true));
      }
    }, [selectedProvince, fetchedData])

    useEffect(() => {
      if(fetchedData && selectedProvince) {
        setDatiStampaArray(datiStampa(fetchedData.filter(data => data.denominazione_provincia === selectedProvince), filterNumber, false, true));
        setIsLoadingDatiStampa(false);
      }
    }, [filterNumber])

    return (
      <ScrollView style={{paddingBottom: 30}}>
        <View style={{display: 'flex', flex:1, justifyContent:'center', alignItems: 'center', paddingTop: 20, paddingBottom: 10}}>
        <SelectDropdown
          data={provinceArray}
          onSelect={(selectedItem, index) => {
            setSelectedProvince(selectedItem); 
            setProvincealChartConfig({})
          }}
          defaultButtonText={"Seleziona una provincia"}
          style={{ height: 50, width: Dimensions.get("window").width-15, borderRadius: 5, textAlign: 'center' }}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          buttonStyle={{backgroundColor: '#ffffff', borderRadius: 5, width: Dimensions.get("window").width - 16}}
        />
        </View>
        { 
          selectedProvince 
          ? <CovidChart showErrors={showErrors} chartConfig={provincealChartConfig} isProvince={true}/>
          : null
        }
        { datiStampaArray ? 
          <View>
            <CardList data={datiStampaArray} isProvince={true} />
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
      </ScrollView>
    );
  }
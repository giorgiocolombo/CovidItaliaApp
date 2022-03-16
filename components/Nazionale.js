import { StyleSheet, View, FlatList, Text, ScrollView, Button, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { datiAndamentoTotale, datiStampa } from '../utils/general';
import { CovidChart } from './CovidChart';
import { CardList } from './CardsList';

export function Nazionale() {
  const [ nationalChartConfig, setNationalChartConfig ] = useState({});
  const [ datiStampaArray, setDatiStampaArray ] = useState(undefined);
  const [ fetchedData, setFetchedData ] = useState(undefined);
  const [ filterNumber, setFilterNumber ] = useState(5);
  const [ showErrors, setShowErrors ] = useState(false);
  const [ isLoadingDatiStampa, setIsLoadingDatiStampa ] = useState(false);

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setNationalChartConfig(datiAndamentoTotale(json));
        setFetchedData(json);
      })
      .catch(() => {
        setShowErrors(true);
      });
  }, [])

  useEffect(() => {
    if(fetchedData) {
      setDatiStampaArray(datiStampa(fetchedData, filterNumber, false, false));
      setIsLoadingDatiStampa(false);
    }
  }, [filterNumber])

  const showDatiStampa = () =>{
    setDatiStampaArray(datiStampa(fetchedData, filterNumber, true, false));
  }

    return (
      <ScrollView style={{paddingBottom: 30, marginTop: 10}}>
        <CovidChart showError={showErrors} chartConfig={nationalChartConfig}/>
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
          <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 30}}>
            <Button
              onPress={() => showDatiStampa()}
              title="Mostra Dati"
              color="#007AFF"
              accessibilityLabel="Mostra Dati"
            />
          </View>
        }
      </ScrollView>
    );
  }
import moment from 'moment';

export const getTotal = (json, arg) => {
    return Object.values(json).map((giorno) => 
        giorno[arg]
    );
  };
  
  export const datiAndamentoTotale = (json, isProvince) => {
    return {
      datasets: isProvince 
      ? [
        {
          data: getTotal(json, "totale_casi"),
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // optional
        }] 
      :[
        {
          data: getTotal(json, "totale_casi"),
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // optional
        },
        {
          data: getTotal(json, "totale_positivi"),
          color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // optional
        },
        {
          data: getTotal(json, "dimessi_guariti"),
          color: (opacity = 1) => `rgba(255, 206, 86, ${opacity})`, // optional
        },
        {
          data: getTotal(json, "deceduti"),
          color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // optional
          strokeWidth: 2 // optional
        },
      ],
    };
  };
  
  export const datiStampa = (json, filterNumber, shouldReverse, isProvince) => {
    const dastampare = json;
    if (shouldReverse) {
      dastampare.reverse();
    }
    return dastampare.slice(0, filterNumber).map((giorno, index) => {
      if (!isProvince) {
        if (index >= dastampare.length - 1) {
          return {
            data: `${moment(giorno.data).locale('it').format("DD MMMM YYYY")}`,
            casiTotali: `${giorno.totale_casi} (${giorno.nuovi_positivi})`,
            infetti: `${giorno.totale_positivi} (${giorno.variazione_totale_positivi})`,
            guariti: `${giorno.dimessi_guariti}`,
            deceduti: `${giorno.deceduti}`
          }
        } else {
          return {
            data: `${moment(giorno.data).locale('it').format("DD MMMM YYYY")}`,
            casiTotali: `${giorno.totale_casi} (${giorno.nuovi_positivi})`,
            infetti: `${giorno.totale_positivi} (${giorno.variazione_totale_positivi})`,
            guariti: `${giorno.dimessi_guariti} (${giorno.dimessi_guariti - dastampare[index + 1].dimessi_guariti})`,
            deceduti: `${giorno.deceduti} (${giorno.deceduti - dastampare[index + 1].deceduti})`
          }
        }
      } else {
        if (index >= dastampare.length - 1) {
          return {
            data: `${moment(giorno.data).locale('it').format("DD MMMM YYYY")}`,
            casiTotali: `${giorno.totale_casi} (${giorno.nuovi_positivi})`,
          }
        } else {
          return {
            data: `${moment(giorno.data).locale('it').format("DD MMMM YYYY")}`,
            casiTotali: `${giorno.totale_casi} (${giorno.totale_casi - dastampare[index + 1].totale_casi})`,
          }
        }
      }
    });
  };
  
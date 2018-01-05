<template>
  <div>
    <div class = 'row'>
      <wqHeader></wqHeader>
    </div>

    <div class = 'row'>
      <div id = 'allWqMeasurablesChart'></div>
      <div id = 'ammoniaChart'></div>
      <div id = 'chlorophyllChart'></div>
      <div id = 'dissolvedoxygenChart'></div>
      <div id = 'nitrateNitriteChart'></div>
      <div id = 'nitrogenChart'></div>
      <div id = 'orthophosphateChart'></div>
      <div id = 'phaeophytinChart'></div>
      <div id = 'precipitationChart'></div>
      <div id = 'salinityChart'></div>
      <div id = 'waterTemperatureChart'></div>
    </div>
  </div>

</template>

<script>
import wqHeader from '../components/Header'
var plotly = require('plotly')("capecodcommission", "p9IkfYcPNC1SELCOpZDk")


export default {

  components: {
    wqHeader
  },

  data () {
    return {
    }
  },

  computed: {
    wqStation () {
      return this.$store.state.wqStation
    }

  },

  mounted () {
    this.$store.dispatch('getStation', this.$route.params.id)
  },

  methods: {

    makeCharts () {

      // RETRIEVE 'wqStation' DATA & SET IT TO 'wqStationData'
      var data = this;
      var wqStationData = data.wqStation;

      // ESTABLISH ARRAYS TO FILL WITH DATA FROM 'wqStationData' FOR CHARTS BELOW TO USE
      const dates = [];
      const depths = [];
      const ammoniumValues = [];
      const cholorophyllValues = [];
      const dissolvedOxygenValues = [];
      const nitrateNitriteValues = [];
      const nitrogenValues = [];
      const orthophosphateValues = [];
      const phaeophytinValues = [];
      const precipitationValues = [];
      const salinityValues = [];
      const waterTemperatureValues =[];

      // USE array.map TO PUSH 'wqStationData' DATA TO ARRAYS ESTABLISHED ABOVE
      var pushThings = wqStationData.map(function(elem, i, wqStationData) {
        dates.push(elem.date);
        depths.push(elem.depth);
        ammoniumValues.push(Math.round(elem.ammonium * 100)/100);
        cholorophyllValues.push(Math.round(elem.chlorophyll * 100)/100);
        dissolvedOxygenValues.push(Math.round(elem.disolvedoxygen * 100)/100);
        nitrateNitriteValues.push(Math.round(elem.nitrate_nitrite * 100)/100);
        nitrogenValues.push(Math.round(elem.nitrogen * 100)/100);
        orthophosphateValues.push(Math.round(elem.orthophosphate * 100)/100);
        phaeophytinValues.push(Math.round(elem.phaeophytin * 100)/100);
        precipitationValues.push(Math.round(elem.precipitation * 100)/100);
        salinityValues.push(Math.round(elem.salinity * 100)/100);
        waterTemperatureValues.push(Math.round(elem.water_temp * 100)/100);
      });

      // SET UP WATER QUALITY MEASURABLES DATA FILLING WITH NECESSARY PLOTLY PARAMETERS
      var ammonium = {
        x: dates,
        y: ammoniumValues,
        line: {color: '#1F77B4'},
        type: 'scatter',
        mode: 'markers',
        name: 'Ammonium (mg/L)'
      };

      var chlorophyll = {
        x: dates,
        y: cholorophyllValues,
        line: {color: '#FF7F0E'},
        type: 'scatter',
        mode: 'markers',
        name: 'Chlorophyll (μg/L)'
      };

      var dissolvedoxygen = {
        x: dates,
        y: dissolvedOxygenValues,
        line: {color: '#2CA02C'},
        type: 'scatter',
        mode: 'markers',
        name: 'Dissolved Oxygen (mg/L)'
      };

      var nitrateNitrite = {
        x: dates,
        y: nitrateNitriteValues,
        line: {color: '#d62728'},
        type: 'scatter',
        mode: 'markers',
        name: 'Nitrate Nitrite (mg/L)'
      };

      var nitrogen = {
        x: dates,
        y: nitrogenValues,
        line: {color: '#9467bd'},
        type: 'scatter',
        mode: 'markers',
        name: 'Nitrogen (mg/L)'
      };

      var orthophosphate = {
        x: dates,
        y: orthophosphateValues,
        line: {color: '#8c564b'},
        type: 'scatter',
        mode: 'markers',
        name: 'Orthophosphate (mg/L)'
      };

      var phaeophytin = {
        x: dates,
        y: phaeophytinValues,
        line: {color: '#e377c2'},
        type: 'scatter',
        mode: 'markers',
        name: 'Phaeophytin (μg/L)'
      };

      var precipitation = {
        x: dates,
        y: precipitationValues,
        line: {color: '#7f7f7f'},
        type: 'scatter',
        mode: 'markers',
        name: 'Precipitation (in)'
      };

      var salinity = {
        x: dates,
        y: salinityValues,
        line: {color: '#bcbd22'},
        type: 'scatter',
        mode: 'markers',
        name: 'Salinity (ppt)'
      };

      var waterTemperature = {
        x: dates,
        y: waterTemperatureValues,
        line: {color: '#17BECF'},
        type: 'scatter',
        mode: 'markers',
        name: 'Water Temperature (°C)'
      };

      // SET UP DATA ARRAYS TO FEED INDIVIDUAL CHARTS
      var allWqMeasurablesData = [ammonium, chlorophyll, dissolvedoxygen, nitrateNitrite, nitrogen, orthophosphate, phaeophytin, precipitation, salinity, waterTemperature];
      var ammoniumData = [ammonium];
      var chlorophyllData = [chlorophyll];
      var dissolvedoxygenData = [dissolvedoxygen];
      var nitrateNitriteData = [nitrateNitrite];
      var nitrogenData = [nitrogen];
      var orthophosphateData = [orthophosphate];
      var phaeophytinData = [phaeophytin];
      var precipitationData = [precipitation];
      var salinityData = [salinity];
      var waterTemperatureData = [waterTemperature];

      // ALL WATER QUALITY MEASURABLES CHART LAYOUT
      var allWqMeasurablesChartLayout = {
        title: 'All Water Quality Measurables'
      };

      // AMMONIA CHART LAYOUT
      var ammoniumChartLayout = {
        title: 'Ammonium (mg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: ['Math.min(ammoniumValues)', 'Math.max(ammoniumValues)'],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // CHLOROPHYLL CHART LAYOUT
      var chlorophyllChartLayout = {
        title: 'Chlorophyll (μg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(cholorophyllValues), Math.max(cholorophyllValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // D.O. CHART LAYOUT
      var dissolvedoxygenChartLayout = {
        title: 'Dissolved Oxygen (mg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(dissolvedOxygenValues), Math.max(dissolvedOxygenValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // NITRATE NITRITE CHART LAYOUT
      var nitrateNitriteChartLayout = {
        title: 'Nitrate Nitrite (mg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(nitrateNitriteValues), Math.max(nitrateNitriteValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // NITROGEN CHART LAYOUT
      var nitrogenChartLayout = {
        title: 'Nitrogen (mg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(nitrogenValues), Math.max(nitrogenValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // ORTHOPHOSPHATE CHART LAYOUT
      var orthophosphateChartLayout = {
        title: 'Orthophosphate (mg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(orthophosphateValues), Math.max(orthophosphateValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // PHAEOPHYTIN CHART LAYOUT
      var phaeophytinChartLayout = {
        title: 'Phaeophytin (μg/L)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(phaeophytinValues), Math.max(phaeophytinValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // PRECIPITATION CHART LAYOUT
      var precipitationChartLayout = {
        title: 'Precipitation (in)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(precipitationValues), Math.max(precipitationValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // SALINITY CHART LAYOUT
      var salinityChartLayout = {
        title: 'Salinity (ppt)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(salinityValues), Math.max(salinityValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // ORTHOPHOSPHATE CHART LAYOUT
      var waterTemperatureChartLayout = {
        title: 'Water Temperature (°C)',
        xaxis: {
          autorange: true,
          range: ['Math.min(dates)', 'Math.max(dates)'],
          rangeslider: {range: ['Math.min(dates)', 'Math.max(dates)']},
          type: 'date'
        },
        yaxis: {
          autorange: true,
          range: [Math.min(waterTemperatureValues), Math.max(waterTemperatureValues)],
          type: 'linear'
        },
        hovermode:'closest'
      };

      // PLOTLY TIME SERIES https://plot.ly/javascript/time-series/

      // SET UP CHARTS FEEDING IN DIV, DATA & LAYOUT FROM ABOVE
      var allWqMeasurablesChart = document.getElementById('allWqMeasurablesChart');
      Plotly.newPlot('allWqMeasurablesChart', allWqMeasurablesData, allWqMeasurablesChartLayout);

      var ammoniaChart = document.getElementById('ammoniaChart');
      Plotly.newPlot('ammoniaChart', ammoniumData, ammoniumChartLayout);

      var chlorophyllChart = document.getElementById('chlorophyllChart');
      Plotly.newPlot('chlorophyllChart', chlorophyllData, chlorophyllChartLayout);

      var dissolvedoxygenChart = document.getElementById('dissolvedoxygenChart');
      Plotly.newPlot('dissolvedoxygenChart', dissolvedoxygenData, dissolvedoxygenChartLayout);

      var nitrateNitriteChart = document.getElementById('nitrateNitriteChart');
      Plotly.newPlot('nitrateNitriteChart', nitrateNitriteData, nitrateNitriteChartLayout);

      var nitrogenChart = document.getElementById('nitrogenChart');
      Plotly.newPlot('nitrogenChart', nitrogenData, nitrogenChartLayout);

      var orthophosphateChart = document.getElementById('orthophosphateChart');
      Plotly.newPlot('orthophosphateChart', orthophosphateData, orthophosphateChartLayout);

      var phaeophytinChart = document.getElementById('phaeophytinChart');
      Plotly.newPlot('phaeophytinChart', phaeophytinData, phaeophytinChartLayout);

      var precipitationChart = document.getElementById('precipitationChart');
      Plotly.newPlot('precipitationChart', precipitationData, precipitationChartLayout);

      var salinityChart = document.getElementById('salinityChart');
      Plotly.newPlot('salinityChart', salinityData, salinityChartLayout);

      var waterTemperatureChart = document.getElementById('waterTemperatureChart');
      Plotly.newPlot('waterTemperatureChart', waterTemperatureData, waterTemperatureChartLayout);

      // USE THE 'nsewdrag' PLOTLY ELEMENT TO HANDLE ON/OFF OF POINTER CURSOR
      const dragLayerAllWqMeasurables = document.getElementsByClassName('nsewdrag')[0];
      const dragLayerAmmonia = document.getElementsByClassName('nsewdrag')[1];
      const dragLayerChlorophyll = document.getElementsByClassName('nsewdrag')[2];
      const dragLayerDissolvedOxygen = document.getElementsByClassName('nsewdrag')[3];
      const dragLayerNitrateNitrite = document.getElementsByClassName('nsewdrag')[4];
      const dragLayerNitrogen = document.getElementsByClassName('nsewdrag')[5];
      const dragLayerOrthophosphate = document.getElementsByClassName('nsewdrag')[6];
      const dragLayerPhaeophytin = document.getElementsByClassName('nsewdrag')[7];
      const dragLayerPrecipitation = document.getElementsByClassName('nsewdrag')[8];
      const dragLayerSalinity = document.getElementsByClassName('nsewdrag')[9];
      const dragLayerWaterTemperature = document.getElementsByClassName('nsewdrag')[10];

      // HANDLE POINTER CURSOR ON/OFF FOR ALL CHARTS
      allWqMeasurablesChart.on('plotly_hover', function(allWqMeasurablesData){
        dragLayerAllWqMeasurables.style.cursor = 'pointer'
      });

      allWqMeasurablesChart.on('plotly_unhover', function(allWqMeasurablesData){
        dragLayerAllWqMeasurables.style.cursor = ''
      });

      ammoniaChart.on('plotly_hover', function(ammoniumData){
        dragLayerAmmonia.style.cursor = 'pointer'
      });

      ammoniaChart.on('plotly_unhover', function(ammoniumData){
        dragLayerAmmonia.style.cursor = ''
      });

      chlorophyllChart.on('plotly_hover', function(chlorophyllData){
        dragLayerChlorophyll.style.cursor = 'pointer'
      });

      chlorophyllChart.on('plotly_unhover', function(chlorophyllData){
        dragLayerChlorophyll.style.cursor = ''
      });

      dissolvedoxygenChart.on('plotly_hover', function(dissolvedoxygenData){
        dragLayerDissolvedOxygen.style.cursor = 'pointer'
      });

      dissolvedoxygenChart.on('plotly_unhover', function(dissolvedoxygenData){
        dragLayerDissolvedOxygen.style.cursor = ''
      });

      nitrateNitriteChart.on('plotly_hover', function(nitrateNitriteData){
        dragLayerNitrateNitrite.style.cursor = 'pointer'
      });

      nitrateNitriteChart.on('plotly_unhover', function(nitrateNitriteData){
        dragLayerNitrateNitrite.style.cursor = ''
      });

      nitrogenChart.on('plotly_hover', function(nitrogenData){
        dragLayerNitrogen.style.cursor = 'pointer'
      });

      nitrogenChart.on('plotly_unhover', function(nitrogenData){
        dragLayerNitrogen.style.cursor = ''
      });

      orthophosphateChart.on('plotly_hover', function(orthophosphateData){
        dragLayerOrthophosphate.style.cursor = 'pointer'
      });

      orthophosphateChart.on('plotly_unhover', function(orthophosphateData){
        dragLayerOrthophosphate.style.cursor = ''
      });

      phaeophytinChart.on('plotly_hover', function(phaeophytinData){
        dragLayerPhaeophytin.style.cursor = 'pointer'
      });

      phaeophytinChart.on('plotly_unhover', function(phaeophytinData){
        dragLayerPhaeophytin.style.cursor = ''
      });

      precipitationChart.on('plotly_hover', function(precipitationData){
        dragLayerPrecipitation.style.cursor = 'pointer'
      });

      precipitationChart.on('plotly_unhover', function(precipitationData){
        dragLayerPrecipitation.style.cursor = ''
      });

      salinityChart.on('plotly_hover', function(salinityData){
        dragLayerSalinity.style.cursor = 'pointer'
      });

      salinityChart.on('plotly_unhover', function(salinityData){
        dragLayerSalinity.style.cursor = ''
      });

      waterTemperatureChart.on('plotly_hover', function(waterTemperatureData){
        dragLayerWaterTemperature.style.cursor = 'pointer'
      });

      waterTemperatureChart.on('plotly_unhover', function(waterTemperatureData){
        dragLayerWaterTemperature.style.cursor = ''
      });

    }

},

  watch: {
    // WATCH THE 'wqStation' STATE PROPERTY SO AS TO CONTINUE TO PRODUCE CHARTS ON USER PAGE RELOADS, ALTERNATING BETWEEN TABLES & CHARTS, etc.
    wqStation: function(data) {
      var thisData = data;
      this.makeCharts(thisData)
    }
  }
}

</script>

<style>
</style>

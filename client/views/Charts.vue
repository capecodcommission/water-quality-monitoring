<template>
  <div>
    <div class = 'row'>
      <wqHeader></wqHeader>
    </div>

    <div class = 'col-md-12'>
      <div id = 'chartsContainer'>
        <div id = 'allWqMeasurablesChart' class = 'responsive-plot'></div>
        <div id = 'ammoniaChart' class = 'responsive-plot'></div>
        <div id = 'chlorophyllChart' class = 'responsive-plot'></div>
        <div id = 'dissolvedoxygenChart' class = 'responsive-plot'></div>
        <div id = 'nitrateNitriteChart' class = 'responsive-plot'></div>
        <div id = 'nitrogenChart' class = 'responsive-plot'></div>
        <div id = 'orthophosphateChart' class = 'responsive-plot'></div>
        <div id = 'phaeophytinChart' class = 'responsive-plot'></div>
        <!-- <div id = 'precipitationChart' class = 'responsive-plot'></div> -->
        <div id = 'salinityChart' class = 'responsive-plot'></div>
        <div id = 'waterTemperatureChart' class = 'responsive-plot'></div>
      </div>
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

    // TODO | WISHLIST | ADD PRELOADER > SOMETHING LIKE: https://codepen.io/MathiasNielsen/pen/jrBEAB

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
      // const precipitationValues = [];
      const salinityValues = [];
      const waterTemperatureValues =[];

      // USE array.map TO PUSH 'wqStationData' DATA TO ARRAYS ESTABLISHED ABOVE
      var pushThings = wqStationData.map(function(elem, i, wqStationData) {
        dates.push(elem.date);
        depths.push(elem.depth);
        if (elem.ammonium !== null) {
          ammoniumValues.push(Math.round(elem.ammonium * 100)/100)
        };
        if (elem.chlorophyll !== null) {
          cholorophyllValues.push(Math.round(elem.chlorophyll * 100)/100)
        };
        if (elem.disolvedoxygen !== null) {
          dissolvedOxygenValues.push(Math.round(elem.disolvedoxygen * 100)/100)
        };
        if (elem.nitrate_nitrite !== null) {
          nitrateNitriteValues.push(Math.round(elem.nitrate_nitrite * 100)/100)
        };
        if (elem.nitrate_nitrite !== null) {
          nitrogenValues.push(Math.round(elem.nitrogen * 100)/100)
        };
        if (elem.orthophosphate !== null) {
          orthophosphateValues.push(Math.round(elem.orthophosphate * 100)/100)
        };
        if (elem.phaeophytin !== null) {
          phaeophytinValues.push(Math.round(elem.phaeophytin * 100)/100)
        };
        // if (elem.precipitation !== null) {
        //   precipitationValues.push(Math.round(elem.precipitation * 100)/100)
        // };
        if (elem.salinity !== null) {
          salinityValues.push(Math.round(elem.salinity * 100)/100)
        };
        if (elem.water_temp !== null) {
          waterTemperatureValues.push(Math.round(elem.water_temp * 100)/100)
        };
      });

      // SET UP WATER QUALITY MEASURABLES DATA FILLING WITH NECESSARY PLOTLY PARAMETERS
      var ammonium = {
        x: dates,
        y: ammoniumValues,
        line: {color: '#1F77B4'},
        type: 'scatter',
        mode: 'markers',
        name: 'Ammonium (μm)'
      };

      var chlorophyll = {
        x: dates,
        y: cholorophyllValues,
        line: {color: '#FF7F0E'},
        type: 'scatter',
        mode: 'markers',
        name: 'Chlorophyll (μm)'
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
        name: 'Nitrate Nitrite (μm)'
      };

      var nitrogen = {
        x: dates,
        y: nitrogenValues,
        line: {color: '#9467bd'},
        type: 'scatter',
        mode: 'markers',
        name: 'Nitrogen (μm)'
      };

      var orthophosphate = {
        x: dates,
        y: orthophosphateValues,
        line: {color: '#8c564b'},
        type: 'scatter',
        mode: 'markers',
        name: 'Orthophosphate (μm)'
      };

      var phaeophytin = {
        x: dates,
        y: phaeophytinValues,
        line: {color: '#e377c2'},
        type: 'scatter',
        mode: 'markers',
        name: 'Phaeophytin (μg/L)'
      };

      // var precipitation = {
      //   x: dates,
      //   y: precipitationValues,
      //   line: {color: '#7f7f7f'},
      //   type: 'scatter',
      //   mode: 'markers',
      //   name: 'Precipitation (in)'
      // };

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
      var allWqMeasurablesData = [ammonium, chlorophyll, dissolvedoxygen, nitrateNitrite, nitrogen, orthophosphate, phaeophytin, salinity, waterTemperature];
      var ammoniumData = [ammonium];
      var chlorophyllData = [chlorophyll];
      var dissolvedoxygenData = [dissolvedoxygen];
      var nitrateNitriteData = [nitrateNitrite];
      var nitrogenData = [nitrogen];
      var orthophosphateData = [orthophosphate];
      var phaeophytinData = [phaeophytin];
      // var precipitationData = [precipitation];
      var salinityData = [salinity];
      var waterTemperatureData = [waterTemperature];

      // ALL WATER QUALITY MEASURABLES CHART LAYOUT
      var allWqMeasurablesChartLayout = {
        title: 'All Water Quality Measurables',
        paper_bgcolor: '#dedee6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        }
      };

      // AMMONIA CHART LAYOUT
      var ammoniumChartLayout = {
        title: 'Ammonium (μm)',
        paper_bgcolor: '#c3c3c6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#d2e3f0',
            bordercolor: '#1F77B4',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest',
      };

      // CHLOROPHYLL CHART LAYOUT
      var chlorophyllChartLayout = {
        title: 'Chlorophyll (μm)',
        paper_bgcolor: '#dedee6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#ffe5ce',
            bordercolor: '#FF7F0E',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // D.O. CHART LAYOUT
      var dissolvedoxygenChartLayout = {
        title: 'Dissolved Oxygen (mg/L)',
        paper_bgcolor: '#c3c3c6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#d4ecd4',
            bordercolor: '#2CA02C',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // NITRATE NITRITE CHART LAYOUT
      var nitrateNitriteChartLayout = {
        title: 'Nitrate Nitrite (μm)',
        paper_bgcolor: '#dedee6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#f6d3d4',
            bordercolor: '#d62728',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // NITROGEN CHART LAYOUT
      var nitrogenChartLayout = {
        title: 'Nitrogen (μm)',
        paper_bgcolor: '#c3c3c6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#e9e0f1',
            bordercolor: '#9467bd',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // ORTHOPHOSPHATE CHART LAYOUT
      var orthophosphateChartLayout = {
        title: 'Orthophosphate (μm)',
        paper_bgcolor: '#dedee6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#e8dddb',
            bordercolor: '#8c564b',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // PHAEOPHYTIN CHART LAYOUT
      var phaeophytinChartLayout = {
        title: 'Phaeophytin (μg/L)',
        paper_bgcolor: '#c3c3c6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bgcolor: '#f9e3f2',
            bordercolor: '#e377c2',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // PRECIPITATION CHART LAYOUT
      // var precipitationChartLayout = {
      //   title: 'Precipitation (in)',
      //   hoverlabel: {
      //    font: {
      //      color: '#e5e5e5'
      //    }
      //   },
      //   xaxis: {
      //     autorange: true,
      //     rangeslider: {
      //      bgcolor: '#f9e3f2',
      //      bordercolor: '#e377c2',
      //      borderwidth: '1'
      //     },
      //     type: 'date'
      //   },
      //   yaxis: {
      //     autorange: true,
      //     type: 'linear'
      //   },
      //   hovermode:'closest'
      // };

      // SALINITY CHART LAYOUT
      var salinityChartLayout = {
        title: 'Salinity (ppt)',
        paper_bgcolor: '#dedee6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bordercolor: '#bcbd22',
            bgcolor: '#f1f1d2',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // ORTHOPHOSPHATE CHART LAYOUT
      var waterTemperatureChartLayout = {
        title: 'Water Temperature (°C)',
        paper_bgcolor: '#c3c3c6',
        hoverlabel: {
          font: {
            color: '#e5e5e5'
          }
        },
        xaxis: {
          autorange: true,
          rangeslider: {
            bordercolor: '#17BECF',
            bgcolor: '#d0f2f5',
            borderwidth: '1'
          },
          type: 'date'
        },
        yaxis: {
          autorange: true,
          type: 'linear'
        },
        hovermode:'closest'
      };

      // RESOURCE
      // PLOTLY TIME SERIES https://plot.ly/javascript/time-series/

      // CONFIGURE THE PLOTLY MODE BAR (TOP RIGHT ON HOVER)
      var configureModeBar = { modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d'], displaylogo: false, showTips: true };

      // SET UP CHARTS FEEDING IN DIV, DATA & LAYOUT FROM ABOVE
      var allWqMeasurablesChart = document.getElementById('allWqMeasurablesChart');
      Plotly.newPlot('allWqMeasurablesChart', allWqMeasurablesData, allWqMeasurablesChartLayout, configureModeBar);

      document.querySelector('[data-title="Reset axes"]').click();

      var ammoniaChart = document.getElementById('ammoniaChart');
      Plotly.newPlot('ammoniaChart', ammoniumData, ammoniumChartLayout, configureModeBar);

      var chlorophyllChart = document.getElementById('chlorophyllChart');
      Plotly.newPlot('chlorophyllChart', chlorophyllData, chlorophyllChartLayout, configureModeBar);

      var dissolvedoxygenChart = document.getElementById('dissolvedoxygenChart');
      Plotly.newPlot('dissolvedoxygenChart', dissolvedoxygenData, dissolvedoxygenChartLayout, configureModeBar);

      var nitrateNitriteChart = document.getElementById('nitrateNitriteChart');
      Plotly.newPlot('nitrateNitriteChart', nitrateNitriteData, nitrateNitriteChartLayout, configureModeBar);

      var nitrogenChart = document.getElementById('nitrogenChart');
      Plotly.newPlot('nitrogenChart', nitrogenData, nitrogenChartLayout, configureModeBar);

      var orthophosphateChart = document.getElementById('orthophosphateChart');
      Plotly.newPlot('orthophosphateChart', orthophosphateData, orthophosphateChartLayout, configureModeBar);

      var phaeophytinChart = document.getElementById('phaeophytinChart');
      Plotly.newPlot('phaeophytinChart', phaeophytinData, phaeophytinChartLayout, configureModeBar);

      // var precipitationChart = document.getElementById('precipitationChart');
      // Plotly.newPlot('precipitationChart', precipitationData, precipitationChartLayout, configureModeBar);

      var salinityChart = document.getElementById('salinityChart');
      Plotly.newPlot('salinityChart', salinityData, salinityChartLayout, configureModeBar);

      var waterTemperatureChart = document.getElementById('waterTemperatureChart');
      Plotly.newPlot('waterTemperatureChart', waterTemperatureData, waterTemperatureChartLayout, configureModeBar);

      // USE THE 'nsewdrag' PLOTLY ELEMENT TO HANDLE ON/OFF OF POINTER CURSOR
      const dragLayerAllWqMeasurables = document.getElementsByClassName('nsewdrag')[0];
      const dragLayerAmmonia = document.getElementsByClassName('nsewdrag')[1];
      const dragLayerChlorophyll = document.getElementsByClassName('nsewdrag')[2];
      const dragLayerDissolvedOxygen = document.getElementsByClassName('nsewdrag')[3];
      const dragLayerNitrateNitrite = document.getElementsByClassName('nsewdrag')[4];
      const dragLayerNitrogen = document.getElementsByClassName('nsewdrag')[5];
      const dragLayerOrthophosphate = document.getElementsByClassName('nsewdrag')[6];
      const dragLayerPhaeophytin = document.getElementsByClassName('nsewdrag')[7];
      // const dragLayerPrecipitation = document.getElementsByClassName('nsewdrag')[8];
      const dragLayerSalinity = document.getElementsByClassName('nsewdrag')[8];
      const dragLayerWaterTemperature = document.getElementsByClassName('nsewdrag')[9];

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

      // precipitationChart.on('plotly_hover', function(precipitationData){
      //   dragLayerPrecipitation.style.cursor = 'pointer'
      // });

      // precipitationChart.on('plotly_unhover', function(precipitationData){
      //   dragLayerPrecipitation.style.cursor = ''
      // });

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

      // MAKE THE PLOTS RESPONSIVE
      // RESOURCES: https://plot.ly/javascript/responsive-fluid-layout/ & https://gist.github.com/aerispaha/63bb83208e6728188a4ee701d2b25ad5
      (function() {
        var d3 = Plotly.d3;
        var WIDTH_IN_PERCENT_OF_PARENT = 100,
        HEIGHT_IN_PERCENT_OF_PARENT = 90;

        var gd3 = d3.selectAll(".responsive-plot")
        .style({
          width: WIDTH_IN_PERCENT_OF_PARENT + '%',
          'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',

          height: HEIGHT_IN_PERCENT_OF_PARENT + '%',
          'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + '%'
        });

        var nodes_to_resize = gd3[0];
        window.onresize = function() {
          for (var i = 0; i < nodes_to_resize.length; i++) {
            Plotly.Plots.resize(nodes_to_resize[i]);
          }
        };
      })();

    }

},

  watch: {
    // WATCH THE 'wqStation' STATE PROPERTY SO AS TO CONTINUE TO PRODUCE CHARTS ON USER PAGE RELOADS, ALTERNATING BETWEEN TABLES & CHARTS, etc.
    wqStation: function(data) {
      var thisData = data;
      this.makeCharts(thisData)

      $('#embaymentSelect').val(this.$store.state.embayName)
    }
  }
}

</script>

<style>
/* MAKE THE PLOTLY PLOTS THE SAME SIZE & CENTER THEM WITHIN THE 'chartsContainer' DIV */
/* .js-plotly-plot {
  margin: 0 auto;
} */


</style>

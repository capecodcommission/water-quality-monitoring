import router from '../router'

export const createMap = function (loader) {

  // Attach to esriloader module
  const esriLoader = loader

  esriLoader.dojoRequire(
    [
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/SceneLayer",
      "esri/layers/TileLayer",
      "esri/layers/FeatureLayer",
      "esri/renderers/UniqueValueRenderer",
      "esri/widgets/Legend",
      "esri/PopupTemplate",
      "dojo/domReady!"
    ],
    (
      Map, 
      MapView,
      SceneView,
      SceneLayer,
      TileLayer,
      FeatureLayer,
      UniqueValueRenderer,
      Legend,
      PopupTemplate
    ) => {
      
      var map = new Map({
        basemap: "topo"
      });

      // Default view centered on Barnstable
      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 11,
        center: [-70.303634, 41.701660]
      });

      // Embayment featurelayer containing polygons
      var embayments = new FeatureLayer({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/wMVP/WaterQualityMonitoringStations/MapServer/1",
        outFields: ['*']
      });

      // Action object contained within infotemplate for each station point
      var viewStation = {
        // title: "View Station",
        id: "view-station",
        className: "btn btn-primary btn-lg"
      };

      // Infotemplate for each station point, 2 fields shown
      var stationTemplate = {

        title: "{Station} {Embayment}",
        actions: [viewStation],
        content: [
          {
            type: 'fields',
            fieldInfos: [
              {
                fieldName: 'Station'
              },
              {
                fieldName: 'Quality'
              }
            ]
          }
        ]
      };

      // Station featurelayer containing points
      var stations = new FeatureLayer({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/wMVP/WaterQualityMonitoringStations/MapServer/0",
        outFields: ['Station','Quality'],
        popupTemplate: stationTemplate
      })

      // Add featurelayers to map
      map.add(embayments)
      map.add(stations)

      // On click of infotemplate action, eg. view-station, get station data
      // If data exists, continue to next page with station id, else show no-data error
      view.popup.on('trigger-action', function(event) {

        if (event.action.id === 'view-station') {

          var attributes = view.popup.viewModel.selectedFeature.attributes;

          var url = 'http://sql-connect.api.capecodcommission.org/api/getStation/' + attributes.Station

          $.ajax(
            {
              method: 'GET', 
              url: url
            }
          ).done(function(rows) {

            if (rows.recordset.length > 1) {

              router.push({name: 'table', params: {id: attributes.Station, embayName: attributes.Embayment}})
            } else {

              $('.esri-popup__content').append("<p id = 'nodata' class = 'text-danger'>No data available</p>")
            }
          })
        }
      })

      

      $('#home').hide()

      // Zoom to selected geography on dropdown selection
      // If default selection, reset map zoom, else zoom to selected area
      $('#embaySelect').on('change', function() {

        var x = $(this).val().toString()

        if (x === '0') {

          $('#home').hide()

          embayments.definitionExpression = ''
          stations.definitionExpression = ''
          
          embayments.when(() => {

            return embayments.queryExtent()
          }).then((response) => {

            view.goTo(response)
          })
        } else {

          $('#home').show()

          embayments.definitionExpression = "EMBAY_DISP = " + "'" + x + "'"
          stations.definitionExpression = "Embayment = " + "'" + x + "'"

          embayments.when(() => {

            return stations.queryExtent()
          }).then((response) => {

            view.goTo(response)
          })
        }
      })


      // set embaySelect value to default, trigger change operation caught by function above
      $('#home').on('click', function() {

        $('#embaySelect').val('0')
        $('#embaySelect').change()
      })
    }
  )
}
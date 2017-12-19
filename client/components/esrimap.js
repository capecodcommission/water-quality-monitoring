import router from '../router'
export const createMap = function (loader) {
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

      var view = new MapView({
        container: "viewDiv",  // Reference to the DOM node that will contain the view
        map: map,
        zoom: 11,
        center: [-70.303634, 41.701660]
      });

      var embayments = new FeatureLayer({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/wMVP/WaterQualityMonitoringStations/MapServer/1",
        outFields: ['*'],
        popupTemplate: {
          title: '{EMBAY_DISP}',
          content: '{*}'
        }
      });

      var viewStation = {
        title: "View Station",
        id: "view-station",
        className: "btn btn-primary"
      };

      var stationTemplate = {

        title: "{Station} {Embayment}",
        content: "{*}",
        actions: [viewStation]
      };

      var stations = new FeatureLayer({
        url: "http://gis-services.capecodcommission.org/arcgis/rest/services/wMVP/WaterQualityMonitoringStations/MapServer/0",
        outFields: ['*'],
        popupTemplate: stationTemplate
      })

      map.add(embayments)
      map.add(stations)

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

              router.push({name: 'table', params: {id: attributes.Station}})
            } else {

              $('.esri-popup__content').append("<p id = 'nodata' class = 'text-danger'>No data available</p>")
            }
          })
        }
      })

      // On new dropdown selection, pass EMBAY_DISP to ZoomToSelection 
      $('#embaySelect').on('change', function() {

        var x = $(this).val().toString()

        if (x === '0') {

          embayments.definitionExpression = ''
          
          embayments.when(() => {

            return embayments.queryExtent()
          }).then((response) => {

            view.goTo(response)
          })
        } else {

          embayments.definitionExpression = "EMBAY_DISP = " + "'" + x + "'"

          embayments.when(() => {

            return embayments.queryExtent()
          }).then((response) => {

            view.goTo(response)
          })
        }
      })
    }
  )
}
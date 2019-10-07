$(document).ready(function(){

  loadRawStock();
  loadProcessingStock();
  loadCompletedStock();

  loadSummaryContent(1);
});

$('.stock-tabs a[data-toggle="tab"]').on('show.bs.tab', function (e) {
  resetTabs();
  loadSummaryContent($(this).attr('data-type'));
})


function loadSummaryContent(type) {
 $.ajax({
  url: 'stockitem-summary/loadContent',
  method: "post",
  data: {
    'type' : type
  },
  beforeSend: function () {
    $('#summaryContent').addClass('loading');
  },
  complete: function () {
    $('#summaryContent').removeClass('loading');
  },
  success: function (data) {
    $('#summaryContent').html(data);
  },
  error: function(data){

  }
});

}

function resetTabs() {
  $('#summaryContent').html('');
}

function loadRawStock(){
  $.ajax({
    url: 'stockitem-summary/loadRawStock',
    method: "post",
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {
      $('#rawStockCount').html(data);
    },
    error: function(data){

    }
  });
}

function loadProcessingStock(){
  $.ajax({
    url: 'stockitem-summary/loadProcessingStock',
    method: "post",
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {
      $('#processingStockCount').html(data);

    },
    error: function(data){

    }
  });
}

function loadCompletedStock(){
  $.ajax({
    url: 'stockitem-summary/loadCompletedStock',
    method: "post",
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {
      $('#completedStockCount').html(data);

    },
    error: function(data){

    }
  });
}


function loadProcessStockChart(){
  $.ajax({
    url: 'stockitem-summary/loadProcessStockChart',
    method: "post",
    beforeSend: function () {
    },
    complete: function () {
    },
    success: function (data) {

      console.log(data);

      var areaChartData = {
        labels  : data["dates"],
        datasets: [
        {
          label               : 'Run Stock Log Details',
          fillColor           : 'rgba(210, 214, 222, 1)',
          strokeColor         : 'rgba(210, 214, 222, 1)',
          pointColor          : 'rgba(210, 214, 222, 1)',
          pointStrokeColor    : '#c1c7d1',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data                : data["runStock"]
        },
        {
          label               : 'GDN',
          fillColor           : 'rgba(60,141,188,0.9)',
          strokeColor         : 'rgba(60,141,188,0.8)',
          pointColor          : '#3b8bba',
          pointStrokeColor    : 'rgba(60,141,188,1)',
          pointHighlightFill  : '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          data                : data["gdns"]
        }
        ]
      }

      var areaChartOptions = {
              //Boolean - If we should show the scale at all
              showScale               : true,
              //Boolean - Whether grid lines are shown across the chart
              scaleShowGridLines      : false,
              //String - Colour of the grid lines
              scaleGridLineColor      : 'rgba(0,0,0,.05)',
              //Number - Width of the grid lines
              scaleGridLineWidth      : 1,
              //Boolean - Whether to show horizontal lines (except X axis)
              scaleShowHorizontalLines: true,
              //Boolean - Whether to show vertical lines (except Y axis)
              scaleShowVerticalLines  : true,
              //Boolean - Whether the line is curved between points
              bezierCurve             : true,
              //Number - Tension of the bezier curve between points
              bezierCurveTension      : 0.3,
              //Boolean - Whether to show a dot for each point
              pointDot                : false,
              //Number - Radius of each point dot in pixels
              pointDotRadius          : 4,
              //Number - Pixel width of point dot stroke
              pointDotStrokeWidth     : 1,
              //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
              pointHitDetectionRadius : 20,
              //Boolean - Whether to show a stroke for datasets
              datasetStroke           : true,
              //Number - Pixel width of dataset stroke
              datasetStrokeWidth      : 2,
              //Boolean - Whether to fill the dataset with a color
              datasetFill             : true,
              //String - A legend template
              legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].lineColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
              //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
              maintainAspectRatio     : true,
              //Boolean - whether to make the chart responsive to window resizing
              responsive              : true
            }
            
            
            var lineChartCanvas          = $('#processStocklineChart').get(0).getContext('2d');
            var lineChart                = new Chart(lineChartCanvas);
            var lineChartOptions         = areaChartOptions
            lineChartOptions.datasetFill = false
            lineChart.Line(areaChartData, lineChartOptions)

          },
          error: function(data){

          }
        });
}
var opt = {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax:{
      url: 'labor-summary/inHouseLabourList',
      type:'POST',
      dataType: 'JSON',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization');
      }
    },
    columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'emp_no' , name: 'emp_no', orderable: true, searchable : true},
    {data: 'inhouseLabor' , name: 'inhouseLabor', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'hourly_rate' , name: 'hourly_rate', orderable: true, searchable : true},
    {data: 'ot_hourly_rate' , name: 'ot_hourly_rate', orderable: true, searchable : true},
    ]
  }

  var manPoweropt = {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax:{
      url: 'labor-summary/manPowerLabourList',
      type:'POST',
      dataType: 'JSON',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization');
      }
    },
    columns:[
    {data: 'DT_RowIndex' , name: 'DT_RowIndex',orderable: true},
    {data: 'emp_no' , name: 'emp_no', orderable: true, searchable : true},
    {data: 'name' , name: 'name', orderable: true, searchable : true},
    {data: 'manpowerLabor' , name: 'manpowerLabor', orderable: true, searchable : true},
    {data: 'hourly_rate' , name: 'hourly_rate', orderable: true, searchable : true},
    {data: 'ot_hourly_rate' , name: 'ot_hourly_rate', orderable: true, searchable : true},
    ]
  }
    
    $(document).ready(function(){
    
        datatabel = $('#in-house-dataTable').DataTable(opt);
        datatabel = $('#man-power-dataTable').DataTable(manPoweropt);
        loadInhouseLabor();
        loadManPwerLabor();
        loadLabourWorkHour();
        loadLabourOTWorkHour();
        loadInHouseLaborChart();
    });
    
    $('.labour-tab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    
        if($(this).attr('data-pane') == "tab_1"){
            loadInHouseLaborChart();
        }else if($(this).attr('data-pane') == "tab_2"){
            // alert($(this).attr('data-pane'));
        }
    })
    
    function loadInhouseLabor(){
        $.ajax({
            url: 'labor-summary/loadInhouseLabor',
            method: "post",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                $('#inHouseLaborCount').html(data);
    
            },
            error: function(data){
                
            }
        });
    }

    function loadManPwerLabor(){
        $.ajax({
            url: 'labor-summary/loadManPwerLabor',
            method: "post",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                $('#inManPowerLaborCount').html(data);
    
            },
            error: function(data){
                
            }
        });
    }

    function loadLabourWorkHour(){
        $.ajax({
            url: 'labor-summary/loadLabourWorkHour',
            method: "post",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                $('#labourTotalHourCount').html(data);
    
            },
            error: function(data){
                
            }
        });
    }

    function loadLabourOTWorkHour(){
        $.ajax({
            url: 'labor-summary/loadLabourOTWorkHour',
            method: "post",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {
                $('#labourTotalOTHourCount').html(data);
    
            },
            error: function(data){
                
            }
        });
    }
    

    function loadInHouseLaborChart(){
        $.ajax({
            url: 'labor-summary/loadInHouseLaborChart',
            method: "post",
            beforeSend: function () {
            },
            complete: function () {
            },
            success: function (data) {

                console.log(data);
    
                var areaChartData = {
                    labels  : data['dates'],
                    datasets: [
                      {
                        label               : 'Work Hours',
                        fillColor           : 'rgba(210, 214, 222, 1)',
                        strokeColor         : 'rgba(210, 214, 222, 1)',
                        pointColor          : 'rgba(210, 214, 222, 1)',
                        pointStrokeColor    : '#c1c7d1',
                        pointHighlightFill  : '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data                : data['workHours']
                      },
                      {
                        label               : 'OT Work Hours',
                        fillColor           : 'rgba(60,141,188,0.9)',
                        strokeColor         : 'rgba(60,141,188,0.8)',
                        pointColor          : '#3b8bba',
                        pointStrokeColor    : 'rgba(60,141,188,1)',
                        pointHighlightFill  : '#fff',
                        pointHighlightStroke: 'rgba(60,141,188,1)',
                        data                : data['workOTHours']
                      }
                    ]
                  }
              
                  //-------------
                  //- BAR CHART -
                  //-------------
                  var barChartCanvas                   = $('#inHousebarChart').get(0).getContext('2d')
                  var barChart                         = new Chart(barChartCanvas)
                  var barChartData                     = areaChartData
                  barChartData.datasets[1].fillColor   = '#00a65a'
                  barChartData.datasets[1].strokeColor = '#00a65a'
                  barChartData.datasets[1].pointColor  = '#00a65a'
                  var barChartOptions                  = {
                    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
                    scaleBeginAtZero        : true,
                    //Boolean - Whether grid lines are shown across the chart
                    scaleShowGridLines      : true,
                    //String - Colour of the grid lines
                    scaleGridLineColor      : 'rgba(0,0,0,.05)',
                    //Number - Width of the grid lines
                    scaleGridLineWidth      : 1,
                    //Boolean - Whether to show horizontal lines (except X axis)
                    scaleShowHorizontalLines: true,
                    //Boolean - Whether to show vertical lines (except Y axis)
                    scaleShowVerticalLines  : true,
                    //Boolean - If there is a stroke on each bar
                    barShowStroke           : true,
                    //Number - Pixel width of the bar stroke
                    barStrokeWidth          : 2,
                    //Number - Spacing between each of the X value sets
                    barValueSpacing         : 5,
                    //Number - Spacing between data sets within X values
                    barDatasetSpacing       : 1,
                    //String - A legend template
                    legendTemplate          : '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
                    //Boolean - whether to make the chart responsive
                    responsive              : true,
                    maintainAspectRatio     : true
                  }
              
                  barChartOptions.datasetFill = false
                  barChart.Bar(barChartData, barChartOptions)
    
            },
            error: function(data){
                
            }
        });
    }
    
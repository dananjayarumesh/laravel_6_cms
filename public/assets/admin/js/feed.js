$(document).ready(function(){

var process_id = $('#processId').val();

if(process_id != 0){
    loadMachineLogContent(process_id);
    loadLaborLogContent(process_id);
    loadStockLogContent(process_id);
}

    $('#date').change(function(){
        getOperations($(this).val());
    });

    $('#operationRun').change(function(){
        getProcess($(this).val());
        getSubProcess($('#sections').val());
    });

    $('#sections').change(function(){
        getSubProcess($(this).val());
    });

    $('#received_row').val(this.checked);
    $('#received_process').val(this.checked);

    $('#received_row').change(function() {
        if(this.checked) {
            $('#section_row_div').show();
            $('#section_process_div').hide();
            
        }
        $('#received_row').val(this.checked);        
    });

    $('#received_process').change(function() {
        if(this.checked) {
            $('#section_process_div').show();
            $('#section_row_div').hide();
        }
        $('#received_row').val(this.checked);        
    });

});

function getOperations(date){

    $.ajax({
        url: 'operation-run-feed/getOperations',
        method: "post",
        data: {
            date:date,
        },
        dataType: 'JSON',
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            var options = '<option value="">--- Select Operation ---</option>';
            $.each( data, function( index, row ){
                console.log(row);
                options += '<option value="'+row.id+'">'+row.operation_run_no+'</option>';
            });
        
            $('#operationRun').html(options);
        },
        error: function(data){
        }
    });
}

function getProcess(operation_id){
    // var operationId = $("#operationRun").val();
    $.ajax({
        url: 'operation-run-feed/getProcess',
        method: "post",
        data: {
            operationId:operation_id,
        },
        dataType: 'JSON',
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            var options = '<option value="">--- Select Section ---</option>';
            $.each( data, function( index, row ){
                console.log(row);
                options += '<option value="'+row.id+'">'+row.section.name+'</option>';
            });
        
            $('#sections').html(options);

        },
        error: function(data){
        }
    });
}

function getSubProcess(section_id){
    // var sectionId = $("#sections").val();
    $.ajax({
        url: 'operation-run-feed/getSubProcess',
        method: "post",
        data: {
            sectionId:section_id,
        },
        dataType: 'JSON',
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            var options = '<option value="">--- Select Process ---</option>';
            $.each( data, function( index, row ){
                console.log(row);
                options += '<option value="'+row.id+'">'+row.sub_process.name+'</option>';
            });
        
            $('#sectionProcess').html(options);

        },
        error: function(data){
        }
    });
}

/*function searchAllProcess(){

    var sectionId = $("#sections").val();

    var process = $('#sectionProcess').val();

    $.ajax({
        url: 'operation-run-feed/itemFeedForProcess',
        method: "post",
        data: {
            sectionId:sectionId,
            process:process,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
        // alert(data);
            $('#feedContent').html(data)

            loadMachineLog();
            loadLaborLog()

        },
        error: function(data){
            
        }
    });


}*/

/*function  loadMachineLog(machineId){

    var sectionProcess = $('#sectionProcess').val();

    var value = +$('#machine_tab_'+machineId).attr("data-value");

    // var machineId = $('#machineId').val();

    $.ajax({
        url: 'operation-run-feed/loadMachineLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            machineId : machineId
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            var trHTML = '';
            var count = 1;
            $.each(data, function (i, item) {
                var start_time = new Date(item.start);
                var stime = start_time.getHours() + ":" + start_time.getMinutes();

                var end_time = new Date(item.end);
                var etime = end_time.getHours() + ":" + end_time.getMinutes();


                start_actual_time = new Date(item.start);
                end_actual_time = new Date(item.end);
                
                var diff = end_actual_time - start_actual_time;
                
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM)

                trHTML += '<tr><td>' + count + '</td><td>' + stime + '</td><td>' + etime + '</td><td>' + formatted + '</td></tr>';
                count++;
            });
            
            $('#machineLogTbl').append(trHTML);
    
        },
        error: function(data){
            
        }
    });
}*/

function machineLogModal(id){
    $('#machine_Id').val(id);
    $("#addMachineLogModel").modal('show');
}

function laborLogModal(id){
    $('#labor_id').val(id);
    $("#addLaborLogModel").modal('show');
}

function machineLog(){

    var sectionProcess = $('#sectionProcess').val();

    var machineId = $('#machine_Id').val();

    var date = $('#date').val();

    var start_time = $('#start_time').val();

    var end_time = $('#end_time').val();

    $.ajax({
        url: 'operation-run-feed/machineLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            machineId : machineId,
            start_time : start_time, 
            end_time : end_time,
            date: date
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#addMachineLogModel").modal('hide');

            loadMachineLogContent(sectionProcess,machineId);

        },
        error: function(data){
            
        }
    });
}

/*function  loadLaborLog(){

    var sectionProcess = $('#sectionProcess').val();

    var laborId = $('#laborId').val();

    $.ajax({
        url: 'operation-run-feed/loadLaborLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            laborId : laborId
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {
            
            var trHTML = '';
            var count = 1;
            $.each(data, function (i, item) {
                var start_time = new Date(item.start);
                var stime = start_time.getHours() + ":" + start_time.getMinutes();

                var end_time = new Date(item.end);
                var etime = end_time.getHours() + ":" + end_time.getMinutes();


                start_actual_time = new Date(item.start);
                end_actual_time = new Date(item.end);
                
                var diff = end_actual_time - start_actual_time;
                
                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;
                
                var formatted = ((HH < 10) ? ("0" + HH) : HH) + ":" + ((MM < 10) ? ("0" + MM) : MM)

                trHTML += '<tr><td>' + count + '</td><td>' + stime + '</td><td>' + etime + '</td><td>' + formatted + '</td></tr>';
                count++;
            });
            
            $('#laborLogTbl').append(trHTML);
    
        },
        error: function(data){
            
        }
    });
}*/


function laborLog(){
    var sectionProcess = $('#sectionProcess').val();

    var laborId = $('#labor_id').val();

    var date = $('#date').val();

    var start_time = $('#labor_start_time').val();

    var end_time = $('#labor_end_time').val();

    var ot_hour = $('#labor_ot_hour').val();

    $.ajax({
        url: 'operation-run-feed/laborLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            laborId : laborId,
            start_time : start_time, 
            end_time : end_time,
            date: date,
            ot_hour:ot_hour,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#addLaborLogModel").modal('hide');

            loadLaborLogContent(sectionProcess,laborId);

        },
        error: function(data){
            
        }
    });
}

function loadMachineLogContent(process_id,machine_id=null) {
    
    $.ajax({
        url: 'operation-run-feed/loadMachineLogContent',
        method: "post",
        data: {
            process_id : process_id,
            machine_id : machine_id
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $('#machineLogContent').html(data);

        },
        error: function(data){
            
        }
    });
}

function loadLaborLogContent(process_id,labor_id=null) {
    $.ajax({
        url: 'operation-run-feed/loadLaborLogContent',
        method: "post",
        data: {
            process_id : process_id,
            labor_id : labor_id
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $('#laborLogContent').html(data);

        },
        error: function(data){
            
        }
    });
}

function loadStockLogContent(process_id,stock_type_id=null) {
    $.ajax({
        url: 'operation-run-feed/loadStockLogContent',
        method: "post",
        data: {
            process_id : process_id,
            stock_type_id : stock_type_id
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $('#stockLogContent').html(data);

        },
        error: function(data){
            
        }
    });
}

function deleteMachineLog(log_id,machine_id,process_id){
    $.ajax({
        url: 'operation-run-feed/deleteMachineLog',
        method: "post",
        data: {
            log_id : log_id,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            loadMachineLogContent(process_id,machine_id);

        },
        error: function(data){
            
        }
    });
}

function deleteLaborLog(log_id,labor_id,process_id){
    $.ajax({
        url: 'operation-run-feed/deleteLaborLog',
        method: "post",
        data: {
            log_id : log_id,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            loadLaborLogContent(process_id,labor_id);

        },
        error: function(data){
            
        }
    });
}

function stockLogModal(stock_log_type) {

    if(stock_log_type ==1 ){
        $('#stock_log_receive_type').val(stock_log_type);
        $("#addProcessStockModel").modal('show');
    }else if(stock_log_type == 2 ){
        $('#stock_log_process_type').val(stock_log_type);
        $("#stockProcessingModel").modal('show');
    }else if(stock_log_type == 3){
        $('#stock_log_complete_type').val(stock_log_type);
        $("#stockCompletedModel").modal('show');
    }else if(stock_log_type == 4){
        $('#stock_log_damage_type').val(stock_log_type);
        $("#stockDamagedModel").modal('show');
    }
}

function addstockReceivedLog(){

    var sectionProcess = $('#sectionProcess').val();

    var stockLogType = $('#stock_log_receive_type').val();

    var receivedFromType = $('input[name=received_radio]:checked', '#stock_add_form').attr("data-id");

    var stockQty = $('#stockQty').val();

    var stockItem = $('#stock_item').val();

    var stockSectionProcess = $('#section_process').val();

    $.ajax({
        url: 'operation-run-feed/addstockReceivedLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            stockLogType : stockLogType,
            receivedFromType:receivedFromType,
            stockQty : stockQty, 
            stockItem : stockItem,
            stockSectionProcess: stockSectionProcess
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#addProcessStockModel").modal('hide');

            loadStockLogContent(sectionProcess,stockLogType);

            $('#stock_log_receive_type').val('');

            $('#stockQty').val('');

        },
        error: function(data){
            
        }
    });
}

function addStockProcessingLog() {

    var sectionProcess = $('#sectionProcess').val();

    var stockLogType = $('#stock_log_process_type').val();

    var stockQty = $('#stock_processing_qty').val();

    var note = $('#processing_note').val();

    $.ajax({
        url: 'operation-run-feed/addStockProcessingLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            stockLogType : stockLogType,
            stockQty : stockQty,
            note:note,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#stockProcessingModel").modal('hide');

            loadStockLogContent(sectionProcess,stockLogType);

            $('#stock_log_process_type').val('');

            $('#stock_processing_qty').val('');
        
            $('#processing_note').val('');

        },
        error: function(data){
            
        }
    });
}

function addStockCompleteLog() {

    var sectionProcess = $('#sectionProcess').val();

    var stockLogType = $('#stock_log_complete_type').val();

    var stockReceivedFrom = $('#stock_received_from').val();

    var stockQty = $('#stock_completed_qty').val();

    var note = $('#stock_complete_note').val();

    $.ajax({
        url: 'operation-run-feed/addStockCompleteLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            stockLogType : stockLogType,
            stockReceivedFrom:stockReceivedFrom,
            stockQty : stockQty,
            note:note,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#stockCompletedModel").modal('hide');

            loadStockLogContent(sectionProcess,stockLogType);

            $('#stock_log_complete_type').val('');

            $('#stock_completed_qty').val('');

            $('#stock_complete_note').val('');

        },
        error: function(data){
            
        }
    });
}

function addStockDamagedLog() {

    var sectionProcess = $('#sectionProcess').val();

    var stockLogType = $('#stock_log_damage_type').val();

    var stockQty = $('#stock_damage_qty').val();

    var note = $('#stock_damage_note').val();

    $.ajax({
        url: 'operation-run-feed/addStockDamagedLog',
        method: "post",
        data: {
            spId : sectionProcess, 
            stockLogType : stockLogType,
            stockQty : stockQty,
            note:note,
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        success: function (data) {

            $("#stockDamagedModel").modal('hide');

            loadStockLogContent(sectionProcess,stockLogType);

            $('#stock_log_damage_type').val('');

            $('#stock_damage_qty').val('');

            $('#stock_damage_note').val('');

        },
        error: function(data){
            
        }
    });
}
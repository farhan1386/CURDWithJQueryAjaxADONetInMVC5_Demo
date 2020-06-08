$(document).ready(function () {
    loadData();
});

function loadData() {
    $.ajax({
        url: "/Home/List",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Id + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.Position + '</td>';
                html += '<td>' + item.Office + '</td>';
                html += '<td>' + item.Age + '</td>';
                html += '<td>' + item.StartDate + '</td>';
                html += '<td>' + item.Salary + '</td>';
                html += '<td><a href="#" onclick="return GetById(' + item.Id + ')" class="btn btn-sm btn-info rounded-0"><i class="fas fa-edit"></i></a> <a href="#" onclick="Delele(' + item.Id + ')" class="btn btn-sm btn-danger rounded-0"><i class="fas fa-trash"></i></a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var employee = {
        Name: $('#Name').val(),
        Position: $('#Position').val(),
        Office: $('#Office').val(),
        Age: $('#Age').val(),
        StardDate: $('#StardDate').val(),
        Salary: $('#Salary').val()
    };

    $.ajax({
        url: "/Home/Add",
        data: JSON.stringify(employee),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function GetById(empId) {
    $('#Name').css('border-color', 'lightgrey');
    $('#Position').css('border-color', 'lightgrey');
    $('#Office').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#StartDate').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetEmployeeById/" + empId,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.Id);
            $('#Name').val(result.Name);
            $('#Position').val(result.Position);
            $('#Office').val(result.Office);
            $('#Age').val(result.Age);
            $('#StartDate').val(result.StardDate);
            $('#Salary').val(result.Salary);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var employee = {
        Id: $('#Id').val(),
        Name: $('#Name').val(),
        Position: $('#Position').val(),
        Office: $('#Office').val(),
        Age: $('#Age').val(),
        StartDate: $('#StartDate').val(),
        Salary: $('#Salary').val(),
    };
    $.ajax({
        url: "/Home/Update",
        data: JSON.stringify(employee),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            $('#Name').val("");
            $('#Position').val("");
            $('#Office').val("");
            $('#Age').val("");
            $('#StartDate').val("");
            $('#Salary').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delele(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Home/Delete/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    $('#Name').val("");
    $('#Position').val("");
    $('#Office').val("");
    $('#Age').val("");
    $('#StartDate').val("");
    $('#Salary').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Name').css('border-color', 'lightgrey');
    $('#Position').css('border-color', 'lightgrey');
    $('#Office').css('border-color', 'lightgrey');
    $('#Age').css('border-color', 'lightgrey');
    $('#StartDate').css('border-color', 'lightgrey');
    $('#Salary').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#Name').val().trim() == "") {
        $('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Position').css('border-color', 'lightgrey');
    }
    if ($('#Position').val().trim() == "") {
        $('#Position').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Position').css('border-color', 'lightgrey');
    }
    if ($('#Office').val().trim() == "") {
        $('#Office').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Office').css('border-color', 'lightgrey');
    }
    if ($('#Age').val().trim() == "") {
        $('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Age').css('border-color', 'lightgrey');
    }
    if ($('#StartDate').val().trim() == "") {
        $('#StartDate').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#StartDate').css('border-color', 'lightgrey');
    }
    if ($('#Salary').val().trim() == "") {
        $('#Salary').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Salary').css('border-color', 'lightgrey');
    }
    return isValid;
}
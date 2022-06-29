'use strict';

var hostname=window.location.hostname;
var api = 'api/cars';
var carsDataTable;

$(document).ready(function() {

	let columns = [
		{ 'title': 'Brand', 'data': 'brand' },
		{ 'title': 'LicensePlate', 'data': 'licensePlate' },
		{ 'title': 'Mileage', 'data': 'mileage' },
	]

	carsDataTable = $('#carsDataTable').DataTable({
		'order': [[0, 'asc']],
		'columns': columns
	}); 

	$('#carsDataTable tbody').on('click', 'tr', function () {
		let carData = carsDataTable.row(this).data();
		edit(carData.id);
	});

	getAll();
	$('#addBtn').click(create);
	$('#saveBtn').click(insert);
	$('#deleteBtn').click(deleteItem);

	$('#form').on('shown.bs.modal', function () {
		$('.modal-body :input:visible:first').focus();
	})
})

function clearForm() {
	$('input').each(function() {
		$(this).val('');
	});
	$('input:checkbox').each(function() {
		$(this).prop('checked', false);
	});
}

function getAll() {
	$.get(api, function(cars) {
		if (cars) {
			carsDataTable.clear();
			carsDataTable.rows.add(cars);
			carsDataTable.columns.adjust().draw();
		}
	});
}

function create() {
	// Set title
	$('#title').text('New Car');

	$('#saveBtn').off('click');
	$('#saveBtn').click(insert);

	// Hide delete button
	$('#deleteBtn').hide();

	// Fill relationships selects for in the UI

	// Clear form
	clearForm();

	$('#form').modal({backdrop: 'static'}); // backdrop:static => to prevent closing the modal when clicking outside of it
}

function insert(e) {
	e.preventDefault();

	// Create obj
	let obj = {
		brand: $('#brand').val(), 
		licensePlate: $('#licensePlate').val(), 
		mileage: $('#mileage').val(), 
	}

	console.log(obj);

	send(api, obj, 'POST');
}
function edit(id) {

	// Set title
	$('#title').text('Edit Car');

	// Show delete button
	$('#deleteBtn').show();

	// Clear form
	clearForm();

	// Get item
	$.get(api+'/'+id, function(car) {
		if (car){
			// Fill form
			$('#id').val(car.id);
			$('#brand').val(car.brand);
			$('#licensePlate').val(car.licensePlate);
			$('#mileage').val(car.mileage);

			$('#saveBtn').off('click');
			$('#saveBtn').click(update);

			$('#form').modal({backdrop: 'static'}); // backdrop:static => to prevent closing the modal when clicking outside of it
		}
	});
}

function update(e) {
	e.preventDefault();

	let id = +$('#id').val();
	console.log('updating ...'+id);

	// Create obj
	let obj = {
		brand: $('#brand').val(), 
		licensePlate: $('#licensePlate').val(), 
		mileage: $('#mileage').val(), 
	}

	console.log(obj);

	send(api+'/'+id, obj, 'PUT');
}

function deleteItem() {

	let id = +$('#id').val();
	let uri =  `${api}/${id}`;

	// Send data
	$.ajax({
		url: uri,
		type: 'DELETE'
	 }).then(function() {
		 $('#form').modal('toggle');
		getAll();
	});
}

function send(url, obj, method) {
	// Send data
	$.ajax({
		url: url,
		type: method,
		data: JSON.stringify(obj),
		contentType: 'application/json; charset=utf-8'
	}).then(function() {
		$('#form').modal('toggle');
		getAll();
	});
}

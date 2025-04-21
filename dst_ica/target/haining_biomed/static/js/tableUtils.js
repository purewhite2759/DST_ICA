/*
this is to achieve the searching and sorting of the table
this allows repeated use of the same function in different files
*/

// update the original table data
function updateOriginalTableData(tableId) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.getElementsByTagName("TR")).slice(1); // 跳过表头
    originalTableData = rows.map(row => Array.from(row.cells).map(cell => cell.innerHTML));
}

// reset the table to its original state
function restoreOriginalTable(tableId) {
    var table = document.getElementById(tableId);
    var tbody = table.getElementsByTagName("TBODY")[0];
    tbody.innerHTML = ""; // 清空表格内容
    originalTableData.forEach(rowData => {
        var row = document.createElement("TR");
        rowData.forEach(cellData => {
            var cell = document.createElement("TD");
            cell.innerHTML = cellData;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

// search the table
var originalTableData = []; // to store the original table data
// record the original order of the table rows
document.addEventListener("DOMContentLoaded", function () {
    var tables = document.querySelectorAll("table");
    tables.forEach(table => {
        var rows = Array.from(table.getElementsByTagName("TR")).slice(1);
        if (rows.length > 0) {
            originalTableData = rows.map(row => Array.from(row.cells).map(cell => cell.innerHTML));
        }
    });
});
//the searching function
function filterTable(tableId, inputId, columnSelectId) {
    restoreOriginalTable(tableId); // restore the original table data
    // get the input value and convert it to lowercase
    var input = document.getElementById(inputId);
    var filter = input.value.toLowerCase().trim();
    var table = document.getElementById(tableId);
    var rows = table.getElementsByTagName("tr");
    var columnSelect = document.getElementById(columnSelectId);
    var selectedColumn = columnSelect.value;
    // clear the sorting state
    sortStates = [];
    var headers = table.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].innerHTML = headers[i].innerHTML.replace(" ▲", "").replace(" ▼", "");
    }
    // reset the display status of all rows
    for (var i = 1; i < rows.length; i++) { // skip the header row
        rows[i].style.display = "";
    }
    // iterate over the table
    var hasMatch = false;
    for (var i = 1; i < rows.length; i++) { // skip the header row
        var cells = rows[i].getElementsByTagName("td");
        var match = false;
        if (selectedColumn === "all") {
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].innerText.toLowerCase().indexOf(filter) > -1) {
                    match = true;
                    break;
                }
            }
        } else {
            var colIndex = parseInt(selectedColumn);
            if (cells[colIndex] && cells[colIndex].innerText.toLowerCase().indexOf(filter) > -1) {
                match = true;
            }
        }
        // show or hide the row based on the match
        rows[i].style.display = match ? "" : "none";
        if (match) {
            hasMatch = true;
        }
    }
    // check if there are any matching rows
    var noMatchMessageId = tableId + "-no-match-message";
    var existingMessage = document.getElementById(noMatchMessageId);
    if (!hasMatch) {
        if (!existingMessage) {
            var message = document.createElement("div");
            message.id = noMatchMessageId;
            message.style.color = "grey";
            message.style.marginTop = "10px";
            message.innerText = "No matching items were found";
            table.parentNode.appendChild(message);
        }
    } else {
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    updateOriginalTableData(tableId); // update the original table data
}

// sort the table
var worker = new Worker(workerPath); // create Web Worker
var sortDirection = "asc";
var sortStates = []; // to record the sorting state of each column
var originalRows = []; // to store the original order of the rows
function sortTable(tableId, n) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.getElementsByTagName("TR")).slice(1);
    var headers = table.getElementsByTagName("TH");
    // filter rows that are currently visible
    var visibleRows = rows.filter(row => row.style.display !== "none");
    // initialize sortStates (null)
    if (sortStates.length === 0) {
        for (var i = 0; i < headers.length; i++) {
            sortStates[i] = null;
        }
        originalRows = rows.map(row => row.cloneNode(true)); // record the original order of the rows
    }
    // change the sorting state of the clicked column
    if (sortStates[n] === "asc") {
        sortStates[n] = "desc";
    } else if (sortStates[n] === "desc") {
        sortStates[n] = null;
    } else {
        sortStates[n] = "asc";
    }
    // clear all the sorting markers
    for (var i = 0; i < headers.length; i++) {
        headers[i].innerHTML = headers[i].innerHTML.replace(" ▲", "").replace(" ▼", "");
    }
    // if state is null, reset the table to original order
    if (sortStates[n] === null) {
        var tbody = table.getElementsByTagName("TBODY")[0];
        tbody.innerHTML = "";
        originalRows.forEach(row => tbody.appendChild(row.cloneNode(true)));
        return;
    }
    // send message to Web Worker
    worker.postMessage({
        rows: visibleRows.map(row => Array.from(row.cells).map(cell => cell.innerHTML)),
        column: n,
        direction: sortDirection
    });
    // receive sorted data from Web Worker
    worker.onmessage = function (e) {
        var sortedRows = e.data.rows;
        var tbody = table.getElementsByTagName("TBODY")[0];
        tbody.innerHTML = "";
        sortedRows.forEach(rowData => {
            var row = document.createElement("TR");
            rowData.forEach(cellData => {
                var cell = document.createElement("TD");
                cell.innerHTML = cellData;
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
        // add sorting marker
        sortDirection = e.data.direction;
        headers[n].innerHTML += sortDirection === "asc" ? " ▲" : " ▼";
        // record the original order of the rows
        document.addEventListener("DOMContentLoaded", function () {
            var table = document.getElementById(tableId);
            var rows = Array.from(table.getElementsByTagName("TR")).slice(1);
            rows.forEach((row,index) => {
                row.setAttribute("data-index", index);
            })
        });
    };
}

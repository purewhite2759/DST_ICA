self.onmessage = function (e) {
    var rows = e.data.rows;
    var column = e.data.column;
    var direction = e.data.direction; // receive the current sort direction
    // sorting
    rows.sort((a, b) => {
        var valA = a[column] ? a[column].toString().toLowerCase().trim() : "";
        var valB = b[column] ? b[column].toString().toLowerCase().trim() : "";
        if (valA < valB) return direction === "asc" ? -1 : 1;
        if (valA > valB) return direction === "asc" ? 1 : -1;
        return 0;
    });
    // toggle the sort direction
    direction = direction === "asc" ? "desc" : "asc";
    // return the sorted rows and the new direction
    self.postMessage({ rows: rows, direction: direction });
};
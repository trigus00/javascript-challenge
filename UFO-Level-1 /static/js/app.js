// from data.js

// Decaling my varribles 

let tableData = data;
var tbody = d3.select("tbody");


// building a table 
function newTable(data){
  // Start By Clearing Existing Data
  tbody.html("");
  // Loop Through `data` 
  data.forEach((dataRow) => {
      // Append Table Row `tr` to the Table Body `tbody`
      let row = tbody.append("tr");
      // `Object.values` & `forEach` to Iterate Through Values
      Object.values(dataRow).forEach((val) => {
          // Append a Cell to the Row for Each Value
          let cell = row.append("td");
          cell.text(val);
      });
  });
};


// button being clicked 

function clickedButton () {
  d3.event.preventDefault();
    // Select HTML Input Element & Get the Value Property of that Input Element
    let date = d3.select("#datetime").property("value");
    let filterData = tableData;

    // Check if a Date was Entered & Filter Data Using that Date;
    if(date) {
      // Apply Filter to the Table Data to Only Keep Rows Where datetime Value Matches the Filter Value
      filterData = filterData.filter((row) => row.datetime === date);
  }
  // Build Table with Filtered Data
  newTable(filterData);
  
};


// `on` Function to attach an Event to the Handler Function
d3.selectAll("#filter-btn").on("click", clickedButton);
// Build Table with data.js 
newTable(tableData);

    




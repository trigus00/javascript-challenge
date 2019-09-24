// from data.js
var tableData = data;

var tbody = d3.select("tbody");

function add_data_to_row(sightings) {
    var row = tbody.append("tr");

    // Below loops object keys are in same order and are present every time
    Object.entries(sightings).forEach(([key, value]) => {
        row.append("td").text(value); 
    })
};

// Append all table rows and data
data.forEach(add_data_to_row);

var button = d3.select("#filter-btn");

// Runs when button is clicked or user press enter
button.on("click", function() {
    d3.event.preventDefault();

    var datetime = d3.select("#datetime").property("value");

    var query = {};

    if (datetime !== "") {
        query.datetime = datetime;
    }

    // This variable set if user wants more filters 
    if (usingMoreFilters) {
        var cityFilter = d3.select("#City-filter");
        var city = cityFilter.property("value").toLowerCase();

        if (city !== "") {
            query.city = city;
        }

        var stateFilter = d3.select("#State-filter");
        var state = stateFilter.property("value").toLowerCase();

        if (state !== "") {
            query.state = state;
        }

        var countryFilter = d3.select("#Country-filter");
        var country = countryFilter.property("value").toLowerCase();

        if (country !== "") {
            query.country = country;
        }

        var shapeFilter = d3.select("#Shape-filter");
        var shape = shapeFilter.property("value").toLowerCase();
        
        if (shape !== "") {
            query.shape = shape;
        }
    }

    var filtered = tableData.filter(obj => {
        var results = true;
        Object.entries(query).forEach(([key, value]) => {
            results = results && (obj[key] === value);
        });
        return results;
    });

    console.log(filtered);

    tbody.html("");

    filtered.forEach(add_data_to_row)

    
});

var reset_filters = d3.select("#reset-filter-btn");
var more_filters = d3.select("#more-filter-btn");
var usingMoreFilters = false;

more_filters.on("click", function() {
    d3.event.preventDefault();

    usingMoreFilters = true;

    // Use for loop to create additional filters
    var filters = d3.select("#filters");
    const filterList = ["City", "State", "Country", "Shape"];

    filterList.forEach(filter => {
        var newLine_row  = filters.append("li").attr("class","filter list-group-item");
        newLine_row.append("label").attr("for", filter).text(`Enter a ${filter}`);
        newLine_row.append("input").attr("class", "form-control","type", "text","id", `${filter}-filter`);
    });
});

// "reset" button clears filters and displays all data
reset_filters.on("click", function() {
    d3.event.preventDefault();

    var allFilters = d3.selectAll("input")
                       .property("value", "");
    data.forEach(add_data_to_row);
});
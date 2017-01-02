'use strict';

(function () {

    // console.log('pollChart.client.js: poll = ', poll);

    var voteChart = document.querySelector('.vote-chart');

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Option');
        data.addColumn('number', 'Votes');
        var votes = poll.options.map(function (v) {
            return [v.text, v.votes];
        });
        data.addRows(votes);

        // Set chart options
        var options = {
            // 'title': poll.question,
            'width': 500,
            'height': 400
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(voteChart);
        chart.draw(data, options);
      }
})();

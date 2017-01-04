'use strict';

(function () {

    var drawGoogle = function () {
        // console.log('pollChart.client.js: poll = ', poll);

        var voteChart = document.querySelector('.vote-chart');

        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        // google.charts.load('current');   // Don't need to specify chart libraries!


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
                return [v.text, v.votes || 0];
            });
            data.addRows(votes);

            // console.log('pollChart.client.js: votes = ', votes);

            // Set chart options
            var options = {
                // 'title': poll.question,
                'width': 500,
                'height': 400
            };

            // Instantiate and draw our chart, passing in some options.
            var chart = Math.random() < 0.5 ?
                new google.visualization.PieChart(voteChart) :
                new google.visualization.BarChart(voteChart);
            chart.draw(data, options);

            // how to use ChartWrapper for PieChart/BarChart?
            // var wrapper = new google.visualization.ChartWrapper({
            //     chartType: 'PieChart',
            //     dataTable: votes,
            //     options: options,
            //     containerId: 'vote-chart'
            // });
            // wrapper.draw();
        }
    };

    // var switchChart = function (type) {
    //     var chartType = type + 'Chart';

    //     console.log('switchChart(): chartType = ', chartType);

    //     chart.setChartType(chartType);
    //     chart.draw();
    // };

    // drawGoogle();

    var drawChartJs = function() {
        var ctx = document.querySelector(".chart-ctx");
        var labels = poll.options.map(function (v) {
            return v.text;
        });
        var votes = poll.options.map(function (v) {
            return v.votes || 0;
        });
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: votes,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    drawChartJs();

    // var chartTypes = document.getElementsByName('chart-type');
    // var prev = null;
    // for(var i = 0; i < chartTypes.length; i++) {
    //     chartTypes[i].onclick = function() {
    //         // (prev) ? console.log('prev = ', prev.value) : null;
    //         if(this !== prev) {
    //             prev = this;
    //         }
    //         console.log('new = ', this.value)

    //         switchChart(this.value);
    //     };
    // }

})();

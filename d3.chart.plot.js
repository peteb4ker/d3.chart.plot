/*!
 * @copyright Copyright (c) 2014 Sentient Energy, Inc.
 * @license   Licensed under MIT license
 */
(function (d3) {
    /**
     * __Plotting component for ```d3.chart``` v0.2 and ```d3.chart.base``` v0.4__
     *
     * Extends d3.chart.base with margin support
     *
     * @namespace d3.chart
     * @class Plot
     * @extends d3.chart.BaseChart
     * @author Pete Baker
     * @version 0.1.0
     */
    d3.chart("BaseChart").extend("Plot", {

        /**
         * Initializes the chart.
         *
         * @constructor
         * @param {Object} [options] Chart options
         * @param {Number} [options.margins] Margin configuration options
         * @param {Number} [options.margins.top] Top margin
         * @param {Number} [options.margins.right] Right margin
         * @param {Number} [options.margins.bottom] Bottom margin
         * @param {Number} [options.margins.left] Left margin
         */
        initialize: function(options) {
            var chart = this;

            //define default margins
            var defaultMargins = {
                top: 10,
                right: 10,
                left: 20,
                bottom: 10
            };

            //create the inner plot area
            chart.plot = chart.base.append("g").classed("plot", true);

            //set margins, or defaults if they are not set
            this.margins((options && options.margins) || defaultMargins);

            //resize the plot area if the chart is resized
            chart.on("resize", function() {
                chart.resize();
            });
        },

        /**
         * Margin setter getter.
         *
         * If new margins are given, the plot area is transformed appropriately
         * and a resize is triggered.
         *
         * @method margins
         * @param {Object} [margins] Margin configuration options
         * @param {Number} [margins.top] Top margin, in px
         * @param {Number} [margins.left] Left margin, in px
         * @param {Number} [margins.bottom] Bottom margin, in px
         * @param {Number} [margins.right] Right margin, in px
         * @return {Object|this} The chart instance if no parameter is given,
         * otherwise the existing margin configuration.
         */
        margins: function(margins) {
            if (arguments.length === 0) {
                return this._margins;
            }
            ["top", "left","bottom", "right"].forEach(function(d) {
                if (margins[d] === undefined) throw "margins."+d+" is required";
            });

            this._margins = margins;

            this.plot.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
            this.resize();

            return this;
        },

        /**
         * Gets the plot width
         *
         * @method plotWidth
         * @return {Number} The plot area width, which is the
         * chart ```width``` minus ```left``` and ```right``` margins.
         */
        plotWidth: function() {
            return this.width() - this.margins().left - this.margins().right;
        },

        /**
         * Gets the plot height
         *
         * @method plotHeight
         * @return {Number} The plot area height, which is the
         * chart ```height``` minus ```top``` and ```bottom``` margins.
         */
        plotHeight: function() {
            return this.height() - this.margins().top - this.margins().bottom;
        },

        /**
         * Returns a new ```svg:g``` plot group appended to the plot container,
         * with dimensions set to ```plotWidth``` and ```plotHeight```.
         *
         * @method newPlotGroup
         * @param {String} [cssClass] Optional CSS class to be assigned
         * to the new plot group.
         * @param {String} [before] Optional selector to insert this group before.
         * Appends to the end of the plot container if not specified.
         * @return {SVGElement} a new `<g>` plot group.
         */
        newPlotGroup: function(cssClass, before) {
            return this.newPlotElement("g", cssClass, before);
        },

        /**
         * Returns a new ```svg:*``` plot element appended to the plot container,
         * with dimensions set to ```plotWidth``` and ```plotHeight```.
         *
         * @method newPlotElement
         * @param {String} svgElement an SVG element name, such as ```svg:g```
         *                            or ```svg:clipPath```.
         * @param {String} [cssClass] Optional CSS class to be assigned
         * to the new plot group.
         * @param {String} [before] Optional selector to insert this group before.
         * Appends to the end of the plot container if not specified.
         * @return {SVGElement} a new `<g>` plot element.
         */
        newPlotElement: function(svgElement, cssClass, before) {
            return this.plot.insert(svgElement, before).classed("plotGroup", true)
                                                       .classed(cssClass || "", true);
        },
        /**
         * Resizes the plot area to ```plotWidth()```
         * and ```plotHeight()```.
         *
         * @method resize
         */
        resize: function() {
            this.plot.attr("width", this.plotWidth())
                     .attr("height", this.plotHeight());
        }
    });
}(d3));

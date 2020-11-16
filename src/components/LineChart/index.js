import React, {useRef, useEffect, useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import * as d3 from 'd3';
import './index.scss';

const LineChart = ({
    data,
    width=500,
    height=300,
}) => {
    const tickXNum = 10;
    const tickXStep = Math.floor(data.dates.length / tickXNum);
    const tickYNum = 10;
    const ref = useRef();
    const theme = useContext(ThemeContext);
    const margin = ({top: 20, right: 20, bottom: 30, left: 30});
    const colors = d3
        .scaleLinear()
        .domain([0, data.series.length])
        .range([theme.rgbColor, theme.rgbColor1]);
      
    useEffect(() => {
        d3.select(ref.current).select('svg').remove();
        const svg = d3.select(ref.current)
            .append('svg')
            .attr('viewBox', [0, 0, width, height])
            .classed('svg', true);
        // оси
        const x = d3
            .scalePoint()
            .domain(data.dates)
            .range([margin.left, width - margin.right]);
        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
            .range([height - margin.bottom, margin.top]);
        const xAxis = g => g
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(
                d3
                .axisBottom(x)
                .tickValues(data.dates)
                .tickFormat((d, i) => {
                    if (i % tickXStep === 0 || i === 0) {
                        return d;
                    }
                })
                .tickPadding(0)
                .tickSizeInner(6));
        const yAxis = g => g
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select('.domain').remove())
            .call(g => g.select('.tick:last-of-type text').clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(data.y));
        // сетка y
        svg.append('g')
            .attr('class', 'grid y')            
            .attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(tickYNum));
        const line = d3
            .line()
            .defined(d => !isNaN(d))
            .x((d, i) => x(data.dates[i]))
            .y(d => y(d));
        // градиент
        const fillArea = d3
            .area()
            .x((d, i) => x(data.dates[i]))
            .y1((d) => y(d))
            .y0(height - margin.bottom);

        const defs = svg.append('defs');
        const length = data.series.length;
        for (let i = 0; i < length; i++) {
            const color = d3.hsl(colors(i));
            color.opacity = .2;
            const gradient = defs 
                .append('linearGradient')
                .attr('id', `line-chart-gradient-${i}`)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '0%')
                .attr('y2', '100%');
                gradient                    
                    .append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', color)
                    .style('opacity', .3);
                gradient
                    .append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', color)
                    .style('opacity', .3);
                
        }
    
        svg
            .append('g')
            .call(xAxis);
        svg
            .append('g')
            .call(yAxis);
        svg
            .append('g')
            .classed('path-container', true)
            .selectAll('path')
            .data(data.series)
            .join('path')
            .style('mix-blend-mode', 'multiply')
            .attr('d', d => line(d.values));
        svg
        .append('g')
        .attr('class', 'path-fill')
        .attr('transform', `translate(${margin.left}, 0)`)
        .selectAll('path')
        .data(data.series)
        .enter()
        .append('path')
        .attr('d', (d) => fillArea(d.values))
        .attr('transform', `translate(${-margin.left}, 0)`)
        .attr('stroke', (d, i) => colors(i))
        .attr('fill', (d, i) => `url(#line-chart-gradient-${i})`)

    }, [data, height, width, theme, margin, colors,tickXStep]);
  
    return (<div id='line-chart' style={{height: '100%'}} ref={ref}></div>)
}

LineChart.displayName = 'LineChart';

export default LineChart;
"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface RadarChartProps {
  data: {
    name: string
    value: number
    description: string
  }[]
  maxValue?: number
  width?: number
  height?: number
  className?: string
}

export function HealthRadar({ data, maxValue = 100, width = 500, height = 500, className = "" }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    const radius = Math.min(chartWidth, chartHeight) / 2

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)

    // Scales
    const angleScale = d3
      .scalePoint()
      .domain(data.map((d) => d.name))
      .range([0, 2 * Math.PI])
      .padding(0.1)

    const radiusScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius])

    // Draw background circles
    const circles = [0.2, 0.4, 0.6, 0.8, 1]
    circles.forEach((circle) => {
      g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radiusScale(maxValue * circle))
        .attr("fill", "none")
        .attr("stroke", "rgba(255, 255, 255, 0.1)")
        .attr("stroke-dasharray", "4,4")
    })

    // Draw axis lines
    data.forEach((d) => {
      const angle = angleScale(d.name)
      if (angle === undefined) return

      const lineCoords = {
        x: radius * Math.cos(angle - Math.PI / 2),
        y: radius * Math.sin(angle - Math.PI / 2),
      }

      g.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", lineCoords.x)
        .attr("y2", lineCoords.y)
        .attr("stroke", "rgba(255, 255, 255, 0.2)")

      // Add axis labels
      g.append("text")
        .attr("x", 1.1 * lineCoords.x)
        .attr("y", 1.1 * lineCoords.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "currentColor")
        .text(d.name)
    })

    // Draw radar area
    const points = data
      .map((d) => {
        const angle = angleScale(d.name)
        if (angle === undefined) return null
        return {
          x: radiusScale(d.value) * Math.cos(angle - Math.PI / 2),
          y: radiusScale(d.value) * Math.sin(angle - Math.PI / 2),
          value: d.value,
          name: d.name,
          description: d.description,
        }
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)

    // Create line generator
    const lineGenerator = d3
      .lineRadial<(typeof points)[0]>()
      .angle((d) => {
        const angle = angleScale(d.name)
        return angle !== undefined ? angle : 0
      })
      .radius((d) => radiusScale(d.value))
      .curve(d3.curveLinearClosed)

    // Draw radar area
    const radarArea = g
      .append("path")
      .datum(points)
      .attr(
        "d",
        d3
          .areaRadial<(typeof points)[0]>()
          .angle((d) => {
            const angle = angleScale(d.name)
            return angle !== undefined ? angle : 0
          })
          .innerRadius(0)
          .outerRadius((d) => radiusScale(d.value))
          .curve(d3.curveLinearClosed),
      )
      .attr("fill", "url(#radar-gradient)")
      .attr("fill-opacity", 0.6)
      .attr("stroke", "none")

    // Create gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "radar-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#F94E56")
    gradient.append("stop").attr("offset", "50%").attr("stop-color", "#FA6177")
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#FE9129")

    // Draw radar outline
    g.append("path")
      .datum(points)
      .attr(
        "d",
        d3
          .lineRadial<(typeof points)[0]>()
          .angle((d) => {
            const angle = angleScale(d.name)
            return angle !== undefined ? angle : 0
          })
          .radius((d) => radiusScale(d.value))
          .curve(d3.curveLinearClosed),
      )
      .attr("fill", "none")
      .attr("stroke", "#FA6177")
      .attr("stroke-width", 2)

    // Add data points
    g.selectAll(".radar-point")
      .data(points)
      .enter()
      .append("circle")
      .attr("class", "radar-point")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 5)
      .attr("fill", "#FA6177")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .append("title")
      .text((d) => `${d.name}: ${d.value}%\n${d.description}`)

    // Animation
    radarArea.attr("opacity", 0).transition().duration(1000).attr("opacity", 1)
  }, [data, maxValue, width, height])

  return (
    <div className={`relative ${className}`}>
      <svg ref={svgRef} width={width} height={height} className="w-full h-full" />
    </div>
  )
}

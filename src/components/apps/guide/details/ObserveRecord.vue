<template>
  <div class="card_content">
    <div class="info_item" v-if="observationsCountKr !== null">
      <h4 class="sub_title">국내 관찰 수</h4>
      <p class="desc">{{ observationsCountKr.toLocaleString() }}건</p>
    </div>
    <div class="info_item" v-if="observationsCount !== null">
      <h4 class="sub_title">전 세계 관찰 수</h4>
      <p class="desc">{{ observationsCount.toLocaleString() }}건</p>
    </div>
    <div class="info_item" v-if="monthOfYear !== null">
      <h4 class="sub_title">최다 관찰 시기</h4>
      <p class="desc">{{ monthOfYear }}월에 가장 많이 관찰됨</p>
    </div>
    <div class="info_item wrap_chart" v-if="monthOfYear !== null">
      <h4 class="sub_title">월별 관찰 수</h4>
      <div ref="chartRef" class="observe_chart">
        <div
          v-if="tooltip"
          class="chart_tooltip"
          :class="tooltip.isLeft ? 'left' : 'right'"
          :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
        >
          기록한 달 : {{ tooltip.month }}월<br />관찰 수 : {{ tooltip.count.toLocaleString() }}건
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import {
  area,
  axisBottom,
  axisLeft,
  format,
  curveMonotoneX,
  max,
  maxIndex,
  pointer,
  scaleLinear,
  scalePoint,
  select
} from 'd3'

const props = defineProps({
  observationsCount: {
    type: Number as PropType<number | null>,
    default: null
  },
  observationsCountKr: {
    type: Number as PropType<number | null>,
    default: null
  },
  monthOfYear: {
    type: Number as PropType<number | null>,
    default: null
  },
  observationsByMonth: {
    type: Array as PropType<number[] | null>,
    default: null
  }
})

interface MonthCount {
  month: number
  count: number
}

const chartRef = ref<HTMLDivElement>()
const tooltip = ref<(MonthCount & { x: number; y: number; isLeft: boolean }) | null>(null)

let chartWidth = 0

const drawChart = (width: number) => {
  const data = props.observationsByMonth
  if (!chartRef.value || !data?.length || !width || width === chartWidth) return

  chartWidth = width
  tooltip.value = null

  const height = 200
  const margin = { top: 24, right: 16, bottom: 28, left: 40 }
  const months: MonthCount[] = data.map((count, i) => ({ month: i + 1, count }))
  const topMonth = months[maxIndex(data)]

  const x = scalePoint<number>()
    .domain(months.map((d) => d.month))
    .range([margin.left, width - margin.right])
  const y = scaleLinear()
    .domain([0, max(data) ?? 0])
    .nice()
    .range([height - margin.bottom, margin.top])

  select(chartRef.value).select('svg').remove()
  const svg = select(chartRef.value)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('role', 'img')
    .attr('aria-label', `월별 관찰 수, ${topMonth.month}월에 가장 많이 관찰됨`)

  const areaPath = area<MonthCount>()
    .x((d) => x(d.month)!)
    .y0(y(0))
    .y1((d) => y(d.count))
    .curve(curveMonotoneX)

  svg.append('path').datum(months).attr('class', 'area').attr('d', areaPath)
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      axisBottom(x)
        .tickValues(x.step() < 32 ? x.domain().filter((month) => month % 2) : x.domain())
        .tickFormat((month) => `${month}월`)
    )
  svg
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left},0)`)
    .call(axisLeft(y).ticks(4).tickFormat(format('~s')))

  const guideLine = svg
    .append('line')
    .attr('class', 'guide_line')
    .attr('y1', margin.top)
    .attr('y2', height - margin.bottom)
    .style('display', 'none')

  svg.append('path').datum(months).attr('class', 'line').attr('d', areaPath.lineY1())
  const hoverPoint = svg
    .append('circle')
    .attr('class', 'hover_point')
    .attr('r', 7)
    .style('display', 'none')
  svg
    .selectAll<SVGCircleElement, MonthCount>('.point')
    .data(months)
    .join('circle')
    .attr('class', 'point')
    .attr('cx', (d) => x(d.month)!)
    .attr('cy', (d) => y(d.count))
    .attr('r', 4)
  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', x(topMonth.month)!)
    .attr('y', y(topMonth.count) - 10)
    .attr('text-anchor', topMonth.month === 12 ? 'end' : 'middle')
    .text('최다 관찰')

  svg
    .append('rect')
    .attr('class', 'overlay')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .on('pointermove', (event) => {
      const index = Math.round((pointer(event)[0] - margin.left) / x.step())
      const d = months[Math.max(0, Math.min(months.length - 1, index))]
      if (tooltip.value?.month === d.month) return

      const pointX = x(d.month)!
      const pointY = y(d.count)

      guideLine.attr('x1', pointX).attr('x2', pointX).style('display', null)
      hoverPoint.attr('cx', pointX).attr('cy', pointY).style('display', null)
      tooltip.value = { ...d, x: pointX, y: pointY, isLeft: pointX > width / 2 }
    })
    .on('pointerleave', () => {
      guideLine.style('display', 'none')
      hoverPoint.style('display', 'none')
      tooltip.value = null
    })
}

useResizeObserver(chartRef, ([entry]) => drawChart(entry.contentRect.width))
</script>

import { ResponsiveBump } from '@nivo/bump'
import data from './assets/data.json'
import './BumpChart.css'
import { useEffect, useRef, useState } from 'react'

function BumpChart() {

    const [tableLoaded, setTableLoaded] = useState(false);

    const tableRef = useRef(HTMLElement);

    useEffect(() => {
        const table = document.getElementById("chart")
        if (table) {
            tableRef.current = table
            setTableLoaded(true)
        }
    }, [])

    useEffect(() => {
        let cellsInterval
        const checkCells = () => {
            const cells = tableRef.current.getElementsByTagName("text");
            if (cells.length) {
                for (const cell of cells) {
                    cell.style.fill = "rgb(255, 255, 255)"
                    cell.style.fontSize = "2vh"
                }
                clearInterval(cellsInterval)
            }
        };

        if (tableLoaded) {
            cellsInterval = setInterval(checkCells)
        }

        return () => clearInterval(cellsInterval)
    }, [tableLoaded])

    return (
        <>
        <div id="chart">
            <ResponsiveBump
            data={data}
            colors={{ scheme: 'spectral' }}
            lineWidth={3}
            activeLineWidth={6}
            inactiveLineWidth={3}
            inactiveOpacity={0.15}
            pointSize={10}
            activePointSize={16}
            inactivePointSize={0}
            pointColor={{ from: 'serie.color', modifiers: [] }}
            pointBorderWidth={3}
            activePointBorderWidth={3}
            pointBorderColor={{ from: 'serie.color' }}
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: -36,
                truncateTickAt: 0
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Ranking',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            isInteractive={true}
            margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
            axisRight={null}
            />
        </div>
        </>
    )
}

export default BumpChart
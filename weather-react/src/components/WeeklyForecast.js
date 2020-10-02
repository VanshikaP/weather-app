import React from 'react';
import {Line} from 'react-chartjs-2'

const WeeklyForecast = ({weekly, timezone}) => {
    console.log('Watch me', weekly[0])
    // console.log('Watch me 1', new Date((weekly[0].dt+timezone+25200) * 1000).getDay())
    const data = {
        labels : weekly.map(d => `${new Date((d.dt+timezone+25200) * 1000).getDate()}/${new Date((d.dt+timezone+25200) * 1000).getMonth()+1}`),
        datasets : [
            {
                label: 'Max Temp',
                fill: false,
                lineTension: 0,
                borderColor: 'rgb(255,255,255)',
                // borderWidth: 2,
                data: weekly.map(d => Math.round(d.temp.max))
            },
            {
                label: 'Min Temp',
                fill: false,
                lineTension: 0,
                borderColor: 'rgb(255,255,255)',
                // borderWidth: 2,
                data: weekly.map(d => Math.round(d.temp.min))
            }
        ]
    }
    
    return (
        <div className='weekly-box'>
            <Line
                data={data}
                options={{
                    title:{
                        display:false,
                    },
                    legend:{
                        display:false
                    }
                }} />
        </div>
    )
}

export default WeeklyForecast
import { Line } from 'react-chartjs-2'
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getCovidFluctiatedDataAPI } from '../globalfiles/GlobalAPI';
import { CovidOverAllData } from '../globalfiles/GlobalInterface';


const Charts = () => {
  const [covidData, setCovidData] = useState<CovidOverAllData | null>(null);

  const [dataTest, setDataTest] = useState<any>(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Covid-19 Cases',
      },
    },
  };

  useEffect(() => {
    getCovidData();
  }, [])


  const getCovidData = async () => {
    const fluctuatedData = await getCovidFluctiatedDataAPI();
    setCovidData(fluctuatedData);
  };

  useEffect(() => {
    if (covidData) {
      const labels = Object.keys(covidData.cases).map((date) => {
        // Convert date format from "1/22/20" to "January 22, 2020"
        const [month, day, year] = date.split('/');
        const formattedDate = new Date(Number(year) + 2000, Number(month) - 1, Number(day))
          .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        return formattedDate;
      });
      const caseData = Object.values(covidData.cases);
      const deathsData = Object.values(covidData.deaths);
      const reacoverdData = Object.values(covidData.recovered);
      const newData = {
        labels,
        datasets: [
          {
            label: 'Cases',
            data: caseData,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Deaths',
            data: deathsData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            tension: 0.1,
          },
          {
            label: 'Recovered',
            data: reacoverdData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1,
          },
        ],
      };

      setDataTest(newData);
    }
  }, [covidData])

if(covidData=== null ) return <div style={{ height: "50px", width: "50px", marginTop: "50vh", marginLeft:"80vh" }}><svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                  viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                                  <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style={{opacity:"0.5"}}/>
                                  <circle fill="#fff" stroke="#e74c3c" stroke-width="3" cx="8" cy="54" r="6" >
                                  <animateTransform
                                    attributeName="transform"
                                    dur="2s"
                                    type="rotate"
                                    from="0 50 48"
                                    to="360 50 52"
                                    repeatCount="indefinite" />
                                  
                                  </circle>
                                  </svg>
                                </div>;
  return (
    <div style={{ height: '100vh', justifyContent: "center" }}>
      <div className="text-2xl  leading-5 text-white" style={{ padding: '1vh', marginLeft:"80vh", fontFamily: 'monospace' }}>
        Charts
      </div>
      <hr className='mb-2'/>
      <div>
      {dataTest !== null && <Line options={options} data={dataTest} />}
      </div>
    </div>
  )
}

export default Charts

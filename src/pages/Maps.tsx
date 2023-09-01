import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useQuery } from 'react-query'
import { getCountrySpecificCasesAPI } from '../globalfiles/GlobalAPI';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { CountryData } from '../globalfiles/GlobalInterface';


const Maps = () => {

  const { isLoading, error, data } = useQuery('countryData', getCountrySpecificCasesAPI);

  if (isLoading) return <div style={{ height: "50px", width: "50px", marginTop: "50vh", marginLeft:"80vh" }}><svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
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

  if (error) return <div style={{ height: '100vh' }}>An error has occurred: {(error as Error).message}</div>;

  return (
    <div style={{ height: '100vh', justifyContent: "center" }}>
    <div className="text-2xl leading-5 text-white" style={{ padding: '1vh', marginLeft:"80vh", fontFamily: 'monospace' }}>
      Maps
    </div>
    <hr className='mb-2'/>
      <MapContainer style={{ height: "80vh", borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} center={[20, 30]} zoom={2}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />
        <MarkerClusterGroup
          chunkedLoading
        >
          {data.map((country: CountryData) => {
            const flagIcon = L.icon({
              iconUrl: country.countryInfo.flag,
              iconSize: [30, 20],
              iconAnchor: [15, 10]
            });

            return (
              <Marker
                key={country.country}
                position={[country.countryInfo.lat, country.countryInfo.long]}
                icon={flagIcon}
              >
                <Popup>
                  <div>
                    <h3>{country.country}</h3>
                    <p>Total Active Cases: {country.active}</p>
                    <p>Total Recovered Cases: {country.recovered}</p>
                    <p>Total Deaths: {country.deaths}</p>
                  </div>
                </Popup>
              </Marker>

            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default Maps

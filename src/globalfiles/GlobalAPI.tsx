import axios from "axios";


export const generalURL = "disease.sh/v3/covid-19";


export const authAxios = axios.create({
  baseURL: `https://${generalURL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


export const getCountrySpecificCasesAPI = async () => {
  const res = await authAxios.get(`/countries`);
  return res.data;
};

export const getCovidFluctiatedDataAPI = async () => {
  const res = await authAxios.get(`/historical/all?lastdays=all`);
  return res.data;
};

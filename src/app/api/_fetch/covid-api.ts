const API_URL = 'https://api.ukhsa-dashboard.data.gov.uk/themes/infectious_disease/sub_themes/respiratory/topics/COVID-19/geography_types/Nation/geographies/England/metrics'

const getCovidDataByChartName = async ( chartName: string ) => {
     const response = await fetch(`${API_URL}/${chartName}?page_size=50`);
     return response.json();
   };

   export default getCovidDataByChartName;

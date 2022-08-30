import { useState , useEffect } from 'react';

const parseJSON = (resp) => (resp.json ? resp.json() : resp);

export const baseURL = "http://localhost:1337";

const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  return parseJSON(resp).then(resp => {
    throw resp;
  });
};

export const useFetch = (url,globalData) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(()=>{
		const fetchData = async () => {
			setLoading(true);
			try{
				if(globalData === undefined || globalData === null){
					const res = await fetch(baseURL +"/"+ url);
					const json = await res.json();
					setData(json);
				}else{
					setData(globalData);
				}
				setLoading(false);
			} catch (error){
				setError(error);
				setLoading(false);
			}
		}
		fetchData();
	},[url])

	return [loading, error, data];
}


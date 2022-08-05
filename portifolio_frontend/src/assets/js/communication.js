import { useState , useEffect } from 'react';

const parseJSON = (resp) => (resp.json ? resp.json() : resp);

const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  return parseJSON(resp).then(resp => {
    throw resp;
  });
};

export const GetData = (path) => {

	const baseURL = "http://localhost:1337/";

	const [error, setError] = useState(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(baseURL + path,{ method: 'GET', headers: {'Content-Type': 'application/json'}})
		.then(checkStatus)
		.then(parseJSON)
		.then(({data}) => setData(data))
		.catch((error) => setError(error));
	},[]);

	return [data, error];
};


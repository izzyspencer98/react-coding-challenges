import { Component } from 'react';
import axios from 'axios';
import config from '../config';

class FetchData extends Component {

    async getData(token, type) {
        const url1 = `${config.api.baseUrl}/browse/new-releases?country=GB`;
        const url2 = `${config.api.baseUrl}/browse/featured-playlists?country=GB`;
        const url3 = `${config.api.baseUrl}/browse/categories?country=GB`;

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': type + ' ' + token
        };

        const urls = [url1, url2, url3];
        let data = [];

        await Promise.all(urls.map(url => 
            axios.get(url, {
                method: 'get',
                url: url,
                headers: headers
            })
            .then(response => {
                const responseData = this.handleStatus(response);
                data.push(responseData);
            })
            .catch((error) => {
                console.log(error)
            })
        ));

        return data;
    }

    handleStatus(response) {
        if(response.status === 200) {
            console.log("200 OK - Successful");
            return response.data;
        } else if(response.status === 400) {
            console.log("400 Bad request - Something Went Wrong");
            return null;
        } else if(response.status === 401) {
            console.log("401 Unauthorised - Incorrect Token");
            return null;
        } else if(response.status === 404) {
            console.log("404 Not Found");
            return null;
        } else {
            console.log("Other error");
            return null;
        }
    }

}
const fetchData = new FetchData();
export default fetchData;
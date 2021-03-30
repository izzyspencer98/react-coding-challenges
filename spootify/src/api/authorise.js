import { Component } from 'react';
import config from '../config';

class AuthoriseUser extends Component {

    async getToken() {
        const id = config.api.clientId;
        const secret = config.api.clientSecret
        const to_send = `grant_type=client_credentials&client_id={{${id}}}&client_secret={{${secret}}}`
        const encodedData = Buffer.from(id + ':' + secret).toString('base64');
        var authHeader = 'Basic ' + encodedData;

        return fetch(config.api.authUrl, {
            method: 'post',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
               'Authorization': authHeader
            },
            body: to_send
        })
        .then((response) => {
            if(response.status === 200) {
                console.log("200 OK - successful")
                return response.json()
            } else if(response.status === 400) {
                console.log("400 Bad request - something went wrong")
            } else if(response.status === 401) {
                console.log("404 Not Found")
            } else {
                console.log("Other error")
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }



}
const authoriseUser = new AuthoriseUser();
export default authoriseUser;
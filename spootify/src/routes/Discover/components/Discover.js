import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import fetchData from '../../../api/discover'
import authoriseUser from '../../../api/authorise'

export default class Discover extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    const authResponse = await authoriseUser.getToken();
    if(authResponse !== null || authResponse !== undefined) {
      const token = authResponse.access_token;
      const type = authResponse.token_type;
      const data = await fetchData.getData(token, type);
      
      let releases = [];
      let featured = [];
      let browse = [];

      // eslint-disable-next-line array-callback-return
      (data.map(item => {
        if(item.albums !== undefined) {
          releases = item;
        }
        if(item.playlists !== undefined) {
          featured = item;
        }
        if(item.categories !== undefined) {
          browse = item;
        }
      }));

      this.setState({
        newReleases: releases,
        playlists: featured,
        categories: browse
      }, () => {
        this.setState({isLoading: false});
      });
    }
  }

  render() {
    const { isLoading, newReleases, playlists, categories } = this.state;

    if(!isLoading) {
      return (
        <div className="discover">
          <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases.albums} />
          <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists.playlists} />
          <DiscoverBlock text="BROWSE" id="browse" data={categories.categories} imagesKey="icons" />
        </div>
      );
    }

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={[]} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={[]} />
        <DiscoverBlock text="BROWSE" id="browse" data={[]} imagesKey="icons" />
      </div>
    );
    

    
  }
}

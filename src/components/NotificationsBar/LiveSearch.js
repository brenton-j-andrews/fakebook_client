/* 
    This component contains the app search bar, call the API to fetch search results, and renders search results via the SearchBarTile component.
    Made as a class component to get a refresher.
*/

import React from 'react';
import axios from 'axios';

import SearchBarTile from './SearchBarTile';

const SEARCHBAR_URL_ENDPOINT = 'http://localhost:3000/user/profile/search';

export class LiveSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            showSearchData: false,
            searchData: []
        };

        this.inputClickHandler = this.inputClickHandler.bind(this);
        this.fetchSearchData = this.fetchSearchData.bind(this);
        this.onInputChage = this.onInputChage.bind(this);
    }

    fetchSearchData() {
        axios.post(SEARCHBAR_URL_ENDPOINT, 
            { 
                string : this.state.searchInput
            }, {
            headers: {
                'Authorization' : localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            this.setState({ searchData : response.data });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    // Update searchInput state value and call fetchSearchData for filtered user search. 
    // TODO: Sine setState is async, the body passed to API lags by a word. Try fixing later.
    onInputChage(event) {
        this.setState({ searchInput : event.target.value });
        this.fetchSearchData();
     }
 
    // Triggers on clicking the search input bar. By default, will return all users in database. 
    // TODO: In API, limit number of users returned to a max of 10. Maybe some way to randomize?
    inputClickHandler() {
        this.setState({ showSearchData : true });
        this.fetchSearchData();
    }

    render() {
        if (!this.state.showSearchData) {
            return (
                <div className='info-box position-relative'>
                    <input
                        className='w-100'
                        type="text"
                        value={''}
                        onChange={(e) => {this.onInputChage(e)}}
                        placeholder='Search Fakebook here!'
                        onClick={this.inputClickHandler}
                    />
                </div>
            );
        }

        return (
            <div className='info-box position-relative bg-light'>
                <input
                    className='w-100'
                    type="text"
                    value={this.state.searchInput || ''}
                    onChange={(e) => {this.onInputChage(e)}}
                    placeholder='Search Fakebook here!'
                />

                <div className='d-flex flex-column align-items-center position-absolute bg-light w-100 z-index-2'>
                    <button onClick={() => {this.setState({ searchData : [], showSearchData: false })}}> Close Search Results </button>
                    {this.state.searchData.map((item, index) => {
                        return (
                            <SearchBarTile userItem={item} key={index}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}
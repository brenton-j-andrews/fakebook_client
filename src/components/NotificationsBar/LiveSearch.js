/* 
This component contains the app search bar, makes call to API for fetching search results, and renders 
search results via the SearchResults component.
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

        this.searchInput = '';
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

    onInputChage(event) {
        this.setState({ searchInput : event.target.value });
        this.fetchSearchData();
     }
 
    inputClickHandler() {
        this.setState({ showSearchData : true });
        this.fetchSearchData();
    }

    render() {
        if (!this.state.showSearchData) {
            return (
                <div className='info-box position-relative'>
                    <input
                        type="text"
                        value={this.state.searchInput}
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
                    value={this.statesearchInput}
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
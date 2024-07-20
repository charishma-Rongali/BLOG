import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { IoIosSearch } from 'react-icons/io';
import axios from 'axios';
import '../style/SearchBlog.css'; // Import the CSS file

const SearchBlog = ({setResults}) => {
    const [searchValue, setSearchValue] = useState('');

    const fetchData = async (value) => {
        try {
            const response = await axios.get('http://localhost:5000/get-all-blogs');
            const result = response.data.filter((blog) => {
                return (
                    blog.title && blog.title.toLowerCase().includes(value.toLowerCase()))
            });
            console.log(result);
            setResults(result);
        } catch (err) {
            console.log(err.message+"in searchData");
        }
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        fetchData(value);
    };

    return (
        <InputGroup className="mb-3 w-50 search-input-wrapper">
            <InputGroup.Text id="basic-addon1" className="input-group-text">
                <IoIosSearch />
            </InputGroup.Text>
            <Form.Control
                type="search"
                placeholder="search your blogs here"
                value={searchValue}
                onChange={handleSearchChange}
                className="form-control"
            />
        </InputGroup>
    );
};

export default SearchBlog;

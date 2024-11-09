import React from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    onSearch: (term: string) => void;
}


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value)
    }

    return (
        <InputGroup className="mb-4">
            <Form.Control
                type="text"
                placeholder='Search recipes...'
                onChange={handleSearchChange}
            />
            <InputGroup.Text>
                <FaSearch/>
            </InputGroup.Text>

        </InputGroup>
    );

}

export default SearchBar;

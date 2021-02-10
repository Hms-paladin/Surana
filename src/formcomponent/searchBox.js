import React from 'react';
import Search from 'antd/lib/input/Search';


class SearchBox extends React.Component{
    render(){
        const { placeholder, enterButton, size, onSearch } = this.props;
        return(
            <>
                <Search
                    placeholder={placeholder}
                    enterButton={enterButton}
                    size={size}
                    onSearch={onSearch}
                />
            </>
        )
    }
}

export default SearchBox;
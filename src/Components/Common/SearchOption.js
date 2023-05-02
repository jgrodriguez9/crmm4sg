import React, { useState } from 'react';
import { Input } from 'reactstrap';

const SearchOption = () => {
    const [value, setValue] = useState("");
    const onChangeData = (value) => {
        setValue(value);
    };


    return (
        <React.Fragment>
            <form className="app-search d-none d-md-block">
                <div className="position-relative">
                    <Input type="text" className="form-control" placeholder="Search..."
                        id="search-options"
                        value={value}
                        onChange={e => {
                            onChangeData(e.target.value);
                        }} />
                    <span className="mdi mdi-magnify search-widget-icon"></span>
                    <span className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                        id="search-close-options"></span>
                </div>
            </form>
        </React.Fragment>
    );
};

export default SearchOption;
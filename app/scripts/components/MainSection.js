import React from 'react';
import { List } from 'containers/List';
import { Details } from 'containers/Details';

const MainSection = () => (
    <div className="app__list-wrap">
        <div className="app__list">
            <List />
        </div>
        <div className="app__list-drag" />
        <div className="app__details">
            <Details />
        </div>
    </div>
);

export { MainSection };

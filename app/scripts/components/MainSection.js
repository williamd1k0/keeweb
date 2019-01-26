import React from 'react';
import { List } from 'containers/List';

const MainSection = () => (
    <div className="app__list-wrap">
        <div className="app__list">
            <List />
        </div>
        <div className="app__list-drag" />
        <div className="app__details" />
    </div>
);

export { MainSection };

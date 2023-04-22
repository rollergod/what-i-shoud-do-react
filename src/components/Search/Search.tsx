import React from 'react';

import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({ searchQuery, setSearchQuery }) => {

    return (
        <div className={styles.root}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
                placeholder='Введите название поста'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
};

export default Search
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';
import { RiSearchLine } from 'react-icons/ri';

export default class Filter extends Component {
  render() {
    const { input, onChange } = this.props;
    return (
      <div className={s.search}>
        {/* <p>Find contacts by name</p> */}
        <RiSearchLine size={20} className={s.search__icon} />
        <input
          className={s.search__input}
          type="text"
          placeholder="Find contacts by name"
          name="filter"
          onChange={onChange}
          value={input}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  input: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

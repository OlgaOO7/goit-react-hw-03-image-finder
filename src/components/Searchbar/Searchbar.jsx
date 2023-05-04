import { Component } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    searchQuery: "",
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === "") {
      return toast.warning("Please, enter your query!", {
        theme: "colored"
      });
    }

    this.props.onSubmit(this.state.searchQuery.trim());
    this.setState({
      searchQuery: "",
    })
  }

  handleSearchChange = e => {
    this.setState({
      searchQuery: e.target.value.toLowerCase(),
      
    })
  }

  render () {
    const { searchQuery } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
        <button type="submit" className={css.searchBtn}>
          <MagnifyingGlassIcon />
        </button>
        <input
          className={css.searchInput}
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleSearchChange}
        />
      </form>
    </header>
    )
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

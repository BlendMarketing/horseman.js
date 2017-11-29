import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as types from "../constants/ActionTypes";
import ActionFactory from "../ActionFactory";
import LoadUri from "../LoadUri";

export default function (Component, routes) {
  class PrefetchLink extends React.Component {
    componentWillMount() {
      this.preloadLink();
    }

    preloadLink() {
      const { preload, to } = this.props;
      const endpoint = LoadUri(routes, to);
      preload(endpoint);
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  PrefetchLink.propTypes = {
    /*
     * The url the link is pointed to
     */
    to: PropTypes.string.isRequired,
    /*
     * The function in dispatch
     */
    preload: PropTypes.func.isRequired,
  };
  /**
   * The component needs to be able to fetch the resource we want.
   */
  const mapDispatchToProps = dispatch => ({
    preload: uri => dispatch(ActionFactory(types.ADD_RESOURCE)(uri)),
  });

  const mapStateToProps = () => {};

  return connect(mapStateToProps, mapDispatchToProps)(PrefetchLink);
}

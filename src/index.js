import 'babel-core/register';
import 'babel-polyfill';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import Translate from 'react-translate-component';
import LocaleSwitcher from './components/LocaleSwitcher';
import { default as i18n, fetchTranslations } from './util/i18n';

class Root extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      translationReady: false,
    };
  }

  componentWillMount() {
    fetchTranslations.then(() => {
      this.setState({
        translationReady: true,
      });
    });
    i18n.setLocale(this.props.params.locale || 'en');
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.params.locale !== this.props.params.locale) {
      i18n.setLocale(nextProps.params.locale);
    }
  }

  render() {
    return (
      <div>
        <LocaleSwitcher />
        {
          this.state.translationReady ? (
            <div>
              <Translate content="app.title" component="h1" />
              <Translate content="app.tagline" component="strong" />
            </div>
          ) : (
            <div>Loading!</div>
          )
        }
      </div>
    );
  }
}

const routes = (
  <Route>
    <Redirect from="/" to="en" />
    <Route path="/:locale">
      <IndexRoute component={Root} />
    </Route>
  </Route>
);

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('root')
);

import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Home from './Home';

if (module.hot) {
  require('preact/debug');
}

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="page-app" class="page-app">
        <Header />
        <div class="page-content">
          <main class="page-main">
            <Router onChange={this.handleRoute}>
              <Home path="/" />
            </Router>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

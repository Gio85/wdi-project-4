import React from 'react';
import OAuth from '../../lib/OAuth';
import queryString from 'query-string';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';

class OAuthButton extends React.Component {
  componentWillMount(){
    this.provider = OAuth.getProvider(this.props.provider);

    //  if there's no code in the adress bar,
    //  AND the provider in the localStorage does not match this button,
    //  stop here...
    if(!this.props.location.search.match(/code/) || localStorage.getItem('provider') !== this.props.provider) return false;

    // get the querystring out of the address bar, as an Object
    //{ code: 'examplecodeGoesHere'}
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;

    // send the code to the API
    Axios.post(this.provider.url, data)
      .then(res => Auth.setToken(res.data.token))
      .then(() => localStorage.removeItem('provider'))
      .then(() => this.props.history.replace(this.props.history.pathname))//per evitare che quando l'user clicca la freccia per andare indietro, riceva un errore in console e venga indirizzato alla pagina di login
      .then(() => this.props.history.push('/'))
      .catch((err) => console.log(err));
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }

  render () {
    return (
      <div className="center">
        <a
          href={this.provider.authLink}
          onClick={this.setProvider}
        >
          {this.props.children}
        </a>
      </div>
    );
  }
}

export default withRouter(OAuthButton);

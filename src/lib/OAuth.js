import queryString from 'query-string';

class OAuth {
  static providers = [{
    name: 'facebook',
    url: '/api/oauth/facebook',
    clientId: '1729413600466536',
    authEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
    scope: 'email'
  }];

  static getAuthLink(provider) {
    const qs = {
      scope: provider.scope,
      client_id: provider.clientId,
      redirect_uri: window.location.href
    };

    return `${provider.authEndpoint}?${queryString.stringify(qs)}`;
  }

  static getProvider(providerName) {
    const provider = this.providers.find(provider => provider.name === providerName);
    provider.authLink = this.getAuthLink(provider);
    return provider;
  }
}

export default OAuth;

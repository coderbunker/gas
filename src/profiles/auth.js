function getPresentationService() {
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService('presentation2')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl('https://accounts.google.com/o/oauth2/auth')
      .setTokenUrl('https://accounts.google.com/o/oauth2/token')

      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(PropertiesService.getScriptProperties().getProperty('OAUTH_CLIENT_ID'))
      .setClientSecret(PropertiesService.getScriptProperties().getProperty('OAUTH_CLIENT_SECRET'))

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope('https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email')

      // Below are Google-specific OAuth2 parameters.

      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getActiveUser().getEmail())

      // Requests offline access.
      .setParam('access_type', 'offline')

      // Forces the approval prompt every time. This is useful for testing,
      // but not desirable in a production application.
      .setParam('approval_prompt', 'force');
}

function clearService(){
  OAuth2.createService('presentation2')
      .setPropertyStore(PropertiesService.getUserProperties())
      .reset();
}

function showSidebar() {
  var presentationService = getPresentationService();
  if (!presentationService.hasAccess()) {
    var authorizationUrl = presentationService.getAuthorizationUrl();
    var template = HtmlService.createTemplate(
        '<a href="<?= authorizationUrl ?>" target="_blank">Authorize</a>. ' +
        'Reopen the sidebar when the authorization is complete.');
    template.authorizationUrl = authorizationUrl;
    var page = template.evaluate();
    SlidesApp.getUi().showSidebar(page);
  } else {
    var template = HtmlService.createTemplate(
        'Has access!');
    var page = template.evaluate();
    SlidesApp.getUi().showSidebar(page);
  }
}

function authCallback(request) {
  var presentationService = getPresentationService();
  var isAuthorized = presentationService.handleCallback(request);
  if (isAuthorized) {
    Logger.log('success')
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    Logger.log('failed')
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
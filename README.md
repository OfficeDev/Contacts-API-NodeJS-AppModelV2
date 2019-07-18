---
topic: sample
products:
- office-365
- office-outlook
languages:
- javascript
extensions:
  contentType: samples
  createdDate: 9/3/2015 2:30:58 PM
---
# Contacts API for Outlook using Node.js and the v2 App Model

This repository contains a Node.js that connects to the unified Contacts API for Outlook using the v2 App Model (which handles both consumer and business accounts). A full write-up of the solution is available at [http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## Getting Started ##
To get started, clone the repo and then register an application at [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com). The application should be registered for a web platform where you will be asked to provide an OAuth reply URL. Copy this reply URL along with the app's Client ID and Secret into appDetails section of authHelper.js:

	var appDetails = {
	 authority: 'https://login.microsoftonline.com/common',
	 client_id: '1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret: 'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
The solution uses an authHelper.js file, containing application registration details (client id, client secret, reply URL, permission scopes, etc) and utility functions for interacting with Azure AD. The three primary utility functions are detailed below:

- **getAuthUrl** returns the authorization end-point in Azure AD with app details concatenated as URL parameters. The application can redirect to this end-point to initiate the first step of OAuth.
- **getTokenFromCode** returns an access token using the app registration details and a provided authorization code (that is returned to the application after user signs in and authorizes the app)
- **getTokenFromRefreshToken** returns an access token using the app registration details and a provided refresh token (that might come from cache)

## Application Routes ##
The Node.js solution was built to using express and handlebars. Two routes handle the entire flow:

**Index Route**

- If the user has a cached refresh token, use it to get a new token
	- If the new token is valid, get and display data
	- If the new token is invalid, send the user to login
- If the user doesn’t have a cached refresh token, send the user to login

**Login Route**

- If the URL contains an authorization code, use it to get tokens
	- If the token is valid, cache the refresh token and send the user back to index
	- If the token is invalid, and error must have occurred
- If the URL doesn’t contain and authorization code, get the redirect URL for authorization and send user there

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

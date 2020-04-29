---
page_type: sample
products:
- office-365
- office-outlook
languages:
- javascript
extensions:
  contentType: samples
  createdDate: 9/3/2015 2:30:58 PM
---
# API Contacts pour Outlook utilisant Node.js et le modèle d’application v2

Ce référentiel contient une application Node.js qui se connecte à l’API Contacts unifiée pour Outlook à l’aide du modèle d’application v2 (qui gère les comptes particuliers et entreprises). Une version entièrement rédigée de la solution est disponible sur [http://blogs.msdn.com/b/richard\_dizeregas\_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## Prise en main ##
Clonez tout d'abord le référentiel et enregistrez une application sur [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com). L’application doit être inscrite pour une plateforme web dans laquelle vous êtes invité à fournir une URL de réponse OAuth. Copiez cette URL de réponse ainsi que l’ID client et la clé secrète de l’application dans la section appDetails de authHelper.js :

	var appDetails = {
	 authorité : 'https://login.microsoftonline.com/common',
	 client_id : '1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret : 'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 étendues : 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
La solution utilise un fichier authHelper js, contenant les détails de l’inscription de l’application (ID client, clé secrète client, URL de réponse, étendues des autorisations, etc.) et les fonctions utilitaires pour l'interaction avec Azure AD. Les trois principales fonctions utilitaires sont décrites ci-dessous :

- **getAuthUrl** renvoie le point de terminaison d’autorisation dans Azure AD avec les détails de l’application concaténés en tant que paramètres d’URL. L’application peut se rediriger vers ce point de terminaison pour initialiser la première étape de OAuth.
- **getTokenFromCode** renvoie un jeton d’accès à l’aide des détails d’inscription de l’application et d’un code d’autorisation fourni (renvoyé à l’application une fois que l’utilisateur se connecte et autorise l’application)
- **getTokenFromRefreshToken** renvoie un jeton d’accès en utilisant les détails de l’inscription de l’application et un jeton d’actualisation fourni (qui peut provenir du cache)

## Itinéraires de l'application ##
La solution Node.js a été conçue pour utiliser express et les guidons. Deux routes gèrent l'intégralité du flux :

**Itinéraire d’index**

- Si l’utilisateur possède un jeton d’actualisation mis en cache, utilisez-le pour obtenir un nouveau jeton.
	- Si le nouveau jeton est valide, récupérez et affichez des données
	- Si le nouveau jeton n’est pas valide, envoyer l'utilisateur vers la connexion
- Si l’utilisateur ne possède pas de jeton d’actualisation mis en cache, envoyez l'utilisateur vers la connexion

**Itinéraire de connexion**

- Si l’URL inclut un code d’autorisation, utilisez-le pour obtenir des jetons
	- Si le jeton est valide, mettez en cache le jeton d’actualisation et renvoyez l’utilisateur vers l'index
	- Si le jeton n'est pas valide et qu’une erreur s’est produite
- Si l’URL n'inclut pas de code d’autorisation, obtenez l’URL de redirection pour l’autorisation et envoyez l'utilisateur vers cet emplacement

Ce projet a adopté le [Code de conduite Open Source de Microsoft](https://opensource.microsoft.com/codeofconduct/). Pour en savoir plus, reportez-vous à la [FAQ relative au code de conduite](https://opensource.microsoft.com/codeofconduct/faq/) ou contactez [opencode@microsoft.com](mailto:opencode@microsoft.com) pour toute question ou tout commentaire.

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
# API de Contatos do Outlook usando o Node.js e o modelo de aplicativo v2

Este repositório contém um Node.js que se conecta à API de Contatos do Outlook unificada usando o modelo de aplicativo v2 (que lida com contas de pessoas físicas e jurídicas). Uma descrição completa da solução está disponível em [http://blogs.msdn.com/b/richard\_dizeregas\_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## Introdução ##
Para começar, clone o repositório e registre um aplicativo em [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com). O aplicativo deve ser registrado em uma plataforma Web na qual você será solicitado a fornecer um URL de resposta do OAuth. Copie este URL de resposta junto com o ID do cliente e o segredo do aplicativo na seção appDetails do authHelper.js:

	var appDetails = {
	 authority: 'https://login.microsoftonline.com/common',
	 client_id: '1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret: 'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
A solução usa um arquivo authHelper.js, que contém detalhes do registro do aplicativo (ID do cliente, segredo do cliente, URL de resposta, escopos de permissão etc.) e funções de utilitário para interagir com o Azure AD. As três principais funções de utilitário estão detalhadas abaixo:

- **getAuthUrl** retorna o ponto de extremidade da autorização no Azure AD com os detalhes do aplicativo concatenados como parâmetros de URL. O aplicativo pode redirecionar para esse ponto de extremidade para iniciar a primeira etapa do OAuth.
- **getTokenFromCode** retorna um token de acesso usando os detalhes do registro do aplicativo e um código de autorização fornecido (retornado ao aplicativo após o usuário entrar e autorizar o aplicativo)
- **getTokenFromRefreshToken** retorna um token de acesso usando os detalhes do registro do aplicativo e um token de atualização fornecido (que pode vir do cache)

## Rotas de aplicativos ##
A solução Node.js foi criada para usar express e  handlebars. Duas rotas lidam com todo o fluxo:

**Rora de indexação**

- Se o usuário tiver um token de atualização em cache, use-o para obter um novo token
	- Se o novo token for válido, obtenha e exiba os dados
	- Caso contrário, envie o usuário para entrar
- Se o usuário não tiver um token de atualização em cache, envie-o para entrar

**Rota de entrada**

- Se o URL contiver um código de autorização, use-o para obter tokens
	- Se o token for válido, armazene o token de atualização em cache e envie o usuário de volta à indexação
	- Se o token for inválido, deverá ter ocorrido um erro
- Se o URL não contiver um código de autorização, obtenha o URL de redirecionamento da autorização e envie o usuário para lá

Este projeto adotou o [Código de Conduta de Código Aberto da Microsoft](https://opensource.microsoft.com/codeofconduct/).  Para saber mais, confira [Perguntas frequentes sobre o Código de Conduta](https://opensource.microsoft.com/codeofconduct/faq/) ou contate [opencode@microsoft.com](mailto:opencode@microsoft.com) se tiver outras dúvidas ou comentários.

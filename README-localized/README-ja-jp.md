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
# Node.js と v2 アプリ モデルを使用した Outlook 用連絡先 API

このリポジトリには、v2 アプリ モデルを使用して Outlook 用の (コンシューマー アカウントとビジネス アカウントの両方を処理する) 統合連絡先 API に接続する Node.js が含まれます。ソリューションの全文は、以下で入手できます。 [http://blogs.msdn.com/b/richard\_dizeregas\_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## はじめに ##
開始するには、リポジトリを複製してから [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com) でアプリケーションを登録します。アプリケーションは、OAuth 応答 URL を提供するように求められる Web プラットフォームに登録する必要があります。この応答 URL とアプリのクライアント ID およびシークレットを authHelper.js の appDetails セクションにコピーします。

	var appDetails = {
	 authority: 'https://login.microsoftonline.com/common',
	 client_id:'1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret:'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
このソリューションでは、アプリケーション登録の詳細 (クライアント ID、クライアント シークレット、応答 URL、アクセス許可スコープなど) および Azure AD と通信するためのユーティリティ関数を含む authHelper.js ファイルを使用します。3 つの主要なユーティリティ関数の詳細は次のとおりです。

- **getAuthUrl** は、アプリの詳細が URL パラメーターとして連結された Azure AD の承認エンドポイントを返します。アプリケーションはこのエンドポイントにリダイレクトして、OAuth の最初のステップを開始できます。
- **getTokenFromCode** は、アプリ登録の詳細および提供された承認コードを使用してアクセス トークンを返します (ユーザーがサインインしてアプリを承認した後にアプリケーションに返されます)。
- **getTokenFromRefreshToken** は、アプリ登録の詳細および提供された更新トークン (キャッシュから取得される可能性があります) を使用してアクセス トークンを返します

## アプリケーションのルート ##
Node.js ソリューションは、Express とハンドルバーを使用して構築されました。フロー全体を処理する 2 つのルート:

**インデックス ルート**

- ユーザーがキャッシュされた更新トークンを持っている場合、それを使用して新しいトークンを取得します
	- 新しいトークンが有効な場合、データを取得して表示します
	- 新しいトークンが無効な場合、ユーザーをログインに送ります
- ユーザーがキャッシュされた更新トークンを持っていない場合、ユーザーをログインに送ります

**ログイン ルート**

- URL に承認コードが含まれている場合、それを使用してトークンを取得します
	- トークンが有効な場合、更新トークンをキャッシュし、ユーザーをインデックスに送り返します
	- トークンが無効な場合、エラーが発生しているはずです
- URL に承認コードが含まれていない場合、承認用のリダイレクト URL を取得し、そこにユーザーを送ります

このプロジェクトでは、[Microsoft Open Source Code of Conduct (Microsoft オープン ソース倫理規定)](https://opensource.microsoft.com/codeofconduct/) が採用されています。詳細については、「[倫理規定の FAQ](https://opensource.microsoft.com/codeofconduct/faq/)」を参照してください。また、その他の質問やコメントがあれば、[opencode@microsoft.com](mailto:opencode@microsoft.com) までお問い合わせください。

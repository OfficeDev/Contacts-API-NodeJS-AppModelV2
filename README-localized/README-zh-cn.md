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
# 使用 Node.js 和 v2 应用模型的 Outlook 联系人 API

此存储库包含一个使用 v2 应用模型（处理消费者和业务往来联系人）连接到统一 Outlook 联系人 API 的 Node.js。有关该解决方案的完整记录，请访问：[http://blogs.msdn.com/b/richard\_dizeregas\_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## 开始使用 ##
开始时，请克隆存储库，然后在 [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com) 中注册应用程序。应为 Web 平台注册应用程序，此过程将要求你提供 OAuth 回复 URL。将此回复 URL 与该应用的客户端 ID 和密码一起复制到 authHelper.js 的 appDetails 部分：

	var appDetails = {
	 authority: 'https://login.microsoftonline.com/common',
	 client_id:'1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret:'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
该解决方案使用一个 authHelper.js 文件，其中包含应用程序注册详细信息（客户端 ID、客户端密码、回复 URL、权限范围等）以及用于与 Azure AD 进行交互的实用工具函数。下面详细介绍了三种主要的实用工具函数：

- **getAuthUrl** 返回 Azure AD 中的授权终结点，同时将应用详细信息连接为 URL 参数。应用程序可以重定向到此终结点，以便开始 OAuth 的第一步。
- **getTokenFromCode** 使用应用注册详细信息和提供的授权代码（在用户登录并授权应用后返回到应用程序）返回访问令牌
- **getTokenFromRefreshToken** 使用应用注册详细信息和提供的刷新令牌（可能来自缓存）返回访问令牌

## 应用程序路由 ##
Node.js 解决方案是使用 express 和 handlebar 生成的。整个流将由两个路由进行处理：

**索引路由**

- 如果用户具有缓存的刷新令牌，请使用该令牌获取新令牌
	- 如果新令牌有效，则获取并显示数据
	- 如果新令牌无效，则将用户发送到登录
- 如果用户没有缓存的刷新令牌，则将用户发送到登录

**登录路由**

- 如果 URL 包含授权代码，请使用该代码来获取令牌
	- 如果令牌有效，则缓存刷新令牌并将用户发送回索引
	- 如果令牌无效，肯定出现了错误
- 如果 URL 不包含授权代码，请获取重定向 URL 以用于授权，并将用户发送到该位置

此项目遵循 [Microsoft 开放源代码行为准则](https://opensource.microsoft.com/codeofconduct/)。有关详细信息，请参阅[行为准则 FAQ](https://opensource.microsoft.com/codeofconduct/faq/)。如有其他任何问题或意见，也可联系 [opencode@microsoft.com](mailto:opencode@microsoft.com)。

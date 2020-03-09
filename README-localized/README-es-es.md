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
# API de contactos para Outlook con Node.js y el modelo de aplicación V2

En este repositorio Node.js se conecta a la API unificada de contactos de Outlook con la versión 2 del modelo de aplicación (que administra cuentas de consumidor y de empresa). Puede ver información detallada de la solución en [http://blogs.msdn.com/b/richard\_dizeregas\_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx](http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx "http://blogs.msdn.com/b/richard_dizeregas_blog/archive/2015/09/04/building-office-365-applications-with-node-js-and-the-azure-ad-v2-app-model.aspx")

## Introducción ##
Para empezar, clone el repositorio y, a continuación, registre una aplicación en [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com). La aplicación se debe registrar para una plataforma web, en la que se le pedirá que proporcione una URL de respuesta de OAuth. Copie esta dirección URL de respuesta junto con el ID. de cliente y el Secreto de la aplicación en la sección appDetails de authHelper.js:

	var appDetails = {
	 authority: 'https://login.microsoftonline.com/common',
	 client_id: '1d9e332b-6c7d-4554-8b51-d398fef5f8a7',
	 client_secret: 'Y0tgHpYAy3wQ0eF9NPkMPOf',
	 redirect_url: 'http://localhost:5858/login',
	 scopes: 'openid+https://outlook.office.com/contacts.read+offline_access'
	};

## authHelper.js ##
La solución usa un archivo authHelper.js con los detalles de registro de la aplicación (Id. de cliente, secreto de cliente, URL de respuesta, ámbitos de permisos, etc.) y funciones de utilidad para interactuar con Azure AD. A continuación, se detallan las tres funciones de la utilidad principal:

- **getAuthUrl** devuelve el punto final de la autorización en Azure AD con detalles de la aplicación concatenados como parámetros URL. La aplicación puede redirigirse a este punto final para iniciar el primer paso de OAuth.
- **getTokenFromCode** devuelve un token de acceso utilizando los detalles de registro de la aplicación y un código de autorización proporcionado (que se devuelve a la aplicación después de que el usuario inicie sesión y autorice la aplicación).
- **getTokenFromRefreshToken** devuelve un token de acceso utilizando los detalles de registro de la aplicación y un token de actualización proporcionado (que puede provenir de la caché).

## Las rutas de aplicación ##
La solución de Node.js se creó para usar handlebars y express. Dos rutas se ocupan de todo el flujo:

**Ruta índice**

- Si el usuario tiene un token de actualización almacenado en caché, úselo para obtener un nuevo token.
	- Si el nuevo token es válido, obtenga y muestre los datos.
	- Si el nuevo token no es válido, envíe al usuario al inicio de sesión.
- Si el usuario no tiene un token de actualización almacenado en caché, envíe el usuario al inicio de sesión.

**Ruta de inicio de sesión**

- Si la dirección URL contiene un código de autorización, úselo para obtener los tokens.
	- Si el token es válido, almacene en caché el token de actualización y vuelva a enviar al usuario al índice.
	- Si el token no es válido, se debió de producir un error.
- Si la dirección URL no contiene un código de autorización, obtenga la URL de redireccionamiento de la autorización y envíe allí al usuario.

Este proyecto ha adoptado el [Código de conducta de código abierto de Microsoft](https://opensource.microsoft.com/codeofconduct/). Para obtener más información, vea [Preguntas frecuentes sobre el código de conducta](https://opensource.microsoft.com/codeofconduct/faq/) o póngase en contacto con [opencode@microsoft.com](mailto:opencode@microsoft.com) si tiene otras preguntas o comentarios.

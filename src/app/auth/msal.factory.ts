import {
    MsalGuardConfiguration,
    MsalInterceptorConfiguration,
  } from '@azure/msal-angular';
  
  import {
    BrowserCacheLocation,
    IPublicClientApplication,
    InteractionType,
    LogLevel,
    PublicClientApplication,
  } from '@azure/msal-browser';
  
  import { environment } from '../../environments/environment';
  
  export class MsalFactory {
    public static MSALInstanceFactory(): IPublicClientApplication {
      return new PublicClientApplication({
        auth: {
          clientId: environment.msalConfig.auth.clientId,
          authority: environment.msalConfig.auth.authority,
          knownAuthorities: [environment.msalConfig.authorityDomain],
          redirectUri: environment.msalConfig.auth.redirectUri,
          postLogoutRedirectUri:
            environment.msalConfig.auth.postLogoutRedirectUri,
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage
        //   cacheLocation: BrowserCacheLocation.SessionStorage,
        },
        system: {
          allowNativeBroker: false,
          loggerOptions: {
            loggerCallback: (_, message: string) => console.log(message),
            // logLevel: LogLevel.Info,
            logLevel: LogLevel.Error,
            piiLoggingEnabled: false,
          },
        },
      });
    }
  
    /*
          MSAL Interceptor is required to request access tokens
          in order to access the protected resource (Graph)
      */
    public static MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
      const protectedResourceMap = new Map([
        [environment.apiUdima, [environment.apiConfig.uri]],
      ]);
  
      return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
      };
    }
  
    /*
          MSAL Guard is required to protect routes and require
          authentication before accessing protected routes
      */
    public static MSALGuardConfigFactory(): MsalGuardConfiguration {
      return {
        interactionType: InteractionType.Redirect,
        authRequest:  {
          scopes: [...environment.apiConfig.scopes]
        },
        // loginFailedRoute: '/login-failed'
      };
    }
  }
  
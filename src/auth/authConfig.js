export const config = {
  auth: {
    clientId: '5838f67f-be82-4f58-8b58-6def03da2430',
    authority: "https://login.microsoftonline.com/5966cffe-2c4d-4452-abeb-65098df89fed",
    redirectUri: "https://auth-setup-ded-pwa-appsv.azurewebsites.net"
  }
}

export const loginRequest = {
  scopes: ["User.Read", "api://6daff423-844d-4897-9691-6d01db37c61a/read_api"]
}



 
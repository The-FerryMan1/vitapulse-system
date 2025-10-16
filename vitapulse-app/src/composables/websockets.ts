export const setUpWebSocketConnection = (url: string) => {
  const app_name = import.meta.env.VITE_DOMAIN_NAME as string;


  let domain = ""
  if(app_name.includes("https")){
    domain = app_name.replace("https://", "");
  }else{
    domain = app_name.replace("http://", "")
  }

  
  
  const ws = new WebSocket(`ws://${domain}auth/ws/${url}`);
  return ws;
}; 

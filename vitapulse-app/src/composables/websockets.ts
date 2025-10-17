export const setUpWebSocketConnection = (url: string) => {
  const app_name:string = import.meta.env.VITE_PRODUCTION ==='dev'? import.meta.env.VITE_DOMAIN_NAME:import.meta.env.VITE_DOCKER_DOMAIN;


  let domain = ""
  if(app_name.includes("https")){
    domain = app_name.replace("https://", "");
  }else{
    domain = app_name.replace("http://", "")
  }

  
  
  const ws = new WebSocket(`ws://${domain}auth/ws/${url}`);
  return ws;
}; 

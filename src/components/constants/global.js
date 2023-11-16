const API_url = "http://127.0.0.1";
const API_port = "5000";
const img_API_id = "abfb79a24282a4978485bb52955046cd"; //uder id for https://api.imgbb.com/ for images
const img_API_url = "https://api.imgbb.com/1/upload?key=" + img_API_id; //+ "&name='name1'"
const img_API_default_employee_url = "https://i.ibb.co/Dp5FkQJ/undefined.jpg";
export {API_url, API_port, img_API_id,img_API_url,img_API_default_employee_url} 

/* curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" 
--form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"*/
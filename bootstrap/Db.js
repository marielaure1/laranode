import { Client } from 'pg'
const client = new Client()
 
export default class Db{
    execute(request){
        client.connect((err) => {
            client.query(request, [], (error, response) => {
              if(error){
                console.log("Error : ", error);
              } else {
                return response;
              }
              client.end()
            })
        })
    }
}
 
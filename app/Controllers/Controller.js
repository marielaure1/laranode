export default class Controller {
  constructor(tableName, repository) {
    if (new.target === Controller) {
      throw new TypeError('Cannot instantiate BaseController directly.');
    }

    this.tableName = tableName;
    this.repository = repository;
  }

  async all(request, response) {
    try {
      const data = await this.repository.all();
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(data));
      response.end();
    } catch (err) {
      console.error(err);
      response.writeHead(500, { 'Content-type': 'text/plain' });
      response.write('Internal Server Error');
      response.end();
    }
  }

  async get(request, response) {
    try {
      const id = request.params.id;
      const data = await this.repository.get(id);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }

  async create(request, response) {
    try {
      const createdData = request.body;

      const data = await this.repository.create(createdData);
  
      response.writeHead(201, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(data));
      response.end();
    } catch (err) {
      console.error(err);
      response.writeHead(500, { 'Content-type': 'text/plain' });
      response.write('Internal Server Error');
      response.end();
    }
  }

  async update(request, response) {
    try {
      const id = request.params.id;
      const updatedData = request.body;

      const data = await this.repository.update(id, updatedData);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }

  async delete(request, response) {
    try {
      const id = request.params.id;
      const data = await this.repository.delete(id);
  
      if(data == "Not Found"){
        throw Error("Not Found");
      } else{
        response.writeHead(204, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(data));
      }
  
      response.end();
    } catch (err) {
      console.error(err);
      let writeHead = 500;
      let write = "Internal Server Error";

      if(err.message == "Not Found"){
        writeHead = 404;
        write = "Not Found";
      }

      response.writeHead(writeHead, { 'Content-type': 'text/plain' });
      response.write(write);
      response.end();
    }
  }
}
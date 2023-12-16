let db = []

async function postHandler(request, response) {
    try {
      await bodyParser(request)
  
      db.push(request.body)
      response.writeHead(200, { "Content-Type": "application/json" })
      response.write(JSON.stringify(db))
      response.end()
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" })
      response.write("Invalid body data was provided", err.message)
      response.end()
    }
  }
  const getPosts = (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(db))
    response.end()
  }
  
  async function putPosts(request, response) {
    try {
      let url = request.url
  
      let idQuery = url.split("?")[1]
      let idKey = idQuery.split("=")[0]
      let idValue = idQuery.split("=")[1]
  
      if (idKey === "id") {
        await bodyParser(request)
  
        db[idValue - 1] = request.body
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(db))
        response.end()
      } else {
        response.writeHead(400, { "Content-type": "text/plain" })
        response.write("Invalid Query")
        response.end()
      }
    } catch (err) {
      response.writeHead(400, { "Content-type": "text/plain" })
      response.write("Invalid body data was provided", err.message)
      response.end()
    }
  }
  const deletePost = (request, response) => {
    let url = request.url
  
    let idQuery = url.split("?")[1]
    let idKey = idQuery.split("=")[0]
    let idValue = idQuery.split("=")[1]
  
    if (idKey === "id") {
      db.splice(idValue - 1, 1)
      response.writeHead(200, { "Content-type": "text/plain" })
      response.write("Delete Success")
      response.end()
    } else {
      response.writeHead(400, { "Content-type": "text/plain" })
      response.write("Invalid Query")
      response.end()
    }
  }
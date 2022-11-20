/**Creating a server with NodeJS*/                        
const http = require('http');                          //import http core module package and stores it in the http constant
// const server = http.createServer((req, res) =>{     //create a server with the createServer method of the http package and assign it to the variable server. That method takes in a callback function with 2 objects as arguments: the request from the browser and the response sent back to the browser
//     console.log(req.url);                           //log to the console the request url
//     res.end('Hello NodeJS');                        //end the response by serving this text embedded into the page. 
// });


/**Serving different content depending on url*/
// const server2 = http.createServer((req, res) => {
//     if(req.url === '/about')                        //if url ends with /about    
//         res.end('The about page');                  //end the response and serve the about page 
//     else if(req.url === '/contact')                 //if url ends with /contact
//         res.end('The contact page');                //end the response and serve the contact page
//     else if(req.url === '/')                        //if the url ends with /
//         res.end('The home page');                   //end the response and serve the home page
//     else{                                           //if unknown url
//         res.writeHead(404);                         //respond in the header with code 404 for page not found
//         res.end('page not found');                  //end the response and serve the notFoundPage
//     }
// });

/**Serving different html pages depending on url*/
const fs = require('fs');                               //import fileSystem core module and store it into a constant
const about = fs.readFileSync('./about.html');          //read about.html file and store it in a variable
const contact = fs.readFileSync('./contact.html');      //read contact.html file and store it in a variable
const home = fs.readFileSync('./home.html');            //read home.html file and store it in a variable

const server = http.createServer((req, res) => {        //This callback function is called a request handler as it receives a request and decides how to handle/respond to it
    if(req.url === '/about')                            //if url ends with /about    
        res.end(about);                                 //end the response and serve the about page 
    else if(req.url === '/contact')                     //if url ends with /contact
        res.end(contact);                               //end the response and serve the contact page
    else if(req.url === '/')                            //if the url ends with /
        res.end(home);                                  //end the response and serve the home page
    else{                                               //if unknown url
        res.writeHead(404);                             //respond in the header with code 404 for page not found
        res.end(notFound);                              //end the response and serve the notFoundPage
    }
});


server.listen(3000);  //let server listen on port 3000;
const welcomeRoutes = function ({ app }) {
  app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `
      <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          @import url('https://fonts.googleapis.com/css?family=Noto+Sans&display=swap');

          body {
              background: rgb(19, 19, 19);
              color: #fff;
              font-family: 'Noto Sans', sans-serif;
          }

          input {
            margin-top: 20px;
          }
          #AC {
            width: 130px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            background-color: white;
            background-image: url('https://www.w3schools.com/css/searchicon.png');
            background-position: 10px 10px; 
            background-repeat: no-repeat;
            padding: 12px 20px 12px 40px;
            transition: width 0.4s ease-in-out;
          }
          
          #AC:focus {
            width: 100%;
          }

          input[type="submit"] {
            box-shadow: 0px 0px 3px 2px #9fb4f2;
            background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%);
            background-color:#7892c2;
            border-radius:10px;
            border:1px solid #4e6096;
            display:inline-block;
            cursor:pointer;
            color:#ffffff;
            font-family:Arial;
            font-size:19px;
            padding:12px 37px;
            text-decoration:none;
            text-shadow:0px 1px 0px #283966;
          }
          input[type="submit"]:hover {
            background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%);
            background-color:#476e9e;
          }
          input[type="submit"]:active {
            position:relative;
            top:1px;
          }

          </style>
        </head>
        <body>
          <h1>Find Words</h1>
          <section>
            <form action="dictionary" method="get">
              <input name="prefix" type="text" id="AC" />
              <br />
              <input name="limit" placeholder="list limit i.e: 5" type="text" />
              <br />
              <input type="submit" value= "Prefix Search"/>
              <br/> <br/> <i> Search by prefix (limit is not required) </i>
            </form>
          <hr />
            <form action="statistics" method="get">
              <input type="submit" value= "Show Statistics"/>
              <br/><br/> <i> Show performance statistics </i>
            </form>
          <hr />
            <form action="dictionary/upload" method="post"
            enctype="multipart/form-data">
              <input type="file" name="filetoupload"><br>
              <input type="submit" value="Replace dict">
              <br/><br/> <i> TXT files with words seperated by endline </i>
            </form>
          </section>
          <script>
            // Get the autocomp field
            let autocomp = document.getElementById('AC');
            function renderDatalist (data) {
              const existingElement = document.getElementById("autocomp-data");
              if (existingElement && existingElement.parentNode) existingElement.parentNode.removeChild(existingElement);
              
              // Create the datalist element
              let datalist = document.createElement('datalist');
              datalist.id = 'autocomp-data';
              autocomp.setAttribute('list', datalist.id);
            
              // Create fragment for option elements
              let fragment = document.createDocumentFragment();
            
              // Create list options
              for (let autocomp of data) {
                let option = document.createElement('option');
                option.textContent = autocomp;
                fragment.append(option);
              }
            
              // Add options to datalist
              datalist.append(fragment);
            
              // Inject into the DOM
              autocomp.after(datalist);
            
            }
            
            const prefixUpdate = (prefix) => {
              if (prefix.length < 1) return;
              prefix = prefix.toUpperCase();
              fetch('/dictionary?limit=10&prefix='+prefix).then(function (response) {
                if (response.ok) {
                  return response.json();
                }
                return [];
              }).then(function (data) {
                renderDatalist(data);
              }).catch(function (error) {
                console.warn(error);
              });
            }
            autocomp.addEventListener('input', (e)=>{prefixUpdate(e.target.value);});
           
          </script>        
        </body>
      `
    );
    return res.end();
  });
};

module.exports = { welcomeRoutes };

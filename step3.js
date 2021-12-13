const fs = require('fs');
const axios = require('axios');


// Handle the output
function handleOutput(text, out) {
    // If out not = 0
    if (out !== 0) {
        // Write the contents to the file
      fs.writeFile(out, text, 'utf8', function(err) {
        if (err) {
          console.error(`Couldn't write ${out}: ${err}`);
          process.exit(1);
        }
      });
    //   Else then we simply log the contents to the console
    } else {
      console.log(text);
    }
}

async function webCat(path, out) {
    // If path is URL
    if(path.slice(0, 4) === "http") {
        try {
            const res = await axios.get(path);
            handleOutput(res.data, out)
        } catch (error) {
            console.error(error)
        }
    }
    else {
        fs.readFile(path, "utf8", (err, data) => {
            if(err) {
                console.log('ERROR: ' + err);
                process.kill(1);
            }
    
            handleOutput(data, out);
        })
    }
}

let out = 0;
let path = process.argv[2];

// if out exists in the input, then we set the vars accordingly.
if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }

//   Calling our function
webCat(path, out);

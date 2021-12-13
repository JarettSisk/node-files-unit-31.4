const fs = require('fs');
const axios = require('axios');

// Read the file and print the contents
async function webCat(path) {
    // If path is URL
    if(path.slice(0, 4) === "http") {
        try {
            const res = await axios.get(path);
            console.log(res.data)
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
    
            console.log(data);
        })
    }
}

webCat(process.argv[2]);
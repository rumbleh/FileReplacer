const fs = require('fs')

// Target file
const targetFile = process.argv[2]

// originals and modifieds files separated by comma
// it's supports multiple files, but the numbers of originals and modified items, must be the same.
// it doesn't support wildcard replaces, the data must be same lenght
// The index of each occorence of originalBytes array will be replaced by same index in modifiedBytes

const originalsFilenames = process.argv[3].split(',')
const modifiedsFilenames = process.argv[4].split(',')
const outputFile = process.argv[5]

targetBytes = ''

originalsBytes = []
modifiedsBytes = []

console.log (targetFile, originalsFilenames, modifiedsFilenames)

try {
    targetBytes = fs.readFileSync(targetFile).toString('hex')   
    let result = ''
    for (var i = 0; i < targetBytes.length; i+=2)
        result += (targetBytes[i]+''+targetBytes[i+1])
    targetBytes = result

  } catch (err) {
    console.error(err)
}

// Loads the bytes of search into array
originalsFilenames.forEach((element) => { 
    data = fs.readFileSync(`./${element}`).toString('hex');
    
    let result = []
    for (var i = 0; i < data.length; i+=2)
        result += data[i]+''+data[i+1]
    
    originalsBytes.push(result)    
})

// Loads the bytes of search into array
modifiedsFilenames.forEach((element) => { 
    data = fs.readFileSync(`./${element}`).toString('hex');
    
    let result = []
    for (var i = 0; i < data.length; i+=2)
        result += data[i]+''+data[i+1]
    
    modifiedsBytes.push(result)       
});

data = []
// Print first tree bytes of each element of originalsBytes and ModifiedBytes
originalsFilenames.forEach((element, index) => { 
    
    while(targetBytes.includes(originalsBytes[index])){
        targetBytes = targetBytes.replace(originalsBytes[index], modifiedsBytes[index])
        console.log(index)
    }
})

output = []
for (var i = 0; i < targetBytes.length; i+=2)
  output.push(parseInt(targetBytes[i]+''+targetBytes[i+1], 16))


data = new Uint8Array(Buffer.from(output));
var callback = (err) => {
    
}

fs.writeFile(outputFile, data, function(err){
    if (err) throw err;
    console.log('It\'s done! Enjoy your day.');
});


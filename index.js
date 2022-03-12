const fs = require('fs')
const { exit } = require('process')
let hasError = false
if (process.argv.length < 6){
    console.log('Usage: index.js target.txt in1.txt in2.txt new.txt')
    console.log('It will replace all occurrences of in1.txt by in2.txt and save the output to new.txt.')
    console.log('Others usages:')
    console.log('index.js app.exe logo_old.bmp,about_old.bmp newlogo.bmp,newabout.bmp new_app.exe')
    console.log('It will replace all occurrences of logo_old.bmp inside app.exe and replacing by newlogo.bmp, about_old.bmp to newabout.bmp and save to new_app.exe')
    
    console.log('The size of pair files must be same length.')    
    exit(1)
}
// Target file
const targetFile = process.argv[2]

// originals and modifieds files separated by comma
// it's supports multiple files, but the numbers of originals and modified items, must be the same.
// it doesn't support wildcard replaces, the data must be same length
// The index of each occorence of originalBytes array will be replaced by same index in modifiedBytes

const originalsFilenames = process.argv[3].split(',')
const modifiedsFilenames = process.argv[4].split(',')
const outputFile = process.argv[5]

targetBytes = ''

originalsBytes = []
modifiedsBytes = []

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
    data = fs.readFileSync(`./${element}`).toString('hex')
    
    let result = []
    for (var i = 0; i < data.length; i+=2)
        result += data[i]+''+data[i+1]
    
    originalsBytes.push(result)    
})

// Loads the bytes of search into array
modifiedsFilenames.forEach((element) => { 
    data = fs.readFileSync(`./${element}`).toString('hex')
    
    let result = []
    for (var i = 0; i < data.length; i+=2)
        result += data[i]+''+data[i+1]
    
    modifiedsBytes.push(result)       
})

data = []
// Print first tree bytes of each element of originalsBytes and ModifiedBytes
originalsFilenames.forEach((element, index) => { 
    // Todo: If 
    if (originalsBytes[index].length != modifiedsBytes[index].length){
        console.log('The size of files doesn\'t matches. Aborting...')            
        exit(1)        
    }

    while(targetBytes.includes(originalsBytes[index]) && !hasError){
        targetBytes = targetBytes.replace(originalsBytes[index], modifiedsBytes[index])
    }
})
    
output = []
for (var i = 0; i < targetBytes.length; i+=2)
    output.push(parseInt(targetBytes[i]+''+targetBytes[i+1], 16))


data = new Uint8Array(Buffer.from(output))

fs.writeFile(outputFile, data, function(err){
    if (err) throw err
    console.log('It\'s done! Enjoy your day.')
})
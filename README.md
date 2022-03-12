# FileReplacer

Node script to search and replace inside a file for a sequence of bytes

It can receive multiple files for search input and replaces.


```index.js target.txt in1.txt,in2.txt in3.txt,in4.txt output.txt```

It will search all occorences for contents of:

in1.txt inside target.txt and replace by in3.txt
in2.txt inside previously replaced bytes and replace by in4.txt
...



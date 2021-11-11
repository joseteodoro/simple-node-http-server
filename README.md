# simple-node-http-server
GET and POST like `python3 -m http.server` but accepting post to push files from k8s, vms and other places with no access to SCP


## Usage


You can start the app using:

```
npm install && npm start <port> <absolute_path>
```

for example:


```
npm install && npm start 3003 ~/Downloads
```

After that you can list files with

```
curl http://127.0.0.1:3003/
```

you can download the `image2321231.pdf` file (from ~/Downloads directory) using

```
curl http://127.0.0.1:3003/image2321231.pdf
```

you can upload a file (to ~/Downloads directory) using

```
curl -i -X POST -H "Content-Type: multipart/form-data" -F "file=@<your-file-name>" http://127.0.0.1:3003/
```

for example

```
curl -i -X POST -H "Content-Type: multipart/form-data" -F "file=@image2321231.pdf" http://127.0.0.1:3003/
```

When uploading, the file (at ~/Downloads directory in our example) will receive the same name it has locally.
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
ThreadingHTTPServer(("127.0.0.1",8000),SimpleHTTPRequestHandler).serve_forever()

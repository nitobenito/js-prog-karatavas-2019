from flask import Flask
app = Flask(__name__, static_url_path='')

# Uzstada index.html ka nokluseto failu.
@app.route('/')
def root():
    return app.send_static_file('index.html')

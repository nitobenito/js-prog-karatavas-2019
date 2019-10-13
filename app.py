from flask import Flask
import json
app = Flask(__name__, static_url_path='')

# Uzstada index.html ka nokluseto failu.
@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/uzdevums')
def api_vards():
    response = {
        'uzdevums': 'UZDEVUMS'
    }
    return json.dumps(response)

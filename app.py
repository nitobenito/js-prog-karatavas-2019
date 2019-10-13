from flask import Flask
import json
from random import choice

app = Flask(__name__, static_url_path='')

# Uzstada index.html ka nokluseto failu.
@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/api/uzdevums')
def api_vards():
    uzdevumi = [
        'ĀBOLS',
        'APELSĪNS',
        'BANĀNS',
        'CITRONS',
        'ČIEKURS',
        'DATELE',
        'EĻĻA',
        'ĒRKŠĶOGA',
        'FRIKADELE',
        'GURĶIS'
    ]
    response = {
        'uzdevums': choice(uzdevumi)
    }
    return json.dumps(response)

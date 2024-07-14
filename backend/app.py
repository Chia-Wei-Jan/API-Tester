from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/run-tests', methods=['POST'])
def run_tests():
    data = request.json
    apis = data.get('apis', [])
    responses = []

    for api in apis:
        method = api.get('method', 'GET').upper()
        url = api.get('url', '')
        params = {param['key']: param['value'] for param in api.get('params', [])}
        headers = {header['key']: header['value'] for header in api.get('headers', [])}
        body = api.get('body', '')

        try:
            if method == 'GET':
                response = requests.get(url, params=params, headers=headers)
            elif method == 'POST':
                response = requests.post(url, params=params, headers=headers, data=body)
            elif method == 'PUT':
                response = requests.put(url, params=params, headers=headers, data=body)
            elif method == 'DELETE':
                response = requests.delete(url, params=params, headers=headers, data=body)
            else:
                response = {'error': 'Unsupported method'}
                responses.append(response)
                continue

            responses.append(response.json())
        except Exception as e:
            responses.append({'error': str(e)})

    return jsonify({'responses': responses})

if __name__ == '__main__':
    app.run(debug=True)

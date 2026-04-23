from flask import Flask, render_template, request, jsonify
from bussiness import get_data
app = Flask(__name__)

# Home route
@app.route('/')
def hello_world():
    return "hello world !"

@app.route('/api', methods=['GET'])
def api():
    data = get_data()
    
    data = {
        'data': data
    }
    return jsonify(data)
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

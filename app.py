from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'API_KEY'

@app.route('/', methods=['GET', 'POST'])
def get_bot_response():
    if request.method == 'POST':
        user_message = request.json.get('message')

        # Call OpenAI API to get the bot's response
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=user_message,
            max_tokens=10
        )

        # Extract the bot's response from the OpenAI API response
        bot_response = response['choices'][0]['text']

        return jsonify({'response': bot_response})
    else:
        return jsonify({'error': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True)

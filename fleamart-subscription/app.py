from subscription_service.src.subscribe import subscribe
from subscription_service.src.notify import notify
from subscription_service.src.unsubscribe import unsubscribe
from subscription_service.src.subscriptions import subscriptions
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(unsubscribe)
app.register_blueprint(subscribe)
app.register_blueprint(notify)
app.register_blueprint(subscriptions)






# app.py (LAB LOCAL UNIQUEMENT)
from flask import Flask, jsonify
from time import sleep
from prometheus_flask_exporter import PrometheusMetrics

app = Flask(__name__)

metrics = PrometheusMetrics(app)

@app.get("/health")
def health():
 return jsonify(status="ok")

@app.get("/fast")
def fast():
 sleep(0.08)
 return jsonify(result="fast")

@app.get("/slow")
def slow():
 sleep(0.4)
 return jsonify(result="slow")

from flask import Flask, jsonify, request
import logging
from searchTicketone import get_search_results, get_subsearch_results
from database.mongodb_service import (
    add_new_tracked_ticket,
    get_user_data,
    switch_tracked_ticket,
    delete_tracked_ticket,
    update_ticket_found,
    update_parameter,
    get_parameter,
    update_contact_list
)
from sqs_utils import get_queue_info

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)


@app.route('/get_search_results/<search_term>')
def handle_search_events(search_term):
    results = get_search_results(search_term)
    return jsonify(results)

@app.route('/get_subsearch_results/<event_url>')
def handle_search_subevents(event_url):
    subresults = get_subsearch_results(event_url)
    return jsonify(subresults)

@app.route('/get_user_data/<user_name>')
def handle_get_user_data(user_name):
    results = get_user_data(user_name)
    return jsonify(results)

@app.route('/new_tracked_ticket', methods=['POST'])
def handle_add_new_tracked_ticket():
    ticket_data = request.json
    result = add_new_tracked_ticket(ticket_data)
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to add new tracked ticket"}), 500  

@app.route('/switch_tracked_ticket', methods=['POST'])
def handle_switch_tracked_ticket():
    body = request.json
    result = switch_tracked_ticket(body['_id'], body['switch_status'])
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to switch tracked ticket"}), 500


@app.route('/delete_tracked_ticket', methods=['POST'])
def handle_delete_tracked_ticket():
    body = request.json
    result = delete_tracked_ticket(body['_id'])
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to delete tracked ticket"}), 500
    

@app.route('/get_queue_info')
def handle_get_queue_info():
    queue_info = get_queue_info()
    return jsonify(queue_info)



@app.route('/get_parameter/<parameter_name>')
def handle_get_parameter(parameter_name):
    
    result = get_parameter(parameter_name)
    logger.info(f"Getting parameter: {result}")
    if result is not None:
        return jsonify(result), 200
    else:
        return jsonify({"error": "Parameter not found"}), 404



@app.route('/update_contact_list', methods=['POST'])
def handle_update_contact_list():
    body = request.json
    result = update_contact_list(body['contact_list_data'])
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to update contact list"}), 500 

#routes for node servers

@app.route('/update_ticket_found', methods=['POST'])
def handle_update_ticket_found():
    body = request.json
    result = update_ticket_found(body['_id'])
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to execute update_ticket_found"}), 500
    

@app.route('/update_parameter', methods=['POST'])
def handle_update_parameter():
    body = request.json
    result = update_parameter(body['parameter_name'], body['parameter_value'])
    if result:
        return '', 200
    else:
        return jsonify({"error": "Failed to execute update_last_duration"}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

from database.mongodb_service import get_active_tracked_tickets
import logging
from pprint import pformat
import boto3
import json
import uuid
import sys 
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,  
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()  
    ]
)

logger = logging.getLogger(__name__)

# AWS SQS Configuration
AWS_REGION = 'eu-south-1' 
SQS_QUEUE_URL = 'https://sqs.eu-south-1.amazonaws.com/536697263901/ticket-task-queue.fifo'
MESSAGE_GROUP_ID = 'ticket-group'  

def send_message_to_sqs(sqs_client, queue_url, message_body, group_id, deduplication_id=None):
    """
    Sends a single message to the specified SQS FIFO queue.
    
    :param sqs_client: boto3 SQS client
    :param queue_url: URL of the SQS FIFO queue
    :param message_body: Dictionary representing the message body
    :param group_id: MessageGroupId for FIFO queue
    :param deduplication_id: Optional MessageDeduplicationId
    """
    try:
        response = sqs_client.send_message(
            QueueUrl=queue_url,
            MessageBody=json.dumps(message_body),
            MessageGroupId=group_id,
            MessageDeduplicationId=deduplication_id or str(uuid.uuid4())
        )
        logger.info(f"Successfully sent message ID: {response['MessageId']}")
    except Exception as e:
        logger.error(f"Failed to send message: {e}")

def main():
    try:
        # Initialize SQS client using IAM role credentials
        sqs = boto3.client('sqs', region_name=AWS_REGION)
        logger.info("Initialized SQS client successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize SQS client: {e}")
        sys.exit(1)

    try:
        # Fetch active tracked tickets from MongoDB
        tracked_tickets = get_active_tracked_tickets()
        logger.info(f"Fetched {len(tracked_tickets)} active tracked tickets.")
    except Exception as e:
        logger.error(f"Failed to fetch tracked tickets: {e}")
        sys.exit(1)

    if not tracked_tickets:
        logger.info("No tracked tickets to send. Exiting.")
        return

    # Iterate over each tracked ticket and send as a message to SQS
    for ticket in tracked_tickets:
        try:
            # Ensure the ticket is a dictionary
            if not isinstance(ticket, dict):
                logger.warning(f"Skipping non-dictionary ticket: {pformat(ticket)}")
                continue
            # Generate a unique deduplication ID if content-based deduplication is not enabled
            dedup_id = ticket.get('deduplication_id', str(uuid.uuid4()))

            ticket['SentTimestamp'] = int(time.time() * 1000)

            send_message_to_sqs(
                sqs_client=sqs,
                queue_url=SQS_QUEUE_URL,
                message_body=ticket,
                group_id=MESSAGE_GROUP_ID,
                deduplication_id=dedup_id
            )
        except Exception as e:
            logger.error(f"Error processing ticket {pformat(ticket)}: {e}")
            continue

    logger.info("Finished sending all tracked tickets to SQS.")

if __name__ == "__main__":
    main()

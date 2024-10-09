import boto3
import logging
import sys
from botocore.exceptions import ClientError
from botocore.config import Config


logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

AWS_REGION = 'eu-south-1' 
SQS_QUEUE_URL = 'https://sqs.eu-south-1.amazonaws.com/536697263901/ticket-task-queue.fifo'

def delete_all_messages():
    """
    Deletes all messages from the specified SQS FIFO queue.
    
    :param queue_url: URL of the SQS FIFO queue
    :param aws_region: AWS region where the queue resides
    """
    try:
        # Initialize SQS client
        sqs = boto3.client('sqs', region_name=AWS_REGION)
        logger.info("Initialized SQS client successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize SQS client: {e}")
        sys.exit(1)
    
    logger.info(f"Starting to delete all messages from queue: {SQS_QUEUE_URL}")
    
    while True:
        try:
            # Receive messages (up to 10 at a time)
            response = sqs.receive_message(
                QueueUrl=SQS_QUEUE_URL,
                MaxNumberOfMessages=10,
                WaitTimeSeconds=5,  # Short polling
                VisibilityTimeout=30  # Set to 30 seconds or higher
            )
            
            messages = response.get('Messages', [])
            
            if not messages:
                logger.info("No more messages to delete. Queue is empty.")
                break
            
            for message in messages:
                receipt_handle = message['ReceiptHandle']
                message_id = message.get('MessageId', 'N/A')
                
                # Delete the message
                try:
                    sqs.delete_message(
                        QueueUrl=SQS_QUEUE_URL,
                        ReceiptHandle=receipt_handle
                    )
                    logger.info(f"Deleted message ID: {message_id}")
                except ClientError as e:
                    logger.error(f"Failed to delete message ID: {message_id} - {e}")
        
        except ClientError as e:
            logger.error(f"Error receiving messages: {e}")
            break
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            break




def get_queue_info():
    """
    Retrieves the approximate number of messages from the specified SQS FIFO queue.
    
    :return: Dictionary containing the approximate number of messages
    """
    # Configure retry settings (optional but recommended)
    retry_config = Config(
        retries={
            'max_attempts': 10,
            'mode': 'standard'
        }
    )
    
    try:
        # Initialize SQS client with retry configuration
        sqs = boto3.client('sqs', region_name=AWS_REGION, config=retry_config)
        logger.info("Initialized SQS client successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize SQS client: {e}")
        sys.exit(1)
    
    try:
        # Get queue attributes to retrieve the approximate number of messages
        response = sqs.get_queue_attributes(
            QueueUrl=SQS_QUEUE_URL,
            AttributeNames=['ApproximateNumberOfMessages']
        )
        
        attributes = response.get('Attributes', {})
        approximate_number_of_messages = attributes.get('ApproximateNumberOfMessages', '0')
        logger.info(f"ApproximateNumberOfMessages: {approximate_number_of_messages}")
    except ClientError as e:
        logger.error(f"Failed to get queue attributes: {e}")
        approximate_number_of_messages = 'N/A'
    except Exception as e:
        logger.error(f"Unexpected error while getting queue attributes: {e}")
        approximate_number_of_messages = 'N/A'
    
    return {
        'ApproximateNumberOfMessages': approximate_number_of_messages
    }


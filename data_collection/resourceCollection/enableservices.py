# import boto3
# from botocore.exceptions import ClientError
# from datetime import datetime

# # DynamoDB table name
# DYNAMO_TABLE_NAME = 'EnabledServices'

# # Static data
# STATIC_DATA = {
#     'Type': 'AWS',  # You can set this dynamically or statically
#     'Category': 'Resource'
# }

# # Initialize AWS clients
# dynamodb = boto3.resource('dynamodb')
# service_quotas = boto3.client('service-quotas')

# # Function to create DynamoDB table if it doesn't exist
# def create_dynamodb_table():
#     try:
#         # Check if the table already exists
#         dynamodb.Table(DYNAMO_TABLE_NAME).load()
#         print(f"Table {DYNAMO_TABLE_NAME} already exists.")
#     except ClientError as e:
#         if e.response['Error']['Code'] == 'ResourceNotFoundException':
#             # Create the table if it doesn't exist
#             table = dynamodb.create_table(
#                 TableName=DYNAMO_TABLE_NAME,
#                 KeySchema=[
#                     {
#                         'AttributeName': 'ServiceName',
#                         'KeyType': 'HASH'  # Partition key
#                     },
#                 ],
#                 AttributeDefinitions=[
#                     {
#                         'AttributeName': 'ServiceName',
#                         'AttributeType': 'S'  # String type
#                     },
#                 ],
#                 ProvisionedThroughput={
#                     'ReadCapacityUnits': 5,
#                     'WriteCapacityUnits': 5
#                 }
#             )
#             table.wait_until_exists()  # Wait until the table is created
#             print(f"Table {DYNAMO_TABLE_NAME} created successfully.")
#         else:
#             print(f"Error checking or creating table: {e}")

# # Function to list enabled and default-enabled services
# def list_services():
#     services_data = []
#     next_token = None

#     while True:
#         # Retrieve the list of services
#         if next_token:
#             response = service_quotas.list_services(NextToken=next_token)
#         else:
#             response = service_quotas.list_services()

#         for service in response.get('Services', []):
#             service_code = service['ServiceCode']
#             service_name = service['ServiceName']

#             # Get service quotas to check if the service is enabled
#             try:
#                 quotas = service_quotas.list_service_quotas(ServiceCode=service_code)
#                 if quotas['Quotas']:  # If there are quotas, the service is enabled
#                     services_data.append({
#                         "ServiceName": service_name  # Only store the service name
#                     })
#             except Exception as e:
#                 print(f"Could not retrieve quotas for {service_name}: {e}")

#         # Check for pagination
#         next_token = response.get('NextToken')
#         if not next_token:
#             break

#     return services_data

# # Function to store services in DynamoDB
# def store_in_dynamodb(services):
#     try:
#         table = dynamodb.Table(DYNAMO_TABLE_NAME)
#         for service in services:
#             table.put_item(
#                 Item={
#                     'ServiceName': service['ServiceName'],  # Store only the service name
#                     'Timestamp': datetime.now().isoformat(),  # Add timestamp for each entry
#                     'Type': STATIC_DATA['Type'],  # Adding static Type
#                     'Category': STATIC_DATA['Category']  # Adding static Category
#                 }
#             )
#         print(f"Successfully stored {len(services)} services in DynamoDB.")
#     except Exception as e:
#         print(f"Error storing data in DynamoDB: {e}")

# def main():
#     create_dynamodb_table()  # Create the DynamoDB table if it doesn't exist
#     services = list_services()  # Fetch the list of services
#     if services:
#         store_in_dynamodb(services)  # Store the services in DynamoDB
#     else:
#         print("No services found or an error occurred.")

# if __name__ == "__main__":
#     main()
















import boto3
from botocore.exceptions import ClientError
from datetime import datetime

# DynamoDB table name
DYNAMO_TABLE_NAME = 'EnabledServices'

# Services to categorize as "Relation"
RELATION_SERVICES = [
    "IAM (Identity and Access Management)",
    "Elastic Load Balancing (ELB)"
]

# Static data for other services
STATIC_DATA = {
    'Type': 'AWS',
    'DefaultCategory': 'Resource'
}

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')
service_quotas = boto3.client('service-quotas')

# Function to create DynamoDB table if it doesn't exist
def create_dynamodb_table():
    try:
        dynamodb.Table(DYNAMO_TABLE_NAME).load()
    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            table = dynamodb.create_table(
                TableName=DYNAMO_TABLE_NAME,
                KeySchema=[
                    {'AttributeName': 'ServiceName', 'KeyType': 'HASH'}
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'ServiceName', 'AttributeType': 'S'}
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                }
            )
            table.wait_until_exists()
        else:
            print(f"Error checking or creating table: {e}")

# Function to list enabled services
def list_enabled_services():
    services_data = []
    next_token = None

    while True:
        if next_token:
            response = service_quotas.list_services(NextToken=next_token)
        else:
            response = service_quotas.list_services()

        for service in response.get('Services', []):
            service_code = service['ServiceCode']
            service_name = service['ServiceName']

            # Add the service to the list even if quotas are not found
            services_data.append({
                "ServiceCode": service_code,
                "ServiceName": service_name
            })

            # Try to get quotas, but don't strictly require them to add the service
            try:
                quotas = service_quotas.list_service_quotas(ServiceCode=service_code)
                if quotas['Quotas']:
                    print(f"Service with quotas: {service_name}")
            except Exception as e:
                print(f"Error fetching quotas for {service_name}: {e}")

        next_token = response.get('NextToken')
        if not next_token:
            break

    return services_data

# Function to store services in DynamoDB
def store_in_dynamodb(services):
    try:
        table = dynamodb.Table(DYNAMO_TABLE_NAME)

        # Store default services (with "Relation" category)
        for default_service in RELATION_SERVICES:
            table.put_item(
                Item={
                    'ServiceName': default_service,
                    'Timestamp': datetime.now().isoformat(),
                    'Type': STATIC_DATA['Type'],
                    'Category': 'Relation'
                }
            )
            print(f"Stored default service: {default_service}")

        # Store all enabled services
        for service in services:
            category = "Relation" if service['ServiceName'] in RELATION_SERVICES else STATIC_DATA['DefaultCategory']
            table.put_item(
                Item={
                    'ServiceName': service['ServiceName'],
                    'ServiceCode': service['ServiceCode'],
                    'Timestamp': datetime.now().isoformat(),
                    'Type': STATIC_DATA['Type'],
                    'Category': category
                }
            )
            print(f"Stored enabled service: {service['ServiceName']}")

    except Exception as e:
        print(f"Error storing data in DynamoDB: {e}")

def main():
    create_dynamodb_table()
    services = list_enabled_services()
    store_in_dynamodb(services)

if __name__ == "__main__":
    main()

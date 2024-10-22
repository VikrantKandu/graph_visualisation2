import boto3
from neo4j import GraphDatabase

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('EnabledServices')  # Replace with your table name

# Initialize Neo4j driver
neo4j_uri = "neo4j+s://7d76c4ea.databases.neo4j.io:7687"  # Replace with your Neo4j URI
neo4j_username = "neo4j"              # Replace with your Neo4j username
neo4j_password = "JZXfDTU7pl8wOPfrnaUujXnX8zvanhYn_bn5j53NeXg"       # Replace with your Neo4j password

driver = GraphDatabase.driver(neo4j_uri, auth=(neo4j_username, neo4j_password))

def transfer_data_to_neo4j():
    # Scan DynamoDB to get all items
    response = table.scan()
    items = response['Items']

    with driver.session() as session:
        for item in items:
            # Extract the relevant fields
            service_name = item.get('ServiceName')
            service_type = item.get('Type')
            category = item.get('Category')

            # Create a node in Neo4j
            session.run("""
                CREATE (s:DynamoService {serviceName: $serviceName, type: $type, category: $category})
                """, serviceName=service_name, type=service_type, category=category)

    print("Data transfer complete.")

if __name__ == "__main__":
    transfer_data_to_neo4j()
    driver.close()

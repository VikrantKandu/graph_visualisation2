import subprocess
import yaml
import os

def get_enabled_services(project_id):
    """Retrieve the enabled services for a given GCP project."""
    try:
        # Use the correct path to the gcloud executable
        result = subprocess.run(
            [r'C:\GoogleCloud\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd', 
             'services', 'list', '--enabled', '--project', project_id],
            capture_output=True,
            text=True,
            check=True
        )
        services = []
        for line in result.stdout.splitlines():
            if line.startswith('NAME'):
                continue  # Skip the header line
            if line.strip():
                services.append(line.strip())
        return services
    except subprocess.CalledProcessError as e:
        print(f"Error retrieving services: {e}")
        return []
    except FileNotFoundError:
        print("gcloud command not found. Please ensure the Google Cloud SDK is installed and the path is correct.")
        return []

def write_services_to_yaml(services, file_path):
    """Write the list of services to a YAML file."""
    try:
        with open(file_path, 'w') as yaml_file:
            yaml.dump({'enabled_services': services}, yaml_file, default_flow_style=False)
    except IOError as e:
        print(f"Error writing to file: {e}")

def main():
    project_id = input("Enter your GCP project ID: ")
    
    # Predefined file path
    file_path = r"D:\Vikrant\graph_visualisation2\data_collection\resourceCollection\enabled_services.yaml"

    # Get enabled services
    services = get_enabled_services(project_id)

    # Write to YAML file
    if services:  # Only write if services were retrieved
        write_services_to_yaml(services, file_path)
        print(f"Enabled services have been written to {file_path}")
    else:
        print("No enabled services found or an error occurred.")

if __name__ == "__main__":
    main()

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CloudArchitecture.css';
import { MultiSelect } from "react-multi-select-component";

const CloudArchitecture = () => {
  const [accounts, setAccounts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [controlledServices, setControlledServices] = useState([]);
  const [monitoringServices, setMonitoringServices] = useState([]);
  const [newVpcs, setVpcs] = useState([]);
  const [subnets, setSubnets] = useState([]);
  const [externalServices, setExternalServices] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [publicSubnets, setPublicSubnets] = useState([]);
  const [privateSubnets, setPrivateSubnets] = useState([]);

  // Fetch accounts from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  // Map regions to options for MultiSelect
  const options = regions.map((region) => ({
    label: region.name,
    value: region.name,
  }));

  // Fetch regions for the selected account
  useEffect(() => {
    const fetchRegions = async () => {
      if (selectedAccount) {
        try {
          const response = await axios.get(`http://localhost:8000/api/regions/${selectedAccount}`);
          setRegions(response.data);
        } catch (error) {
          console.error('Error fetching regions:', error);
        }
      }
    };
    fetchRegions();
  }, [selectedAccount]);

  // Fetch data for selected regions
  useEffect(() => {
    const fetchDataForRegion = async () => {
      if (selectedAccount && selectedRegions.length > 0) {
        try {
          const responses = await Promise.all(
            selectedRegions.map(region =>
              Promise.all([
                axios.get(`http://localhost:8000/api/controlled-services/${selectedAccount}/${region.value}`),
                axios.get(`http://localhost:8000/api/monitoring-services/${selectedAccount}/${region.value}`),
                axios.get(`http://localhost:8000/api/vpcs/${selectedAccount}/${region.value}`),
                axios.get(`http://localhost:8000/api/subnets/${selectedAccount}/${region.value}`)
              ])
            )
          );

          const newControlledServices = responses.flatMap(r => r[0].data);
          const newMonitoringServices = responses.flatMap(r => r[1].data);
          const newVpcs = responses.flatMap(r => r[2].data);
          const newSubnets = responses.flatMap(r => r[3].data);

          setControlledServices(newControlledServices);
          setMonitoringServices(newMonitoringServices);
          setVpcs(newVpcs);
          setSubnets(newSubnets);
          setPublicSubnets(newSubnets.filter(subnet => subnet.type));
          setPrivateSubnets(newSubnets.filter(subnet => !subnet.type));
        } catch (error) {
          console.error('Error fetching data for regions:', error);
        }
      }
    };

    fetchDataForRegion();
  }, [selectedAccount, selectedRegions]);

  // Fetch external services for the selected account
  useEffect(() => {
    const fetchExternalServices = async () => {
      if (selectedAccount) {
        try {
          const response = await axios.get(`http://localhost:8000/api/external/${selectedAccount}`);
          setExternalServices(response.data);
        } catch (error) {
          console.error('Error fetching external services:', error);
        }
      }
    };
    fetchExternalServices();
  }, [selectedAccount]);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    setSelectedRegions([]);
    setControlledServices([]);
    setMonitoringServices([]);
    setVpcs([]);
    setSubnets([]);
    setPublicSubnets([]);
    setPrivateSubnets([]);
    setExternalServices([]);
  };

  const handleRegionChange = (regions) => {
    setSelectedRegions(regions);
  };

  return (
    <div className="cloud-container">
      <div className="dropdowns">
        <select value={selectedAccount} onChange={handleAccountChange}>
          <option value="">Select AWS Account</option>
          {accounts.map((account, index) => (
            <option key={index} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>
        <div className="react-multiselect">
          <MultiSelect
            options={options}
            value={selectedRegions}
            onChange={handleRegionChange}
            labelledBy="Select Region"
          />
        </div>
      </div>

      {selectedAccount && selectedRegions.length > 0 && (
        <>
          <div className="virtual-cloud">
            <h2>Virtual Cloud</h2>

            <div className="vpc-services">
              <div className="controlled-services">
                <Container fluid>
                  {controlledServices.length > 0 ? (
                    <Row className="service-row">
                      {controlledServices.map((service, index) => (
                        <div key={index} className="service-box controlled-service">
                          {service.name || 'Unknown Service'}
                        </div>
                      ))}
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <div>No controlled services found.</div>
                      </Col>
                    </Row>
                  )}
                </Container>
              </div>

              <div className="monitoring-operations">
                {monitoringServices.length > 0 ? (
                  monitoringServices.map((service, index) => (
                    <div key={index} className="service-box monitoring-service">
                      {service.name || 'Unknown Service'}
                    </div>
                  ))
                ) : (
                  <div>No monitoring services found.</div>
                )}
              </div>
            </div>

            {newVpcs.length > 0 ? (
              newVpcs.map((vpc, index) => (
                <div key={index}>{vpc || 'Unknown VPC'}</div>
              ))
            ) : (
              <div>No public subnets found.</div>
            )}

            <div className="subnets-container">
              <div className="public-subnets">
                <h3>Public</h3>
                {publicSubnets.length > 0 ? (
                  publicSubnets.map((subnet, index) => (
                    <div key={index} className="subnet-box">
                      {subnet.name || 'Unknown Public Subnet'}
                    </div>
                  ))
                ) : (
                  <div>No public subnets found.</div>
                )}
              </div>

              <div className="private-subnets">
                <h3>Private</h3>
                {privateSubnets.length > 0 ? (
                  privateSubnets.map((subnet, index) => (
                    <div key={index} className="subnet-box">
                      {subnet.name || 'Unknown Private Subnet'}
                    </div>
                  ))
                ) : (
                  <div>No private subnets found.</div>
                )}
              </div>
            </div>
          </div>

          <div className="external-services">
            {Array.isArray(externalServices) && externalServices.length > 0 ? (
              externalServices.map((service, index) => (
                <div key={index} className="service-box-external-service">
                  {service || 'Unknown External Service'}
                </div>
              ))
            ) : (
              <div>No external services found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CloudArchitecture;

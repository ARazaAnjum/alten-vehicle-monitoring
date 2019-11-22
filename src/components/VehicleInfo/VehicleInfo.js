/**
 * VehicleInfo
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVehiclesInfo, getCustomersInfo } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalizedStrings from 'react-localization';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import localeData from './locales';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    PieChart, Pie, Tooltip, Cell
} from 'recharts'

// Locales
let locales = new LocalizedStrings(localeData);

class VehicleInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulateTime: 60000,
            selectedLanguage: 'en',
            selectedCustomer: [],
            selectedStatus: '',
            filteredData: [],
            overviewData: [],
        }
    }

    componentDidMount() {
        const self = this;
        this.props.getVehiclesInfo();
        this.props.getCustomersInfo();
        // Function to simulate vehicles status randomly
        setInterval(function () {
            const { data } = self.props
            const onState = _.random(0, 1);
            const selectedVehicle = _.random(0, data.length - 1);
            if (onState === 1) {
                data[selectedVehicle]['status'] = (data[selectedVehicle]['status'] === 'offline') ? 'online' : 'offline';
                self.getVehiclesData(data);
                self.getVehiclesOverview(data)
            }

        }, this.state.simulateTime);
    }

    componentWillReceiveProps(props) {
        const filteredData = _.groupBy(props.data, 'customerId');
        this.setState({ filteredData }, () => {
            this.getVehiclesOverview(this.props.data)
        })
    }

    /**
    * function to get overview status for vehicles
    */
    getVehiclesOverview = (data) => {
        let overviewData = [];
        if (data && !!data.length) {
            const onlineVehicles = data.filter((x) => x.status === 'online').length;
            const offlineVehicles = data.filter((x) => x.status === 'offline').length;
            overviewData.push({ name: 'Online', value: onlineVehicles, color: '#7bd07b' }, { name: 'Offline', value: offlineVehicles, color: '#bb2b17' })
        }
        this.setState({ overviewData })
    };

    /**
     * function to filter related data based upon user selection
     */
    getVehiclesData = (data) => {
        const { selectedCustomer, selectedStatus } = this.state
        let filteredData = _.groupBy(data, 'customerId');
        if (!!selectedCustomer.length && !!selectedStatus) {
            filteredData = data.filter((vehicle) => vehicle.status === selectedStatus && selectedCustomer.indexOf(vehicle.customerId) > -1)
            filteredData = _.groupBy(filteredData, 'customerId');
        } else if (!!selectedCustomer.length && !selectedStatus) {
            filteredData = data.filter((vehicle) => selectedCustomer.indexOf(vehicle.customerId) > -1)
            filteredData = _.groupBy(filteredData, 'customerId');
        } else if (!selectedCustomer.length && !!selectedStatus) {
            filteredData = data.filter((vehicle) => vehicle.status === selectedStatus)
            filteredData = _.groupBy(filteredData, 'customerId');
        }
        this.setState({ filteredData })
    };

    /**
     * function to handle customer and status dropdown update
     */
    handleChange = (value, field) => {
        this.setState({
            [field]: value
        }, () => {
            this.getVehiclesData(this.props.data);
        });
    };

    /**
     * function to handle language toggle
     */
    handleChangeLanguage = (e) => {
        locales.setLanguage(e.target.value);
        this.setState({
            selectedLanguage: e.target.value
        });
    };

    /**
     * function to handle Reset Filters
     */
    resetFilter = (e) => {
        this.setState({
            selectedStatus: null,
            selectedCustomer: []
        }, () => {
            this.getVehiclesData(this.props.data);
        });
    };

    /**
     * function to handle language toggle
     */
    renderCustomerCards = (filteredData, customer) => {
        if (filteredData && filteredData[customer.id]) {
            return (<ExpansionPanel key={customer.id}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h4 className="customer-name">Customer: </h4>{customer.name}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="vehicle-container">
                        {filteredData[customer.id].map((data, index) =>
                            <div className="car-container" style={{ backgroundColor: (data.status === 'online') ? '#7bd07b' : '#bb2b17' }} key={index}>
                                <div>{locales.VEHICLE_REGISTERATION}: {data.regNo} </div>
                                <div>{locales.VEHICLE_ID}: {data.id}</div>
                                <div>{locales.STATUS}: {data.status} </div>
                            </div>

                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>)
        } else {
            return null;
        }
    };

    render() {
        const { loading, customers } = this.props;
        const { selectedLanguage, selectedCustomer, selectedStatus, overviewData, filteredData } = this.state;

        /**
         * Loader to show while fetching data from server
         */
        if (loading) {
            return <CircularProgress />
        }
        return (
            <Container maxWidth="md" data-test="appComponent">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="language-selector">
                            <FormControl className="formControl">
                                <InputLabel>Language</InputLabel>
                                <Select
                                    native
                                    onChange={this.handleChangeLanguage}
                                    value={selectedLanguage}
                                >
                                    <option value={'en'}>English</option>
                                    <option value={'sweedish'}>Sweedish</option>

                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <h1 id="vehicle-status-content">{locales.VEHICAL_OVERVIEW_STATUS}</h1>
                    </Grid>
                    {/* Selection Dropdowns */}
                    <Grid item xs={4}>
                        <FormControl className="formControl">
                            <div>{locales.STATUS}</div>
                            <Select
                                native
                                onChange={(e) => this.handleChange(e.target.value, 'selectedStatus')}
                                value={selectedStatus}
                            >
                                <option value="" className="selectEmpty">{locales.ALL}</option>
                                <option value="online">{locales.ONLINE}</option>
                                <option value="offline">{locales.OFFLINE}</option>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl className="formControl">
                            <div>{locales.CUSTOMERS}</div>
                            <Select
                                input={<Input />}
                                renderValue={selected => selected.join(', ')}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 48 * 4.5 + 8,
                                            width: 250,
                                        },
                                    },
                                }}
                                multiple
                                onChange={(e) => this.handleChange(e.target.value, 'selectedCustomer')}
                                value={selectedCustomer}
                            >
                                {customers.map(customer => (
                                    <MenuItem key={customer.id} value={customer.id}>
                                        <Checkbox checked={selectedCustomer.indexOf(customer.id) > -1} />
                                        <ListItemText primary={customer.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" onClick={this.resetFilter} style={{ marginTop: '25px' }}>
                            Reset Filters
                        </Button>
                    </Grid>
                    {/* Selection Dropdowns */}

                    {/* Overview Pie Chart */}
                    <Grid item xs={12}>
                        <PieChart width={250} height={250}>
                            <Pie dataKey="value" isAnimationActive={false} data={overviewData} cx={125} cy={125} outerRadius={80} fill="#8884d8" label>
                                {
                                    overviewData.map((entry, index) => <Cell fill={entry.color} key={index} />)
                                }
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Grid>
                    {/* Overview Pie Chart */}

                    <Grid item xs={12}>
                        <Grid item xs={12}>

                            {customers && customers.map(customer => this.renderCustomerCards(filteredData, customer))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

// map state to props
const mapStateToProps = ({ vehicles, customers }) => {
    const { data, loading } = vehicles;
    return { data, loading, customers: customers.customers };
}

export default connect(mapStateToProps, {
    getVehiclesInfo,
    getCustomersInfo
})(VehicleInfo);


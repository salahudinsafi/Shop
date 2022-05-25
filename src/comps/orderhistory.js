import React, { Component } from 'react'

export default class OrderHist extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //products: [{id: 1, name:"truck"}, {id: 2, name:"lambo"}],
          orders: [],
          orderitems: [],
          name: "",
          cellnum: "",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    if (this.state['cusCell'] === "" &&	this.state['name'] === "" ) {
      alert("Please, Enter either Name or Phone Number")
      return
    }  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: this.state['name'], cellnum:this.state['cellnum']})
    };
    fetch('http://127.0.0.1:5000/search', requestOptions)
      .then(response => response.json())
      .then(data => data.length > 0 ? this.setState({ orders: data }) : alert("Error: Order not found") );
      
    event.preventDefault();
  }
  getOrder(i) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({oderId:i})
    };
    fetch('http://127.0.0.1:5000/getorder', requestOptions)
      .then(response => response.json())
      .then(data => data.length > 0 ? this.setState({orderitems: data }) : alert("Error: details not found"));
}



  render() {
    return (
      <div className="panel">
          <h2>Serach for order</h2>
          <form onSubmit={this.handleSubmit}>
          <label>
              Name:
              <input name='name' type="text" value={this.state.name} onChange={this.handleInputChange} />
            </label>
            <label>
              Phone number:
              <input name='cellnum' type="number" value={this.state.cellnum} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Search" />
          </form>
          <div>
            <div>
            <table id="OrderHistoryTabell">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Phone Number</th>
                    <th>Show</th>
                </tr>
                </thead>
                <tbody>
                {this.state.orders.map(i => (
                <tr key={i.oid}><td>{i.oid}</td>
                <td>{i.name}</td><td>{i.cellnum}</td><td><button onClick={() => this.getOrder(i.oid)}>Details</button></td></tr>
                  ))}
               </tbody>
              </table>
               
            </div>
            <div>
                <ul>
                    {this.state.orderitems.map(i => (
                        <li key={i.id}>Product: {i.pName} Quntity: {i.count}</li>
                    ))}
                </ul>
            </div>
          </div>
      </div>
    )
  }
}

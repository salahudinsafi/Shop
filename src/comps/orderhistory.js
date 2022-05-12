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
    alert('A name was submitted: ' + this.state['name'] + this.state['cellnum']);
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: this.state['name'], cellnum:this.state['cellnum']})
    };
    fetch('http://127.0.0.1:5000/search', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ orders: data }));
      
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
      .then(data => this.setState({orderitems: data }));
}



  render() {
    return (
      <div className="panel">
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
                <ul>
                    {this.state.orders.map(o => (
                        <li key={o.oid}>Order ID: {o.oid} Customer name {o.name}  Phone Number:{o.cellnum} <button onClick={() => this.getOrder(o.oid)}>details</button></li>
                        
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {this.state.orderitems.map(i => (
                        <li key={i.id}>Product: {i.pName} quntity {i.count}</li>
                    ))}
                </ul>
            </div>
          </div>
      </div>
    )
  }
}

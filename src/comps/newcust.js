import React, { Component } from 'react'

export default class Newcust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            name: '',
            cellnum: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount() {
        fetch("http://127.0.0.1:5000/getCustomer")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                customer: result
              });
            },
            (error) => {
              this.setState({
                error
              });
            }
          )
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
        if (this.state['cusCell'] === "" && this.state['name'] === "" ) {
          alert("Please,Enter Name and Phone Number ")
          return
        }  
        if (this.state['name'] === "") {
            alert("Please, Enter the name")
            return
        }
        if (this.state['cusCell'] === "") {
            alert("Please, Enter Phone Number")
            return
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name: this.state['name'], cellnum:this.state['cellnum']})
        };
        fetch('http://127.0.0.1:5000/newcustomer', requestOptions)
          .then(response => response)
          .then(data => data.ok === true ? alert("Customer Registration Completed") : alert("Error: somthing went wrong"));
        event.preventDefault();
      }
    
      render() {
        return (
        <div className='panel'>
          <h2>Register Customer</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input name='name' type="text" value={this.state.name} onChange={this.handleInputChange} />
            </label>
            <label>
              Phone number:
              <input name='cellnum' type="number" value={this.state.cellnum} onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>

          <div>
              <h2>All customer</h2>
              <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {this.state.customer.map(i => (
                <tr key={i.id}><td>{i.name}</td>
                <td>{i.PhoneNo}</td></tr>
                  ))}
               </tbody>
              </table>
            </div>

        </div>
        );
      }
}

import React, { Component } from 'react'

export default class Newcust extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cellnum: ''
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
        //alert('A name was submitted: ' + this.state['name'] + this.state['cellnum']);
        if (this.state['name'] === "") {
          alert("Enter Name")
          return
        }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name: this.state['name'], cellnum:this.state['cellnum']})
        };
        fetch('http://127.0.0.1:5000/newcustomer', requestOptions)
          .then(response => response)
          .then(data => this.setState({ postId: data.id }));
           
        event.preventDefault();
      }
    
      render() {
        return (
        <div>
          <form onSubmit={this.handleSubmit} className='panel'>
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


        </div>
        );
      }
}

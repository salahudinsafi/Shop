import React, { Component } from 'react'

export default class ProdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            name: '',
            desc: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch("http://127.0.0.1:5000/getproducts")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                products: result
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
        //alert('A name was submitted: ' + this.state['name'] +" : " + this.state['desc']);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name: this.state['name'], desc:this.state['desc']})
        };
        
        fetch('http://127.0.0.1:5000/productpage', requestOptions)
          .then(response => response)
          .then(data => data.ok === true ? alert("Products is add") : alert("Error: Products is not add"));
          
        event.preventDefault();
    }
    render() {
        return (
        <div className='panel'>
            <div>
                <form onSubmit={this.handleSubmit} className='panel'>
                    <label>
                        Name:
                        <input name='name' type="text" value={this.state.name} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Description:
                        <input name='desc' type="text" value={this.state.desc} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Add to database" />
                </form>
            </div>

            <div>
              <h2>All Products</h2>
              <table>
                <thead>
                <tr>
                    <th>Products Name</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                {this.state.products.map(i => (
                <tr key={i.id}><td>{i.name}</td>
                <td>{i.desc}</td></tr>
                  ))}
               </tbody>
              </table>
            </div>
        </div>
        )
    }
}

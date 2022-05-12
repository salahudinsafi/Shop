import './css/neworder.css'
import React, { Component } from 'react'

export default class neworder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          products: [{id: 1, name:"truck"}, {id: 2, name:"lambo"}],
          cusName:"",
          cusCell:"",
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
        //alert('A name was submitted: ' + this.state['name'] +" : " + this.state['desc']);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({order:this.state["items"], cusName:this.state["cusName"], cusCell:this.state["cusCell"]})
        };
        
        fetch('http://127.0.0.1:5000/neworder', requestOptions)
          .then(response => response)
          .then(data => data.ok === true ? alert("Products is add") : alert("Error: Products is not add"));
          
        event.preventDefault();
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


    addProduct(i) {
        const items = this.state.items.slice();
        var found = false
        items.forEach(e => {
            if (e.id === i.id){
                e.count += 1;
                found = true
            }
        });
        if (!found){
            items.push({id:i.id, name:i.name, count:1})
        }
        this.setState({items: items});
    }
  render() {
    return (
      <div id='order' className='panel'>
            <div id='neworder'>
              <ul>
                  {this.state.items.map(i => (
                      <li key={i.id}>{i.name} X {i.count}</li>
                  ))}
              </ul>
          </div>
        <form onSubmit={this.handleSubmit} className='panel'>
                    <label>
                        Name:
                        <input name='cusName' type="text" value={this.state.cusName} onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Phone:
                        <input name='cusCell' type="Number" value={this.state.cusCell} onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Create new order" />
                </form>

          <div id='neworder'>
              <ul>
                  {this.state.items.map(i => (
                      <li key={i.id}>{i.name} X {i.count}</li>
                  ))}
              </ul>

          </div>
          <div id='neworderProds'>  
              <ul>
              <h2>Cart</h2>
                  {this.state.products.map(i => (
                      <li key={i.id}>{i.name} <button onClick={() => this.addProduct(i)}>Add</button></li>
                  ))}
              </ul>
          </div>
      </div>
    )
  }
}

import React, { Component } from 'react';
import '../App.css';
import FlipMove from 'react-flip-move';
import axios from 'axios';
import {Link} from 'react-router-dom';


class MainMenu extends Component {
  state = {
    datas: null
  }

  getData = () => {
    axios.get("http://localhost:2002/api/data").then((res) => {
      this.setState({
        datas: res.data
      })
    })
  }

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    this.getData();
  }

  render() {
    if (this.state.datas == null) {
      return <h3>LOADING ...</h3>
    }
    return (
      <div className="text-center">
        <br/>
        <h3>Main Menu</h3>
        <div className="container mt-5">
          <div className="row">
              {this.state.datas.map((data, i) => {
                return(
                  <div className="col-md-4">
                    <br/>
                    <img className="img-fluid img-main" src={`http://localhost:2002/${data.img}`}/>
                    <hr/>
                    <p><strong>{data.name}</strong></p>
                    <p className="price">Rp. {data.price},-</p>
                    <br/>
                    <Link to={`openmenu/${data._id}`}>Lihat Selengkapnya</Link>
                  </div>
                )
              })}
            <div className="col-md-4">
              <br/>
              <div className="img-box">
                <Link to="/addmenu"><button>Tambah</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default MainMenu;

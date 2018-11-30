import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class OpenMenu extends Component {
  state = {
    data: null,
    confirm: undefined
  }

  getData = () => {
    axios.get("http://localhost:2002/api/data/"+this.props.match.params.id).then((res) => {
      this.setState({
        data: res.data
      })
    })
  }

  deleteData = (id) => {
    axios.delete(`http://localhost:2002/api/data/${id}`).then((res) => {
      this.getData();
    })
  }

  //menhandle data yang mau dihapus
  handleDelete = () => {
    let confirm = this.state.confirm;

    confirm = window.confirm("Anda yakin ingin menghapus ini?")
    this.setState({
      confirm: confirm
    })

    if (confirm == true) {
      this.state.data.map(i => {
        this.deleteData(i._id)
      })
    } else {
      alert("OK")
    }
  }

  //mengupdate data setelah terjadi perubahan
  componentDidUpdate(){
    this.getData();
  }

  componentDidMount(){
    this.getData();

  }

  render() {
    if (this.state.data == null) {
      return <h1>LOADING....</h1>
    }

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12 text-left">
            <Link to="/" className="text-back mb-3"><h3><i class="fas fa-arrow-left"> Kembali ke Menu</i></h3></Link>
          </div>
          <div className="col-md-4">
            <img className="img-fluid img-des text-center ml-md-3 my-2" src={`http://localhost:2002/${this.state.data[0].img}`}/>
            <h3 className="text-md-center mb-5">&nbsp;{this.state.data[0].name}</h3>
          </div>
          <div className="col-md-8">
            <table className="mt-5">
              <tr>
                <th><h3>Komposisi</h3></th>
                <td><p>{this.state.data[0].composition}</p></td>
              </tr>
              <tr>
                <th><h3>Harga</h3></th>
                <td><p>Rp.{this.state.data[0].price},00-</p></td>
              </tr>
            </table>

            {/* menghandle data*/}
            {this.state.data.map(i => {
              return(
                <div className="text-center ">
                  <Link to="/" onClick={this.handleDelete} className="btn btn-lg btn-outline-secondary px-3 mx-5 my-4" >Delete</Link>
                  <Link to={`/updatemenu/${i._id}`} className="btn btn-lg btn-outline-secondary px-3 mx-5 my-4">Edit</Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }

}

export default OpenMenu;

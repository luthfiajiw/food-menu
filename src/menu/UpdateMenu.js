import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

class UpdateBook extends Component {
    state = {
      name: '',
      composition: '',
      price: '',
      img: '',
      _id: '',
      redirect: false
    }

    componentDidMount(){
      axios.get("http://localhost:2002/api/data/"+this.props.match.params.id).then((res) => {
        this.setState({
          name: res.data[0].name,
          composition: res.data[0].composition,
          price: res.data[0].price,
          img: res.data[0].img,
          _id: res.data[0]._id
        })
        console.log(res);
      })
    }

    putData = (id) => {
      const formData = new FormData();
      formData.append('name', this.state.name)
      formData.append('composition', this.state.composition)
      formData.append('price', this.state.price)
      formData.append('img', this.state.img)
      axios.put("http://localhost:2002/api/data/"+id, formData).then((res) => {
        this.setState({
          redirect: true
        })
      })
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    fileHandler = (e) => {
      this.setState({
        img: e.target.files[0]
      })
    }

    render() {
        return (
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-12">
                  <h2>Edit Data</h2>
                  <br/>
                  <label>Nama Makanan</label>
                  <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="*harus diisi"/>

                  <label>Harga</label>
                  <input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="*harus berupa angka"/>

                  <label>Komposisi</label>
                  <textarea rows="3" className="text" name="composition" value={this.state.composition} onChange={this.handleCutton} placeholder="*harus diisi min 20 karakter">
                  </textarea>

                    <div class="form-group">
                      <label>Pilih Gambar</label>
                      <input type="file" class="form-control-file" onChange={this.fileHandler}/>
                    </div>
                  <button className="btn btn-secondary" onClick={()=>{this.putData(this.props.match.params.id)}}>Edit</button>
                  {this.state.redirect ? <Redirect to="/" /> : ''}
                </div>
              </div>
            </div>
        );
    }
}

export default UpdateBook;

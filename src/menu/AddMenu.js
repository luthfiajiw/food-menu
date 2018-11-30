import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AddMenu extends Component {
  state = {
    name: '',
    composition: '',
    price: null,
    img: '',
    redirect: false,
    patterns : {
      name: /^[a-z\d]/i,
      composition: /^[a-z\d]{20}/i,
      price: /^[0-9]/
    },
    button: false
  }

  //validation function
  validate = (field,regex) => {
    if (regex.test(field.value)) {
      field.className = 'text valid'
    }else {
      field.className = 'text invalid'
    }
  }

  validateButton = (field,regex) => {
    if (regex.test(field.value)) {
      field.className = 'text valid'
      this.setState({
        button: true
      })
    }else {
      field.className = 'text invalid'
    }
  }

  postData = () => {
    const formData = new FormData()
    formData.append('name', this.state.name)
    formData.append('composition', this.state.composition)
    formData.append('price', this.state.price)
    formData.append('img', this.state.img)
    axios.post('http://localhost:2002/api/data', formData).then(res =>{
      this.setState({
        redirect: true
      })
    })
  }

  handleChange = (e) => {
    this.validate(e.target, this.state.patterns[e.target.attributes.name.value])
    this.setState({
      [e.target.name] : e.target.value,
    })
  }

  handleButton = (e) => {
    this.validateButton(e.target, this.state.patterns[e.target.attributes.name.value])
    this.setState({
      [e.target.name] : e.target.value,
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
              <label>Nama Makanan</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="*harus diisi"/>
              <p>* Tidak boleh kosong</p>

              <label>Harga</label>
              <input type="text" name="price" value={this.state.price} onChange={this.handleChange} placeholder="*harus berupa angka"/>
              <p>* Hanya diisi angka</p>

              <label>Komposisi</label>
              <textarea rows="3" className="text" name="composition" value={this.state.composition} onChange={this.handleButton} placeholder="*harus diisi min 20 karakter">
              </textarea>
              <p>* Harus diisi minimal 20 karakter</p>

              <label>Pilih Gambar</label>
              <input type="file" className="form-control-file" onChange={this.fileHandler}/>
              <p>* Format harus : jpeg/jpg/png</p>

              <br/>
            <button type="submit" disabled={!this.state.button} className="btn btn-secondary" onClick={this.postData}>Submit</button>
            {this.state.redirect ? <Redirect to="/"/> : ''}
          </div>
        </div>
      </div>
    );
  }

}

export default AddMenu;

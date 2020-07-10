import React, { Component } from 'react';
import axios from 'axios'
import { saveAs } from 'file-saver';


class App extends Component {

	constructor(){
		super()

		this.state = {
			qr:null,

			size:'250x250',
			color:'0-0-0',
			data:'',

			error:'',
		}
	}


	getQR() {
		if(!this.state.data){
			this.setState({error:'A Link is Required'})
			return
		}

		let size = this.state.size
		let data = this.state.data
		let color = this.state.color
		let format = "png"

		//DOCS: http://goqr.me/api/doc/create-qr-code/#param_format
		let url = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size}&format=${format}&color=${color}`

		this.setState({qr:url})
	}






	openTab() {
		let size = this.state.size
		let data = this.state.data
		let color = this.state.color
		let format = "png"

		window.open(`http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size}&format=${format}&color=${color}`)
	}




	// download() {
	// 	let download = document.createElement('a');

	// 	let size = this.state.size
	// 	let data = this.state.data
	// 	let color = this.state.color
	// 	let format = "png"

	// 	//DOCS: http://goqr.me/api/doc/create-qr-code/#param_format

	// 	download.href = `http://api.qrserver.com/v1/create-qr-code/?data=${data}&size=${size}&format=${format}&color=${color}`
	// 	download.download = 'download.png';
	// 	download.click();
	// }



	// testDownload(){
	// 	fetch('https://jsonplaceholder.typicode.com/todos/1')
	// 	  .then(resp => resp.blob())
	// 	  .then(blob => {
	// 	    const url = window.URL.createObjectURL(blob);
	// 	    const a = document.createElement('a');
	// 	    a.style.display = 'none';
	// 	    a.href = url;
	// 	    // the filename you want
	// 	    a.download = 'todo-1.json';
	// 	    document.body.appendChild(a);
	// 	    a.click();
	// 	    window.URL.revokeObjectURL(url);
	// 	    alert('your file has downloaded!'); // or you know, something with better UX...
	// 	  })
	// 	  .catch(() => alert('oh no!'));
	// }



	changeData(e){
		this.setState({data:e.target.value})
	}

	changeSize(value){
		this.setState({size:value})
	}

	changeColor(value){
		this.setState({color:value})
	}

	render(){
		return (
			<div className='container'>
			
			<br/>


			<div className='row'>
				<div style={{paddingTop:'4px', backgroundColor:'black', color:'white'}} className='col-12'>
					<h2>QR CODE GENERATOR</h2>
				</div>

				<div className='col-sm-6'>
					<br/>
					<br/>

					<p>Paste a Link (Up to 900 Characters)</p>
					<input placeholder='Required' className='form-control' onChange={this.changeData.bind(this)}/>

					<br/>
					<br/>

					<p>Size (In Pixels)</p>
					<div class="dropdown show">
						<a  style={{minWidth:'200px'}} class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.size}
						</a>
						<div style={{minWidth:'200px'}} class="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<a onClick={()=>this.changeSize('250x250')} class="dropdown-item" href="#">250x250</a>
							<a onClick={()=>this.changeSize('500x500')} class="dropdown-item" href="#">500x500</a>
						</div>
					</div>

					<br/>
					<br/>
					
					<p>Color</p>
					<div class="dropdown show">
						<a style={{minWidth:'200px'}} class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.color}
						</a>
						<div style={{minWidth:'200px'}} class="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<a onClick={()=>this.changeColor('0-0-0')} class="dropdown-item" href="#">(Black) 0-0-0</a>
							<a onClick={()=>this.changeColor('255-0-0')} class="dropdown-item" href="#">(Red) 255-0-0</a>
							<a onClick={()=>this.changeColor('0-0-255')} class="dropdown-item" href="#">(Blue) 0-0-255</a>
						</div>
					</div>

					<br/>
					<br/>

					<hr/>
					<button className='btn btn-lg btn-block btn-primary' onClick={this.getQR.bind(this)}>GENERATE MY QR !</button>
					<br/>
					<p style={{color:'red'}}>{this.state.error}</p>
					<br/>

				</div>

				<div style={{textAlign:'center'}} className='col-sm-6'>
					<br/>
					{this.state.qr &&
					<div>
						<img src={this.state.qr} />
						<br/>
						<br/>
						<button className='btn btn-secondary' onClick={this.openTab.bind(this)}>Open in Separate Tab</button>
						<p>( Test with Camera App )</p>
					</div>
					}

				</div>

			</div>
			</div>
		)
	}


}


export default App;

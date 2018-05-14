import React, {Component} from 'react';
import axios from 'axios';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            typed: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
          searchInput: event.target.value,
          typed: true
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let name = this.state.searchInput;

        this.props.addPlaylists(name);
        
        this.setState({
            searchInput: ''
        })
    }


    render(){
        console.log(this.state.searchInput)
        return (
            <div className="well">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                    <legend>New Playlist</legend>
                    {!this.state.searchInput && this.state.typed ? <div className='alert alert-warning'>Please enter name</div> : null}
                    {this.state.searchInput.length > 16 ? <div className='alert alert-warning'>Playlist name must be under 16 characters</div> : null}
                    <div className="form-group">
                        <label className="col-xs-2 control-label">Name</label>
                        <div className="col-xs-10">
                        <input className="form-control" type="text" onChange={this.handleChange} value={this.state.searchInput}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-10 col-xs-offset-2">
                        <button disabled={this.state.searchInput.length > 16 || !this.state.searchInput} type="submit" className="btn btn-success">Create Playlist</button>
                        </div>
                    </div>
                    </fieldset>
                </form>
            </div>
        )
    }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Test extends Component {
    constructor(props) {
        super(props) 
        this.handleClick = this.handleClick.bind(this)
    }
    render() { 
        return ( 
            <li onClick={this.handleClick}>
                {this.props.name} 为你推荐
                {this.props.content}</li>
        );
    }

    handleClick(){
        this.props.delList(this.props.index)
    }
}

Test.propTypes={
    name:PropTypes.string.isRequired,
    content:PropTypes.string,
    index:PropTypes.number,
    delList:PropTypes.func
}
Test.defaultProps={
    name:'louis'
}

export default Test;
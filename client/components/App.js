import React, { Component } from 'react'

import FlexBox from './FlexBox'

export default class App extends Component {
  render() {
	 return (
		<FlexBox full align='center' justify='center' >
			{this.props.children}
		</FlexBox>
	 )
  }
}

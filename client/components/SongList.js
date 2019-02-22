import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class SongList extends Component {
  render() {
	 return (
		<div>
		  Song List
		</div>
	 )
  }
}

const query = gql`
{
	song {
		title
	}
}
`

export default graphql(query)(SongList)
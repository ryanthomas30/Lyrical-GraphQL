import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import { fetchSong } from '../queries/songs'
import FlexBox from './FlexBox'


class SongDetail extends Component {
	render() {
		console.log('this.props:', this.props)
		return (
			<div>
				<h3>Song Detail</h3>
			</div>
		)
	}
}

export default graphql(fetchSong, {
	options: (props) => ({
		variables: { id: props.params.id }
	})
})(SongDetail)

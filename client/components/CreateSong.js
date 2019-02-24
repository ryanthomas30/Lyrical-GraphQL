import React, { Component } from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'

import FlexBox from './FlexBox'

import { fetchSongs } from '../queries/songs'

class CreateSong extends Component {
	constructor(props) {
		super(props)

		this.state = { title: '' }

	}

	_onSubmit = async (e) => {
		e.preventDefault()
		await this.props.mutate({
			variables: {
				title: this.state.title
			},
			refetchQueries: [{ query: fetchSongs }]
		})
		hashHistory.push('/')
	}

	render() {
		return (
			<FlexBox>
				<Link to='/' >
					Back
				</Link>
				<h3>Create New Song</h3>
				<form onSubmit={(e) => this._onSubmit(e)} >
					<label>Song Title</label>
					<input
						value={this.state.title}
						onChange={(e) => this.setState({ title: e.target.value })} />
				</form>
			</FlexBox>
		)
	}
}

const mutation = gql`
	mutation AddSong($title: String) {
		addSong(title: $title) {
			title
		}
	}
`

export default graphql(mutation)(CreateSong)

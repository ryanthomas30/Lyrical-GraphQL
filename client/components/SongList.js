import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import FlexBox from './FlexBox'

import { fetchSongs } from '../queries/songs'

class SongList extends Component {

	renderSongs = () => {
		const { songs, loading } = this.props.data
		if (loading) return null
		return songs.map((song, i) => (
			<FlexBox key={i} full='horizontal' direction='row' align='center' padding='medium' className='list__item' >
				{song.title}
			</FlexBox>
		))
	}

	render() {
		console.log('this.props:', this.props)
		const { data } = this.props
		if (data.loading) {
			<FlexBox align='center' justify='center' >
				Loading
			</FlexBox>
		}
		return (
			<FlexBox full='horizontal' align='end' >
				<FlexBox full='horizontal' align='center' justify='center' className='list' >
					{this.renderSongs()}
				</FlexBox>
				<FlexBox margin='large' >
					<Link to='/songs/new' className='btn-floating btn-large red right' >
						<i className='material-icons'>add</i>
					</Link>
				</FlexBox>
			</FlexBox>
		)
	}
}

export default graphql(fetchSongs)(SongList)

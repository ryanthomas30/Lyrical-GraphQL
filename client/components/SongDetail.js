import React, { Component } from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'

import { fetchSong } from '../queries/songs'
import FlexBox from './FlexBox'


class SongDetail extends Component {

	constructor(props) {
		super(props)

		this.state = { lyric: '' }

	}

	_onSubmit = async (e) => {
		const { id } = this.props.params
		e.preventDefault()
		await this.props.mutate({
			variables: {
				content: this.state.lyric,
				songId: id
			}
		})
		this.props.data.refetch()
		this.setState({ lyric: '' })
		
	}

	_onLike = (id) => {
		console.log('id:', id)
	}

	renderLyrics = () => {
		const { song, loading } = this.props.data
		if (loading || !song) return null
		return song.lyrics.map((lyric, i) => (
			<FlexBox key={i} full='horizontal' direction='row' align='center' justify='between' padding='medium' className='list__item' >
				{lyric.content}
				<FlexBox direction='row' align='center' justify='between' >
					<i style={{ marginRight: '1rem' }} className='material-icons' onClick={() => this._onLike(lyric.id) } >thumb_up</i>
					{lyric.likes}
				</FlexBox>
			</FlexBox>
		))
	}

	render() {
		const { song, loading } = this.props.data
		if (loading || !song) {
			return(
				<FlexBox align='center' justify='center' >
					Loading...
				</FlexBox>
			)
		}
		return (
			<FlexBox full='horizontal' >
				<FlexBox margin={24} >
					<Link to='/' >
						Back
					</Link>
					<h3>{song.title}</h3>
				</FlexBox>
				<FlexBox full='horizontal' align='center' justify='center' className='list' marginTop={24} marginBottom={24} >
					{this.renderLyrics()}
				</FlexBox>
				<FlexBox full='horizontal' align='center' margin={24} >
					<form onSubmit={(e) => this._onSubmit(e)} >
						<label>Lyric</label>
						<input
							value={this.state.lyric}
							onChange={(e) => this.setState({ lyric: e.target.value })} />
					</form>
				</FlexBox>
			</FlexBox>
		)
	}
}

const mutation = gql`
	mutation AddLyrics($content: String, $songId: ID) {
		addLyricToSong(content: $content, songId: $songId) {
			id
			lyrics {
				id
				content
			}
		}
	}
`

export default graphql(mutation)(
	graphql(fetchSong, {
		options: (props) => ({
			variables: { id: props.params.id }
		})
	})(SongDetail)
)

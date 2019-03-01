import gql from 'graphql-tag'

export const fetchSongs = gql`
{
	songs {
		title
		id
	}
}`

export const fetchSong = gql`
	query getSong($id: ID!) {
		song (id: $id) {
			id
			title
		}
}`

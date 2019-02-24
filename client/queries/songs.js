import gql from 'graphql-tag'

export const fetchSongs = gql`
{
	songs {
		title
	}
}`

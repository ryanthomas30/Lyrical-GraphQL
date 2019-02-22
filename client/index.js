import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import SongList from './components/SongList'
import FlexBox from './components/FlexBox'

const client = new ApolloClient({})

const Root = () => {
	return (
		<ApolloProvider client={client} >
			<FlexBox full align='center' justify='center' >
				<SongList />
			</FlexBox>
		</ApolloProvider>
	)
}

ReactDOM.render(
	<Root />,
	document.querySelector('#root')
)

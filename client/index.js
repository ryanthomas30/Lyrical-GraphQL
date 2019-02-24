import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import App from './components/App'
import SongList from './components/SongList'
import CreateSong from './components/CreateSong'

import './style/App.css'

const client = new ApolloClient({})

const Root = () => {
	return (
		<ApolloProvider client={client} >
			<Router history={hashHistory} >
				<Route path='/' component={App} >
					<IndexRoute component={SongList} />
					<Route path='/songs/new' component={CreateSong} />
				</Route>
			</Router>
		</ApolloProvider>
	)
}

ReactDOM.render(
	<Root />,
	document.querySelector('#root')
)

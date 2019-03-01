import React, { Component } from 'react'

/* interface mappingType {
	start: string
	end: string
	between: string
	small: string
	medium: string
	large: string
} */

const mapping = {
	start: 'flex-start',
	end: 'flex-end',
	between: 'space-between',
	small: '12px',
	medium: '24px',
	large: '48px'
}

const wrapMap = (b) => {
	return b ? 'wrap' : 'nowrap'
}

const map = (input) => {
	if (!input) return ''
	if (input in mapping) {
		return mapping[input]
	}
	return input
}

/* type Props = {
	direction?: 'row' | 'column'
	justify?: 'start' | 'end' | 'between' | 'center'
	align?: 'start' | 'end' | 'center' | 'baseline'
	wrap?: boolean
	margin?: 'small' | 'medium' | 'large' | number
	marginLeft?: 'small' | 'medium' | 'large' | number
	marginRight?: 'small' | 'medium' | 'large' | number
	marginTop?: 'small' | 'medium' | 'large' | number
	marginBottom?: 'small' | 'medium' | 'large' | number
	padding?: 'small' | 'medium' | 'large' | number
	paddingLeft?: 'small' | 'medium' | 'large' | number
	paddingRight?: 'small' | 'medium' | 'large' | number
	paddingTop?: 'small' | 'medium' | 'large' | number
	paddingBottom?: 'small' | 'medium' | 'large' | number
	full?: boolean | 'vertical' | 'horizontal'
	style?: object
} */

class FlexBox extends Component {

	render() {
		const { direction, justify, align, wrap,
			margin, marginLeft, marginRight, marginTop, marginBottom,
			padding, paddingLeft, paddingRight, paddingTop, paddingBottom,
			full, style, ...other } = this.props

		/* FULL */
		const fullObj = {}
		if (full === true) {
			fullObj.width = '100%'
			fullObj.height = '100%'
		} else if (full === 'vertical') {
			fullObj.height = '100%'
		} else if (full === 'horizontal') {
			fullObj.width = '100%'
		}

		/* FLEX */
		const flexDirection = direction
		const justifyContent = map(justify)
		const alignItems = map(align)
		const flexWrap = wrapMap(wrap)

		/* PADDING */
		const paddingObj = { padding, paddingLeft, paddingRight, paddingTop, paddingBottom }
		Object.keys(paddingObj).forEach((k) => {
			paddingObj[k] = typeof paddingObj[k] === 'number' ? `${paddingObj[k]}px` : map(paddingObj[k])
		})

		/* MARGIN */
		const marginObj = { margin, marginLeft, marginRight, marginTop, marginBottom }
		Object.keys(marginObj).forEach((k) => {
			marginObj[k] = typeof marginObj[k] === 'number' ? `${marginObj[k]}px` : map(marginObj[k])
		})

		/* Merges props with style object */
		const finalStyling = {
			display: 'flex', flexDirection, justifyContent, alignItems, flexWrap,
			...paddingObj, ...marginObj, ...fullObj, ...style
		}

		/* Delete undefined fields */
		Object.keys(finalStyling).forEach(key => finalStyling[key] === undefined || finalStyling[key] === '' && delete finalStyling[key])

		return (
			<div style={finalStyling} {...other} >
				{this.props.children}
			</div>
		)
	}
}

 FlexBox.defaultProps = {
	direction: 'column',
	justify: 'start',
	align: 'start',
	wrap: 'wrap'
}

export default FlexBox
import { Spin } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

const Loading = () => {
	const antIcon = (
		<LoadingOutlined style={{ fontSize: 54, color: '#DC2626' }} spin />
	)

	return (
		<div className='mt-24 flex justify-center items-center'>
			<Spin indicator={antIcon} />
		</div>
	)
}

export default Loading

import { useEffect, useState } from 'react'
import axios from 'axios'

const Added =(() => {
const [added, setAdded] = useState("")
const [notification, setNotification] = useState("")

	useEffect((req, res) => {
		axios.get("http://localhost:3001/add")
			.then(res => {
				console.log(res)
				setNotification(res.data.message)
				setAdded(res.data.user)
			})
	}, [])

	return (
		<div>
			<p>axios.get('/add') message status: {notification}</p>
			{/* <p>axios.get('/add') user added: {added}</p> */}
		</div>

)
})

export default Added





